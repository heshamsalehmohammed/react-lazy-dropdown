import './LazySelect.css';
import React, {useState, useEffect} from 'react';

const LazySelect = React.memo((props) => {
  const {
    ApiURL,
    UniqueKey,
    DisplayBy,
    PlaceHolder = 'Select Items ...',
    Filterable = true,
    PageSize = 10,
    SearchQueryParamName = 'search',
    PageNumberQueryParamName = 'page',
    PageSizeQueryParamName = 'size',
  } = props;

  if (!UniqueKey) {
    throw new Error('the name of the UniqueKey of your data must be provided');
  }

  const [search, setSearch] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [localDataList, setLocalDataList] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  const appendIsSelectedToFetchedData = (data) => {
    return data?.map((dl) => ({...dl, isSelected: false})) ?? [];
  };


  const handleCheckboxClicked = (event, objectOfList) => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected:
          ldl[UniqueKey] == objectOfList[UniqueKey]
            ? event.target.checked
            : ldl.isSelected,
      }))
    );
  };

  const getLiListItems = () => {
    return localDataList.map((value, index) => {
      return (
        <div
          key={index}
          className={
            'lazyselectcheckbox-container' +
            (value.isSelected ? ' lazyselectcheckbox-active' : '')
          }>
          <input
            type="checkbox"
            className="lazyselectcheckbox"
            onChange={(e) => handleCheckboxClicked(e, value)}
            checked={value.isSelected}
          />
          <label className="lazyselectcheckbox-label">{value[DisplayBy]}</label>
        </div>
      );
    });
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleShow = () => {
    if (isShown) {
      setIsShown(false);
      setSearch('');
    } else {
      setIsShown(true);
    }
  };

  return (
    <div className="lazyselect">
      <div className="lazyselect-select-wrapper">
        <div className="lazyselect-select">
          <div
            onClick={toggleShow}
            className={
              isShown
                ? 'lazyselect-select-output active'
                : 'lazyselect-select-output'
            }>
            <p>{PlaceHolder}</p>
            <div className="icon">
              <div className="dropdown"></div>
            </div>
          </div>
          <div
            className={
              isShown ? 'lazyselect-select-box show' : 'lazyselect-select-box'
            }>
            {Filterable && (
              <div className="lazyselect-search-input-container">
                <input
                  className="lazyselect-search-input"
                  onChange={onSearchChange}
                  value={search}
                  type={'text'}
                />
                {localDataList.length === 0 && (
                  <div className="lazyselect-selectall-container-no-items">
                    No items Found
                  </div>
                )}
              </div>
            )}
            <div className="lazyselectcheckbox-list-container">
              {getLiListItems()}
            </div>
            <div className="lazyselect-select-buttons">
              {/* loading component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LazySelect;
