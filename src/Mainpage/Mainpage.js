import React, { Component } from 'react'
import classes from "./Mainpage.css"

export class Mainpage extends Component {
    render() {
        return (
            <div className="Mainpage">

                {
                    this.props.datas.slice(0, 5).map((item, index) => {
                        return (
                            <div className='Card' key={index}>
                                <h4 className='Title'>{item.title}</h4>
                                <h5 class='Url'>{item.url}</h5>
                                <span className='Author'>author: {item.by} </span><span className='Score'> score: {item.score}</span>

                            </div>

                        )
                    })
                }


            </div>
        )
    }
}

export default Mainpage
