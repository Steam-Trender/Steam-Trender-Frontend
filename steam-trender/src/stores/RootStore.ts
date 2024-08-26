import { TagsPageStore } from "./TagsPageStore";
import { TagsStore } from "./TagsStore";
import { TrendsPageStore } from "./TrendsPageStore";

export class RootStore {
    trendsPageStore: TrendsPageStore;
    tagsStore: TagsStore;
    tagsPageStore: TagsPageStore;

    constructor() {
        this.trendsPageStore = new TrendsPageStore(this);
        this.tagsPageStore = new TagsPageStore(this);
        this.tagsStore = new TagsStore(this);
    }
}

export const rootStore = new RootStore();
