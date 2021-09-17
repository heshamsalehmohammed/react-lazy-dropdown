import React from 'react';

const LazyTag = (props) => {
  const {optionValue, displayBy, handleOptionSelectedUnselected} = props;
  return (
    <li className="tag">
      <span className="tag-title">{optionValue[displayBy]}</span>
      <span
        className="tag-close-icon"
        onClick={(e) => handleOptionSelectedUnselected(false, value)}>
        x
      </span>
    </li>
  );
};


export default LazyTag;