import React from 'react';
import WorkoutFolderFormat from './WorkoutFolderFormat';

const WorkoutFolderMapping = (props) => {
    console.log(props)
    return (
        <div>
            {props.workoutFolders.map(data =>
                <WorkoutFolderFormat
                    id={data.id}
                    name={data.workoutFolderName}
                />
            )}
        </div>
    )
}

export default WorkoutFolderMapping