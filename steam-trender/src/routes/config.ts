import { ReactElement } from "react";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";
import CompetitorsPage from "../pages/CompetitorsPage";
import BlogPage from "../pages/BlogPage";

interface RouteConfig {
    path: string;
    title: string;
    element: ReactElement;
}

const routeConfigs: RouteConfig[] = [
    { path: "/", title: "Home", element: React.createElement(BlogPage) },
    {
        path: "/home",
        title: "Home",
        element: React.createElement(BlogPage),
    },
    {
        path: "/blog",
        title: "Home",
        element: React.createElement(BlogPage),
    },
    {
        path: "/competitors",
        title: "Competitors",
        element: React.createElement(CompetitorsPage),
    },
    {
        path: "/tags",
        title: "Tags",
        element: React.createElement(NotFoundPage),
    },
    {
        path: "/trends",
        title: "Trends",
        element: React.createElement(NotFoundPage),
    },
    {
        path: "*",
        title: "Not Found",
        element: NotFoundPage(),
    },
];

export default routeConfigs;
