import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const LineGraph = (props) => {
    console.log(props)
    const workoutDataFormatted = props.workoutData.map(data => {
        return {
            label: data.name,
            value: data.weight,
            date: data.date
        }
    });

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
                "numberSuffix": "K",
                "theme": "fusion"
            },
            "data":
                workoutDataFormatted
        },
    };
    return <ReactFC {...chartConfigs} />;
}


export default LineGraph