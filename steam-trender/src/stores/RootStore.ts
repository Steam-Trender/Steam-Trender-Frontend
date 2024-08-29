import { CompetitorsPageStore } from "./CompetitorsPageStore";
import { HomePageStore } from "./HomePageStore";
import { TagsPageStore } from "./TagsPageStore";
import { TagsStore } from "./TagsStore";
import { TrendsPageStore } from "./TrendsPageStore";

export class RootStore {
    trendsPageStore: TrendsPageStore;
    homeStore: HomePageStore;
    tagsStore: TagsStore;
    tagsPageStore: TagsPageStore;
    competitorsPageStore: CompetitorsPageStore;

    constructor() {
        this.homeStore = new HomePageStore(this);
        this.competitorsPageStore = new CompetitorsPageStore(this);
        this.trendsPageStore = new TrendsPageStore(this);
        this.tagsPageStore = new TagsPageStore(this);
        this.tagsStore = new TagsStore(this);
    }
}

export const rootStore = new RootStore();
