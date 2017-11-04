import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class BookSearch extends Component {
  constructor(props){
    super(props);
    this.state ={
      query:'',
      matchesOfBooks:[]

      }
    }

  updateQuery=(query)=>{
    this.setState({query: query.trim()})
      if (query){
        BooksAPI.search(query,20).then((results)=>{
          this.setState({ matchesOfBooks: !results.error ? results : []})})




      }else{
        this.setState({matchesOfBooks:[]})
      }
    }





  clearQuery=()=>{
    this.setState({query:'',matchesOfBooks:[]})
  }
  render() {
    const{books,onSelectChange}=this.props
    const {query,matchesOfBooks}=this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>

          </div>
          <button onClick={this.clearQuery}>Clear</button>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {matchesOfBooks.map((curBook)=>{
              let bookInShelf = books.find(b=>b.id===curBook.id)
              return(
              <li key={curBook.id}>
                <div className="book">
                  <div className="book-top">

                    {(curBook != null) &&(

                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${curBook.imageLinks.thumbnail})` }}></div>
                    )}

                    <div className="book-shelf-changer">
                      <select value={bookInShelf?bookInShelf.shelf:"none"} onChange={e => onSelectChange(curBook, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{curBook.title}</div>
                  <div className="book-authors">{curBook.authors?curBook.authors.join(', '):""}</div>
                </div>
              </li>
              )
            })

            }

          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch;
