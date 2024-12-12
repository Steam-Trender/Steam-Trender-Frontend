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
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr className="align-top">
                            <th scope="col"></th>
                            <th scope="col">Total Games</th>
                            <th scope="col">Median Reviews</th>
                            <th scope="col">Median Owners</th>
                            <th scope="col">Min Revenue</th>
                            <th scope="col">Q1 Revenue</th>
                            <th scope="col">Median Revenue</th>
                            <th scope="col">Q3 Revenue</th>
                            <th scope="col">Max Revenue</th>
                            <th scope="col">Total Revenue</th>
                            <th scope="col">Associated Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .slice()
                            .reverse()
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <b>{item.title}</b>
                                    </td>
                                    <td>
                                        <NumberFormatter
                                            value={item.overview.total_games}
                                        />
                                    </td>
                                    <td>
                                        <NumberFormatter
                                            value={item.overview.median_reviews}
                                        />
                                    </td>
                                    <td>
                                        <NumberFormatter
                                            value={item.overview.median_owners}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={getSpecificRevenue(
                                                item.overview,
                                                0
                                            )}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={getSpecificRevenue(
                                                item.overview,
                                                0.25
                                            )}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={getSpecificRevenue(
                                                item.overview,
                                                0.5
                                            )}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={getSpecificRevenue(
                                                item.overview,
                                                0.75
                                            )}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={getSpecificRevenue(
                                                item.overview,
                                                1
                                            )}
                                        />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter
                                            value={item.overview.revenue_total}
                                        />
                                    </td>
                                    <td>
                                        {item.overview.related_tags
                                            .map((tag) => `${tag.title} (${tag.games_count})`)
                                            .join(", ")}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </small>
    );
}
