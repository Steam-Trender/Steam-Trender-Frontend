import { makeAutoObservable } from "mobx";
import { ITag } from "../models/tag";
import ApiService from "../api/service";

class TagStore {
    tags: ITag[] = [];
    hasFetched = false;

    constructor() {
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

export default new TagStore();
