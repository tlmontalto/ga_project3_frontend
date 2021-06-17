import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://task-project3-backend.herokuapp.com';
}

console.log('current base URL:', baseURL)
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
            <div className="container">
            <div className="form-group">
                <form onSubmit={ this.handleSubmit }>
                    <div className="row d-flex justify-content-center my-3">
                        <div className="col-md-6 form-floating">
                            <input className="form-control" type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />
                            <label className="form-label px-3" htmlFor="name">Name:</label>
                        </div>

                        <div className="col-md-4 form-floating">
                            <input className="form-control" type="date" id="dueDate" name="dueDate" onChange={this.handleChange} value={this.state.dueDate} />
                            <label className="form-label px-3" htmlFor="dueDate">Due Date:</label>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-3">
                        <div className="col-md-10 form-floating">
                            <input className="form-control" type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} />
                            <label className="form-label px-3" htmlFor="description">Description:</label>
                        </div>
                    </div>

                    <div className="text-center">
                        <input className="btn btn-primary" type="submit" value="Add Task"/>
                    </div>

                </form>
            </div>
            </div>
        )
    }
}
