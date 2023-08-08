module.exports = {
    '@context':        'fua.load.rdf',
    'dct:identifier':  __filename,
    'dct:format':      'application/fua.load+js',
    'dct:title':       'load',
    'dct:alternative': '@nrd/fua.resource.ontology.ids/ids3cm',
    'dct:requires':    [{
        'dct:identifier': '../../data/ids3cm/ids3cm.ttl',
        'dct:format':     'text/turtle'
    }]
};
