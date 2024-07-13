import { makeAutoObservable } from "mobx";
import { IPost } from "../models/post";
import ApiService from "../api/service";

class BlogStore {
    posts: IPost[] = [];
    hasFetched = false;

    constructor() {
        makeAutoObservable(this);
    }

    setPosts(data: IPost[]) {
        this.posts = data;
        this.hasFetched = true;
    }

    async fetchPosts() {
        if (!this.hasFetched) {
            try {
                const response = await ApiService.fetchPosts();
                this.setPosts(response);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    }
}

export default new BlogStore();
