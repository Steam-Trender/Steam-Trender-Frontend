import { makeAutoObservable } from "mobx";
import { ITag } from "../models/tag";
import ApiService from "../api/service";
import { RootStore } from "./RootStore";

export class TagsStore {
    rootStore: RootStore;

    tags: ITag[] = [];
    hasFetched = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setTags(data: ITag[]) {
        this.tags = data;
        this.hasFetched = true;
    }

    async fetchTags() {
        if (!this.hasFetched) {
            try {
                const response = await ApiService.fetchTags();
                this.setTags(response);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        }
    }
}
