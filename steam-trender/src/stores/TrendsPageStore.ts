import { makeAutoObservable, runInAction } from "mobx";
import { IYearOverview } from "../models/year_overview";
import { RootStore } from "./RootStore";
import ApiService from "../api/service";

export class TrendsPageStore {
    rootStore: RootStore;

    reviewsThreshold = "";
    selectedTagIds: number[] = [];
    year = 2024;
    trendsOverview: IYearOverview[] | null = null;
    tagsLimit = 5;
    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setReviewsThreshold(value: string) {
        this.reviewsThreshold = value;
    }

    setSelectedTagIds(value: number[]) {
        this.selectedTagIds = value;
    }

    setYear(value: number) {
        this.year = value;
    }

    async fetchTrendsOverview() {
        runInAction(() => {
            this.isFetching = true;
            this.trendsOverview = null;
        });

        try {
            const data = await ApiService.fetchTrendsOverview({
                minReviews: this.reviewsThreshold,
                pivotYear: this.year,
                selectedTagIds: this.selectedTagIds,
            });

            runInAction(() => {
                this.trendsOverview = data;
            });
        } catch (error) {
            console.error("Failed to fetch trends overview:", error);
        }

        runInAction(() => {
            this.isFetching = false;
        });
    }
}
