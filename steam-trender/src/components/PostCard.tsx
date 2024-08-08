import React from "react";
import { IPost } from "../models/post";
import { Link } from "react-router-dom";

interface PostCardProprs {
    post: IPost;
}

export function PostCard({ post }: PostCardProprs) {
    const postSlug = post.url.split("/").pop();

    return (
        <Link
            to={`/blog/${postSlug}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="card overflow-hidden" style={{ height: "200px" }}>
                <div className="col-12">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
