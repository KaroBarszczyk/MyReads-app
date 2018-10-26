import React from 'react';

class SingleBook extends React.Component {
  render() {
    //Variable for cases when a book does not have a thumbnail or an author 
    let bookCover = this.props.oneBook.imageLinks ? this.props.oneBook.imageLinks.thumbnail: '';
  	return(
    	<div className="book">
        	<div className="book-top">
            	<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookCover}")` }}></div>
                	<div className="book-shelf-changer">
                    	<select onChange={(event) => this.props.changeShelf(this.props.oneBook, event.target.value)}
						defaultValue={this.props.currentShelf || 'none'}>
                        	<option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                	<div className="book-title">{this.props.oneBook.title}</div>
                    <div className="book-authors">{this.props.oneBook.authors}</div>
                </div> 
    )
  }
}

export default SingleBook;