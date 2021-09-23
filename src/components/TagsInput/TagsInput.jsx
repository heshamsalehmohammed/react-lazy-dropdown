import './TagsInput.css';
import React, {useRef, useEffect} from 'react';
import LazyTag from './LazyTag';
import LazyShowMore from './LazyShowMore';

const TagsInput = React.memo((props) => {
  const {
    uniqueKey,
    displayBy,
    Filterable,
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
    RenderTagComponent,
    RenderLimitComponent,
    RenderInputComponent,
    OnInputPasteHandler,
  } = props;

  const lazyInputRef = useRef(null);
  useEffect(() => {
    if (!tagsInputDisabled) {
      lazyInputRef.current?.focus();
    }
  }, [tagsInputDisabled]);

  const getTagComponent = (
    index,
    value,
    displayBy,
    handleOptionSelectedUnselected
  ) => {
    if (RenderTagComponent != null) {
      return RenderTagComponent({
        key: index,
        optionValue: value,
        handleOptionSelectedUnselected: handleOptionSelectedUnselected,
      });
    }
    return (
      <LazyTag
        key={index}
        optionValue={value}
        displayBy={displayBy}
        handleOptionSelectedUnselected={handleOptionSelectedUnselected}
      />
    );
  };

  const getShowMoreComponent = (
    selectedDataList,
    maximunOptionToShow,
    displayShowMoreOptionCallBack
  ) => {
    if (RenderLimitComponent != null) {
      return RenderLimitComponent(selectedDataList);
    }
    return (
      <LazyShowMore
        selectedDataList={selectedDataList}
        maximunOptionToShow={maximunOptionToShow}
        displayShowMoreOptionCallBack={displayShowMoreOptionCallBack}
      />
    );
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {renderedSelectedDataList.map((value, index) => {
          return getTagComponent(
            index,
            value,
            displayBy,
            handleOptionSelectedUnselected
          );
        })}
        {selectedDataList.length > maximunOptionToShow &&
          displayShowMoreOption &&
          getShowMoreComponent(
            selectedDataList,
            maximunOptionToShow,
            displayShowMoreOptionCallBack
          )}
      </ul>
      {Filterable &&
        (RenderInputComponent == null ? (
          <input
            ref={lazyInputRef}
            autoFocus
            disabled={tagsInputDisabled}
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            placeholder={placeHolder}
            onPaste={OnInputPasteHandler}
          />
        ) : (
          RenderInputComponent({
            ref: lazyInputRef,
            disabled: tagsInputDisabled,
            type: 'text',
            value: searchValue,
            onChange: onSearchChange,
            placeholder: placeHolder,
          })
        ))}
    </div>
  );
});

export default TagsInput;
