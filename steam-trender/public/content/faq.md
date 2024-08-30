# Questions & Answers

Here, you can find basic information about how SteamTrender works, including our methods for estimating game sales, analyzing trends, and more. This page aims to clarify some of the most common questions related to our process and the tools we use.

## Who is behind the service?

-   **Lev «evlko» Kobelev** (Developer):
    -   Product Analyst @ My.Games
    -   email: evlko.oklve [at] gmail.com
    -   twitter: [@evllko](https://twitter.com/evllko)
    -   tg: [@evlko](https://t.me/evlko)
-   **Alex «Sadari» Barabanov** (Community Manager, Editor):
    -   Lead Game Designer @ Sad Cat Studios (ex-Game Designer @ ITT, My.Games & some indie)
    -   email: sadari.chan@gmail.com
    -   twitter: [@Sadari_sama](https://twitter.com/sadari_sama)
    -   tg: [@Sadaris](https://t.me/Sadaris)
    -   [LinkedIn](https://www.linkedin.com/in/alexander-barabanov-869b1a146/)

## How is the data collected?

We collect data directly from Steam at the beginning of each month. Since trends don’t fluctuate significantly overnight, we believe this update frequency provides a reliable snapshot of what’s currently popular on Steam.

-   All reviews in the sample are filtered, meaning they exclude review bombs and reviews from players who received the game for free.
-   Revenue estimates are calculated using the well-known **Boxleiter method**.
-   Tags are not only added by developers but by players as well, keep this in mind when you see tags that may seem unrelated to the game's genre.

## What’s behind your revenue estimates?

We use the famous Boxleiter method. For those unfamiliar with this formula, let me give you a quick rundown.

The typical Boxleiter Formula is: _Review count * Year review/sales coefficient * return rate * discount rate * regional coefficient \* Steam cut_

Where:

-   **Review count** – The total number of reviews for the game at the time of data sampling.
-   **Year review/sales coefficient** – The average sales-to-review coefficient.  
    By default, the current coefficient is 30, but you can adjust it if needed. Review coefficients may vary significantly by year. For example, in 2017, the median coefficient was close to 75 sales per 1 review, but by 2020, it had dropped to around 38 (based on data from Simon Carless). We recommend using coefficients from these sources:
    -   [How That Game Sold on Steam](https://newsletter.gamediscover.co/p/how-that-game-sold-on-steam-using?triedSigningIn=true)
    -   [VG Insights Article](https://vginsights.com/insights/article/how-to-estimate-steam-video-game-sales)
    -   [Gamalytic Blog Post](https://gamalytic.com/blog/a-deep-dive-into-the-steam-review-ratio)
-   **Return rate** – The typical return rate for the game. We use an 8% return rate as an average based on a small sample of data, though this can vary from game to game.
-   **Discount rate** – Many games see significant sales through discounts, so not every copy is sold at full price. We use an average coefficient of 0.8. Still, looking at the data ([Reddit discussion](https://www.reddit.com/r/gamedev/comments/198yff2/can_a_game_recover_from_an_unsuccessful_steam/_), [Steam Wishlist Insights](https://newsletter.gamediscover.co/p/revealed-the-state-of-steam-wishlist)), it’s clear that the first months often account for a large portion of full-price revenue.
-   **Regional coefficient** – Since Steam allows for regional pricing, revenue per copy sold can vary greatly depending on the region. We use 0.8 as an average, but it can be much lower (down to 0.5) for games with regional popularity.

## Which games are included?

We exclude certain types of games to ensure the data reflects paid, full games:

-   No demos or prologues are included.
-   No free-to-play games are included, even if they were previously pay-to-play like CS:GO.

## How close are your estimates to reality?

Well, that's a tough question. We don’t know for certain. The margin of error for the Boxleiter method is still debated, with most estimates placing it around 30%. However, we encourage you to use other tools like [Gamalytic](https://gamalytic.com) and [VGInsights](https://vginsights.com), which claim to have lower margins of error and are well-regarded within the community.

That said, we’re not trying to compete with those tools. Our primary goal is to identify and understand the relative trends behind certain tags on Steam, so we rely on the standard Boxleiter method for this purpose.

It's also important to note that AAA games operate quite differently when it comes to marketing and don't rely as heavily on Steam featuring. These titles often employ alternative methods to attract traffic, resulting in a much higher reviews-to-sales ratio. You can explore more about the relevant coefficients in this [article on VGInsights](https://vginsights.com/insights/article/further-analysis-into-steam-reviews-to-sales-ratio-how-to-estimate-video-game-sales), but keep in mind that the data may be unreliable due to the wide variation between minimum and maximum values.

## What if I found a mistake or strange data?

The data sample is really large, so we might miss something. Please contact us if you believe you've found a mistake: **help [at] steamtrender [dot] com**.

## What if I have an idea on how to improve your tool?

Please reach out to any of us, and we’ll consider your suggestion.

## Can I support you if I really like what you did?

The main goal of the project is non-commercial, but if you'd like to help cover the costs of maintaining the service, you're welcome to support us by [donating](https://buymeacoffee.com/steam_trender)!
