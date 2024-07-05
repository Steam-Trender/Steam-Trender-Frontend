import { ITag } from "./tag";

export interface IGame {
    id: number;
    appid: number;
    title: string;
    reviews: number;
    reviews_score: number;
    release_date: string;
    price: number;
    tags: [ITag];
}
