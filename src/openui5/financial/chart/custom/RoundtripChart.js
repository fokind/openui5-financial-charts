/* global d3 moment */

sap.ui.define(
    [
        "../Series",
        "../library",
        "../thirdparty/d3",
        "../thirdparty/moment-with-locales",
    ],
    function (Series) {
        "use strict";

        return Series.extend("openui5.financial.chart.custom.RoundtripChart", {
            metadata: {
                aggregations: {
                    items: {
                        type:
                            "openui5.financial.chart.custom.RoundtripChartItem",
                        multiple: true,
                    },
                },
            },

            renderer: {},

            _draw: function () {
                Series.prototype._draw.apply(this);

                var oParent = this.getParent();
                var aItems = this.getItems();

                var timeScale = oParent.getAggregation("_timeAxis")._scale;
                var valueScale = oParent.getAggregation("_valueAxis")._scale;

                var path0 = d3.path();
                var path1 = d3.path();

                var first = aItems[0];
                var begin = moment.utc(first.getBegin()).toDate();

                path0.moveTo(
                    timeScale(begin),
                    valueScale(first.getOpenPrice())
                );

                path0.lineTo(
                    timeScale(moment.utc(first.getEnd()).toDate()),
                    valueScale(first.getClosePrice())
                );
                aItems.slice(1).forEach(function (e) {
                    path0.moveTo(
                        timeScale(moment.utc(e.getBegin()).toDate()),
                        valueScale(e.getOpenPrice())
                    );
                    path0.lineTo(
                        timeScale(moment.utc(e.getEnd()).toDate()),
                        valueScale(e.getClosePrice())
                    );
                });

                path1.moveTo(
                    timeScale(moment.utc(first.getEnd()).toDate()),
                    valueScale(first.getClosePrice())
                );
                aItems.slice(1).forEach(function (e) {
                    path1.lineTo(
                        timeScale(moment.utc(e.getBegin()).toDate()),
                        valueScale(e.getOpenPrice())
                    );
                    path1.moveTo(
                        timeScale(moment.utc(e.getEnd()).toDate()),
                        valueScale(e.getClosePrice())
                    );
                });

                var series = d3.select("#" + this.getId());

                series
                    .append("path")
                    .attr("fill", "none")
                    .attr("stroke", "green")
                    .attr("d", path0.toString());

                series
                    .append("path")
                    .attr("fill", "none")
                    .attr("stroke", "red")
                    .attr("d", path1.toString());
            },
        });
    }
);
