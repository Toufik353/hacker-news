import axios from 'axios'
import React, { Component } from 'react'
import classes from "./App.css"
export class App extends Component {

  state = {
    data: [],
    isLoading: false,
    datas: []
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


    this.getInfo().then(response => {
      // console.log(response)

      this.setState({ data: response })
      this.setState({ datas: this.state.data })
    })
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
  }


  HandleInputField = (e) => {
    console.log(e.target.value)
    let filtData = this.state.data.filter(item => {
      return (item.by.toLowerCase().includes(e.target.value.toLowerCase()) || item.url.toLowerCase().includes(e.target.value.toLowerCase()) || item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    })
    this.setState({datas:filtData})
  }

  render() {

    // console.log(this.state.data)
    // console.log(this.state.isLoading)
    return (
      <div className="App">
        {/* Topbar start */}
        <div className='Topbar'>

          <h3>Search Hacker News</h3>
          <input type="search" placeholder="search stories by title, url or author" onChange={this.HandleInputField} />

        </div>
        {/* Topbar end */}

        {/* Mainpage start */}
        <div className="Mainpage">

          {
            this.state.datas.slice(0, 5).map((item, index) => {
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
        {/* Mainpage end */}

        {/* Pagination start */}

        <div className='Pagination' >

          {
            [1, 2, 3, 4].map(item => {
              return (
                <div className='Box' key={item} onClick={() => this.HanldePagination(item)}>
                  {item}
                </div>

              )
            })
          }




          {/* Pagination end */}





        </div>

      </div>
    )
  }
}

export default App
