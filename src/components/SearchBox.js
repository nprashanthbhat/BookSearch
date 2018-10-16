import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import apiConfig from '../keys/apikey.js';
import proxify from 'proxify-url';
import axios from 'axios';

class Searchbox extends Component {
  state = { value: '', results: [], bookDetails: [], title: [] };

  fetchData = (value) => {
    const newValue = value.replace(/\s/g, '+');
    this.goodReadsURL = `https://www.goodreads.com/search/index.xml`;
    this.q = `key=${apiConfig.goodreadsKey}&q=${newValue}`;
    this.url = `${this.goodReadsURL}?${this.q}`;
    let proxyUrl = proxify(this.url, { inputFormat: 'xml' });
    axios.get(proxyUrl, { params: { format: "json" } })
    .then((yqlResponse) => {
        let data = yqlResponse.data;
        this.setState({results: data['query']['results']['GoodreadsResponse']['search']['results']['work']}, () => {
          this.fetchTitles(this.state.results);
        });

    }).catch((error) => {
        console.log(`error: ${error}`);
    });
  }

  fetchTitles = (results) => {
    let title = [], bookDetails = [], bookDet = {};
    results && results.forEach(data => {
      title.push(data['best_book']['title']);
      bookDet = { title: data['best_book']['title'], author: data['best_book']['author']['name'],
        image: data['best_book']['image_url'], id: data['best_book']['id']['content'], rating: data['average_rating']};
      bookDetails.push(bookDet);
    });
    this.setState({ title, bookDetails });
  }

  onChange = (value) => {
    this.fetchData(value);
    this.setState({ value });
  }

  onSelection = (value) => {
    this.setState({ value });
    const { bookDetails } = this.state;
    this.props.cb(
      bookDetails.find(function (item, index) {
        return item.title === value;
      })
    );
}

  render () {
    // const { cb } = this.props;
    const textboxStyle = {
     item: {
       padding: '6px',
       cursor: 'default',
       border: 'none'
     },
     highlightedItem: {
       color: 'white',
       background: 'rgba(100, 100, 100, 0.4)',
       padding: '6px',
       cursor: 'default',
       border: 'none'
     },
     menuStyle: {
       width: '100%',
       background: 'rgba(255, 255, 255, 0.9)',
       boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
       top: '0px',
       left: '0px',
       fontSize: '90%',
       position: 'relative',
       overflow: 'auto',
       zIndex: '1000',
       maxHeight: '6em',
       wordWrap: 'break-word'
     },
     wrapperStyle: {
       padding: '0.4em'
     },
     inputStyle: {
       border: '1px solid grey',
       boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
       borderRadius: '5px',
       width: '100%',
       height: '3em',
       fontSize: '16px',
       textAlign: 'center',
       padding: '5px'
     }
   };

    return (
      <div>
        <div>
        <Autocomplete
          getItemValue={(item) => item}
          items={this.state.title}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item}
            </div>
          }
          value={this.state.value}
          onChange={(event, value) => this.onChange(value)}
          onSelect={value => this.onSelection(value)}
          menuStyle={textboxStyle.menuStyle}
          wrapperStyle={textboxStyle.wrapperStyle}
          inputProps={{ style: textboxStyle.inputStyle,
            placeholder: 'Search by title, author and more',
            type:'search',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: false
          }}
          />
        </div>
      </div>
    );
  }
}

Searchbox.propTypes = {
  cb: PropTypes.func
};

export default Searchbox;
