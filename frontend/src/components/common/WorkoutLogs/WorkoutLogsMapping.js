import React from 'react';
import WorkoutLogsFormat from './WorkoutLogsFormat';

const WorkoutLogsMapping = (props) => {
    const folderId = props.folderId
    return (
        <div>
            {props.workoutLogs.map(data =>
                <WorkoutLogsFormat
                    id={data.id}
                    name={data.name}
                    weight={data.weight}
                    reps={data.reps}
                    date={data.date}
                    folderId={folderId}
                />
            )}
        </div>
    )
}

export default WorkoutLogsMapping