import React, { Component } from 'react'
import classes from "./Topbar.css"

export default class Topbar extends Component {
    render() {
        return (
            <div className='Topbar'>

                <h3>Search Hacker News</h3>
                <input type="search" placeholder="search stories by title, url or author" onChange={this.props.HandleInputField} />

            </div>
        )
    }
}
