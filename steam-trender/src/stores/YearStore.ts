import { makeAutoObservable } from "mobx";
import ApiService from "../api/service";
import { IYears } from "../models/years";

class YearStore {
    timeframe: IYears = { max_year: 2025, min_year: 2020 };
    years: number[] = [];
    hasFetched = false;

    constructor() {
        makeAutoObservable(this);
    }

    async setYears(data: IYears) {
        this.timeframe = data;
        this.hasFetched = true;
        this.years = Array.from(
            { length: this.timeframe.max_year - this.timeframe.min_year + 1 },
            (_, k) => this.timeframe.max_year - k
        );
    }

    async fetchYears() {
        if (!this.hasFetched) {
            try {
                const response = await ApiService.fetchYears();
                await this.setYears(response);
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        }
    }
}

export default new YearStore();
