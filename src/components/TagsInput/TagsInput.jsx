import './TagsInput.css';
import React, {useRef,useEffect} from 'react';

const TagsInput = React.memo((props) => {
  const {
    uniqueKey,
    displayBy,
    placeHolder,
    selectedDataList,
    renderedSelectedDataList,
    onSearchChange,
    searchValue,
    handleOptionSelectedUnselected,
    displayShowMoreOption,
    maximunOptionToShow,
    displayShowMoreOptionCallBack,
    tagsInputDisabled,
  } = props;

  const lazyInputRef = useRef(null);
  useEffect(() => {
    if (!tagsInputDisabled) {
      lazyInputRef.current.focus();
    }
  }, [tagsInputDisabled]);

  return (
    <div className="tags-input">
      <ul id="tags">
        {renderedSelectedDataList.map((value, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{value[displayBy]}</span>
            <span
              className="tag-close-icon"
              onClick={(e) => handleOptionSelectedUnselected(false, value)}>
              x
            </span>
          </li>
        ))}
        {selectedDataList.length > maximunOptionToShow &&
          displayShowMoreOption && (
            <li
              className="tag"
              onClick={(e) => displayShowMoreOptionCallBack(selectedDataList)}>
              <span className="tag-title">{`+${
                selectedDataList.length - maximunOptionToShow
              } More`}</span>
            </li>
          )}
      </ul>
      <input
        ref={lazyInputRef}
        autoFocus
        disabled={tagsInputDisabled}
        type="text"
        value={searchValue}
        onChange={onSearchChange}
        placeholder={placeHolder}
      />
    </div>
  );
});

export default TagsInput;
