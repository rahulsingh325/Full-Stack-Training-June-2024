// src/components/HorizontalScrollContainer.jsx
import React, { useRef, useState } from "react";
import "../../assets/scss/modules/_dashboard.scss";

const HorizontalScrollContainer = ({ children }) => {
    const containerRef = useRef(null);
    const [drag, setDrag] = useState({ active: false, startX: 0, scroll: 0 });

    const handleDown = (e) =>
        setDrag({
            active: true,
            startX: e.pageX - containerRef.current.offsetLeft,
            scroll: containerRef.current.scrollLeft,
        });

    const handleMove = (e) => {
        if (!drag.active) return;
        e.preventDefault();
        containerRef.current.scrollLeft =
            drag.scroll - (e.pageX - containerRef.current.offsetLeft - drag.startX);
    };

    const stopDrag = () => setDrag((d) => ({ ...d, active: false }));

    return (
        <div
            ref={containerRef}
            className={`hide-scrollbar scroll-smooth select-none  d-flex overflow-x-auto gap-3 pb-2 cursor-grab  ${drag.active ? "cursor-grabbing" : ""}`}
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
        >
            {children}
        </div>
    );
};

export default HorizontalScrollContainer;
