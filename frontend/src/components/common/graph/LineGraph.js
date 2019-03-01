import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Moment from 'moment'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const LineGraph = (props) => {
    let workoutDataFormatted
    let type = null
    if (props.graphStatus === 'graphOne') {
        type = 'line'
        workoutDataFormatted = props.workoutData.map(data => {
            let date = Moment(data.date).format("MM-D")
            let totalWorkVol = data.weight * data.reps
            return {
                label: date,
                value: totalWorkVol
            }
        });
    } else if (props.graphStatus === 'graphTwo') {
        type = 'column2d'
        workoutDataFormatted = props.workoutData.map(data => {
            let date = Moment(data.date).format("MM-D")
            let totalWorkVol = data.weight * data.reps
            return {
                label: date,
                value: totalWorkVol
            }
        });
    }
    console.log(type)


    workoutDataFormatted.reverse();
    JSON.stringify(workoutDataFormatted);

    const chartConfigs = {
        type: type,
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Weight",
                "xAxisName": "Days",
                "yAxisName": "Weight(lbs)",
                "theme": "fusion"
            },
            "data":
                workoutDataFormatted
        },
    };
    return <ReactFC {...chartConfigs} />;
}


export default LineGraph
