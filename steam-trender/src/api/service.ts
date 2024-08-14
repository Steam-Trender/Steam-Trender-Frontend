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

type Params = {
    [key: string]: any;
};

class ApiService {
    static async fetchStatus(): Promise<IStatus> {
        try {
            const response = await API.get<IStatus>("/health");
            return response.data;
        } catch (error) {
            return {
                status: "offline",
                update: {
                    id: 0,
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

    static async fetchCompetitorOverview(
        min_reviews: string,
        max_reviews: string,
        reviews_coeff: string,
        minYear: Date | string | null,
        maxYear: Date | string | null,
        selectedTags: number[],
        bannedTags: number[]
    ): Promise<ICompetitors> {
        if (minYear !== null) {
            minYear = format(minYear, "yyyy-MM-dd");
        }
        if (maxYear !== null) {
            maxYear = format(maxYear, "yyyy-MM-dd");
        }
        try {
            const addParamIfNotEmpty = (
                params: Params,
                key: string,
                value: any
            ) => {
                if (value !== "" && value !== undefined && value !== null) {
                    params[key] = value;
                }
            };

            const getParams = () => {
                const params: any = {
                    whitelist_tag_ids: selectedTags,
                    blacklist_tag_ids: bannedTags,
                };

                addParamIfNotEmpty(params, "reviews_coeff", reviews_coeff);
                addParamIfNotEmpty(params, "min_reviews", min_reviews);
                addParamIfNotEmpty(params, "max_reviews", max_reviews);
                addParamIfNotEmpty(params, "min_date", minYear);
                addParamIfNotEmpty(params, "max_date", maxYear);

                return params;
            };

            const response = await API.get<ICompetitors>(
                "/analyze/competitors",
                {
                    params: getParams(),
                    paramsSerializer: (params) =>
                        qs.stringify(params, { arrayFormat: "repeat" }),
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data from API");
        }
    }

    static async fetchTagsOverview(
        reviews_coeff: string,
        min_reviews: string,
        minYear: number,
        maxYear: number,
        selectedTags: number[]
    ): Promise<ITagOverview[]> {
        if (min_reviews === "") {
            min_reviews = "0";
        }
        if (reviews_coeff === "") {
            reviews_coeff = "30";
        }
        try {
            const response = await API.get<ITagOverview[]>("/analyze/tags", {
                params: {
                    min_year: minYear,
                    max_year: maxYear,
                    tag_ids: selectedTags,
                    min_reviews: min_reviews,
                    reviews_coeff: reviews_coeff,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data from API");
        }
    }

    static async fetchTrendsOverview(
        min_reviews: string,
        year: number,
        selectedTags: number[]
    ): Promise<IYearOverview[]> {
        try {
            const response = await API.get<IYearOverview[]>("/analyze/trends", {
                params: {
                    min_year: year - 5,
                    max_year: year,
                    tag_ids: selectedTags,
                    min_reviews: min_reviews,
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
