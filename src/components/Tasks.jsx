import React, { Component } from 'react'
import NewSubTask from './NewSubTask'
import SubTask from './SubTask'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://task-project3-backend.herokuapp.com';
}

console.log('current base URL:', baseURL)

export default class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: {},
            subtasks: [],
            name: '',
            description: '',
            completed: false,
        }
    }

    getTaskInfo = () => {
        fetch(`${baseURL}/tasks/${this.props.task._id}`, {
            method: 'GET'
        }).then(data => {
            return data.json()}, err => console.log(err))
          .then(parsedData => this.setState({ task: parsedData }), err => console.log(err))
    }

    componentDidMount() {
        this.getTaskInfo()
        // this.setState({ subtasks: this.state.task.subTask })
    }

    // Currently unused but could be utilized for future functionality
    // deleteSubTask = (subtask) => {
    //     fetch(baseURL + '/tasks/' + this.props.task._id, {
    //       method: 'PUT',
    //       body: JSON.stringify({ subTask: this.props.task.subTask }),
    //       headers: { 'Content-Type': 'application/json'}
    //     }).then(res => {
    //       if (res.status === 200) {
    //         const findIndex = this.props.tasks.findIndex(subtask => this.props.task.subTask === subtask)
    //         const copySubTasks = [...this.props.task.subTask]
    //         copySubTasks.splice(findIndex, 1)
    //         this.setState({ subtasks: copySubTasks })
    //       }
    //     })
    // }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }
    
    addSubTask = (e, tasks) => {
        e.preventDefault()
        console.log('this is id for mongo: ' + tasks)
        fetch(`${baseURL}/tasks/${tasks}/update`, {
          method:'PUT',
          body: JSON.stringify({
            name: this.state.name,
            description: this.state.description
          }),
          headers: {'Content-Type' : 'application/json'}
        })
        .then(res=>res.json())
        .then(resJson => {
            this.getTaskInfo()
            this.setState({
                // task: copyTask,
                name: '',
                description: ''
            })
        })
    
        this.setState({ showUpdate: false })
    }

    render() {
        return (

                <div className="one-task card" key={this.props.task._id}>
                    <div className="main-task row">
                    <div className="card-header text-end">
                            <button className="btn btn-danger btn-md" onClick={(event) => {this.props.deleteTask(this.state.task._id)}}>X</button>
                        </div>
                        <div className="card-body col-md-10 mt-3">

                            <div className="d-flex justify-content-center card-title">
                                <p className="col-6 fs-4">{this.state.task.name}</p>
                                <p className="col-4 fs-4">{this.state.task.dueDate}</p>
                            </div>

                            <div className="d-flex justify-content-center">
                                <p className="col-10 fs-4">{this.state.task.description}</p>    
                            </div>

                        </div>
                   
                    </div>
                    
                    <div className="sub-list list-group mb-3 mx-3 px-2 fs-5">
                        <ul>
                            { this.state.task.subTask && this.state.task.subTask.map((subtask, key) => {
                                return (< SubTask subtaskName={subtask.name} subtaskDesc={subtask.description} key={key} />)
                            })}
                        </ul>
                    </div>

                        {/* < NewSubTask id={this.props.task._id} /> */}
                            <div className="card-footer d-flex column-nowrap form-group">
                            <form onSubmit={(event) => this.addSubTask(event, this.state.task._id) }>
                                <div className="mb-3">
                                
                                    <div className="form-floating mb-2">

                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            onChange={this.handleChange} 
                                            value={this.state.name} 
                                        />
                                        <label 
                                            className="form-label px-3" 
                                            htmlFor="name">Subtask Name:
                                        </label>

                                    </div>
                                    
                                    <div className="form-floating">
                                        
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            id="description" 
                                            name="description" 
                                            onChange={this.handleChange} 
                                            value={this.state.description} 
                                        />
                                        <label 
                                            className="form-label px-3" 
                                            htmlFor="description">Description:
                                        </label>

                                    </div>

                                </div>

                                <div className="text-center">

                                    <input 
                                        className="btn btn-primary btn-sm" 
                                        type="submit" 
                                        value="Add Subtask" 
                                    />

                                </div>
                            </form>
                    </div>
                    
                </div>

        )
    }
}