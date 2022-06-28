module.exports = {
    '@context':        'fua.load.rdf',
    'dct:identifier':  __filename,
    'dct:format':      'application/fua.load+js',
    'dct:title':       'load.ids',
    'dct:alternative': '@nrd/fua.resource.ontology.ids/ids',
    'dct:requires':    [{
        'dct:identifier': './ids.ttl',
        'dct:format':     'text/turtle'
    }]
};
