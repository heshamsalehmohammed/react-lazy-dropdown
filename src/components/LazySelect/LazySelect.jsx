import './LazySelect.css';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import ReactDOM from 'react-dom';
import TagsInput from '../TagsInput/TagsInput';
import {getDataList, parseResponseResultsHierarchy} from '../Common/HTTPHelper';
import {isElementAtBottom} from '../Common/ScrollHelper';
import Logger from '../Common/LogHelper';
import {flattenObject} from '../Common/CommonHelper';
import LazyOption from './LazyOption';
import {v4 as uuidv4} from 'uuid';

const LazySelect = React.memo((props) => {
  const {
    ApiURL,
    UniqueKey,
    DisplayBy,
    Filterable = true,
    PlaceHolder = 'Select Items ...',
    AxiosInstance = null,
    useQueryParams = false,
    useBodyParams = false,
    RequestMethod = 'post',
    ExistingRequestParams = {},
    ExistingRequestHeaders = {},
    usePathParams = false,
    PathParameterArrangement = [],
    PageSize = 10,
    useStartFromApproach = true,
    usePageNumberApproach = false,
    InitialStartFromOrPageNumber = 1,
    SearchRequestParamName = 'search',
    StartFromRequestParamName = 'from',
    PageSizeRequestParamName = 'size',
    ResponseResultsHierarchy = '',
    DisplayCheckBoxForOptions = true,
    DisplayShowMoreOption = true,
    MaximunOptionToShow = 1,
    DisplayShowMoreOptionCallBack = () => {},
    SelectionChangedCallBack = () => {},
    SelectedDataList = [],
    IsMulti = true,
    DisplayTags = true,
    Virtualized = false,
    numVisibleItems = 10,
    itemheight = 36.4,
    OptionsBoxHeight = 250,
    OpenOnRendering = false,
    AlwaysOpenMode = false,
    PerformCustomLoginOnOption = null,
    OnDropDownClosed = () => {},
    RenderOptionComponent = null,
    RenderTagComponent = null,
    RenderInputComponent = null,
    RenderLimitComponent = null,
    OnInputPasteHandler = () => {},
    ForceCloseDropDown = false,
    SetForceCloseDropDown = null,
    DisplayUnselectAllButton = true,
    SelectAllOptions = false,
    ClosePopupAfterSelectionForNotMulti = false,
    scrollThreshold = 0.8,
  } = props;

  if (!UniqueKey) {
    throw new Error('the name of the UniqueKey of your data must be provided');
  }

  if (!ApiURL) {
    throw new Error('ApiURL for your data must be provided');
  }

  const InstanceId = uuidv4();

  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [shown, setShown] = useState(false);
  const [localDataList, setLocalDataList] = useState([]);
  const [selectedDataList, setSelectedDataList] = useState(SelectedDataList);
  const [tagsInputDisabled, setTagsInputDisabled] = useState(true);
  const [startFrom, setStartFrom] = useState(InitialStartFromOrPageNumber);
  const [cursor, setCursor] = useState(-1);

  const [virtualScrollState, setVirtualScrollState] = useState({
    start: 0,
    end: numVisibleItems,
  });

  const optionsContainerRef = useRef(null);
  const activeOptionRef = useRef(null);
  const lazySelectRef = useRef(null);
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
    } else if (usePathParams) {
      const flattenParametersObject = {
        ...flattenObject(ExistingRequestParams),
        [SearchRequestParamName]: search,
        [StartFromRequestParamName]: StartFrom != null ? StartFrom : startFrom,
        [PageSizeRequestParamName]: PageSize,
      };
      PathParameterArrangement.forEach((paramKey) => {
        if (flattenParametersObject.hasOwnProperty(paramKey)) {
          baseURL += `/${flattenParametersObject[paramKey]}`;
        }
      });
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
      requestInfo.data[StartFromRequestParamName] ===
        InitialStartFromOrPageNumber ||
      requestInfo.data[StartFromRequestParamName] !==
        prevRequestInfo.current.data[StartFromRequestParamName]
    ) {
      let response = await getDataList(
        AxiosInstance,
        requestInfo.method,
        requestInfo.baseURL,
        requestInfo.data,
        requestInfo.headers
      );
      if (response.success) {
        let newLocalDLLength = InitialStartFromOrPageNumber;
        setLocalDataList((prevState) => {
          let parsedResponseResultsHierarchy = parseResponseResultsHierarchy(
            ResponseResultsHierarchy,
            response.data
          );

          if (PerformCustomLoginOnOption != null) {
            parsedResponseResultsHierarchy = parsedResponseResultsHierarchy?.map(
              (pr, i) => PerformCustomLoginOnOption(pr, i, i + prevState.length)
            );
          }

          const prevStateUniqueIdList = prevState?.map((ps) => ps[UniqueKey]);
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

          const newLocalDL = [
            ...(prevState ?? []),
            ...(parsedResponseResultsHierarchy ?? []),
          ];
          newLocalDLLength =
            newLocalDL.length === 0
              ? InitialStartFromOrPageNumber
              : newLocalDL.length;
          return newLocalDL;
        });
        setStartFrom((prevState) => {
          let newStartFrom = InitialStartFromOrPageNumber;
          if (useStartFromApproach) {
            newStartFrom = newLocalDLLength + InitialStartFromOrPageNumber;
          }
          if (usePageNumberApproach) {
            newStartFrom = ++prevState;
          }
          return newStartFrom;
        });
      } else {
        setHasError(true);
      }
      prevRequestInfo.current = requestInfo;
    }
    if (scrolled) {
      setScrolled(false);
      enableScroll(optionsContainerRef.current);
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
      setStartFrom(InitialStartFromOrPageNumber);
      setLocalDataList([]);
      fetchDataList(InitialStartFromOrPageNumber);
    }
  }, [shown]);

  useEffect(() => {
    if (scrolled) {
      lockScroll(optionsContainerRef.current);
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
        setStartFrom(InitialStartFromOrPageNumber);
        setLocalDataList([]);
        fetchDataList(InitialStartFromOrPageNumber);
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
            setSearch(objectOfList[DisplayBy]);
            if (ClosePopupAfterSelectionForNotMulti) {
              closeDropDownActions();
            }
            return [objectOfList];
          }
          setSearch('');
          return [];
        });
      }
    }
  );

  const UnselectAllHandler = () => {
    setSelectedDataList((prevState) => {
      if(!IsMulti){
        setSearch('');
      }
      return [];
    });
  };

  const SelectAllHandler = () => {
    setSelectedDataList((prevState) => {
      return [...prevState, ...localDataList];
    });
  };

  const isOptionSelected = (value, selectedDataList) => {
    let optionInSelectedList = selectedDataList.find(
      (ldl) => ldl[UniqueKey] === value[UniqueKey]
    );
    return optionInSelectedList ? true : false;
  };

  const getLiListItems = () => {
    return localDataList.map((value, index) => {
      if (Virtualized) {
        if (
          !(
            index >= virtualScrollState.start && index <= virtualScrollState.end
          )
        ) {
          return null;
        }
      }
      let optionSelected = isOptionSelected(value, selectedDataList);
      let optionActive = cursor === index;
      if (RenderOptionComponent != null) {
        return RenderOptionComponent({
          key: index,
          index: index,
          ref: optionActive ? activeOptionRef : null,
          id: `lazyselectcheckbox-container-${InstanceId}-${index}`,
          setCursor: setCursor,
          optionSelected: optionSelected,
          optionActive: optionActive,
          DisplayCheckBoxForOptions: DisplayCheckBoxForOptions,
          handleOptionSelectedUnselected: handleOptionSelectedUnselected,
          optionValue: value,
          DisplayBy: DisplayBy,
          itemheight: itemheight,
          Virtualized: Virtualized,
          FirstVirtualOption: Virtualized
            ? index === virtualScrollState.start
            : false,
        });
      }
      return (
        <LazyOption
          InstanceId={InstanceId}
          key={index}
          index={index}
          oRef={optionActive ? activeOptionRef : null}
          id={`lazyselectcheckbox-container-${InstanceId}-${index}`}
          setCursor={setCursor}
          optionSelected={optionSelected}
          optionActive={optionActive}
          DisplayCheckBoxForOptions={DisplayCheckBoxForOptions}
          handleOptionSelectedUnselected={handleOptionSelectedUnselected}
          value={value}
          DisplayBy={DisplayBy}
          itemheight={itemheight}
          Virtualized={Virtualized}
          FirstVirtualOption={
            Virtualized ? index === virtualScrollState.start : false
          }
        />
      );
    });
  };

  const onSearchChange = (e) => {
    if (e.target.value !== search) {
      setSearch(e.target.value);
      setSearched(true);
    }
  };

  const openDropDownActions = () => {
    setIsShown(true);
    setShown(true);
    setTagsInputDisabled(false);
  };
  const closeDropDownActions = () => {
    setIsShown(false);
    setSearch('');
    setStartFrom(InitialStartFromOrPageNumber);
    setLocalDataList([]);
    setTagsInputDisabled(true);
    OnDropDownClosed(selectedDataList);
  };

  const coreToggleShow = () => {
    if (isShown) {
      closeDropDownActions();
    } else {
      openDropDownActions();
    }
  };

  const toggleShow = (e) => {
    if (
      (e.target.classList.contains('icon') ||
        e.target.classList.contains('lazyselect-select-output') ||
        e.target.classList.contains('arrow')) &&
      !e.target.classList.contains('unselect-all')
    ) {
      coreToggleShow();
    }
  };

  useEffect(() => {
    if (OpenOnRendering || AlwaysOpenMode) {
      coreToggleShow();
    }
  }, [OpenOnRendering, AlwaysOpenMode]);

  const scollPos = (optionsContainer) => {
    let currentIndx = Math.trunc(optionsContainer.scrollTop / itemheight);
    currentIndx =
      currentIndx - numVisibleItems >= localDataList.length
        ? currentIndx - numVisibleItems
        : currentIndx;
    if (currentIndx !== virtualScrollState.start) {
      setVirtualScrollState({
        start: currentIndx,
        end:
          currentIndx + numVisibleItems >= localDataList.length
            ? localDataList.length - 1
            : currentIndx + numVisibleItems,
      });
    }
  };

  const prevAtBottom = useRef(false);

  const optionsContainerScrollHandler = () => {
    const optionsContainer = optionsContainerRef.current;
    if (Virtualized) {
      scollPos(optionsContainer);
    }
    const atBottom = isElementAtBottom(optionsContainer, scrollThreshold);
    if (atBottom && atBottom !== prevAtBottom.current) {
      setScrolled(true);
    }
    prevAtBottom.current = atBottom;
  };

  const firstUpdateForSelectedDataList = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdateForSelectedDataList.current) {
      firstUpdateForSelectedDataList.current = false;
      return;
    }
    SelectionChangedCallBack(selectedDataList);
    SelectedDataListRef.current = selectedDataList
      .map((sdl) => sdl[UniqueKey])
      .join(',');
  }, [selectedDataList]);

  const SelectedDataListRef = useRef(null);

  useEffect(() => {
    const newRef = SelectedDataList.map((sdl) => sdl[UniqueKey]).join(',');
    if (newRef != SelectedDataListRef.current) {
      SelectedDataListRef.current = newRef;
      setSelectedDataList(SelectedDataList);
    }
  }, [SelectedDataList]);

  const firstUpdateForSelectAllOptions = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdateForSelectAllOptions.current) {
      firstUpdateForSelectAllOptions.current = false;
      return;
    }
    if (SelectAllOptions) {
      if (IsMulti) {
        SelectAllHandler();
      }
    } else {
      UnselectAllHandler();
    }
  }, [SelectAllOptions]);

  const getSelectOutput = () => {
    if (IsMulti) {
      return (
        <TagsInput
          uniqueKey={UniqueKey}
          displayBy={DisplayBy}
          Filterable={Filterable}
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
          RenderTagComponent={RenderTagComponent}
          RenderLimitComponent={RenderLimitComponent}
          RenderInputComponent={RenderInputComponent}
          OnInputPasteHandler={OnInputPasteHandler}
          /* handleKeyDown={handleKeyDown} */
          DisplayTags={DisplayTags}
        />
      );
    } else if (selectedDataList[0]) {
      return (
        <div className="tags-input">
          {RenderInputComponent == null ? (
            <input
              ref={lazyInputRef}
              autoFocus
              disabled={tagsInputDisabled || !Filterable}
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder={selectedDataList[0][DisplayBy]}
              title={selectedDataList[0][DisplayBy]}
              onPaste={OnInputPasteHandler}
              /* onKeyDown={handleKeyDown} */
            />
          ) : (
            RenderInputComponent({
              ref: lazyInputRef,
              disabled: tagsInputDisabled || !Filterable,
              type: 'text',
              value: search,
              onChange: onSearchChange,
              placeholder: selectedDataList[0][DisplayBy],
              title: selectedDataList[0][DisplayBy],
              /* onKeyDown: handleKeyDown, */
            })
          )}
        </div>
      );
    }
    return (
      <div className="tags-input">
        {RenderInputComponent == null ? (
          <input
            ref={lazyInputRef}
            autoFocus
            disabled={tagsInputDisabled || !Filterable}
            type="text"
            onChange={onSearchChange}
            value={search}
            placeholder={PlaceHolder}
            onPaste={OnInputPasteHandler}
            /* onKeyDown={handleKeyDown} */
          />
        ) : (
          RenderInputComponent({
            ref: lazyInputRef,
            disabled: tagsInputDisabled || !Filterable,
            type: 'text',
            onChange: onSearchChange,
            value: search,
            placeholder: PlaceHolder,
            /* onKeyDown: handleKeyDown, */
          })
        )}
      </div>
    );
  };

  const handleKeyDown = (e) => {
    Logger.LogMessage('from key down', localDataList);
    let newCursor = -1;
    if (localDataList.length !== 0) {
      if (e.keyCode === 38 && cursor > 0) {
        setCursor((prevState) => {
          newCursor = prevState - 1;
          return newCursor;
        });
        checkIfInView();
      } else if (e.keyCode === 40 && cursor < localDataList.length - 1) {
        setCursor((prevState) => {
          newCursor = prevState + 1;
          return newCursor;
        });
        checkIfInView();
      } else if (e.keyCode === 13) {
        let activeOptionTobeSelected = {...localDataList[cursor]};
        let activeOptionTobeSelected_IsSelected =
          selectedDataList.find(
            (sdl) => sdl[UniqueKey] === activeOptionTobeSelected[UniqueKey]
          ) ?? false;
        handleOptionSelectedUnselected(
          activeOptionTobeSelected_IsSelected ? false : true,
          activeOptionTobeSelected
        );
      }
    }
  };

  const checkIfInView = () => {
    if (!activeOptionRef.current) {
      return;
    }
    activeOptionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  const containerStyle = Virtualized
    ? {
        height: localDataList.length * itemheight,
        minHeight: localDataList.length * itemheight,
      }
    : {};

  let lazySelectBoundingClientRect = lazySelectRef.current?.getBoundingClientRect();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (ForceCloseDropDown) {
      closeDropDownActions();
      SetForceCloseDropDown(false);
    }
  }, [ForceCloseDropDown]);

  const lockScroll = (element) => {Logger.LogMessage("scroll locked")
    var lockedScrollTop = element.scrollTop;
    element.onscroll = () => {
      element.scrollTop = lockedScrollTop;
    };
  };

  const enableScroll = (element) => {
    element.onscroll = optionsContainerScrollHandler;
  };

  return (
    <div className="lazyselect-select" ref={lazySelectRef}>
      <div
        onClick={AlwaysOpenMode ? () => {} : toggleShow}
        className={
          isShown
            ? 'lazyselect-select-output active'
            : 'lazyselect-select-output'
        }>
        {getSelectOutput()}
        {DisplayUnselectAllButton && (
          <div
            style={{
              fontSize: 'larger',
              fontWeight: 'bold',
            }}
            className="unselect-all icon"
            onClick={UnselectAllHandler}>
            &#215;
          </div>
        )}
        {!AlwaysOpenMode && (
          <div className="icon">
            <i className={`arrow ${isShown ? 'up' : 'down'}`} />
          </div>
        )}
      </div>
      {isShown &&
        ReactDOM.createPortal(
          <div
            ref={optionsContainerRef}
            className={
              isShown ? 'lazyselect-select-box show' : 'lazyselect-select-box'
            }
            onScroll={optionsContainerScrollHandler}
            style={{
              width: lazySelectBoundingClientRect.width,
              minWidth: lazySelectBoundingClientRect.width,
              height: OptionsBoxHeight,
            }}>
            <div
              className="lazyselectcheckbox-list-container"
              style={containerStyle}>
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
            {!loading && !hasError && localDataList.length === 0 && (
              <div className="lazyselect-select-buttons">No Items Found!..</div>
            )}
          </div>,
          lazySelectRef.current
        )}
    </div>
  );
});

export default LazySelect;
