import React, { Component } from 'react'
import NewSubTask from './NewSubTask'
import SubTask from './SubTask'

export default class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
    }

    render() {
        return (
            <div key={this.props.task._id}>
                <h3>{this.props.task.name}</h3>
                <h3>{this.props.task.dueDate}</h3>
                <h3>{this.props.task.description}</h3>
                
                < NewSubTask />
                <div className="sub-list">
                    { this.props.task.subTask.map(subtask => {
                        return (< SubTask subtask={subtask} />)
                    })}
                </div>
                
            </div>
        )
    }
}
