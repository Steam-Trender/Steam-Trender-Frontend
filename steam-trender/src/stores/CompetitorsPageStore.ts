import ApiService from "../api/service";
import { ICompetitors } from "../models/competitors";
import { RootStore } from "./RootStore";
import { makeAutoObservable, runInAction } from "mobx";

export class CompetitorsPageStore {
    rootStore: RootStore;

    reviewsCoeff = "30";
    minPriceThreshold = "";
    maxPriceThreshold = "";
    minReviewsThreshold = "";
    maxReviewsThreshold = "";
    includedTagIds: number[] = [];
    excludedTagIds: number[] = [];
    tagsThreshold = "10";
    minDate = new Date("2020-01-01");
    maxDate = new Date("2025-12-31");
    competitorsOverview: ICompetitors | null = null;

    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setIncludedTagIds(value: number[]) {
        this.includedTagIds = value;
    }

    setExcludedTagIds(value: number[]) {
        this.excludedTagIds = value;
    }

    setReviewsCoeff(value: string) {
        this.reviewsCoeff = value;
    }

    setMinPriceThreshold(value: string) {
        const sanitizedValue = value.replace(",", ".");
        this.minPriceThreshold = sanitizedValue;
    }

    setMaxPriceThreshold(value: string) {
        const sanitizedValue = value.replace(",", ".");
        this.maxPriceThreshold = sanitizedValue;
    }

    setMinReviewsThreshold(value: string) {
        this.minReviewsThreshold = value;
    }

    setMaxReviewsThreshold(value: string) {
        this.maxReviewsThreshold = value;
    }

    setTagsThreshold(value: string) {
        this.tagsThreshold = value;
    }

    setMinDate(value: Date | null) {
        if (value === null) {
            this.minDate = new Date("2020-01-01");
        } else {
            this.minDate = value;
        }
    }

    setMaxDate(value: Date | null) {
        if (value === null) {
            this.maxDate = new Date("2024-12-31");
        } else {
            this.maxDate = value;
        }
    }

    async fetchCompetitorsOverview() {
        runInAction(() => {
            this.isFetching = true;
            this.competitorsOverview = null;
        });

        try {
            const data = await ApiService.fetchCompetitorsOverview({
                reviewsCoeff: this.reviewsCoeff,
                minPrice: this.minPriceThreshold,
                maxPrice: this.maxPriceThreshold,
                minReviews: this.minReviewsThreshold,
                maxReviews: this.maxReviewsThreshold,
                minDate: this.minDate,
                maxDate: this.maxDate,
                includedTags: this.includedTagIds,
                excludedTags: this.excludedTagIds,
                tagsThreshold: this.tagsThreshold,
            });

            runInAction(() => {
                this.competitorsOverview = data;
            });
        } catch (error) {
            console.error("Failed to fetch competitors overview:", error);
        }

        runInAction(() => {
            this.isFetching = false;
        });
    }
}
