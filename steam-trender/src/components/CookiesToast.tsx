import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/storeContext";

const CookiesToast: React.FC = observer(() => {
    const { utilsStore } = useStore();

    if (!utilsStore.showCookiesToast) return <></>;

    return (
        <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 11 }}
        >
            <div
                className="toast show"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header">
                    <strong className="me-auto text-uppercase text-primary">
                        Cookies
                    </strong>
                </div>
                <div className="toast-body rounded-bottom">
                    We baked some cookies that you have to accept if you want to
                    make the service work correctly.
                    <div className="mt-3">
                        <button
                            className="btn btn-primary w-50"
                            onClick={utilsStore.acceptCookies}
                        >
                            OK
                        </button>
                        <a href="/privacy" className="btn btn-link w-50">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CookiesToast;
