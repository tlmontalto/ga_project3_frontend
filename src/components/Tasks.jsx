import React, { Component } from 'react'
import NewSubTask from './NewSubTask'
import SubTask from './SubTask'

const baseURL = 'http://localhost:3003'

export default class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subtasks: []
        }
    }

    getSubTasks = () => {
        fetch(`${baseURL}/tasks/${this.props.task._id}`, {
            method: 'GET'
        }).then(data => {
            return data.json()}, err => console.log(err))
          .then(parsedData => this.setState({ task: parsedData }), err => console.log(err))
    }

    componentDidMount() {
        this.getSubTasks()
        // this.setState({ subtasks: this.task.subTask })
    }

    // Currently unused but could be utilized for future functionality
    deleteSubTask = (subtask) => {
        fetch(baseURL + '/tasks/' + this.props.task._id, {
          method: 'PUT',
          body: JSON.stringify({ subTask: this.props.task.subTask }),
          headers: { 'Content-Type': 'application/json'}
        }).then(res => {
          if (res.status === 200) {
            const findIndex = this.props.tasks.findIndex(subtask => this.props.task.subTask === subtask)
            const copySubTasks = [...this.props.task.subTask]
            copySubTasks.splice(findIndex, 1)
            this.setState({ subtasks: copySubTasks })
          }
        })
    }

    render() {
        return (

                <div key={this.props.task._id}>
                    <div className="main-task row">
                        <div className="col-md-10 mt-3">
                            <div className="row my-3 d-flex justify-content-center">
                                <p className="col-6 fs-4">{this.props.task.name}</p>
                                <p className="col-4 fs-4">{this.props.task.dueDate}</p>
                            </div>
                            <div className="row my-3 d-flex justify-content-center">
                                <p className="col-10 fs-4">{this.props.task.description}</p>    
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            <button className="btn btn-danger btn-lg" onClick={(event) => {this.props.deleteTask(this.props.task._id)}}>X</button>
                        </div>
                    </div>
                    
                    <div className="sub-list text-center mb-3 fs-5">
                        { this.props.task.subTask.map((subtask, key) => {
                            return (< SubTask subtaskName={subtask.name} subtaskDesc={subtask.description} key={key} />)
                        })}
                    </div>

                    <div className="mb-3">
                        < NewSubTask id={this.props.task._id} />
                    </div>
                    
                </div>

        )
    }
}