import React, { useEffect, useState } from "react";
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
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});

    useEffect(() => {
        const mainColor = getCSSVariable("--bs-primary");
        const pregressionColor = getCSSVariable("--bs-secondary");

        const newOptions: ApexOptions = {
            chart: {
                type: "line",
                height: 400,
                zoom: {
                    enabled: false,
                },
                animations: {
                    enabled: false,
                },
            },
            colors: [mainColor, pregressionColor],
            markers: {
                size: [7, 0],
            },
            stroke: {
                width: [4, 2],
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
        setChartOptions(newOptions);
    }, [real]);

    const series = [
        {
            name: "Overview Median Reviews",
            data: real,
        },
    ];

    if (trend !== null) {
        series.push({
            name: "Regression",
            data: trend,
        });
    }

    return (
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={400}
        />
    );
}
