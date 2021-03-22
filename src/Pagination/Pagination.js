import React, { Component } from 'react'
import classes from "./Pagination.css"

export class Pagination extends Component {
    render() {
        return (
            <div className='Pagination' >

                {
                    [1, 2, 3, 4].map(item => {
                        return (
                            <div className={this.props.id === item ? 'Active': "Box"} key={item} onClick={() => this.props.HanldePagination(item)} >
                                {item}
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}

export default Pagination
