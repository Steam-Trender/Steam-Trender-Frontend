import React from "react";
import { Route } from "react-router-dom";
import routeConfigs from "./config";
import BasePage from "../pages/BasePage";

export const createRoutes = () => {
    return routeConfigs.map((config, index) => (
        <Route
            key={index}
            path={config.path}
            element={<BasePage title={config.title}>{config.element}</BasePage>}
        />
    ));
};
