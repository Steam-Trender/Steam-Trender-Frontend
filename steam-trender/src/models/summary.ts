import { ICountry } from "./country";
import { IWord } from "./word";

export interface ISummary {
    positive_summary: string;
    negative_summary: string;
    positive_words: [IWord];
    negative_words: [IWord];
    median_playtime: number;
    countries: [ICountry];
}
