import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { createRoutes } from "./routes/Routes";

function App() {
    return (
        <>
            <Router>
                <div className="container-fluid min-vh-100 d-flex flex-column">
                    <Routes>{createRoutes()}</Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
