import React from "react";
import { RootStore } from "./RootStore";

export const StoreContext = React.createContext<RootStore | undefined>(
    undefined
);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const rootStore = new RootStore();
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = (): RootStore => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return store;
};
