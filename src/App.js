import React, { Component } from 'react'
import NewTask from './components/NewTask'
import Tasks from './components/Tasks'
import AffirmationsApi from './components/AffirmationsApi'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://task-project3-backend.herokuapp.com';
}

console.log('current base URL:', baseURL)

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
      <div className="container">
        <div className="top">
          <div className="header text-center text-decoration-underline">
            <h1>Welcome to the Project 3 Tracking App</h1>
          </div>

          <div className="affirmation text-center">
            < AffirmationsApi />
          </div>  
        </div>

        < NewTask handleAddTask={ this.handleAddTask } />
        


        <div className="task-board">
          { this.state.tasks.map(task => {
            return (
              < Tasks task={task} key={task._id} deleteTask={this.deleteTask} />
          )})}
          
        </div>
      </div>
    )
  }
}