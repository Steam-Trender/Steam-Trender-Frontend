import React, { useState, useEffect } from "react";
import { IPost } from "../models/post";
import ApiService from "../api/service";
import { PostCard } from "../components/PostCard";

const BlogPage = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await ApiService.fetchPosts();
                setPosts(response);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <h1 className="text-uppercase">Blog</h1>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-6 mb-3" key={post.id}>
                        <PostCard key={post.id} post={post} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogPage;
