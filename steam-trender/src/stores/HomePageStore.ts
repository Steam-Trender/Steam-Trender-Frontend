import { makeAutoObservable, runInAction } from "mobx";
import { ICompetitors } from "../models/competitors";
import { RootStore } from "./RootStore";
import ApiService from "../api/service";

export class HomePageStore {
    rootStore: RootStore;

    risingOverview: ICompetitors | null = null;
    hitsOverview: ICompetitors | null = null;
    megahitsOverview: ICompetitors | null = null;
    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async fetchTrendingOverview() {
        runInAction(() => {
            this.isFetching = true;
            this.risingOverview = null;
            this.hitsOverview = null;
            this.megahitsOverview = null;
        });

        try {
            const maxDate = new Date(
                (await ApiService.fetchStatus()).update.date
            );
            const minDate = new Date(maxDate);
            minDate.setMonth(maxDate.getMonth() - 2);

            const risingData = await ApiService.fetchCompetitorsOverview({
                reviewsCoeff: "30",
                minPrice: "0",
                maxPrice: "",
                minReviews: "500",
                maxReviews: "1000",
                minDate: minDate,
                maxDate: maxDate,
                includedTags: [],
                excludedTags: [],
            });

            const hitsData = await ApiService.fetchCompetitorsOverview({
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

            const megahitsData = await ApiService.fetchCompetitorsOverview({
                reviewsCoeff: "30",
                minPrice: "0",
                maxPrice: "",
                minReviews: "10000",
                maxReviews: "",
                minDate: minDate,
                maxDate: maxDate,
                includedTags: [],
                excludedTags: [],
            });

            runInAction(() => {
                this.risingOverview = risingData;
                this.hitsOverview = hitsData;
                this.megahitsOverview = megahitsData;
            });
        } catch (error) {
            console.error("Failed to fetch trending overview:", error);
        }

        runInAction(() => {
            this.isFetching = false;
        });
    }
}
