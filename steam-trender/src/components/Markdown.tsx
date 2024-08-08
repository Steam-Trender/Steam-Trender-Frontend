import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
    file: string;
}

export function Markdown({ file }: MarkdownProps) {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(`/content/${file}.md`)
            .then((response) => response.text())
            .then((text) => setMarkdown(text))
            .catch((error) =>
                console.error("Error loading the Markdown file:", error)
            );
    }, []);

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    );
}
