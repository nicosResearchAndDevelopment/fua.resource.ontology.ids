module.exports = {
    '@context':        'fua.load.rdf',
    'dct:identifier':  __filename,
    'dct:format':      'application/fua.load+js',
    'dct:title':       'load.ontology.ids',
    'dct:alternative': '@nrd/fua.resource.ontology.ids',
    'dct:requires':    [{
        'dct:identifier': './ids/load.ids.js',
        'dct:format':     'application/fua.load+js'
    }, {
        'dct:identifier': './ids3cm/load.ids3cm.js',
        'dct:format':     'application/fua.load+js'
    }, {
        'dct:identifier': './ids3c-co/load.ids3c-co.js',
        'dct:format':     'application/fua.load+js'
    }]
};
