import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../stores/storeContext";
import LoadingSpinnder from "../components/LoadingSpinner";
import { getFlagEmoji } from "../utils/flags";

const SummaryPage = observer(() => {
    const { summaryPageStore } = useStore();
    const { summary } = summaryPageStore;

    function formatPlaytime(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}h ${mins}m`;
    }

    const handleGetSummaryClick = async () => {
        await summaryPageStore.fecthGameSummary();
    };

    const renderWords = (words: { word: string; count: number }[]) => (
        <div className="d-flex flex-wrap gap-2">
            {words.map((w, i) => (
                <span key={i} className="badge bg-primary text-uppercase">
                    {w.word} ({w.count})
                </span>
            ))}
        </div>
    );

    const renderCountries = (countries: { title: string; share: number }[]) => (
        <div className="d-flex flex-wrap align-items-center gap-2">
            <span>Languages:</span>
            {countries.map((c, i) => (
                <span
                    key={i}
                    className="badge bg-light text-dark px-2 py-1 text-uppercase"
                >
                    {getFlagEmoji(c.title)} {c.title} (
                    {Math.round(c.share * 100)}%)
                </span>
            ))}
        </div>
    );

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-9 pb-2">
                    <label>Steam Game Page URL</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="https://store.steampowered.com/app/.../"
                        value={summaryPageStore.gameUrl}
                        onChange={(e) =>
                            summaryPageStore.setGameUrl(e.target.value)
                        }
                    />
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <label className="invisible">Click Here!</label>
                    <button
                        className="btn btn-primary text-uppercase w-100"
                        onClick={handleGetSummaryClick}
                        disabled={
                            summaryPageStore.isFetching ||
                            summaryPageStore.gameUrl === ""
                        }
                    >
                        Get Summary
                    </button>
                </div>
            </div>
            {summaryPageStore.uiError && (
                <>
                    <div className="row pt-2">
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                                {summaryPageStore.uiError}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {summary ? (
                <>
                    <div className="row pt-2">
                        <div className="col-12">
                            <h1>Most Recent</h1>
                            <span>
                                Median Playtime At Review:{" "}
                                <b>{formatPlaytime(summary.median_playtime)}</b>
                            </span>
                            {renderCountries(summary.countries)}
                        </div>
                        <h1 className="pt-3">
                            Most Helpful Summary{" "}
                            <span className="text-primary">[EXPERIMENTAL]</span>
                        </h1>
                        <div className="col-sm-12 col-md-6 pb-3">
                            <h2>Positive</h2>
                            <p>{summary.positive_summary}</p>
                            {renderWords(summary.positive_words)}
                        </div>
                        <div className="col-sm-12 col-md-6 pb-3">
                            <h2>Negative</h2>
                            <p>{summary.negative_summary}</p>
                            {renderWords(summary.negative_words)}
                        </div>
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    {!summaryPageStore.isFetching ? (
                        <div>
                            <p>
                                Paste a link (URL) to the game page to get its
                                summary.
                            </p>
                            <ul>
                                <li>
                                    Analysis of playtime and country
                                    distribution is based on the latest 100
                                    reviews.
                                </li>
                                <li>
                                    Analysis of pros and cons is based on the
                                    most helpful 100 reviews.
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <LoadingSpinnder />
                    )}
                </div>
            )}
        </>
    );
});

export default SummaryPage;
