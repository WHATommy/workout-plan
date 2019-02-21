import React from 'react';
import WorkoutLogsFormat from './WorkoutLogsFormat';

const WorkoutLogsMapping = (props) => {
    return (
        <div>
            {props.workoutLogs.map(data =>
                <WorkoutLogsFormat
                    name={data.name}
                    weight={data.weight}
                    reps={data.reps}
                    date={data.date}
                />
            )}
        </div>
    )
}

export default WorkoutLogsMapping