module.exports = {
    '@context':        'fua.load.rdf',
    'dct:identifier':  __filename,
    'dct:format':      'application/fua.load+js',
    'dct:title':       'load.ids3cm',
    'dct:alternative': '@nrd/fua.resource.ontology.ids/ids3cm',
    'dct:requires':    [{
        'dct:identifier': './ids3cm.ttl',
        'dct:format':     'text/turtle'
    }]
};
