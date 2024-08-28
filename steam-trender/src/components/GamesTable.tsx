import React from "react";
import { NumberFormatter } from "../utils/number_formatter";
import { IGame } from "../models/game";

interface GamesTableProps {
    games: IGame[];
    limit?: number;
}

export function GamesTable({ games, limit = 100 }: GamesTableProps) {
    const limitedGames: IGame[] = games.slice(0, limit);
    return (
        <small>
            <small>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr className="align-top">
                                <th scope="col">Title</th>
                                <th scope="col"></th>
                                <th scope="col">Reviews Total</th>
                                <th scope="col">Reviews Score</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Launch Price</th>
                                <th scope="col">Tags</th>
                                <th scope="col">Owners Estimated</th>
                                <th scope="col">Revenue Estimated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {limitedGames.map((game) => (
                                <tr key={game.id}>
                                    <td>
                                        <a
                                            href={`https://store.steampowered.com/app/${game.appid}`}
                                            className="text-body"
                                        >
                                            {game.title}
                                        </a>
                                    </td>
                                    <td>
                                        <img
                                            width="150px"
                                            src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
                                        ></img>
                                    </td>
                                    <td>
                                        <NumberFormatter value={game.reviews} />
                                    </td>
                                    <td>{game.reviews_score}%</td>
                                    <td>{game.release_date}</td>
                                    <td>${game.price}</td>
                                    <td>
                                        {game.tags
                                            .map((tag) => tag.title)
                                            .join(", ")}
                                    </td>
                                    <td>
                                        <NumberFormatter value={game.owners} />
                                    </td>
                                    <td>
                                        $
                                        <NumberFormatter value={game.revenue} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </small>
        </small>
    );
}
