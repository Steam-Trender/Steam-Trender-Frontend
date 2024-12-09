import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ITagOverview } from "../models/tag_overview";
import { ApexOptions } from "apexcharts";
import { getSpecificRevenue } from "../models/overview";
import { getCSSVariable } from "../utils/get_css";

interface ChartProps {
    data: ITagOverview[];
    height: number;
}

export function CombinedChart({ data, height }: ChartProps) {
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const categories = data.map((item) => item.tag.title);
    const totalGames = data.map((item) => item.overview.total_games);
    const medianRevenues = data.map((item) =>
        getSpecificRevenue(item.overview, 0.5)
    );

    useEffect(() => {
        const textColor = getCSSVariable("--bs-body-color");
        const upperColor = getCSSVariable("--bs-primary");
        const lowerColor = getCSSVariable("--bs-secondary");

        const newOptions: ApexOptions = {
            chart: {
                type: "line",
                height: 500,
                zoom: {
                    enabled: false,
                },
                animations: {
                    enabled: false,
                },
                fontFamily: "Roboto, sans-serif",
            },
            stroke: {
                width: [0, 4],
            },
            colors: [lowerColor, upperColor],
            xaxis: {
                categories,
                labels: {
                    rotate: -90,
                    rotateAlways: true,
                    style: {
                        fontSize: "12px",
                        colors: [textColor || "#000"],
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: [
                {
                    crosshairs: {
                        show: false,
                    },
                    min: 0,
                    max: 2000,
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        style: {
                            fontSize: "12px",
                            colors: [textColor || "#000"],
                        },
                    },
                },
                {
                    min: 0,
                    max: 200000,
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        formatter: (value) => {
                            if (value === 0) return "$0";
                            return `$${value.toLocaleString()}`;
                        },
                        style: {
                            fontSize: "12px",
                        },
                    },
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y, { seriesIndex }) {
                        if (typeof y !== "undefined") {
                            if (seriesIndex === 1) {
                                return `$${y.toLocaleString()}`;
                            }
                            return `${y.toFixed(0)}`;
                        }
                        return y;
                    },
                },
            },
            legend: {
                position: "top",
            },
        };
        setChartOptions(newOptions);
    }, [data]);

    const series = [
        {
            name: "Total Games",
            type: "column",
            data: totalGames,
        },
        {
            name: "Median Revenue",
            type: "line",
            data: medianRevenues,
        },
    ];

    return (
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={height}
        />
    );
}

export default CombinedChart;
