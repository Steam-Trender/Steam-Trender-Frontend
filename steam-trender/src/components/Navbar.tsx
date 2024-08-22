import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container px-3 py-1">
                <Link className="navbar-brand text-uppercase" to="/">
                    <b>
                        Steam<span className="text-primary">Trender</span>
                        <sup className="text-lowercase text-primary">β</sup>
                    </b>
                </Link>
                <button
                    className="custom-toggler navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
                    id="navbarContent"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/faq"
                                className={({ isActive }) =>
                                    "navbar-brand text-uppercase" +
                                    (isActive ? " active-link" : "")
                                }
                            >
                                FAQ
                            </NavLink>
                        </li>
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
                    <a
                        href="https://www.paypal.com/donate?business=YOUR_PAYPAL_EMAIL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary ms-auto text-uppercase"
                    >
                        Buy Me a Coffee
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
