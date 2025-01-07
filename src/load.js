module.exports = {
  '@context': 'fua.load.rdf',
  'dct:identifier': __filename,
  'dct:format': 'application/fua.load+js',
  'dct:title': 'load',
  'dct:alternative': '@fua/resource.ontology.ids',
  'dct:requires': [{
    'dct:identifier': './ids/load.js',
    'dct:format': 'application/fua.load+js'
  }, {
    'dct:identifier': './ids3cm/load.js',
    'dct:format': 'application/fua.load+js'
  }, {
    'dct:identifier': './ids3c-co/load.js',
    'dct:format': 'application/fua.load+js'
  }]
};
