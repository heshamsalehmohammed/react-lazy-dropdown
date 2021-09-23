import React from 'react';
import Logger from '../Common/LogHelper';

const LazyOption = React.memo((props) => {
  const {
    index,
    id,
    oRef,
    setCursor,
    optionSelected,
    optionActive,
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

  const mouseEnterHandler = () => {
    setCursor(index);
  };

  return (
    <div
      ref={oRef}
      className={
        'lazyselectcheckbox-container' +
        (optionSelected ? ' lazyselectcheckbox-active' : '') +
        (optionActive ? ' lazyselectcheckbox-hover' : '')
      }
      style={optionStyle}
      onMouseEnter={mouseEnterHandler}
      id={id}>
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
        className="lazyselectcheckbox-label"
        title={value[DisplayBy]}>
        {value[DisplayBy]}
      </label>
    </div>
  );
});

export default LazyOption;
