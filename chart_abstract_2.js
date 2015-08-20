/*
 * Copyright (c) 2015 Dfuzr Industries. All Rights Reserved.
 *
 * Created for D3 and Visualization Meetup 08.20.2015
 *
 * Encapsulated chart class 2 - uses custom config options
 */

//Self executing function, encapsulated component to avoid var collision
var _chart_2 = _chart_2 || (function() {

  //Init abstract bar
  var _abstract = new abstract_bar();

  //Init svg element WITH config to override defaults
  var svg = _abstract.initSvgEl({
    area: {
      margin: {
        top: 10,
        bottom: 50
      },
      height: 300,
      width: 600
    }
  });

  //Declare data keys for parsing
  //NOTE: These are CUSTOM/DIFFERENT keys
  var dataKeys = {
    x: 'somestring',
    y: 'somefloat'
  };

  //TODO: We could abstract data retrieval too and pass a data obj before initializing
  //NOTE: We are using a CUSTOM/DIFFERENT data file here
  d3.tsv('data_2.tsv', _.bind(_abstract.type, this, dataKeys.y), function(error, data) {
    if (error) throw error;
    var xAxisEl = _abstract.getXAxisEl(data, dataKeys.x);
    var yAxisEl = _abstract.getYAxisEl(data, dataKeys.y);
    var bars = _abstract.getBars(data, dataKeys);
  });

})();
