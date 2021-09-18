import React, {useState, useEffect} from 'react';
import {storiesOf} from '@storybook/react';
import Logger from '../components/Common/LogHelper';

//import {LazySelect} from '../../dist/index';
import {LazySelect} from '../components/index';

const stories = storiesOf('App Test', module);

const myCustomTagComponent = (props) => {
  Logger.LogMessage(props);
  return <div>my custom tag</div>;
};
const myCustomShowMoreComponent = (props) => {
  Logger.LogMessage(props);
  return <div>my custom show more</div>;
};

stories.add('App', () => {
  const displayShowMoreOptionCallBack = (selectedOptions) => {
    Logger.LogMessage(
      selectedOptions.length + ' items selected',
      selectedOptions
    );
  };

  const selectionChangedCallBack = (selectedOptions) => {
    Logger.LogMessage(
      selectedOptions.length + ' items selected',
      selectedOptions
    );
  };

  return (
    <>
      <div className="m-5" style={{width: '500px'}}>
        <LazySelect
          ApiURL={
            'https://tps.syngentaaws.org:445/api/MethodVersion/GetMethodVersionList'
          }
          UniqueKey={'Id'} // object unique key - must be unique per object
          DisplayBy={'Name'}
          PlaceHolder={'Select Methods'}
          useQueryParams={false}
          useBodyParams={true}
          RequestMethod={'post'}
          ExistingRequestParams={{
            FilterByPlatform: false,
            BasicSearchInput: {
              IsActive: [true, false],
              MethodTypeName: ['PLATE', 'NONPLATE'],
            },
          }}
          ExistingRequestHeaders={{
            Authorization: `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkVCNENGQjIzMENBNkQ2MDIxMkI2QkRDQkQxQTlGMjRCMEJGODU5MjJSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjYwejdJd3ltMWdJU3RyM0wwYW55U3d2NFdTSSJ9.eyJuYmYiOjE2MzE3NTMyNzYsImV4cCI6MTYzMTc1Njg3NiwiaXNzIjoiaHR0cHM6Ly90cHMuc3luZ2VudGFhd3Mub3JnIiwiYXVkIjoiaHR0cHM6Ly90cHMuc3luZ2VudGFhd3Mub3JnL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IlRlc3RQbGFubmluZ1VpX0RldmVsb3BtZW50Q2xpZW50Iiwic3ViIjoiNSIsImF1dGhfdGltZSI6MTYzMTc1MzI3NSwiaWRwIjoiQXp1cmVBRCIsIm5hbWUiOiJTYWxlaCBIZXNoYW0gKGV4dCkgR0JFWCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikhlc2hhbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJTYWxlaCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIZXNoYW0uU2FsZWhAc3luZ2VudGEuY29tIiwic2lkIjoiODYwMzM3MTBFQTIyRTcyRkEwREQxODdBNzNFQTQzMzIiLCJpYXQiOjE2MzE3NTMyNzYsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImFkZHJlc3MiLCJwaG9uZSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.HZFSQK2_NdfX1WjU6cDLV-niU6trqe_zT51c8CeSHO3WiwVR10X8Hn6u7UUqDI91X9RgkwgS4noUQczulib2SO6i593hm-jx67-W-LaWJOsoNHQzs0uBfRaHF4qtHHdDCiNVN3yy_3p6wOxeMICpJ3A32DNkg4fvPWAPeEBebKY_zKE2VTJsmGg_AdsIR5gH8doEnLzCT-l4CpXOfYUmMQw6u4eUng3cGCvXimJRzZGhztRsbP1lmURLpHyeuWd0pEFn2IJisqFJsc73as-8yn5qIfgkzwpRyG22dzqfe2_-6LmwjQyoEnHXsfZR5i1jX-YJCYSk1ViI1ThRZcixpg`,
          }}
          PageSize={10}
          InitialStartFrom={1}
          SearchRequestParamName={'search'}
          StartFromRequestParamName={'From'}
          PageSizeRequestParamName={'Size'}
          ResponseResultsHierarchy={'data/Value/Results'}
          DisplayCheckBoxForOptions={true}
          DisplayShowMoreOption={true}
          MaximunOptionToShow={3}
          DisplayShowMoreOptionCallBack={displayShowMoreOptionCallBack}
          SelectionChangedCallBack={selectionChangedCallBack}
          IsMulti={true}
          ShowTags={true}
          TagComponent={/* myCustomTagComponent */ null}
          ShowMoreComponent={/* myCustomShowMoreComponent */ null}
        />
      </div>
    </>
  );
});
