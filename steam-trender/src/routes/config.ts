import { ReactElement } from "react";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";
import CompetitorsPage from "../pages/CompetitorsPage";
import TagsPage from "../pages/TagsPage";
import AboutPage from "../pages/AboutPage";
import TrendsPage from "../pages/TrendsPage";
import DescriptionPage from "../pages/DescriptionPage";
import HomePage from "../pages/HomePage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";

interface RouteConfig {
    path: string;
    title: string;
    element: ReactElement;
}

const routeConfigs: RouteConfig[] = [
    { path: "/", title: "Home", element: React.createElement(HomePage) },
    {
        path: "/home",
        title: "Home",
        element: React.createElement(HomePage),
    },
    {
        path: "/competitors",
        title: "Competitors",
        element: React.createElement(CompetitorsPage),
    },
    {
        path: "/tags",
        title: "Tags",
        element: React.createElement(TagsPage),
    },
    {
        path: "/trends",
        title: "Trends",
        element: React.createElement(TrendsPage),
    },
    {
        path: "/faq",
        title: "FAQ",
        element: React.createElement(DescriptionPage),
    },
    {
        path: "/about",
        title: "About",
        element: React.createElement(AboutPage),
    },
    {
        path: "/privacy",
        title: "Privacy Policy",
        element: React.createElement(PrivacyPolicyPage),
    },
    {
        path: "/terms-of-use",
        title: "Terms of Use",
        element: React.createElement(TermsPage),
    },
    {
        path: "*",
        title: "Not Found",
        element: NotFoundPage(),
    },
];

export default routeConfigs;
