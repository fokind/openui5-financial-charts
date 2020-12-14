sap.ui.define(["../SeriesItem", "../library"], function (SeriesItem) {
    "use strict";

    return SeriesItem.extend(
        "openui5.financial.chart.custom.RoundtripChartItem",
        {
            metadata: {
                properties: {
                    begin: "string",
                    end: "string",
                    openPrice: "float",
                    closePrice: "float",
                },
            },

            setBegin: function (fValue) {
                this.setProperty("begin", fValue, true);
            },

            setEnd: function (fValue) {
                this.setProperty("end", fValue, true);
            },

            setOpenPrice: function (fValue) {
                this.setProperty("openPrice", fValue, true);
            },

            setClosePrice: function (fValue) {
                this.setProperty("closePrice", fValue, true);
            },

            _getMin: function () {
                return Math.min(this.getOpenPrice(), this.getClosePrice());
            },

            _getMax: function () {
                return Math.max(this.getOpenPrice(), this.getClosePrice());
            },
        }
    );
});
