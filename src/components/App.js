import React, { Component } from 'react';
import Searchbox from './SearchBox';
import BookDetail from './BookDetail/BookDetail';
import apiConfig from '../keys/apikey.js';
import proxify from 'proxify-url';
import axios from 'axios';

class App extends Component {

  state = {
    bookInfo: {}
  };

  fetchDetails = (value) => {
    this.goodReadsURL = `https://www.goodreads.com/book/show/${value}.xml`;
    this.q = `key=${apiConfig.goodreadsKey}`;
    this.url = `${this.goodReadsURL}?${this.q}`;
    let proxyUrl = proxify(this.url, { inputFormat: 'xml' });
    axios.get(proxyUrl, { params: { format: "json" } })
    .then((yqlResponse) => {
        let data = yqlResponse.data;
        const { bookInfo } = this.state;
        bookInfo['description'] = data['query']['results']['GoodreadsResponse']['book']['description'];
        bookInfo['ratingsCount'] = data['query']['results']['GoodreadsResponse']['book']['ratings_count'];
        bookInfo['reviewsCount'] = data['query']['results']['GoodreadsResponse']['book']['text_reviews_count'];
        this.setState({ bookInfo });
    }).catch((error) => {
        console.log(`error: ${error}`);
    });
  }

titleCallback = (bookInfo) => {
  this.setState({ bookInfo });
  this.fetchDetails(bookInfo.id);
};

  render() {
    const { bookInfo } = this.state;
    const styles = {
      outerContainer: {
        flex: 9,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }
    };
    return (
      <div className={styles.outerContainer}>
        <Searchbox
        cb={this.titleCallback}
        />
        <BookDetail
        bookInfo={bookInfo}
        />
      </div>
    );
  }
}

export default App;
