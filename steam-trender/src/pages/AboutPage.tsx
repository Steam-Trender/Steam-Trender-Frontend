import React from "react";
import { Markdown } from "../components/Markdown";

const AboutPage = () => {
    return (
        <>
            <Markdown file={"home"} />
            <Markdown file={"faq"} />
        </>
    );
};

export default AboutPage;
