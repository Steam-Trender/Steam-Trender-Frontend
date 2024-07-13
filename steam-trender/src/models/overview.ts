import { IRevenue } from "./revenue";

export interface IOverview {
    total_games: number;
    median_reviews: number;
    median_owners: number;
    median_price: number;
    revenue: [IRevenue];
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
