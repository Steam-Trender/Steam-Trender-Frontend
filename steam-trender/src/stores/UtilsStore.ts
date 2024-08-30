import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class UtilsStore {
    rootStore: RootStore;

    showCookiesToast = true;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    acceptCookies = () => {
        this.showCookiesToast = false;
    };
}
