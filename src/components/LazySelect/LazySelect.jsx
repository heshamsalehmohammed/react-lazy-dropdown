import './LazySelect.css';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import TagsInput from '../TagsInput/TagsInput';
import {getDataList, parseResponseResultsHierarchy} from '../Common/HTTPHelper';

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
  } = props;

  if (!UniqueKey) {
    throw new Error('the name of the UniqueKey of your data must be provided');
  }

  if (!ApiURL) {
    throw new Error('ApiURL for your data must be provided');
  }

  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [localDataList, setLocalDataList] = useState([]);
  const [selectedDataList, setSelectedDataList] = useState([]);

  const [startFrom, setStartFrom] = useState(1);

  const optionsContainerRef = useRef(null);

  const fetchDataList = async () => {
    setLoading(true);
    setHasError(false);
    const requestInfo = prepareRequestInfo();
    let response = await getDataList(
      requestInfo.method,
      requestInfo.baseURL,
      requestInfo.data,
      requestInfo.headers
    );
    if (response.success) {
      setLocalDataList((prevState) => {
        return [
          ...prevState,
          ...appendIsSelectedToFetchedData(
            parseResponseResultsHierarchy(
              ResponseResultsHierarchy,
              response.data
            )
          ),
        ];
      });
      setStartFrom(localDataList.length);
    } else {
      setHasError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  useEffect(() => {
    if (search || scrolled) {
      fetchDataList();
      if (scrolled) {
        setScrolled(false);
      }
    }
  }, [search, scrolled]);

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

  const appendIsSelectedToFetchedData = (data) => {
    return data?.map((dl) => ({...dl, isSelected: false})) ?? [];
  };

  const handleOptionSelectedUnselected = (checked, objectOfList) => {
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

  const optionsContainerScrollHandler = () => {
    const element = optionsContainerRef.current;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 3) {
      setScrolled(true);
      console.log('scrolled');
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
            <TagsInput
              uniqueKey={UniqueKey}
              displayBy={DisplayBy}
              placeHolder={PlaceHolder}
              dataList={selectedDataList}
              onSearchChange={onSearchChange}
              searchValue={search}
              handleOptionSelectedUnselected={handleOptionSelectedUnselected}
              displayShowMoreOption={DisplayShowMoreOption}
              maximunOptionToShow={MaximunOptionToShow}
              displayShowMoreOptionCallBack={DisplayShowMoreOptionCallBack}
            />
            <div className="icon">
              <div className="dropdown"></div>
            </div>
          </div>
          <div
            className={
              isShown ? 'lazyselect-select-box show' : 'lazyselect-select-box'
            }
            ref={optionsContainerRef}
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
