import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { createRoutes } from "./routes/Routes";

function App() {
    return (
        <>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <Routes>{createRoutes()}</Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
