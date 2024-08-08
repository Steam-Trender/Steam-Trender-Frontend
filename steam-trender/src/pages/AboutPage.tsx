import React from "react";
import { Markdown } from "../components/Markdown";

const AboutPage = () => {
    return (
        <div className="container">
            <Markdown file={"about"} />
            <Markdown file={"technologies"} />
        </div>
    );
};

export default AboutPage;
