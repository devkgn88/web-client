import React, { useRef, useState, useEffect } from "react";
import { Typography } from "../../components/Wrappers/Wrappers";

// styles
import useStyles from "./style.js";

export default function TimelineHeader({ startHour, endHour, minutesPerSlot }) {
    const classes = useStyles();

    const wrapperRef = useRef(null);
    const [wrapperWidth, setWrapperWidth] = useState(0);

    // 총 슬롯 수 계산
    const totalMinutes = (endHour - startHour) * 60;
    const slotCount = totalMinutes / minutesPerSlot;
    const slotWidth = wrapperWidth > 0 ? wrapperWidth / slotCount : 0;


    useEffect(() => {
        const updateWidth = () => {
            if (wrapperRef.current) {
            setWrapperWidth(wrapperRef.current.offsetWidth);
            }
        };

        // 최초 계산
        updateWidth();

        // resize 이벤트에 반응
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += minutesPerSlot) {
            const timeLabel = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
            slots.push(
                <div
                    key={`${hour}-${min}`}
                    className={classes.timeSlot}
                    style={{ width: slotWidth }}
                >
                    <Typography>{timeLabel}</Typography>
                </div>
            );
        }
    }

    return (
        <div className={classes.headerWrapper} ref={wrapperRef}>
            {slotWidth > 0 && slots}
        </div>
    );
}
