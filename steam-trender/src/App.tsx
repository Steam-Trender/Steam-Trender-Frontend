import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { createRoutes } from "./routes/Routes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { StoreProvider } from "./stores/storeContext";
import CookiesToast from "./components/CookiesToast";
import ScrollToTop from "./components/ScrollToTop";
import "./i18n";

function App() {
    return (
        <>
            <StoreProvider>
                <Router>
                    <div className="container-fluid min-vh-100 d-flex flex-column p-0">
                        <ScrollToTop />
                        <Navbar />
                        <Routes>{createRoutes()}</Routes>
                        <CookiesToast />
                        <Footer />
                    </div>
                </Router>
            </StoreProvider>
        </>
    );
}

export default App;
