import React from "react";
import { Link, NavLink } from "react-router-dom";

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
                            <NavLink
                                to="/competitors"
                                className={({ isActive }) =>
                                    "navbar-brand text-uppercase" +
                                    (isActive ? " active-link" : "")
                                }
                            >
                                Competitors
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/tags"
                                className={({ isActive }) =>
                                    "navbar-brand text-uppercase" +
                                    (isActive ? " active-link" : "")
                                }
                            >
                                Tags
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/trends"
                                className={({ isActive }) =>
                                    "navbar-brand text-uppercase" +
                                    (isActive ? " active-link" : "")
                                }
                            >
                                Trends
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
