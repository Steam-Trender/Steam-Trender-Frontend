import qs from "qs";
import { ICompetitors } from "../models/competitors";
import { ITag } from "../models/tag";
import API from "./api";
import { IYears } from "../models/years";

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

    static async fetchCompetitorOverview(
        minYear: number,
        maxYear: number,
        selectedTags: number[],
        bannedTags: number[]
    ): Promise<ICompetitors> {
        try {
            const response = await API.get<ICompetitors>(
                "/analyze/competitors",
                {
                    params: {
                        min_year: minYear,
                        max_year: maxYear,
                        whitelist_tag_ids: selectedTags,
                        blacklist_tag_ids: bannedTags,
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
}

export default ApiService;
