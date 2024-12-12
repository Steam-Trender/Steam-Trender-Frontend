import { IExtendedTag } from "./extended_tag";
import { IRevenue } from "./revenue";

export interface IOverview {
    total_games: number;
    median_reviews: number;
    median_owners: number;
    median_price: number;
    revenue_total: number;
    revenue: [IRevenue];
    related_tags: [IExtendedTag];
}

export const getSpecificRevenue = (
    overview: IOverview,
    aggValue: number
): number => {
    const revenue = overview.revenue.find(
        (revenue) => revenue.agg === aggValue
    );
    return revenue ? revenue.value : 0;
};
