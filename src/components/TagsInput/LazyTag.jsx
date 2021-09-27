import React from 'react';

const LazyTag = React.memo((props) => {
  const {optionValue, displayBy, handleOptionSelectedUnselected} = props;
  return (
    <li className="tag">
      <span className="tag-title" title={optionValue[displayBy]}>{optionValue[displayBy]}</span>
      <span
        className="tag-close-icon"
        onClick={(e) => handleOptionSelectedUnselected(false, optionValue)}>
        x
      </span>
    </li>
  );
});


export default LazyTag;