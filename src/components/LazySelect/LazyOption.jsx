import React from 'react';
import Logger from '../Common/LogHelper';

const LazyOption = React.memo((props) => {
  const {
    index,
    optionSelected,
    DisplayCheckBoxForOptions,
    handleOptionSelectedUnselected,
    value,
    DisplayBy,
    itemheight,
    Virtualized,
    FirstVirtualOption,
  } = props;

  const optionStyle =
    Virtualized && FirstVirtualOption
      ? {
          marginTop: index * itemheight,
        }
      : {};

  return (
    <div
      className={
        'lazyselectcheckbox-container' +
        (optionSelected ? ' lazyselectcheckbox-active' : '')
      }
      style={optionStyle}>
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

export default LazyOption;
