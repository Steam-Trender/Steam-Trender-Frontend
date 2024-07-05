import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid px-3 py-1">
                <Link className="navbar-brand text-uppercase" to="/">
                    <b>
                        Steam<span className="text-primary">Trender</span>
                        <sup className="text-lowercase text-primary">β</sup>
                    </b>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="navbar-brand text-uppercase"
                                to="/competitors"
                            >
                                Competitors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="navbar-brand text-uppercase"
                                to="/tags"
                            >
                                Tags
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="navbar-brand text-uppercase"
                                to="/trends"
                            >
                                Trends
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
