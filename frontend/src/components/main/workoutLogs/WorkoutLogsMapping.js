import React from 'react';
import WorkoutLogsFormat from '../workoutLogs/WorkoutLogsFormat';

const WorkoutLogsMapping = (props) => {
    const folderId = props.folderId
    let workoutLogs = props.workoutLogs
    if (workoutLogs === undefined) {
        workoutLogs = []
    };
    return (
        <div>
            {workoutLogs.map(data =>
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