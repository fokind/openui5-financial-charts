sap.ui.define(["../SeriesItem","../library"],function(t){"use strict";return t.extend("openui5.financial.chart.indicator.MACDItem",{metadata:{properties:{macd:"float",trigger:"float",histogram:"float"}},setMacd:function(t){this.setProperty("macd",t,true)},setTrigger:function(t){this.setProperty("trigger",t,true)},setHistogram:function(t){this.setProperty("histogram",t,true)},_getMin:function(){return Math.min(this.getMacd(),this.getTrigger(),this.getHistogram())},_getMax:function(){return Math.max(this.getMacd(),this.getTrigger(),this.getHistogram())}})});