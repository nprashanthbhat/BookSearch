import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import StarRatingComponent from 'react-star-rating-component';

const BookDetail = (props) => {

  const { title, image, author, rating,
    description, ratingsCount, reviewsCount } = props.bookInfo;
  const { imageContainer, imageStyle, detailsContainer,
    titleStyle, descContainer, rowStyle, textStyle } = styles;

    return(
      <table>
        <tr style={rowStyle}>
          <td style={imageContainer}>
            {'image' in props.bookInfo && <div>
              <img src={image ? image : ''} alt='' style={imageStyle}/>
            </div>
            }
            {'rating' in props.bookInfo && <div>
                <StarRatingComponent starCount={5} value={rating} />
              <div>
                {rating} / 5
              </div>
            </div>}
          </td>
          <td style={detailsContainer}>
              <div style={titleStyle}>{title}</div>
            {'author' in props.bookInfo && <div
              style={styles.authorInfo}>{`By `}{author}
            </div>
            }
            <div style={textStyle}>
              {'ratingsCount' in props.bookInfo && <text><b>{ratingsCount}</b> ratings &nbsp;</text>}
              {'reviewsCount' in props.bookInfo && <text><b>{reviewsCount}</b> reviews</text>}
            </div>
            {'description' in props.bookInfo && <div
              style={descContainer}>{ReactHtmlParser(description)}
            </div>
            }
          </td>
        </tr>
      </table>
  );
}

const styles = {
  imageContainer: {
    margin: 5,
    minWidth: '8em',
    textAlign: 'center'
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  detailsContainer: {
    padding: 10
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  authorInfo: {
    fontSize: '18',
    fontStyle: 'italic',
    paddingBottom: 10
  },
  descContainer: {
    overflow : 'scroll'
  },
  rowStyle: {
    verticalAlign: 'top'
  },
  textStyle: {
    color: 'green',
    fontSize: 15,
    padding: 5
  }
};

export default BookDetail;
