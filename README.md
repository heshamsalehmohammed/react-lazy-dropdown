# react-lazy-dropdown

[react-lazy-dropdown] is a very useful react component for multi selection dropdown based on
 lazy loading option by API calls with async lazy Filtering, Sorting 
 and Tags with custom functions can be provided from the outside 

![Alt Text](src/ReadMe/react-lazy-dropdown.gif)

## Installation

```bash
npm install react-lazy-dropdown
```

## Usage

```python
import {LazySelect} from 'react-lazy-dropdown/dist/index';


  const displayShowMoreOptionCallBack = (selectedOptions) => {
    alert(selectedOptions.length +" items selected");
  };

  const selectionChangedCallBack = (selectedOptions) => {
    console.log(selectedOptions.length +" items selected");
  };


  return (
    <>
      <div className="m-5" style={{width: '500px'}}>
        <LazySelect
          ApiURL={
            'https://--------/Get-------List'
          }
          UniqueKey={'Id'} // object unique key - must be unique per object
          DisplayBy={'Name'}
          PlaceHolder={'Select Methods'}
          useQueryParams={false}
          useBodyParams={true}
          RequestMethod={'post'}
          ExistingRequestParams={{
            FilterByPlatform: false,
            -----------------------,
          }}
          ExistingRequestHeaders={{
            Authorization: `bearer eyJhbGciOi-----------------`,
          }}
          PageSize={10}
          SearchRequestParamName={'search'}
          StartFromRequestParamName={'From'}
          PageSizeRequestParamName={'Size'}
          ResponseResultsHierarchy={'data/Value/Results'}
          DisplayShowMoreOption={true}
          MaximunOptionToShow={3}
          DisplayShowMoreOptionCallBack={displayShowMoreOptionCallBack}
          SelectionChangedCallBack={selectionChangedCallBack}
          IsMulti={true}
          ShowTags={true}
        />
      </div>
    </>
  );

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
