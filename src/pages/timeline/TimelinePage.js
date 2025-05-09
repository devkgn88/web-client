import React, { useState, useEffect } from "react";
import { Grid, Tooltip, TextField, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import "moment/locale/ko";
import PageTitle from "../../components/PageTitle";
import "./custom-timeline.css"; // 오버라이드용 CSS

import { useBookingDispatch, createBooking } from "../../context/BookingContext";


const today = moment().startOf("day");
const startOfDay = today.clone().hour(9);
const endOfDay = today.clone().hour(18);

const datatableData = [
    ["회의실A", "학생 라운지", "5", "Y","Y","입구 바로앞"],
    ["회의실B", "학생 라운지", "5", "Y","Y","입구 안쪽"],
    ["회의실C", "학생 라운지", "5", "Y","Y","입구 오른쪽"],
    ["회의실D", "학생 라운지", "5", "Y","Y","입구 구석"],
    ["사전학습실", "학습지원실", "12", "Y","Y","다수 인원 수용"],
    ["멘토실1", "학습지원실", "8", "Y","Y","1팀 전용"],
    ["멘토실2", "학습지원실", "8", "Y","Y","2팀 전용"],
  ];


export default function TimelinePage() {

    const dispatch = useBookingDispatch();

    const handleBookingClick = () => {
        if (!isValidTimeRange || selectedRoomIndex === null || !purpose.trim()) return;

        const dataIndex = selectedRoomIndex.dataIndex;
        const selectedRoom = datatableData[dataIndex];
        
        const bookingData = {
          roomId: Number(selectedRoomIndex) + 1, // 예시: 인덱스 기준 ID 부여
          roomName: selectedRoom[0],
          title: purpose,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
        };
      
        createBooking(dispatch, bookingData);
      };


    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
    const isValidTimeRange = startTime && endTime && new Date(startTime) < new Date(endTime);

    useEffect(() => {
        moment.locale("ko");

        const data = [
            {
                roomId: 1,
                roomName: "회의실 A",
                title: "기획 회의",
                startTime: "2025-05-08T09:00:00",
                endTime: "2025-05-08T10:00:00",
                color: "#4CAF50", // 초록
            },
            {
                roomId: 1,
                roomName: "회의실 A",
                title: "주간 회의",
                startTime: "2025-05-08T16:00:00",
                endTime: "2025-05-08T18:00:00",
                color: "#4CAF50", // 초록
            },
            {
                roomId: 2,
                roomName: "회의실 B",
                title: "개발 회의",
                startTime: "2025-05-08T15:00:00",
                endTime: "2025-05-08T16:00:00",
                color: "#2196F3", // 파랑
            },
            {
                roomId: 2,
                roomName: "회의실 B",
                title: "피드백 회의",
                startTime: "2025-05-08T12:00:00",
                endTime: "2025-05-08T13:00:00",
                color: "#2196F3", // 파랑
            },
            {
                roomId: 3,
                roomName: "회의실 C",
                title: "멘토링 2회차",
                startTime: "2025-05-08T10:00:00",
                endTime: "2025-05-08T11:00:00",
                color: "#f3b421", // 주황
            },
            {
                roomId: 3,
                roomName: "회의실 C",
                title: "멘토링 1회차",
                startTime: "2025-05-08T14:00:00",
                endTime: "2025-05-08T15:00:00",
                color: "#f3b421", // 주황
            },
        ];

        const groupList = Object.values(
            data.reduce((acc, item) => {
                acc[item.roomId] = { id: item.roomId, title: item.roomName };
                return acc;
            }, {})
        );

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
        <PageTitle 
            title="예약현황" />
        <Grid container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ margin: "16px 0" }}
              spacing={2}>
            <Grid item xs={12} md={3}>
                <TextField
                label="시작 시간"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={1} container justifyContent="center" alignItems="center">
                <span style={{ fontSize: '1.1rem' }}>~</span>
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                label="종료 시간"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                />
            </Grid>  
            <Grid item xs={12} md={3}>
                <Grid item>
                    <TextField
                        label="사용 목적"
                        placeholder="예: 주간 회의"
                        fullWidth
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                    />
                </Grid>                
            </Grid>  
            <Grid item xs={12} md={2} container justifyContent="center" alignItems="center">
    <Grid item>
        <Button
            variant="contained"
            color="primary"
            onClick={handleBookingClick}
            disabled={!isValidTimeRange || selectedRoomIndex === null || !purpose.trim()}
        >
            예약하기
        </Button>
        {startTime && endTime && new Date(startTime) >= new Date(endTime) && (
            <div style={{ color: 'red', marginTop: 8 }}>
                종료 시간은 시작 시간보다 늦어야 합니다.
            </div>
        )}
    </Grid>
</Grid>

        </Grid>    
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
            <Grid item xs={12}>
                <MUIDataTable
                title="회의실 목록"
                data={datatableData}
                columns={["이름", "위치", "수용 인원", "칸막이","TV","기타"]}
                options={{
                    filterType: "checkbox",
                    selectableRows: 'single',
                    selectableRowsOnClick: true,   
                    rowHover: true,                 
                    textLabels: {
                        body: {
                            noMatch: "데이터가 없습니다",
                        },
                        pagination: {
                            rowsPerPage: "페이지당 글 수",
                            displayRows: "중",
                        },
                        toolbar: {
                            search: "검색",
                            downloadCsv: "CSV 다운로드",
                            print: "인쇄",                            
                            viewColumns: "컬럼 보기",
                            filterTable: "필터",
                        },
                        selectedRows: {
                            text: "행 선택됨",
                            delete: "삭제",
                            deleteAria: "선택된 행 삭제",
                        },
                    },
                    onRowSelectionChange: rowsSelected => {
                        if (rowsSelected.length > 0) {
                            setSelectedRoomIndex(rowsSelected[0]); // 첫 번째 선택
                        } else {
                            setSelectedRoomIndex(null);
                        }
                    },
                }}
                />
            </Grid>            
        </Grid>
        </>
    );
}
