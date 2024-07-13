import { IOverview } from "./overview";
import { IRegression } from "./regression";

export interface IYearOverview {
    year: string;
    overview: IOverview;
    regression: IRegression;
}
