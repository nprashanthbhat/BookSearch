import React from 'react';
import { shallow } from 'enzyme';
import BookDetail from '../BookDetail';

describe('BookDetail', () => {
  const props = {
    bookInfo: []
  };

  it('book details array', () => {
    props.bookInfo = [{
      title: 'The Old Man and the Sea',
      image: 'https://images.gr-assets.com/books/1329189714m/2165.jpg',
      author: 'Ernest Hemingway',
      rating: '3.75',
      description: 'It is the story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin far out in the Gulf Stream.',
      ratingsCount: '594120',
      reviewsCount: '13850'
    }];
  });

const bookdetails = shallow(<BookDetail {...props} />);

it ('renders without crashing', () => {
  expect(bookdetails).toMatchSnapshot();
});

});
