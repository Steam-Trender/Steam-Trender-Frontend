import React from "react";
import { Markdown } from "../components/Markdown";

const AboutPage = () => {
    return (
        <>
            <Markdown file={"about"} />
            <Markdown file={"technologies"} />
        </>
    );
};

export default AboutPage;
