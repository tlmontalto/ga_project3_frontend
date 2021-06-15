import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'
export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            dueDate: '',
            description: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(baseURL + '/tasks', {
          method: 'POST',
          body: JSON.stringify({
              name: this.state.name,
              dueDate: this.state.dueDate,
              description: this.state.description
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(resJson => {
            //   console.log(resJson)
            this.props.handleAddTask(resJson)
            this.setState({
              name: '',
              dueDate: '',
              description: ''
            })
          })
          .catch(error => console.log({ 'Error': error }))
      }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />

                    <label htmlFor="dueDate"></label>
                    <input type="text" id="dueDate" name="dueDate" placeholder="Due Date" onChange={this.handleChange} value={this.state.dueDate} />

                    <label htmlFor="description"></label>
                    <input type="text" id="description" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} />

                    <input type="submit" value="Add Task"/>

                </form>
            </div>
        )
    }
}
