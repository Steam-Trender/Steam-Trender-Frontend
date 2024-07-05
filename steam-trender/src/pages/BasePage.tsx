import React, { ReactNode } from "react";
import { PageTitleWrapper } from "./PageTileWrapper";

interface BasePageProps {
    title: string;
    children: ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ title, children }) => {
    return (
        <PageTitleWrapper title={title}>
            <div className="d-flex flex-fill flex-column my-2 mx-4">
                {children}
            </div>
        </PageTitleWrapper>
    );
};

export default BasePage;
