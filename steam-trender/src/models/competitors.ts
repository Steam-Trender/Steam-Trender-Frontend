import { IGame } from "./game";
import { IOverview } from "./overview";

export interface ICompetitors {
    overview: IOverview;
    games: [IGame];
}
