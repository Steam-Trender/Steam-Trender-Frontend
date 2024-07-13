import { ReactElement } from "react";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";
import CompetitorsPage from "../pages/CompetitorsPage";
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import TagsPage from "../pages/TagsPage";
import AboutPage from "../pages/AboutPage";
import TrendsPage from "../pages/TrendsPage";

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
        path: "/blog/:slug",
        title: "Post",
        element: React.createElement(BlogPostPage),
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
        path: "/about",
        title: "About",
        element: React.createElement(AboutPage),
    },
    {
        path: "*",
        title: "Not Found",
        element: NotFoundPage(),
    },
];

export default routeConfigs;
