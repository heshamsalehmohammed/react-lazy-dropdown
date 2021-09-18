import './LazySelect.css';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import TagsInput from '../TagsInput/TagsInput';
import {getDataList, parseResponseResultsHierarchy} from '../Common/HTTPHelper';
import {isElementAtBottom} from '../Common/ScrollHelper';
import Logger from '../Common/LogHelper';

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
    InitialStartFrom = 1,
    SearchRequestParamName = 'search',
    StartFromRequestParamName = 'from',
    PageSizeRequestParamName = 'size',
    ResponseResultsHierarchy = '',
    DisplayCheckBoxForOptions = true,
    DisplayShowMoreOption = true,
    MaximunOptionToShow = -1,
    DisplayShowMoreOptionCallBack = () => {},
    SelectionChangedCallBack = () => {},
    IsMulti = true,
    ShowTags = true,
    TagComponent = null,
    ShowMoreComponent = null,
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
  const [shown, setShown] = useState(false);
  const [localDataList, setLocalDataList] = useState([]);
  const [selectedDataList, setSelectedDataList] = useState([]);
  const [tagsInputDisabled, setTagsInputDisabled] = useState(true);
  const [startFrom, setStartFrom] = useState(InitialStartFrom);

  const optionsContainerRef = useRef(null);
  const lazyInputRef = useRef(null);

  const prepareRequestInfo = (StartFrom = null) => {
    let baseURL = ApiURL;
    let data = {};

    if (useQueryParams) {
      baseURL += '?';
      for (const key in ExistingRequestParams) {
        baseURL += `${key}=${ExistingRequestParams[key]}&`;
      }
      baseURL += `${SearchRequestParamName}=${search}&`;
      baseURL += `${StartFromRequestParamName}=${
        StartFrom != null ? StartFrom : startFrom
      }&`;
      baseURL += `${PageSizeRequestParamName}=${PageSize}`;
    } else if (useBodyParams) {
      data = {
        ...ExistingRequestParams,
      };
      data[SearchRequestParamName] = search;
      data[StartFromRequestParamName] =
        StartFrom != null ? StartFrom : startFrom;
      data[PageSizeRequestParamName] = PageSize;
    }

    return {
      method: RequestMethod,
      baseURL: baseURL,
      data: data,
      headers: ExistingRequestHeaders,
    };
  };

  const prevRequestInfo = useRef(prepareRequestInfo(null));

  const fetchDataList = async (StartFrom = null) => {
    setLoading(true);
    setHasError(false);
    const requestInfo = prepareRequestInfo(StartFrom);
    Logger.LogMessage(
      'Request Info FROM',
      requestInfo.data[StartFromRequestParamName]
    );
    Logger.LogMessage(
      'previous request info FROM',
      prevRequestInfo.current.data[StartFromRequestParamName]
    );
    if (
      requestInfo.data[StartFromRequestParamName] === InitialStartFrom ||
      requestInfo.data[StartFromRequestParamName] !==
        prevRequestInfo.current.data[StartFromRequestParamName]
    ) {
      let response = await getDataList(
        requestInfo.method,
        requestInfo.baseURL,
        requestInfo.data,
        requestInfo.headers
      );
      if (response.success) {
        let newLocalDLLength = InitialStartFrom;
        setLocalDataList((prevState) => {
          let parsedResponseResultsHierarchy = parseResponseResultsHierarchy(
            ResponseResultsHierarchy,
            response.data
          );
          const prevStateUniqueIdList = prevState.map((ps) => ps[UniqueKey]);
          const duplicatedDataList =
            parsedResponseResultsHierarchy?.filter((newDL) =>
              prevStateUniqueIdList.includes(newDL[UniqueKey])
            ) ?? [];
          if (duplicatedDataList.length > 0) {
            Logger.LogWarning(
              'there is some duplication in the data, we will remove the duplicated options for you, but you need to fix this issue, the duplicated data are:'
            );
            Logger.LogWarning(duplicatedDataList);
            parsedResponseResultsHierarchy =
              parsedResponseResultsHierarchy?.filter(
                (newDL) => !prevStateUniqueIdList.includes(newDL[UniqueKey])
              ) ?? [];
          }
          const newLocalDL = [...prevState, ...parsedResponseResultsHierarchy];
          newLocalDLLength =
            newLocalDL.length === 0 ? InitialStartFrom : newLocalDL.length;
          return newLocalDL;
        });

        setStartFrom(newLocalDLLength + InitialStartFrom);
        Logger.LogMessage(
          'new start from',
          newLocalDLLength + InitialStartFrom
        );
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
    if (shown) {
      setShown(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (shown) {
      setStartFrom(InitialStartFrom);
      setLocalDataList([]);
      fetchDataList(InitialStartFrom);
    }
  }, [shown]);

  useEffect(() => {
    if (scrolled) {
      Logger.LogMessage('useEffect for scroll');
      fetchDataList();
    }
  }, [scrolled]);

  useEffect(() => {
    if (loading) {
      setTagsInputDisabled(true);
    } else if (isShown) {
      setTagsInputDisabled(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!tagsInputDisabled) {
      lazyInputRef?.current?.focus();
    }
  }, [tagsInputDisabled]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searched) {
        setStartFrom(InitialStartFrom);
        setLocalDataList([]);
        Logger.LogMessage('useEffect for search');
        fetchDataList(InitialStartFrom);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleOptionSelectedUnselected = useCallback(
    (checked, objectOfList) => {
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
    }
  );

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
            id={`lazyselectcheckbox-${index}`}
            type="checkbox"
            className={`lazyselectcheckbox ${
              DisplayCheckBoxForOptions ? '' : 'checkbox-hidden'
            }`}
            onChange={(e) =>
              handleOptionSelectedUnselected(e.target.checked, value)
            }
            checked={optionSelected}
          />
          <label
            htmlFor={`lazyselectcheckbox-${index}`}
            className="lazyselectcheckbox-label">
            {value[DisplayBy]}
          </label>
        </div>
      );
    });
  };

  const onSearchChange = (e) => {
    if (e.target.value !== search) {
      setSearch(e.target.value);
      setSearched(true);
    }
  };

  const toggleShow = (e) => {
    // Logger.LogMessage(e.target)
    if (
      e.target.classList.contains('icon') ||
      e.target.classList.contains('lazyselect-select-output') ||
      e.target.classList.contains('arrow')
    ) {
      if (isShown) {
        setIsShown(false);
        setSearch('');
        setStartFrom(InitialStartFrom);
        setLocalDataList([]);
        setTagsInputDisabled(true);
      } else {
        setIsShown(true);
        setShown(true);
        setTagsInputDisabled(false);
      }
    }
  };

  const prevAtBottom = useRef(false);

  const optionsContainerScrollHandler = () => {
    const optionsContainer = optionsContainerRef.current;

    const atBottom = isElementAtBottom(optionsContainer, 0.98);
    /*     Logger.LogMessage(
      'at bottom',
      atBottom,
      'prev at bottom ',
      prevAtBottom.current
    ); */

    if (atBottom && atBottom !== prevAtBottom.current) {
      /* Logger.LogMessage('set scrolled', atBottom); */
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
            tagsInputDisabled={tagsInputDisabled}
            TagComponent={TagComponent}
            ShowMoreComponent={ShowMoreComponent}
          />
        );
      }
    } else if (selectedDataList[0]) {
      return (
        <div className="tags-input">
          <input
            ref={lazyInputRef}
            autoFocus
            disabled={tagsInputDisabled}
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
          ref={lazyInputRef}
          autoFocus
          disabled={tagsInputDisabled}
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
                Somthing went wrong!, Check your server!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LazySelect;
