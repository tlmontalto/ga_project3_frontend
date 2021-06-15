import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'

export default class NewSubTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            completed: false,
            getTasks(){
                fetch(baseURL + '/tasks')
                  .then(data => {return data.json()}, err => console.log(err))
                  .then(parsedData => this.setState({ tasks: parsedData }), err => console.log(err))
              },
              componentDidMount() {
                this.getTasks()
              }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    // handleSubmit method will go here.  It needs to connect to the object of the Task it appears on, send a fetch to that object to create a new object within the subtask Array.
    
    updateTasks(tasks) {
        fetch(baseURL + '/tasks/' + tasks._id, {
          method:'PUT',
          body: JSON.stringify({
            name: tasks.name,
            dueDate: tasks.dueDate,
            description: tasks.description
          }),
          headers: {'Content-Type' : 'application/json'}
        })
        .then(res=>res.json())
        .then(resJson => {
          const copyTasks = [...this.state.tasks];
          const findIndex = this.state.tasks.findIndex(tasks => tasks._id === resJson._id)
          copyTasks[findIndex].name = resJson.name
          copyTasks[findIndex].dueDate = resJson.dueDate
          copyTasks[findIndex].description = resJson.description
          this.setState({tasks: copyTasks})
        })
    
        this.setState({ showUpdate: false })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} />

                    <label htmlFor="completed">Completed?</label>
                    <input type="checkbox" id="completed" name="completed" onChange={this.handleChange} />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}
