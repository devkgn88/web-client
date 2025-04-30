import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    timelineController: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 20,
    },
    dashedBorder: {
        border: "1px dashed",
        borderColor: theme.palette.primary.main,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(1),
    },
    dateChangeButton: {
        color: "white",
        textTransform: "none",
        minWidth: 40,
        lineHeight: '1.48 !important',
    },
    todayDateElement: {
        color: '#6E6E6E',
        fontSize: "1.285rem !important",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    headerWrapper: {
        display: "flex",
        backgroundColor: "#f0f0f0",
        overflowX: "auto",
        width: "100%",
        borderTop: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
    },
    timeSlot: {
        flex: "0 0 auto",
        width: 80,
        textAlign: "center",
        padding: theme.spacing(1),
        fontSize: 12,
        borderRight: "1px solid #ddd",
        "&:first-child": {
            borderLeft: "1px solid #ddd",
        },
    },
}));