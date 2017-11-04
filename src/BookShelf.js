import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import './App.css'

function BookShelf (props) {




    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.filter(book => book.shelf === props.queryStr).map(curBook => (
          <li key={curBook.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${curBook.imageLinks.thumbnail})` }}></div>
                <BookShelfChanger
                  book={curBook}
                  onSelectChange={props.onSelectChange}

                  />
              </div>
              <div className="book-title">{curBook.title}</div>
              <div className="book-authors">{curBook.authors.join(', ')}</div>
            </div>
          </li>


        ))}

      </ol>
      </div>
    </div>
    )

}
export default BookShelf
