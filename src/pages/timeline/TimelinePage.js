import React, { useState, useEffect } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import "moment/locale/ko";
import PageTitle from "../../components/PageTitle";
import "./custom-timeline.css"; // 오버라이드용 CSS

const today = moment().startOf("day");
const startOfDay = today.clone().hour(9);
const endOfDay = today.clone().hour(18);

export default function TimelinePage() {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        moment.locale("ko");

        const data = [
            {
                roomId: 1,
                roomName: "회의실 A",
                title: "기획 회의",
                startTime: "2025-05-01T09:00:00",
                endTime: "2025-05-01T10:00:00",
                color: "#4CAF50", // 초록
            },
            {
                roomId: 2,
                roomName: "회의실 B",
                title: "개발 회의",
                startTime: "2025-05-01T11:00:00",
                endTime: "2025-05-01T12:00:00",
                color: "#2196F3", // 파랑
            },
        ];

        const groupList = data.map((item) => ({
            id: item.roomId,
            title: item.roomName,
        }));

        const itemList = data.map((item, index) => ({
            id: index + 1,
            group: item.roomId,
            originalTitle: item.title,  // 툴팁용 원본 제목
            start_time: moment(item.startTime),
            end_time: moment(item.endTime),
            color: item.color,
        }));

    setGroups(groupList);
    setItems(itemList);
    }, []);

    return (
        <>
        <PageTitle title="예약현황" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Timeline
                groups={groups}
                items={items}
                visibleTimeStart={startOfDay.valueOf()}
                visibleTimeEnd={endOfDay.valueOf()}
                minZoom={9 * 60 * 60 * 1000}
                maxZoom={9 * 60 * 60 * 1000}
                canMove={false}
                canResize={false}
                canChangeGroup={false}
                stackItems
                className="custom-timeline"
                itemRenderer={({ item, itemContext, getItemProps, getResizeProps }) => {
                    return (
                        <div
                            {...getItemProps({
                            style: {
                                ...itemContext.style,
                                background: item.color,
                                color: "white",
                                borderRadius: "4px",
                                border: "none",
                                padding: "4px",
                                cursor: "pointer",
                            },
                            })}
                        >
                            <Tooltip title={item.originalTitle} arrow placement="top">
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.originalTitle}
                            </div>
                            </Tooltip>
                        </div>
                        );
                    }}
                >
                    <TimelineHeaders>
                        <DateHeader unit="day">
                            {({ getRootProps, interval }) => (
                            <div
                                {...getRootProps()}
                                style={{ textAlign: "center", fontWeight: "bold" }}
                            >
                                {moment(interval.start).format("YYYY년 M월 D일 (ddd)")}
                            </div>
                            )}
                        </DateHeader>
                        <DateHeader unit="hour">
                            {({ getRootProps, interval }) => (
                            <div {...getRootProps()} 
                                style={{ padding: "0 8px" }}>
                                {moment(interval.start)}
                            </div>
                            )}
                        </DateHeader>
                    </TimelineHeaders>
                </Timeline>
            </Grid>
        </Grid>
        </>
    );
}
