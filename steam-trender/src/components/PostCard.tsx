import React, { useState, useEffect } from "react";
import { IPost } from "../models/post";

interface PostCardProprs {
    post: IPost;
}

export function PostCard({ post }: PostCardProprs) {
    return (
        <div className="card overflow-hidden" style={{ height: "200px" }}>
            <div className="row g-0">
                <div className="col-4 h-100 d-flex align-items-center justify-content-center rounded-start overflow-hidden">
                    <img
                        loading="lazy"
                        src={post.image}
                        alt={post.title}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
