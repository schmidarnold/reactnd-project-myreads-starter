import React, {Component} from 'react'
import './App.css'

class BookShelf extends Component {

  render() {


    return (

      <div className="bookshelf-books">
      <ol className="books-grid">
        {this.props.books.filter(book => book.shelf === this.props.queryStr).map(curBook => (
          <li key={curBook.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${curBook.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={curBook.shelf} onChange={e => this.props.onSelectChange(curBook, e.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{curBook.title}</div>
              <div className="book-authors">{curBook.authors.join(', ')}</div>
            </div>
          </li>


        ))}

      </ol>
      </div>
    )
  }
}
export default BookShelf
