import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { createRoutes } from "./routes/Routes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Router>
                <div className="container-fluid min-vh-100 d-flex flex-column p-0">
                    <Navbar />
                    <Routes>{createRoutes()}</Routes>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
