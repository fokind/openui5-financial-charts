sap.ui.define(["../Series","../library","../thirdparty/d3","../thirdparty/moment-with-locales"],function(e){"use strict";return e.extend("openui5.financial.chart.indicator.CCIOZ",{metadata:{properties:{overboughtZone:"float",oversoldZone:"float"}},renderer:{},_draw:function(){var t=this;e.prototype._draw.apply(t);var a=t.getParent();var r=a.getAggregation("_timeAxis");var i=r.getStart();var n=r.getEnd();var o=t.getItems().filter(e=>moment(e.getTime()).isBetween(i,n,"m","[]"));var l=r._scale;var g=a.getAggregation("_valueAxis")._scale;var s=d3.select("#"+t.getId());var d=.8;var m=l(moment(moment(i).toDate()).add(+a.getTimeframe(),"m").toDate());var c=t.getOverboughtZone();var v=t.getOversoldZone();var u=s.selectAll().data(o).enter().filter(e=>moment(e.getTime()).isBetween(i,n,"m","[]")).append("g").classed("fcBullish",e=>e.getValue()>c).classed("fcBearish",e=>e.getValue()<v).classed("fcNone",e=>e.getValue()>=v&&e.getValue()<=c);u.append("rect").classed("fcCandleBody",true).attr("x",e=>l(moment(e.getTime()).toDate())+(1-d)*m/2).attr("y",e=>g(Math.max(e.getValue(),0))).attr("height",e=>Math.max(1,g(Math.min(e.getValue(),0))-g(Math.max(e.getValue(),0)))).attr("width",d*m)}})});