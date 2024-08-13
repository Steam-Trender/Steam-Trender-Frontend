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
        <footer className="row pb-3 pt-2 mt-2 mx-0 bg-light text-center">
            <div className="col-sm-12 col-md-4">
                <span>
                    status: <b>{status?.status}</b>
                </span>
            </div>
            <div className="col-sm-12 col-md-4 p-0">
                <span>
                    contact us: <b>help [at] steamtrender [dot] com</b>
                </span>
            </div>
            <div className="col-sm-12 col-md-4">
                <span>
                    updated: <b>{status?.update.date}</b>
                </span>
            </div>
            <div className="col-sm-12 col-md-4">
                <a
                    href="https://steampowered.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    powered by steam
                </a>
            </div>
            <div className="col-sm-12 col-md-4">
                <Link to="/about">about</Link>
            </div>
            <div className="col-sm-12 col-md-4">
                <Link to="/privacy">privacy policy</Link>
            </div>
        </footer>
    );
};

export default Footer;
