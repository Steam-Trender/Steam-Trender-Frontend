import React from "react";
import { Markdown } from "../components/Markdown";

const DescriptionPage = () => {
    return (
        <div className="container">
            <Markdown file={"about"} />
        </div>
    );
};

export default DescriptionPage;
