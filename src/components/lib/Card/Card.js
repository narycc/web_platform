/**
 * Created by wenbinzhang on 2017/5/17.
 */
import React from 'react';

const Card = ({children, className, style = {}, topImageSrc, bottomImageSrc, cardImageSrc, header, footer}) => {

  let topImage;
  let bottomImage;
  let cardImage;

  if (cardImageSrc) {
    cardImage = <img className="card-img" src={cardImageSrc} alt="card-img"/>
  } else {
    if (topImageSrc) {
      topImage = <img className="card-img-top" src={topImageSrc} alt="card-img-top"/>
    }

    if (bottomImageSrc) {
      bottomImage = <img className="card-img-bottom" src={bottomImageSrc} alt="card-img-bottom"/>
    }
  }

  let cardHeader;
  if (header && header.text) {
    let headerClass = 'card-header';
    if (header.className) {
      headerClass += ' ' + header.className;
    }
    cardHeader = <div className={headerClass}>{header.text}</div>
  }

  let cardFooter;
  if (footer && footer.text) {
    let footerClass = 'card-footer';
    if (footer.className) {
      footerClass += ' ' + footer.className;
    }
    cardFooter = <div className={footerClass}>{footer.text}</div>
  }

  let cardClass = 'card';
  if (className) {
    cardClass += ' ' + className;
  }


  if (cardImage) {

    return (
      <div className={cardClass} style={style}>
        {cardImage}
        <div className="card-img-overlay">
          {children}
        </div>
        {cardFooter}
      </div>
    );

  } else {
    return (
      <div className={cardClass} style={style}>
        {cardHeader}
        {topImage}
        <div className="card-block">
          {children}
        </div>
        {bottomImage}
        {cardFooter}
      </div>
    )
  }

};

export default Card;