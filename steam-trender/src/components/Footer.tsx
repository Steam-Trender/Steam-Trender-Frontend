import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../api/service";
import { IStatus } from "../models/status";

const Footer = () => {
    const [status, setStatus] = useState<IStatus>();

    useEffect(() => {
        const fetchStatus = async () => {
            const fetchedStatus = await ApiService.fetchStatus();
            setStatus(fetchedStatus);
        };

        fetchStatus();
    }, []);

    return (
        <footer className="pb-3 pt-3 mt-2 bg-light">
            <div className="container">
                <div className="row mb-2 text-center">
                    <div className="col-md-4 text-md-start">
                        <span>
                            Status: <b>{status?.status}</b>
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span>
                            Contact us: <b>help [at] steamtrender [dot] com</b>
                        </span>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <span>
                            Updated: <b>{status?.update.date}</b>
                        </span>
                    </div>
                </div>
                <div className="row mb-2 text-center">
                    <div className="col-md-3 text-md-start">
                        <a
                            href="https://steampowered.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Powered by Steam
                        </a>
                    </div>
                    <div className="col-md-3">
                        <Link to="/about">About</Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/terms-of-use">Terms of Use</Link>
                    </div>
                    <div className="col-md-3 text-md-end">
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                </div>
                <div className="row text-center text-secondary muted">
                    <div className="col-md-9 text-md-start">
                        <span>
                            Video games, thumbnails, all trademarks are the
                            property of their respective owners.
                        </span>
                    </div>
                    <div className="col-md-3 text-md-end">
                        <span>© 2024 SteamTrender</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
