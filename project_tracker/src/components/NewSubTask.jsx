import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'

export default class NewSubTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            name: '',
            description: '',
            completed: false,
            
        }
    }

    getTasks(){
        fetch(baseURL + '/tasks')
          .then(data => {return data.json()}, err => console.log(err))
          .then(parsedData => this.setState({ tasks: parsedData }), err => console.log(err))
    }

    componentDidMount() {
        this.getTasks()
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    // handleSubmit method will go here.  It needs to connect to the object of the Task it appears on, send a fetch to that object to create a new object within the subtask Array.
    
    updateSubTasks = (e, tasks) => {
        e.preventDefault()
        console.log('this is before fetch ' + tasks)
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
          const copyTasks = [...this.state.tasks];
          const findIndex = this.state.tasks.findIndex(tasks => tasks._id === this.props.id)
          console.log(resJson)
          console.log(copyTasks)
          console.log(findIndex)
        //   copyTasks[findIndex].subTask.name = this.state.name
        //   copyTasks[findIndex].description = resJson.description
          this.setState({tasks: copyTasks})
        })
    
        this.setState({ showUpdate: false })
    }

    render() {
        return (
                <div className="form-group">
                    <form onSubmit={(event) => this.updateSubTasks(event, this.props.id) }>
                        <div className="row d-flex justify-content-center mb-3">
                            
                            <div className="col-sm-4 form-floating">

                                <input className="form-control" type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />
                                <label className="form-label px-3" htmlFor="name">Subtask Name:</label>

                            </div>
                                
                            <div className="col-sm-6 form-floating">
                                
                                <input className="form-control" type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} />
                                <label className="form-label px-3" htmlFor="description">Description:</label>

                            </div>

                            {/* <label htmlFor="completed">Completed?</label>
                            <input type="checkbox" id="completed" name="completed" onChange={this.handleChange} /> */}
                        </div>
                        <div className="text-center">

                            <input className="btn btn-primary btn-sm" type="submit" value="Add Subtask" />

                        </div>
                    </form>
                </div>
        )
    }
}
