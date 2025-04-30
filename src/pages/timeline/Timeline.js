import React, { useState } from "react";
import { Grid } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import TimelineController from "./TimelineController";

export default function Timeline() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (offset) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + offset);
        setSelectedDate(newDate);
    };

    const formatTitle = (date) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
    };
    return (
        <>
        <PageTitle title="예약현황" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
            <TimelineController
                onDateChange={handleDateChange}
                currentDate={formatTitle(selectedDate)}
            />
            </Grid>
        </Grid>
        </>
    );
}
