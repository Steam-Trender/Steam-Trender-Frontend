import { TagsStore } from "./TagsStore";
import { TrendsPageStore } from "./TrendsPageStore";

export class RootStore {
    trendsPageStore: TrendsPageStore;
    tagsStore: TagsStore;

    constructor() {
        this.trendsPageStore = new TrendsPageStore(this);
        this.tagsStore = new TagsStore(this);
    }
}

export const rootStore = new RootStore();
