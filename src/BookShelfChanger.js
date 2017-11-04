import React from 'react'
import './App.css'

function BookShelfChanger (props){

  return(
    <div className="book-shelf-changer">
      <select value={props.book?props.book.shelf:"none"} onChange={e => props.onSelectChange(props.book, e.target.value)}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )

}
export default BookShelfChanger
