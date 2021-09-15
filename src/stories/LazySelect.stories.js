import React, {useState, useEffect} from 'react';
import {storiesOf} from '@storybook/react';

//import {LazySelect} from '../../dist/index';
import {LazySelect} from '../components/index';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
  return (
    <>
      <div className="m-5" style={{width: '225px'}}>
        <LazySelect
          ApiURL={''}
          SearchQueryParamName={'search'}
          PageNumberQueryParamName={'page'}
          PageSizeQueryParamName={'size'}
          UniqueKey={'_id'} // object unique key - must be unique per object
          DisplayBy={'title'}
          PlaceHolder={'Select Movies'}
          Filterable
          PageSize={10}
        />
      </div>
    </>
  );
});
