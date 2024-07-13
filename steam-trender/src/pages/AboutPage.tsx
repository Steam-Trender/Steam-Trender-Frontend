import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AboutPage = () => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch("/content/about.md")
            .then((response) => response.text())
            .then((text) => setMarkdown(text))
            .catch((error) =>
                console.error("Error loading the Markdown file:", error)
            );
    }, []);

    return (
        <div className="container">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default AboutPage;
