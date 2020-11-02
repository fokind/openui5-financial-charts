/* global d3 moment */

sap.ui.define(
    [
        "./Series",
        "./library",
        "./thirdparty/d3",
        "./thirdparty/moment-with-locales",
    ],
    function (Series) {
        "use strict";

        return Series.extend("openui5.financial.chart.CandlestickChart", {
            metadata: {
                aggregations: {
                    items: {
                        type: "openui5.financial.chart.Candle",
                        multiple: true,
                    },
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

                // область отображения данных
                var candles = series
                    .selectAll()
                    .data(aItems)
                    .enter()
                    .append("g")
                    .classed("fcBullish", function (e) {
                        return e.getClose() >= e.getOpen();
                    })
                    .classed("fcBearish", function (e) {
                        return e.getClose() < e.getOpen();
                    });

                // тень свечи
                candles
                    .append("line")
                    .classed("fcCandleShadow", true)
                    .attr("x1", function (e) {
                        return (
                            timeScale(moment(e.getTime()).toDate()) +
                            fTickWidth / 2
                        );
                    })
                    .attr("x2", function (e) {
                        return (
                            timeScale(moment(e.getTime()).toDate()) +
                            fTickWidth / 2
                        );
                    })
                    .attr("y1", function (e) {
                        return valueScale(e.getHigh());
                    })
                    .attr("y2", function (e) {
                        return valueScale(e.getLow());
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
                        return valueScale(Math.max(e.getOpen(), e.getClose()));
                    })
                    .attr("height", function (e) {
                        return Math.max(
                            1,
                            valueScale(Math.min(e.getOpen(), e.getClose())) -
                                valueScale(Math.max(e.getOpen(), e.getClose()))
                        );
                    })
                    .attr("width", fCandleBodyWidth * fTickWidth);
            },
        });
    }
);
