import React, { useEffect } from "react";

interface TitleProps {
    title: string;
    children: React.ReactNode;
}

export function PageTitleWrapper({ title, children }: TitleProps) {
    const maintTitle = "SteamTrender";

    useEffect(() => {
        document.title = `${maintTitle} — ${title}`;
    }, [title]);

    return <>{children}</>;
}
