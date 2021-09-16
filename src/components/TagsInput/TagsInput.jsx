import './TagsInput.css';
import React, {useState} from 'react';

const TagsInput = (props) => {
  const {
    uniqueKey,
    displayBy,
    placeHolder,
    dataList,
    onSearchChange,
    searchValue,
    handleOptionSelectedUnselected,
    displayShowMoreOption,
    maximunOptionToShow,
    displayShowMoreOptionCallBack,
  } = props;

  let renderedDataList =
    displayShowMoreOption <= 0
      ? dataList
      : dataList.slice(0, maximunOptionToShow);

  return (
    <div className="tags-input">
      <ul id="tags">
        {renderedDataList.map((value, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{value[displayBy]}</span>
            <span
              className="tag-close-icon"
              onClick={(e) => handleOptionSelectedUnselected(false, value)}>
              x
            </span>
          </li>
        ))}
        {dataList.length > maximunOptionToShow && displayShowMoreOption && (
          <li
            className="tag"
            onClick={(e) => displayShowMoreOptionCallBack(dataList)}>
            <span className="tag-title">{'Show More'}</span>
          </li>
        )}
      </ul>
      <input
        type="text"
        value={searchValue}
        onChange={onSearchChange}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TagsInput;
