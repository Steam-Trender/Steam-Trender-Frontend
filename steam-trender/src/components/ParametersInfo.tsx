import React from "react";

export const ParametersInfo = () => {
    return (
        <p>
            If you see this message, it means either you have not selected
            the parameters yet, or you have selected them in such a way that a
            null result is returned. Here is a brief description of the
            params for this page & their (default values), required
            are marked with<span className="text-primary fw-bold">*</span>.
        </p>
    );
};
