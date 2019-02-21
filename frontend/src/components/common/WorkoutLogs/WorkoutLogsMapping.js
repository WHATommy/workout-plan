import React from 'react';
import WorkoutLogsFormat from './WorkoutLogsFormat';

const WorkoutLogsMapping = (props) => {
    console.log(props)
    return (
        <div>
            {props.workoutLogs.map(data =>
                <WorkoutLogsFormat
                    name={data.name}
                    weight={data.weight}
                    reps={data.reps}
                />
            )}
        </div>
    )
}

export default WorkoutLogsMapping