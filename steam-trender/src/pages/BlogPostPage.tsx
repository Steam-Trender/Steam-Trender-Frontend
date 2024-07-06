import React from "react";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
    const { slug } = useParams();
    const url = `https://teletype.in/@sadari/${slug}`;

    return (
        <iframe
            className="flex-fill d-flex"
            src={url}
            style={{ border: "none" }}
            allowFullScreen
        ></iframe>
    );
};

export default BlogPostPage;
