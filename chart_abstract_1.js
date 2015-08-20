/*
 * Copyright (c) 2015 Dfuzr Industries. All Rights Reserved.
 *
 * Created for D3 and Visualization Meetup 08.20.2015
 *
 * Encapsulated chart class 1 - uses default configs
 */

//Self executing function, encapsulated component to avoid var collision
var _chart_1 = _chart_1 || (function() {

  //Init abstract bar
  var _abstract = new abstract_bar();

  //Init svg element WITHOUT config to use abstract defaults
  var svg = _abstract.initSvgEl();

  //Declare data keys for parsing
  //NOTE: These are the DEFAULT keys
  var dataKeys = {
    x: 'letter',
    y: 'frequency'
  };

  //TODO: We could abstract data retrieval too and pass a data obj before initializing
  //NOTE: We are using the DEFAULT data file here
  d3.tsv('data.tsv', _.bind(_abstract.type, this, dataKeys.y), function(error, data) {
    if (error) throw error;
    var xAxisEl = _abstract.getXAxisEl(data, dataKeys.x);
    var yAxisEl = _abstract.getYAxisEl(data, dataKeys.y);
    var bars = _abstract.getBars(data, dataKeys);
  });

})();