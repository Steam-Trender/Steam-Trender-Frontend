import qs from "qs";
import { ICompetitors } from "../models/competitors";
import { ITag } from "../models/tag";
import API from "./api";
import { IYears } from "../models/years";
import { IPost } from "../models/post";
import { ITagOverview } from "../models/tag_overview";
import { IYearOverview } from "../models/year_overview";

class ApiService {
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
            return { min_year: 2010, max_year: 2024 };
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
        reviews_coeff: string,
        minYear: number,
        maxYear: number,
        selectedTags: number[],
        bannedTags: number[]
    ): Promise<ICompetitors> {
        if (min_reviews === "") {
            min_reviews = "0";
        }
        if (reviews_coeff === "") {
            reviews_coeff = "30";
        }
        try {
            const response = await API.get<ICompetitors>(
                "/analyze/competitors",
                {
                    params: {
                        min_year: minYear,
                        max_year: maxYear,
                        whitelist_tag_ids: selectedTags,
                        blacklist_tag_ids: bannedTags,
                        reviews_coeff: reviews_coeff,
                        min_reviews: min_reviews,
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
