import { CompetitorsPageStore } from "./CompetitorsPageStore";
import { HomePageStore } from "./HomePageStore";
import { TagsPageStore } from "./TagsPageStore";
import { TagsStore } from "./TagsStore";
import { TrendsPageStore } from "./TrendsPageStore";
import { UtilsStore } from "./UtilsStore";

export class RootStore {
    trendsPageStore: TrendsPageStore;
    homeStore: HomePageStore;
    tagsStore: TagsStore;
    tagsPageStore: TagsPageStore;
    competitorsPageStore: CompetitorsPageStore;
    utilsStore: UtilsStore;

    constructor() {
        this.homeStore = new HomePageStore(this);
        this.competitorsPageStore = new CompetitorsPageStore(this);
        this.trendsPageStore = new TrendsPageStore(this);
        this.tagsPageStore = new TagsPageStore(this);
        this.tagsStore = new TagsStore(this);
        this.utilsStore = new UtilsStore(this);
    }
}

export const rootStore = new RootStore();
