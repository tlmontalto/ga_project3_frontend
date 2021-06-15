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
        fetch(baseURL + '/tasks/' + this.props.task._id)
          .then(data => {return data.json()}, err => console.log(err))
          .then(parsedData => this.setState({ subtasks: parsedData.subTask }), err => console.log(err))
    }

    componentDidMount() {
        this.getSubTasks()
    }

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
            <div className="container">
                <div key={this.props.task._id}>
                    <div className="main-task row">
                        <div className="col-md-10 mt-3">
                            <div className="row my-3 d-flex justify-content-center">
                                <h3 className="col-6">{this.props.task.name}</h3>
                                <h3 className="col-4">{this.props.task.dueDate}</h3>
                            </div>
                            <div className="row my-3 d-flex justify-content-center">
                                <h3 className="col-10">{this.props.task.description}</h3>    
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            <button className="btn btn-danger btn-lg" onClick={(event) => {this.props.deleteTask(this.props.task._id)}}>X</button>
                        </div>
                    </div>
                    
                    < NewSubTask />
                    <div className="sub-list">
                        { this.props.task.subTask.map(subtask => {
                            return (< SubTask subtask={subtask} />)
                        })}
                    </div>
                    
                </div>
            </div>
        )
    }
}
