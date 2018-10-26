import React from 'react';
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage.js';
import MainPage from './MainPage.js';

import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
  	books: []
  }
//Function to get all books with assigned shelf and save them
updateBooks=() =>{
	BooksAPI.getAll().then((books)=>{
		this.setState({books})
	})
}

//Function to change book's shelf
changeShelf= (book, shelf) => {
	BooksAPI.update(book, shelf).then(() =>{
  	this.updateBooks()
	})
}

componentDidMount() {
	this.updateBooks()
}


  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
		<Route exact path='/' render={() => (
          <MainPage
          	booksList={this.state.books}
          	changeShelf={this.changeShelf}
          />
          )}
		/>
		
		<Route path='/search' render={() => (
          <SearchPage
          	changeShelf={this.changeShelf}
			books={this.state.books}
          />
          )}
        />
      
      </div>
    )
  }
}

export default BooksApp
