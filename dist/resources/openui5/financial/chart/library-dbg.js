sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.financial.chart",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.financial.chart.Candle",
      "openui5.financial.chart.CandlestickChart",
      "openui5.financial.chart.Chart",
      "openui5.financial.chart.LineChart",
      "openui5.financial.chart.LineChartItem",
      "openui5.financial.chart.Series",
      "openui5.financial.chart.SeriesItem",
      "openui5.financial.chart.SteppedLineChart",
      "openui5.financial.chart.TimeAxis",
      "openui5.financial.chart.ValueAxis",
      "openui5.financial.chart.indicator.CCI",
      "openui5.financial.chart.indicator.CCIOZ",
      "openui5.financial.chart.indicator.MACD",
      "openui5.financial.chart.indicator.MACDItem"
    ],
    elements: [],
    noLibraryCSS: false,
    version: "1.0.5-beta"
  });

  return openui5.financial.chart;
});
