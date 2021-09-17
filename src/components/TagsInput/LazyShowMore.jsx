import React from 'react';

const LazyShowMore = React.memo((props) => {
  const {
    selectedDataList,
    maximunOptionToShow,
    displayShowMoreOptionCallBack,
  } = props;
  return (
    <li
      className="tag"
      onClick={(e) => displayShowMoreOptionCallBack(selectedDataList)}>
      <span className="tag-title">{`+${
        selectedDataList.length - maximunOptionToShow
      } More`}</span>
    </li>
  );
});

export default LazyShowMore;
