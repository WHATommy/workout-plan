import React from 'react';

const WorkoutLogsFormat = (props) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.weight}</p>
            <p>{props.reps}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default WorkoutLogsFormat