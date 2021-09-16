import './LazySelect.css';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import TagsInput from '../TagsInput/TagsInput';
import {getDataList, parseResponseResultsHierarchy} from '../Common/HTTPHelper';
import {isElementAtBottom} from '../Common/ScrollHelper';

const LazySelect = React.memo((props) => {
  const {
    ApiURL,
    UniqueKey,
    DisplayBy,
    PlaceHolder = 'Select Items ...',
    useQueryParams = false,
    useBodyParams = false,
    RequestMethod = 'post',
    ExistingRequestParams = {},
    ExistingRequestHeaders = {},
    PageSize = 10,
    SearchRequestParamName = 'search',
    StartFromRequestParamName = 'from',
    PageSizeRequestParamName = 'size',
    ResponseResultsHierarchy = '',
    DisplayShowMoreOption = true,
    MaximunOptionToShow = -1,
    DisplayShowMoreOptionCallBack = () => {},
    SelectionChangedCallBack = () => {},
    IsMulti = true,
    ShowTags = true,
  } = props;

  if (!UniqueKey) {
    throw new Error('the name of the UniqueKey of your data must be provided');
  }

  if (!ApiURL) {
    throw new Error('ApiURL for your data must be provided');
  }

  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [localDataList, setLocalDataList] = useState([]);
  const [selectedDataList, setSelectedDataList] = useState([]);

  const [startFrom, setStartFrom] = useState(1);

  const optionsContainerRef = useRef(null);

  const prepareRequestInfo = () => {
    let baseURL = ApiURL;
    let data = {};

    if (useQueryParams) {
      baseURL += '?';
      for (const key in ExistingRequestParams) {
        baseURL += `${key}=${ExistingRequestParams[key]}&`;
      }
      baseURL += `${SearchRequestParamName}=${search}&`;
      baseURL += `${StartFromRequestParamName}=${startFrom}&`;
      baseURL += `${PageSizeRequestParamName}=${PageSize}`;
    } else if (useBodyParams) {
      data = {
        ...ExistingRequestParams,
      };
      data[SearchRequestParamName] = search;
      data[StartFromRequestParamName] = startFrom;
      data[PageSizeRequestParamName] = PageSize;
    }

    return {
      method: RequestMethod,
      baseURL: baseURL,
      data: data,
      headers: ExistingRequestHeaders,
    };
  };

  const prevRequestInfo = useRef(prepareRequestInfo());

  const fetchDataList = async (init = false) => {
    setLoading(true);
    setHasError(false);
    const requestInfo = prepareRequestInfo();
    console.log(
      'Request Info ',
      requestInfo,
      ' previous request info ',
      prevRequestInfo.current
    );
    if (
      init ||
      requestInfo.data[StartFromRequestParamName] !==
        prevRequestInfo.current.data[StartFromRequestParamName] ||
      requestInfo.data[SearchRequestParamName] !==
        prevRequestInfo.current.data[SearchRequestParamName]
    ) {
      console.log('Request Info ', requestInfo);
      let response = await getDataList(
        requestInfo.method,
        requestInfo.baseURL,
        requestInfo.data,
        requestInfo.headers
      );
      if (response.success) {
        let newLocalDLLength = 0;
        setLocalDataList((prevState) => {
          const newLocalDL = [
            ...prevState,
            ...parseResponseResultsHierarchy(
              ResponseResultsHierarchy,
              response.data
            ),
          ];
          newLocalDLLength = newLocalDL.length;
          return newLocalDL;
        });
        setStartFrom(newLocalDLLength);
      } else {
        setHasError(true);
      }
      prevRequestInfo.current = requestInfo;
    }
    if (scrolled) {
      setScrolled(false);
    }
    if (searched) {
      setSearched(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataList(true);
  }, []);

  useEffect(() => {
    if (scrolled) {
      console.log('useEffect for scroll');
      fetchDataList();
    }
  }, [scrolled]);

  /*   useEffect(() => {
    if (searched) {
      console.log('useEffect for search');
      fetchDataList();
    }
  }, [search]); */

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searched) {
        setLocalDataList([]);
        console.log('useEffect for search');
        fetchDataList();
      }
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleOptionSelectedUnselected = (checked, objectOfList) => {
    if (IsMulti) {
      setSelectedDataList((prevState) => {
        if (checked) {
          return [...prevState, objectOfList];
        }
        return [
          ...prevState.filter(
            (ldl) => ldl[UniqueKey] !== objectOfList[UniqueKey]
          ),
        ];
      });
    } else {
      setSelectedDataList((prevState) => {
        if (checked) {
          return [objectOfList];
        }
        return [];
      });
    }
  };

  const getLiListItems = () => {
    return localDataList.map((value, index) => {
      let optionInSelectedList = selectedDataList.find(
        (ldl) => ldl[UniqueKey] === value[UniqueKey]
      );
      let optionSelected = optionInSelectedList ? true : false;

      return (
        <div
          key={index}
          className={
            'lazyselectcheckbox-container' +
            (optionSelected ? ' lazyselectcheckbox-active' : '')
          }>
          <input
            type="checkbox"
            className="lazyselectcheckbox"
            onChange={(e) =>
              handleOptionSelectedUnselected(e.target.checked, value)
            }
            checked={optionSelected}
          />
          <label className="lazyselectcheckbox-label">{value[DisplayBy]}</label>
        </div>
      );
    });
  };

  const onSearchChange = (e) => {
    setStartFrom(1);
    if (e.target.value !== search) {
      setSearch(e.target.value);
      setSearched(true);
    }
  };

  const toggleShow = (e) => {
    if (!e.target.classList.contains('tag-close-icon')) {
      if (isShown) {
        setIsShown(false);
        setSearch('');
      } else {
        setIsShown(true);
      }
    }
  };

  const prevAtBottom = useRef(false);

  const optionsContainerScrollHandler = () => {
    const optionsContainer = optionsContainerRef.current;

    const atBottom = isElementAtBottom(optionsContainer, 1);
    console.log('at bottom', atBottom, 'prev at bottom ', prevAtBottom.current);

    if (atBottom && atBottom !== prevAtBottom.current) {
      console.log('set scrolled', atBottom);
      setScrolled(true);
    }
    prevAtBottom.current = atBottom;
  };

  useEffect(() => {
    SelectionChangedCallBack(selectedDataList);
  }, [selectedDataList]);

  const getSelectOutput = () => {
    if (IsMulti) {
      if (ShowTags) {
        return (
          <TagsInput
            uniqueKey={UniqueKey}
            displayBy={DisplayBy}
            placeHolder={PlaceHolder}
            selectedDataList={selectedDataList}
            renderedSelectedDataList={
              MaximunOptionToShow <= 0
                ? selectedDataList
                : selectedDataList.slice(0, MaximunOptionToShow)
            }
            onSearchChange={onSearchChange}
            searchValue={search}
            handleOptionSelectedUnselected={handleOptionSelectedUnselected}
            displayShowMoreOption={DisplayShowMoreOption}
            maximunOptionToShow={MaximunOptionToShow}
            displayShowMoreOptionCallBack={DisplayShowMoreOptionCallBack}
          />
        );
      }
    } else if (selectedDataList[0]) {
      return (
        <div className="tags-input">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder={selectedDataList[0][DisplayBy]}
          />
        </div>
      );
    }
    return (
      <div className="tags-input">
        <input
          type="text"
          onChange={onSearchChange}
          value={search}
          placeholder={PlaceHolder}
        />
      </div>
    );
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
            {getSelectOutput()}
            <div
              className="icon"
              style={{
                lineHeight: isShown ? '49px' : '46px',
              }}>
              <i className={`arrow ${isShown ? 'up' : 'down'}`} />
            </div>
          </div>
          <div
            ref={optionsContainerRef}
            className={
              isShown ? 'lazyselect-select-box show' : 'lazyselect-select-box'
            }
            onScroll={optionsContainerScrollHandler}>
            <div className="lazyselectcheckbox-list-container">
              {getLiListItems()}
            </div>
            {loading && (
              <div className="lazyselect-select-buttons">Loading ....</div>
            )}
            {hasError && (
              <div className="lazyselect-select-buttons">
                Somthing went wrong!.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LazySelect;
