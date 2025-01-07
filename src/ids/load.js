module.exports = {
  '@context': 'fua.load.rdf',
  'dct:identifier': __filename,
  'dct:format': 'application/fua.load+js',
  'dct:title': 'load',
  'dct:alternative': '@fua/resource.ontology.ids/ids',
  'dct:requires': [{
    'dct:identifier': '../../data/ids/ids.ttl',
    'dct:format': 'text/turtle'
  }]
};
