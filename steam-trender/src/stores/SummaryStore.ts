import ApiService from "../api/service";
import { ISummary } from "../models/summary";
import { RootStore } from "./RootStore";
import { makeAutoObservable, runInAction } from "mobx";

export class SummaryPageStore {
    rootStore: RootStore;

    gameUrl = "";
    uiError: string | null = null;
    summary: ISummary | null = null;

    isFetching = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setGameUrl(value: string) {
        this.gameUrl = value;
        this.clearError();
    }

    setError(message: string) {
        this.uiError = message;
    }

    clearError() {
        this.uiError = null;
    }

    extractAppIdFromUrl(url: string): number | null {
        const match = url.match(/store\.steampowered\.com\/app\/(\d+)\//);
        return match ? parseInt(match[1], 10) : null;
    }

    async fecthGameSummary() {
        if (this.gameUrl !== "") {
            const gameId = this.extractAppIdFromUrl(this.gameUrl);

            if (!gameId) {
                runInAction(() => {
                    this.setError("Invalid Steam URL format.");
                });
                return;
            }

            runInAction(() => {
                this.isFetching = true;
                this.summary = null;
            });

            try {
                const data = await ApiService.fetchGameSummary({
                    gameId: gameId,
                });

                runInAction(() => {
                    this.summary = data;
                });
            } catch (error) {
                runInAction(() => {
                    this.setError(
                        "Failed to fetch summary. Check if URL is a correct one."
                    );
                });
            }

            runInAction(() => {
                this.isFetching = false;
            });
        }
    }
}
