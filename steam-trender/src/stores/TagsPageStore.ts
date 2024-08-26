import ApiService from "../api/service";
import { ITagOverview } from "../models/tag_overview";
import { RootStore } from "./RootStore";
import { makeAutoObservable, runInAction } from "mobx";

export class TagsPageStore {
    rootStore: RootStore;

    reviewsCoeff = "";
    minReviewsThreshold = "";
    maxReviewsThreshold = "";
    selectedTagIds: number[] = [];
    maxYear = 2020;
    minYear = 2024;
    tagsOverview: ITagOverview[] | null = null;
    tagsLimit = 5;
    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setSelectedTagIds(value: number[]) {
        this.selectedTagIds = value;
    }

    setReviewsCoeff(value: string) {
        this.reviewsCoeff = value;
    }

    setMinReviewsThreshold(value: string) {
        this.minReviewsThreshold = value;
    }

    setMaxReviewsThreshold(value: string) {
        this.maxReviewsThreshold = value;
    }

    setMinYear(value: number) {
        this.minYear = value;
    }

    setMaxYear(value: number) {
        this.maxYear = value;
    }

    async fetchTagsOverview() {
        runInAction(() => {
            this.isFetching = true;
            this.tagsOverview = null;
        });

        try {
            const data = await ApiService.fetchTagsOverview({
                reviewsCoeff: this.reviewsCoeff,
                minReviews: this.minReviewsThreshold,
                minYear: this.maxYear,
                maxYear: this.maxYear,
                selectedTags: this.selectedTagIds,
            });

            runInAction(() => {
                this.tagsOverview = data;
            });
        } catch (error) {
            console.error("Failed to fetch tags overview:", error);
        }

        runInAction(() => {
            this.isFetching = false;
        });
    }
}
