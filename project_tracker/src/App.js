import React, { Component } from 'react'
import NewTask from './components/NewTask'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  render() {
    return (
      <div>
        Welcome to the Project 3 Tracking App

        < NewTask />
      </div>
    )
  }
}
