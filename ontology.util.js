const
    fs                     = require('fs/promises'),
    path                   = require('path'),
    fetch                  = require('node-fetch'),
    rdf                    = require('@nrd/fua.module.rdf'),
    {TermFactory, Dataset} = require('@nrd/fua.module.persistence'),
    {Readable}             = require('stream'),
    _util                  = require('@nrd/fua.core.util'),
    util                   = {
        ..._util,
        assert: _util.Assert('resource.ontology')
    },
    root_dir               = __dirname,
    default_options        = {
        method:         'GET',
        mode:           'cors',
        cache:          'no-cache',
        credentials:    'same-origin',
        headers:        {},
        redirect:       'follow',
        referrerPolicy: 'same-origin',
        body:           null
    };

/**
 * Copies non existing properties from the source to the target.
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
util.integrateObject = function (target, source) {
    if (!util.isObject(target)) target = {};
    for (let key in source) {
        if (target[key] === undefined) {
            target[key] = source[key];
        } else if (util.isObject(source[key]) && util.isObject(target[key])) {
            util.integrateObject(target[key], source[key]);
        }
    }
    return target;
} // integrateObject

/**
 * Loads an ontology from the web with the supplied url and fetch options.
 * @param {string} url
 * @param {object} options
 * @returns {Promise<string|null>} returns null, if the response was bad
 */
util.loadOntology = async function (url, options) {
    if (util.isString(options)) options = {headers: {Accept: options}};
    if (util.isObject(options) && !options.headers) options = {headers: options};
    options        = util.integrateObject(options, default_options);
    const response = await fetch(url, options);
    if (!response.ok) return null;
    const result = await response.text();
    return result;
}; // loadOntology

/**
 * Reads an ontology from the ontologies folder.
 * @param {string} filename
 * @returns {Promise<string|null>} returns null, if the file does not exist
 * {@link https://nodejs.org/api/errors.html#errors_common_system_errors Common System Errors}
 */
util.readOntology = async function (filename) {
    try {
        const buffer = await fs.readFile(path.join(root_dir, filename), {flag: "r"});
        const result = buffer.toString();
        return result;
    } catch (err) {
        if (err.code === 'ENOENT') return null;
        else throw err;
    }
}; // readOntology

/**
 * Saves an ontology to the ontologies folder.
 * @param {string} filename
 * @param {string|Buffer} content
 * @param {boolean} [override=false]
 * @returns {Promise<boolean>} returs false, if the writing failed, but the content was the same
 */
util.saveOntology = async function (filename, content, override = false) {
    try {
        await fs.writeFile(path.join(root_dir, filename), content, {flag: override ? "w" : "wx"});
        return true;
    } catch (err) {
        if (err.code === "EEXIST") {
            const source = await util.readOntology(filename);
            if (content === source) return false;
        }
        throw err;
    }
}; // saveOntology

/**
 * @param {string} url
 * @param {object} options
 * @param {string} filename
 * @param {boolean} [override=false]
 * @returns {Promise<boolean>}
 */
util.downloadOntology = async function (url, options, filename, override = false) {
    const content = await util.loadOntology(url, options);
    if (!content) return false;
    return await util.saveOntology(filename, content, override);
}; // downloadOntology

/**
 * @param {string} content
 * @param {string} fromFormat
 * @param {string} toFormat
 * @param {object} [context={}]
 * @returns {Promise<string>}
 */
util.transpileOntology = async function (content, fromFormat, toFormat, context = {}) {
    const
        factory     = new TermFactory(context),
        inputStream = Readable.from([content], {objectMode: false}),
        quadStream  = rdf.parseStream(inputStream, fromFormat, factory),
        dataset     = new Dataset(null, factory);
    await dataset.addStream(quadStream);
    return await rdf.serializeDataset(dataset, toFormat);
    // const
    //     // FIXME the serializeStream would not output prefixes, only the serializeDataset does
    //     outputStream = rdf.serializeStream(quadStream, toFormat, factory),
    //     chunks       = [];
    // outputStream.on('data', (chunk) => chunks.push(chunk));
    // await new Promise((resolve) => outputStream.on('end', resolve));
    // return chunks.join('');
}; // transpileOntology

/**
 * @param {string} origFilename
 * @param {string} originFormat
 * @param {string} targetFilename
 * @param {string} targetFormat
 * @param {object} [context={}]
 * @param {boolean} [override=false]
 * @returns {Promise<boolean>}
 */
util.convertOntology = async function (origFilename, originFormat, targetFilename, targetFormat, context = {}, override = false) {
    const originContent = await util.readOntology(origFilename);
    if (!originContent) return false;
    const targetContent = await util.transpileOntology(originContent, originFormat, targetFormat, context);
    if (!targetContent) return false;
    return await util.saveOntology(targetFilename, targetContent, override);
}; // convertOntology

module.exports = util;
