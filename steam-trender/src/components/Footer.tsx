import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-light mt-2">
            <div className="container text-center py-3">
                <a
                    className="mx-5"
                    href="https://steampowered.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    powered by steam
                </a>
                |
                <Link className="mx-5" to="/about">
                    about
                </Link>
                |
                <Link className="mx-5" to="/privacy">
                    privacy policy
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
