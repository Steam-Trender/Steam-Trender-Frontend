import React, { useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { observer } from "mobx-react";
import BlogStore from "../stores/BlogStore";

const BlogPage = observer(() => {
    useEffect(() => {
        BlogStore.fetchPosts();
    }, []);

    return (
        <>
            <h1 className="text-uppercase">Blog</h1>
            <div className="row">
                {BlogStore.posts.map((post) => (
                    <div
                        className="col-sm-12 col-md-6 col-lg-4 mb-3"
                        key={post.id}
                    >
                        <PostCard key={post.id} post={post} />
                    </div>
                ))}
            </div>
        </>
    );
});

export default BlogPage;
