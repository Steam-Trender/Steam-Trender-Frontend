import { IOverview } from "./overview";
import { ITagOverview } from "./tag_overview";
import { IYearOverview } from "./year_overview";

export interface IGenericOverview {
    overview: IOverview;
    detail: {
        id: number;
        title: string;
    };
}

export function convertTagDataToGeneric(
    data: ITagOverview[]
): IGenericOverview[] {
    return data.map((item) => ({
        overview: item.overview,
        detail: item.tag,
    }));
}

export function convertYearDataToGeneric(
    data: IYearOverview[]
): IGenericOverview[] {
    return data.map((item) => ({
        overview: item.overview,
        detail: item.year,
    }));
}
