import axios from 'axios'
import React, { Component } from 'react'
import classes from "./App.css"
import Mainpage from './Mainpage/Mainpage'
import Pagination from './Pagination/Pagination'
import ProgressLoader from './ProgressLoader/ProgressLoader'
import Topbar from './Topbar/Topbar'
export class App extends Component {

  state = {
    data: [],
    isLoading: true,
    datas: [],
    id: 1
  }

  // to get the id of the news
  getIds = async () => {
    const ids = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    // console.log(ids.data)
    return ids.data

  }

  // to get the titke,score,author and url
  getDetails = async (id) => {
    const details = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    // console.log(details.data)

    return details.data

  }

  //to fetch the data dynamically from all the id's
  getInfo = async () => {
    const id = await this.getIds()
    const data = await Promise.all(id.slice(0, 20).map(item => this.getDetails(item)))
    // console.log(data)
    return data
  }


  componentDidMount() {

    setInterval(() => {

      this.getInfo().then(response => {
        // console.log(response)

        this.setState({ data: response })
        this.setState({ datas: this.state.data })
        this.setState({ isLoading: false })
      })
    }, 6000)
  }




  HanldePagination = (n) => {
    // alert(n)

    if (n === 1) {
      this.setState({ datas: this.state.data.slice(0, 5) })
    }

    if (n === 2) {
      this.setState({ datas: this.state.data.slice(5, 10) })
    }

    if (n === 3) {
      this.setState({ datas: this.state.data.slice(10, 15) })
    }

    if (n === 4) {
      this.setState({ datas: this.state.data.slice(15, 20) })
    }
    this.setState({ id: n })
  }


  HandleInputField = (e) => {
    console.log(e.target.value)
    let filtData = this.state.data.filter(item => {
      return (item.by.toLowerCase().includes(e.target.value.toLowerCase()) || item.url.toLowerCase().includes(e.target.value.toLowerCase()) || item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    })
    this.setState({ datas: filtData })
  }

  render() {

    // console.log(this.state.data)
    // console.log(this.state.isLoading)

    return this.state.isLoading === true ? (<ProgressLoader />) : (

      <div className="App">

        <Topbar HandleInputField={this.HandleInputField} />

        <Mainpage datas={this.state.datas} />

        <Pagination HanldePagination={this.HanldePagination} id={this.state.id} />

      </div >
    )
  }
}

export default App
