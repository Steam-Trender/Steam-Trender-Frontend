import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getCSSVariable } from "../utils/get_css";

interface ChartProps {
    categories: string[];
    yaxis_title: string;
    real: number[];
    trend: number[] | null;
    money: boolean;
}

export function RegressionPlot({
    categories,
    real,
    trend,
    yaxis_title,
    money,
}: ChartProps) {
    const mainColor = getCSSVariable("--bs-primary");
    const regressionColor = getCSSVariable("--bs-secondary");

    const chartOptions: ApexOptions = {
        chart: {
            type: "line",
            height: 400,
            zoom: {
                enabled: false,
            },
            animations: {
                enabled: false,
            },
            fontFamily: "Roboto, sans-serif",
        },
        colors: [mainColor, regressionColor],
        markers: {
            size: [7, 0],
        },
        stroke: {
            width: [4, 2],
            dashArray: [0, 5],
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: yaxis_title,
            },
            min: 0,
            labels: {
                formatter: (value) => {
                    if (money) return `$${value.toLocaleString()}`;
                    return value.toLocaleString();
                },
                style: {
                    fontSize: "12px",
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    const series = [
        {
            name: "Fact",
            data: real,
        },
        ...(trend ? [{ name: "Trend", data: trend }] : []),
    ];

    return (
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={400}
        />
    );
}
