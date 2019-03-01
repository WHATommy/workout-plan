import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const LineGraph = (props) => {
    let workoutDataFormatted

    if (props.graphStatus === 'graphOne') {
        workoutDataFormatted = props.workoutData.map(data => {
            return {
                label: data.date,
                value: data.weight
            }
        });
    } else if (props.graphStatus === 'graphTwo') {
        workoutDataFormatted = props.workoutData.map(data => {
            return {
                label: data.reps,
                value: data.weight
            }
        });
    }


    workoutDataFormatted.reverse();
    JSON.stringify(workoutDataFormatted);

    const chartConfigs = {
        type: 'line',
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