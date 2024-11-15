import { makeAutoObservable, runInAction } from "mobx";
import { ICompetitors } from "../models/competitors";
import { RootStore } from "./RootStore";
import ApiService from "../api/service";

export class HomePageStore {
    rootStore: RootStore;

    trendingOverview: ICompetitors | null = null;
    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async fetchTrendingOverview() {
        runInAction(() => {
            this.isFetching = true;
            this.trendingOverview = null;
        });

        try {
            const maxDate = new Date(
                (await ApiService.fetchStatus()).update.date
            );
            const minDate = new Date(maxDate);
            minDate.setMonth(maxDate.getMonth() - 2);
            const data = await ApiService.fetchCompetitorsOverview({
                reviewsCoeff: "30",
                minPrice: "0",
                maxPrice: "",
                minReviews: "1000",
                maxReviews: "10000",
                minDate: minDate,
                maxDate: maxDate,
                includedTags: [],
                excludedTags: [],
            });

            runInAction(() => {
                this.trendingOverview = data;
            });
        } catch (error) {
            console.error("Failed to fetch trending overview:", error);
        }

        runInAction(() => {
            this.isFetching = false;
        });
    }
}
