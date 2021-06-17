import React, { Component } from 'react'

export default class AffirmationsApi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            affirmation: null,
            isLoaded: false,
        }
    }

    getAffirmation = () => {
        fetch('http://localhost:3003/affirmations')
            // .then((res) => {console.log(res)})
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
            <div>
                <div className="card" >
                        <div className="affirmation card-title text-center" >
                            <h4>{this.state.affirmation}</h4>
                        </div>
                        <div className="card-footer text-end">
                            <button onClick={() => {this.getAffirmation()}} >New Affirmation</button>
                        </div>
                </div>
                
            </div>
        )
    }
}