import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef } from "react";

type PopoverPlacement = "top" | "bottom" | "left" | "right" | "auto";

export const Tooltip = (p: {
    children: JSX.Element;
    text: string;
    placement?: PopoverPlacement;
}) => {
    const childRef = useRef(undefined as unknown as Element);

    useEffect(() => {
        const t = new BsTooltip(childRef.current, {
            title: p.text,
            placement: p.placement || "top",
            trigger: "hover",
        });
        return () => t.dispose();
    }, [p.text]);

    return React.cloneElement(p.children, { ref: childRef });
};
