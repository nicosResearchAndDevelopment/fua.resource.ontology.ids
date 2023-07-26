module.exports = {
    '@context':        'fua.load.rdf',
    'dct:identifier':  __filename,
    'dct:format':      'application/fua.load+js',
    'dct:title':       'load.ids',
    'dct:alternative': '@nrd/fua.resource.ontology.ids/ids',
    'dct:requires':    [{
        'dct:identifier': './local/ids.ttl',
        'dct:format':     'text/turtle'
    }]
};
