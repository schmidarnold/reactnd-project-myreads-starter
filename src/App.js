import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      books:[]

      }
    }



  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }
  updateShelf=(curBook, shelf)=>{
    // in a future step checking returning jsonStr
    BooksAPI.update(curBook,shelf).then((jsonStr)=>{
      if (shelf!== "none"){
        curBook.shelf = shelf;
        this.setState((prevState)=>({
          books: prevState.books.filter((b) =>(b.id!==curBook.id)).concat([curBook])
        }))
      }else{
        curBook.shelf = shelf;
        this.setState((prevState)=>({
          books: prevState.books.filter((b)=>(b.id!==curBook.id))
        }))
      }
    })
  }

  render() {
    const QUERY = {
      READING : "currentlyReading",
      READ: "read",
      WANTTOREAD : "wantToRead",
      NONE: "none"
    };
    return (
      <div className="app">
          <Route exact path="/search" render={()=>
              (
                <BookSearch
                  books={this.state.books}
                  onSelectChange={this.updateShelf}
                  />
              )

          }/>
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>

                      <BookShelf
                        books={this.state.books}
                        queryStr={QUERY.READING}
                        onSelectChange={this.updateShelf} />

                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                    <BookShelf
                      books={this.state.books}
                      queryStr={QUERY.WANTTOREAD}
                      onSelectChange={this.updateShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                    <BookShelf
                      books={this.state.books}
                      queryStr={QUERY.READ}
                      onSelectChange={this.updateShelf} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='search'>Add a Book</Link>
            </div>
          </div>
          )

        }/>


      </div>
    )
  }
}


export default BooksApp;
