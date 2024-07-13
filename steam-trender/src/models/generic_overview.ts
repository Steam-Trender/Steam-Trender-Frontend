import { IOverview } from "./overview";
import { ITagOverview } from "./tag_overview";
import { IYearOverview } from "./year_overview";

export interface IGenericOverview {
    overview: IOverview;
    title: string;
}

export function convertTagDataToGeneric(
    data: ITagOverview[]
): IGenericOverview[] {
    return data.map((item) => ({
        overview: item.overview,
        title: item.tag.title,
    }));
}

export function convertYearDataToGeneric(
    data: IYearOverview[]
): IGenericOverview[] {
    return data.map((item) => ({
        overview: item.overview,
        title: item.year,
    }));
}
