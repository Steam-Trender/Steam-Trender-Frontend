import React, { useEffect, useState } from "react";
import { Markdown } from "../components/Markdown";
import { GamesTable } from "../components/GamesTable";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/storeContext";
import LoadingSpinnder from "../components/LoadingSpinner";

const HomePage = observer(() => {
    const { homeStore } = useStore();
    const [activeTab, setActiveTab] = useState("rising");

    useEffect(() => {
        if (homeStore.risingOverview === null) {
            homeStore.fetchTrendingOverview();
        }
    }, []);

    return (
        <>
            <Markdown file={"home"} />
            <h2>Trending</h2>
            <div>
                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-3" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "rising" ? "active" : ""}`}
                            onClick={() => setActiveTab("rising")}
                        >
                            Rising
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "hits" ? "active" : ""}`}
                            onClick={() => setActiveTab("hits")}
                        >
                            Hits
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "megahits" ? "active" : ""}`}
                            onClick={() => setActiveTab("megahits")}
                        >
                            Megahits
                        </button>
                    </li>
                </ul>
                {/* Tabs Content */}
                <div className="tab-content">
                    {activeTab === "rising" && (
                        <div className="tab-pane active">
                            <p>
                                All games with reviews between{" "}
                                <b>500 and 1 000</b> released in the last two
                                months since the db was updated.
                            </p>
                            {homeStore.risingOverview && (
                                <GamesTable
                                    games={homeStore.risingOverview.games}
                                />
                            )}
                        </div>
                    )}
                    {activeTab === "hits" && (
                        <div className="tab-pane active">
                            <p>
                                All games with reviews between{" "}
                                <b>1 000 and 10 000</b> released in the last two
                                months since the db was updated.
                            </p>
                            {homeStore.hitsOverview && (
                                <GamesTable
                                    games={homeStore.hitsOverview.games}
                                />
                            )}
                        </div>
                    )}
                    {activeTab === "megahits" && (
                        <div className="tab-pane active">
                            <p>
                                All games with <b>10 000+</b> reviews released
                                in the last two months since the db was updated.
                            </p>
                            {homeStore.megahitsOverview && (
                                <GamesTable
                                    games={homeStore.megahitsOverview.games}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {homeStore.isFetching && <LoadingSpinnder />}
        </>
    );
});

export default HomePage;
