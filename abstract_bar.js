/*
 * Copyright (c) 2015 Dfuzr Industries. All Rights Reserved.
 *
 * Created for D3 and Visualization Meetup 08.20.2015
 *
 * Abstract bar class for reusable bar chart
 *
 * NOTES:
 * - For the purpose of this simple demo we are not using require.js or other...
 *   assume d3 and lodash are available because we loaded them in index.html.
 *
 * WHAT CAN WE DO FROM HERE:
 * - Abstract styles to css and apply all in one declaration
 * - Abstract data parsing
 * - Consider using non-d3 iterators for appending things like bars
 */

var abstract_bar = function (){
  return {
    area: {
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      width: 960,
      height: 500
    },
    vizWidth: 0,
    vizHeight: 0,
    x: null,
    y: null,
    xAxis: null,
    yAxis: null,

    initSvgEl: function(config) {
      var area = this.area;
      if (config && config.area) {
        _.merge(this.area, config.area);
      }

      this.vizWidth = area.width - area.margin.left - area.margin.right;
      this.vizHeight = area.height - area.margin.top - area.margin.bottom;

      this.svg = d3.select('body').append('svg')
        .attr('width', area.width)
        .attr('height', area.height)
      .append('g')
        .attr('transform', 'translate(' + area.margin.left + ',' + area.margin.top + ')');

      return this.svg;
    },

    getXScale: function() {
      if (!this.x) {
        this.x = d3.scale.ordinal()
          .rangeRoundBands([0, this.vizWidth], .1);
      }
      return this.x;
    },

    getYScale: function() {
      if (!this.y) {
        this.y = d3.scale.linear()
          .range([this.vizHeight, 0]);
      }
      return this.y;
    },

    getXAxis: function(orient) {
      if (!this.xAxis) {
        this.xAxis = d3.svg.axis()
          .scale(this.getXScale())
          .orient(orient || 'bottom');
      }
      return this.xAxis;
    },

    getYAxis: function(orient) {
      if (!this.yAxis) {
        this.yAxis = d3.svg.axis()
          .scale(this.getYScale())
          .orient(orient || 'left')
          .ticks(10, '%');
      }
      return this.yAxis;
    },

    getXAxisEl: function(data, key) {
      this.getXScale().domain(data.map(function(d) { return d[key]; }));
      return this.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.vizHeight + ')')
        .call(this.getXAxis());
    },

    getYAxisEl: function(data, key) {
      this.getYScale().domain([0, d3.max(data, function(d) { return d[key]; })]);
      return this.svg.append('g')
        .attr('class', 'y axis')
        .call(this.getYAxis())
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(key.toUpperCase());
    },

    getBars: function(data, keys) {
      var h = this.vizHeight,
          x = this.getXScale(),
          y = this.getYScale();

      return this.svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d[keys.x]); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d[keys.y]); })
        .attr('height', function(d) { return h - y(d[keys.y]); });
    },

    type: function(key, d) {
      d[key] = +d[key];
      return d;
    }
  }
};