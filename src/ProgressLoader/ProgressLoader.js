import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import classes from "./ProgressLoader.css"
import loader from "../assets/loader.gif"

export default class ProgressLoader extends Component {
    render() {
        return (
            <div className={classes.ProgressLoader}>
                <img src={loader} alt="Loader" />
            </div>
        )
    }
}
