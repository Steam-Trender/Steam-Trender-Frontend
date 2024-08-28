import qs from "qs";
import { ICompetitors } from "../models/competitors";
import { ITag } from "../models/tag";
import API from "./api";
import { IYears } from "../models/years";
import { IPost } from "../models/post";
import { ITagOverview } from "../models/tag_overview";
import { IYearOverview } from "../models/year_overview";
import { IStatus } from "../models/status";
import { format } from "date-fns";

interface FetchCompetitorsOverviewParams {
    reviewsCoeff: string;
    minReviews: string;
    maxReviews: string;
    minDate: Date | string | null;
    maxDate: Date | string | null;
    includedTags: number[];
    excludedTags: number[];
}

interface FetchTagsOverviewParams {
    reviewsCoeff: string;
    minReviews: string;
    minYear: number;
    maxYear: number;
    selectedTags: number[];
}

interface FetchTrendsOverviewParams {
    minReviews: string;
    pivotYear: number;
    selectedTagIds: number[];
}

class ApiService {
    static async fetchStatus(): Promise<IStatus> {
        try {
            const response = await API.get<IStatus>("/health");
            return response.data;
        } catch (error) {
            return {
                status: "offline",
                update: {
                    date: "2024-01-01",
                },
            };
        }
    }

    static async fetchTags(): Promise<[ITag]> {
        try {
            const response = await API.get<[ITag]>("/tags");
            return response.data;
        } catch (error) {
            return [{ title: "FPS", id: 1 }];
        }
    }

    static async fetchYears(): Promise<IYears> {
        try {
            const response = await API.get<IYears>("/years");
            return response.data;
        } catch (error) {
            return { min_year: 2017, max_year: 2024 };
        }
    }

    static async fetchPosts(): Promise<IPost[]> {
        try {
            const response = await API.get<[IPost]>("/posts", {
                params: {
                    blog_url: "https://teletype.in/@sadari",
                    category: "",
                },
            });
            return response.data;
        } catch (error) {
            return [];
        }
    }

    static async fetchCompetitorsOverview({
        reviewsCoeff,
        minReviews,
        maxReviews,
        minDate,
        maxDate,
        includedTags,
        excludedTags,
    }: FetchCompetitorsOverviewParams): Promise<ICompetitors> {
        if (minDate === null) {
            minDate = "2020-01-01";
        }
        minDate = format(minDate, "yyyy-MM-dd");
        if (maxDate === null) {
            maxDate = "2024-31-12";
        }
        maxDate = format(maxDate, "yyyy-MM-dd");
        if (minReviews === "") {
            minReviews = "10";
        }
        if (maxReviews === "") {
            maxReviews = "-1";
        }
        if (reviewsCoeff === "") {
            reviewsCoeff = "30";
        }
        try {
            const response = await API.get<ICompetitors>(
                "/analyze/competitors",
                {
                    params: {
                        reviews_coeff: reviewsCoeff,
                        min_reviews: minReviews,
                        max_reviews: maxReviews,
                        min_date: minDate,
                        max_date: maxDate,
                        whitelist_tag_ids: includedTags,
                        blacklist_tag_ids: excludedTags,
                    },
                    paramsSerializer: (params) =>
                        qs.stringify(params, { arrayFormat: "repeat" }),
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data from API");
        }
    }

    static async fetchTagsOverview({
        reviewsCoeff,
        minReviews,
        minYear,
        maxYear,
        selectedTags,
    }: FetchTagsOverviewParams): Promise<ITagOverview[]> {
        if (minReviews === "") {
            minReviews = "10";
        }
        if (reviewsCoeff === "") {
            reviewsCoeff = "30";
        }
        try {
            const response = await API.get<ITagOverview[]>("/analyze/tags", {
                params: {
                    min_year: minYear,
                    max_year: maxYear,
                    tag_ids: selectedTags,
                    min_reviews: minReviews,
                    reviews_coeff: reviewsCoeff,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data from API");
        }
    }

    static async fetchTrendsOverview({
        minReviews,
        pivotYear,
        selectedTagIds,
    }: FetchTrendsOverviewParams): Promise<IYearOverview[]> {
        if (minReviews === "") {
            minReviews = "10";
        }
        try {
            const response = await API.get<IYearOverview[]>("/analyze/trends", {
                params: {
                    min_year: pivotYear - 5,
                    max_year: pivotYear,
                    tag_ids: selectedTagIds,
                    min_reviews: minReviews,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data from API");
        }
    }
}

export default ApiService;
