import React from "react";
import { getSpecificRevenue } from "../models/overview";
import { NumberFormatter } from "../utils/number_formatter";
import { IGenericOverview } from "../models/generic_overview";

interface OverviewTableProps {
    data: IGenericOverview[];
}

export function OverviewTable({ data }: OverviewTableProps) {
    return (
        <small>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        {data.map((item, index) => (
                            <th key={index}>{item.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Games Released</td>
                        {data.map((item, index) => (
                            <td key={index}>{item.overview.total_games}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Median Reviews</td>
                        {data.map((item, index) => (
                            <td key={index}>{item.overview.median_reviews}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Median Owners</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                <NumberFormatter
                                    value={item.overview.median_owners}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Max Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                $
                                <NumberFormatter
                                    value={getSpecificRevenue(item.overview, 1)}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Q3 Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                $
                                <NumberFormatter
                                    value={getSpecificRevenue(
                                        item.overview,
                                        0.75
                                    )}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Median Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                $
                                <NumberFormatter
                                    value={getSpecificRevenue(
                                        item.overview,
                                        0.5
                                    )}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Q1 Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                $
                                <NumberFormatter
                                    value={getSpecificRevenue(
                                        item.overview,
                                        0.25
                                    )}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Min Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                $
                                <NumberFormatter
                                    value={getSpecificRevenue(item.overview, 0)}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </small>
    );
}
