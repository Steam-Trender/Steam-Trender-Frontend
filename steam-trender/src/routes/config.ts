import { ReactElement } from "react";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";

interface RouteConfig {
    path: string;
    title: string;
    element: ReactElement;
}

const routeConfigs: RouteConfig[] = [
    { path: "/", title: "Home", element: React.createElement(NotFoundPage) },
    {
        path: "/home",
        title: "Home",
        element: React.createElement(NotFoundPage),
    },
    {
        path: "*",
        title: "Not Found",
        element: NotFoundPage(),
    },
];

export default routeConfigs;
