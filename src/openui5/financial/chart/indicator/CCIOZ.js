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

        return Series.extend("openui5.financial.chart.indicator.CCIOZ", {
            metadata: {
                properties: {
                    overboughtZone: "float",
                    oversoldZone: "float",
                },
            },

            renderer: {},

            _draw: function () {
                Series.prototype._draw.apply(this);

                var oParent = this.getParent();
                var aItems = this.getItems();
                if (aItems.length < 1) return;

                var timeScale = oParent.getAggregation("_timeAxis")._scale;
                var valueScale = oParent.getAggregation("_valueAxis")._scale;

                var series = d3.select("#" + this.getId());

                // подготовка переменных
                var fCandleBodyWidth = 0.8; // TODO заменить на ось категорий
                var fTickWidth = this._getTickWidth();

                var fOverboughtZone = this.getOverboughtZone();
                var fOversoldZone = this.getOversoldZone();

                var candles = series
                    .selectAll()
                    .data(aItems)
                    .enter()
                    .append("g")
                    .classed("fcBullish", function (e) {
                        return e.getValue() > fOverboughtZone;
                    })
                    .classed("fcBearish", function (e) {
                        return e.getValue() < fOversoldZone;
                    })
                    .classed("fcNone", function (e) {
                        return (
                            e.getValue() >= fOversoldZone &&
                            e.getValue() <= fOverboughtZone
                        );
                    });

                // тело свечи
                candles
                    .append("rect")
                    .classed("fcCandleBody", true)
                    .attr("x", function (e) {
                        return (
                            timeScale(moment(e.getTime()).toDate()) +
                            ((1 - fCandleBodyWidth) * fTickWidth) / 2
                        );
                    })
                    .attr("y", function (e) {
                        return valueScale(Math.max(e.getValue(), 0));
                    })
                    .attr("height", function (e) {
                        return Math.max(
                            1,
                            valueScale(Math.min(e.getValue(), 0)) -
                                valueScale(Math.max(e.getValue(), 0))
                        );
                    })
                    .attr("width", fCandleBodyWidth * fTickWidth);
            },
        });
    }
);
