import React, { useEffect } from "react";
import { Markdown } from "../components/Markdown";
import { GamesTable } from "../components/GamesTable";
import { observer } from "mobx-react";
import { useStore } from "../stores/storeContext";
import LoadingSpinnder from "../components/LoadingSpinner";

const HomePage = observer(() => {
    const { homeStore } = useStore();

    useEffect(() => {
        if (homeStore.trendingOverview === null) {
            homeStore.fetchTrendingOverview();
        }
    }, []);

    return (
        <>
            <Markdown file={"home"} />
            <h2>Trending Indies</h2>
            <p>
                All games with between 1 000 and 10 000 reviews in the last two
                months.
            </p>
            {homeStore.trendingOverview && (
                <GamesTable games={homeStore.trendingOverview.games} />
            )}
            {homeStore.isFetching && <LoadingSpinnder />}
        </>
    );
});

export default HomePage;
