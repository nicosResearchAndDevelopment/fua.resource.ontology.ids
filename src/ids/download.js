const
    util     = require('../util.js'),
    prefix   = 'ids',
    ontology = 'https://w3id.org/idsa/core/',
    github   = 'https://international-data-spaces-association.github.io/InformationModel/',
    override = false;

Promise.all([
    util.downloadOntology(github + 'docs/serializations/ontology.ttl', 'text/turtle', `data/${prefix}/${prefix}.ttl`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.jsonld', 'application/ld+json', `data/${prefix}/${prefix}.json`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.rdf', 'application/rdf+xml', `data/${prefix}/${prefix}.xml`, override),
    util.downloadOntology(github + 'docs/serializations/ontology.nt', 'application/n-triples', `data/${prefix}/${prefix}.nt`, override)
]).then(util.logDone).catch(util.logError);
