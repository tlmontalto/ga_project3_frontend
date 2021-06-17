import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://task-project3-backend.herokuapp.com';
}

console.log('current base URL:', baseURL)
export default class AffirmationsApi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            affirmation: null,
            isLoaded: false,
        }
    }

    getAffirmation = () => {
        fetch(`${baseURL}/affirmations`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                affirmation: json.affirmation,
            })
        })
    }

    componentDidMount() {
        this.getAffirmation()
    }

    render() {
        return (
                <div className="d-flex row-nowrap">
                        <div className="affirmation-text" >
                            <h4>{this.state.affirmation}</h4>
                        </div>
                            <button className="affirmation-button" onClick={() => {this.getAffirmation()}} >New Affirmation</button>
                </div>
        )
    }
}