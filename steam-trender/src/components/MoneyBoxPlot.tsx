import React from "react";
import { getSpecificRevenue } from "../models/overview";
import { getCSSVariable } from "../utils/get_css";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IGenericOverview } from "../models/generic_overview";

interface MoneyBoxProps {
    data: IGenericOverview[];
    lockedRotation: boolean;
    initialRotate: number;
    height: number;
}

export function MoneyBoxPlot({
    data,
    lockedRotation,
    initialRotate,
    height,
}: MoneyBoxProps) {
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

    const textColor = getCSSVariable("--bs-body-color");
    const upperColor = getCSSVariable("--bs-primary");
    const lowerColor = getCSSVariable("--bs-secondary");

    const chartOptions: ApexOptions = {
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
            min: 1,
            max: 10,
            labels: {
                formatter: (value) => {
                    if (value === 0) return "$0";
                    return `$${Math.pow(10, value).toLocaleString()}`;
                },
                style: {
                    fontSize: "12px",
                    colors: [textColor || "#000"],
                },
            },
            crosshairs: {
                show: false,
            },
        },
        xaxis: {
            labels: {
                rotate: initialRotate,
                rotateAlways: lockedRotation,
                style: {
                    fontSize: "12px",
                    colors: [textColor || "#000"],
                },
            },
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
                const q1 = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                const median =
                    w.globals.seriesCandleM[seriesIndex][dataPointIndex];
                const q3 = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                const maximum =
                    w.globals.seriesCandleC[seriesIndex][dataPointIndex];

                return `
                <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot" style="font-size: 12px; padding: 0px;">
                    <div class="py-1 px-3">
                        <div class="row mb-2">
                            <span>Max: <b>$${Math.pow(10, maximum).toLocaleString()}</b></span>
                        </div>
                        <div class="row mb-2">
                            <span>Q3: <b>$${Math.pow(10, q3).toLocaleString()}</b></span>
                        </div>
                        <div class="row mb-2">
                            <span>Median: <b>$${Math.pow(10, median).toLocaleString()}</b></span>
                        </div>
                        <div class="row mb-2">
                            <span>Q1: <b>$${Math.pow(10, q1).toLocaleString()}</b></span>
                        </div>
                        <div class="row">
                            <span>Min: <b>$${Math.pow(10, minimum).toLocaleString()}</b></span>
                        </div>
                    </div>
                    <div class="apexcharts-tooltip-title" style="font-size: 12px; margin: 0px">${data[dataPointIndex].title}</div>
                </div>`;
            },
        },
    };

    return (
        <>
            <ReactApexChart
                options={chartOptions}
                series={processBoxplotData(data)}
                type="boxPlot"
                height={height}
            />
        </>
    );
}
