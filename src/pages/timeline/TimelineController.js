import React from "react";
import classnames from "classnames";
// component
import Widget from "../../components/Widget";
import { Button, Typography } from "../../components/Wrappers/Wrappers";

// styles
import useStyles from "./style.js";


export default function TimelineController({onDateChange, currentDate}){
    var classes = useStyles();
    return(
        <Widget title="일일 예약" disableWidgetMenu>
            <div className={classes.timelineController}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onDateChange(-1)}
                    className={classnames(classes.dateChangeButton)}
                >
                    &lt; 
                </Button>
                <Typography className={classes.todayDateElement}>
                    {currentDate}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onDateChange(1)}
                    className={classnames(classes.dateChangeButton)}
                >
                    &gt; 
                </Button>
            </div>
        </Widget>
    );
}