import React, { ReactNode } from "react";
import { PageTitleWrapper } from "./PageTileWrapper";

interface BasePageProps {
    title: string;
    children: ReactNode;
}

export function BasePage({ title, children }: BasePageProps) {
    return (
        <PageTitleWrapper title={title}>
            <div className="flex-fill d-flex flex-column container my-2">
                {children}
            </div>
        </PageTitleWrapper>
    );
}
