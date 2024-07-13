import { makeAutoObservable } from "mobx";
import ApiService from "../api/service";
import { IYears } from "../models/years";

class YearStore {
    timeframe: IYears | null = null;
    hasFetched = false;

    constructor() {
        makeAutoObservable(this);
    }

    setYears(data: IYears) {
        this.timeframe = data;
        this.hasFetched = true;
    }

    async fetchYears() {
        if (!this.hasFetched) {
            try {
                const response = await ApiService.fetchYears();
                this.setYears(response);
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        }
    }

    getYears(descending: boolean): number[] {
        this.fetchYears();

        let years = [2020, 2021, 2022, 2023, 2024];

        if (this.timeframe === null) {
            return years;
        }

        years = Array.from(
            { length: this.timeframe.max_year - this.timeframe.min_year + 1 },
            (_, k) => {
                if (!this.timeframe) return 2077;
                return descending
                    ? this.timeframe.max_year - k
                    : this.timeframe.min_year + k;
            }
        ).filter((year) => year !== null);

        return years;
    }
}

export default new YearStore();
