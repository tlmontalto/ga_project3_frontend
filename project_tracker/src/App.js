import React, { Component } from 'react'
import NewTask from './components/NewTask'
import Tasks from './components/Tasks'

const baseURL = 'http://localhost:3003'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }

    console.log(this.state.tasks)
  }

  getTasks = () => {
    fetch(baseURL + '/tasks')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => this.setState({ tasks: parsedData }), err => console.log(err))
  }

  componentDidMount() {
    this.getTasks()
  }

  handleAddTask = (task) => {
    const copyTasks = [...this.state.tasks]
    copyTasks.unshift(task)
    this.setState({
      tasks: copyTasks,
      name: '',
    })
  }

  deleteTask = (id) => {
    fetch(`${baseURL}/tasks/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) {
        const findIndex = this.state.tasks.findIndex(task => task._id === id)
        const copyTasks = [...this.state.tasks]
        copyTasks.splice(findIndex, 1)
        this.setState({ tasks: copyTasks })
      }
    })
  }

  

  render() {
    return (
      <div>
        Welcome to the Project 3 Tracking App

        < NewTask handleAddTask={ this.handleAddTask } />

        <div className="container task-board">
          { this.state.tasks.map(task => {
            return (
              <div key={task._id}>
                <h3>{task.name}</h3>
                {/* Why does it only work with dateDue when in every other spot it is dueDate? */}
                <h3>{task.dateDue}</h3>
                <h3>{task.description}</h3>
                < Tasks />
              </div>
          )})}
          
        </div>
        
      </div>
    )
  }
}
