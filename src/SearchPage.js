import React from 'react';
import {Link} from 'react-router-dom';
import SingleBook from './SingleBook';
import * as BooksAPI from './BooksAPI';

class SearchPage extends React.Component {
  state={
    query: '',
    foundedBooks: []
  }
  
//Update query based on input
  updateQuery= (query) => {
    this.setState({
    	query: query
    })
    this.updateFoundedBooks(query)
  }
//Update list of books that match
  updateFoundedBooks= (query) => {
    if(query) {
      BooksAPI.search(query).then((foundedBooks)=>{
        if(foundedBooks.error){
          	//this.setState({ hasError: true });
        	this.setState({foundedBooks:[] })
        }else {
        	this.setState({foundedBooks})  
        }
      })
    } else {
    	this.setState({foundedBooks:[] })
    }
  }
  clearQuery= () => {
    this.setState({ 
      query: ''
    })
  }

  render() {
    console.log(this.state.foundedBooks);
	//console.log(this.state.query.length);
    

  	return (
    	<div className="search-books">
            <div className="search-books-bar">
      
                <Link 
      				to='/'
      				className="close-search">Close</Link>

				<div className="search-books-input-wrapper">
                    <input 
						type="text" 
						placeholder="Search by title or author"
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>

				</div>
			</div>
            <div className="search-books-results">
                <ol className="books-grid">
					{this.state.foundedBooks.map(foundedBook => {
                     	let foundedBookShelf;
                     //Set the proper shelf for matched books based by book's id
                     	this.props.books.map(book => (
                     	book.id === foundedBook.id ? foundedBookShelf = book.shelf : ''
                     	));
                    	return(
                     		<li key={foundedBook.id}>
								<SingleBook
									oneBook={foundedBook}
									changeShelf={this.props.changeShelf}
									currentShelf={foundedBookShelf}
								/>
							</li>
                     	)
                      })
					}
				</ol>
				{((this.state.foundedBooks.length === 0) && (this.state.query.length !== 0)) &&(
					<div className='no-matches-books'>
                  		<h2>Unfortunately, no books were found.</h2>
                 	</div>
                )}
            </div>
        </div>
    );
  }
}

export default SearchPage;