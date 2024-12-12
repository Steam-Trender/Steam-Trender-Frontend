import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getCSSVariable } from "../utils/get_css";

interface ChartProps {
    categories: string[];
    yaxis_title: string;
    real: number[];
    money: boolean;
}

export function BarPlot({ categories, real, yaxis_title, money }: ChartProps) {
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});

    useEffect(() => {
        const mainColor = getCSSVariable("--bs-primary");
        const pregressionColor = getCSSVariable("--bs-secondary");

        const newOptions: ApexOptions = {
            chart: {
                type: "bar",
                height: 400,
                zoom: {
                    enabled: false,
                },
                animations: {
                    enabled: false,
                },
                fontFamily: "Roboto, sans-serif",
            },
            colors: [mainColor, pregressionColor],
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
            name: yaxis_title,
            data: real,
        },
    ];

    return (
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={400}
        />
    );
}
