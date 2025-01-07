const
  { describe, test } = require('mocha'),
  expect = require('expect'),
  { loadDataFiles } = require('@fua/module.rdf'),
  { Dataset } = require('@fua/module.persistence'),
  res_data = require('../src/load.js');

describe('resource.ontology.ids', function () {

  this.timeout('30s');

  test('should load resource with rdf-module', async function () {
    const dataFiles = await loadDataFiles(res_data);
    expect(dataFiles.length).toBeGreaterThan(0);

    const dataData = new Dataset();
    dataFiles
      .map(({ dataset }) => dataset)
      .filter(dataset => dataset)
      .forEach(dataset => dataData.add(dataset));
    expect(dataData.size).toBeGreaterThan(0);

    console.log('quads:', dataData.size);
  });

});
