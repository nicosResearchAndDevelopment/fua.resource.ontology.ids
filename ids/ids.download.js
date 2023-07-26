const
    util     = require('../ontology.util.js'),
    prefix   = 'ids',
    ontology = 'https://w3id.org/idsa/core/',
    github   = 'https://international-data-spaces-association.github.io/InformationModel/',
    override = false;

Promise.all([
    util.downloadOntology(github + 'docs/serializations/ontology.ttl', 'text/turtle', `${prefix}/local/${prefix}.ttl`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.jsonld', 'application/ld+json', `${prefix}/local/${prefix}.json`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.rdf', 'application/rdf+xml', `${prefix}/local/${prefix}.xml`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.nt', 'application/n-triples', `${prefix}/local/${prefix}.nt`, override)
]).then(util.logDone).catch(util.logError);
