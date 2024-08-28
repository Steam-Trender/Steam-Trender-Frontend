import React, { useEffect, useState } from "react";
import { getSpecificRevenue } from "../models/overview";
import { getCSSVariable } from "../utils/get_css";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IGenericOverview } from "../models/generic_overview";

interface MoneyBoxProps {
    data: IGenericOverview[];
}

export function MoneyBoxPlot({ data }: MoneyBoxProps) {
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});

    const processBoxplotData = (data: IGenericOverview[]) => {
        const seriesData = data.map((item) => ({
            x: item.title,
            y: [
                getSpecificRevenue(item.overview, 0),
                getSpecificRevenue(item.overview, 0.25),
                getSpecificRevenue(item.overview, 0.5),
                getSpecificRevenue(item.overview, 0.75),
                getSpecificRevenue(item.overview, 1),
            ]
                .filter((value) => value !== undefined)
                .map((value) => Math.log10(value)),
        }));

        return [{ data: seriesData }];
    };

    useEffect(() => {
        const upperColor = getCSSVariable("--bs-primary");
        const lowerColor = getCSSVariable("--bs-secondary");

        const newOptions: ApexOptions = {
            chart: {
                type: "boxPlot",
                height: 500,
                animations: {
                    enabled: false,
                },
                zoom: {
                    enabled: false,
                },
                fontFamily: "Roboto, sans-serif",
            },
            yaxis: {
                min: 2,
                max: 10,
                labels: {
                    formatter: (value) => {
                        if (value === 0) return "$0";
                        return `$${Math.pow(10, value).toLocaleString()}`;
                    },
                    style: {
                        fontSize: "12px",
                    },
                },
                crosshairs: {
                    show: false,
                },
            },
            xaxis: {
                tooltip: {
                    enabled: false,
                },
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: upperColor || "#000",
                        lower: lowerColor || "#000",
                    },
                },
            },
            tooltip: {
                shared: false,
                enabled: true,
                intersect: false,
                custom: function ({ seriesIndex, dataPointIndex, w }) {
                    const minimum =
                        w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                    const q1 =
                        w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                    const median =
                        w.globals.seriesCandleM[seriesIndex][dataPointIndex];
                    const q3 =
                        w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                    const maximum =
                        w.globals.seriesCandleC[seriesIndex][dataPointIndex];

                    return `
                <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot">
                    <div>Minimum: <span class="value">$${Math.pow(10, minimum).toLocaleString()}</span></div>
                    <div>Q1: <span class="value">$${Math.pow(10, q1).toLocaleString()}</span></div>
                    <div>Median: <span class="value">$${Math.pow(10, median).toLocaleString()}</span></div>
                    <div>Q3: <span class="value">$${Math.pow(10, q3).toLocaleString()}</span></div>
                    <div>Maximum: <span class="value">$${Math.pow(10, maximum).toLocaleString()}</span></div>
                    <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${data[dataPointIndex].title}</div>
                </div>`;
                },
            },
        };
        setChartOptions(newOptions);
    }, [data]);

    return (
        <>
            <ReactApexChart
                options={chartOptions}
                series={processBoxplotData(data)}
                type="boxPlot"
                height={400}
            />
        </>
    );
}
