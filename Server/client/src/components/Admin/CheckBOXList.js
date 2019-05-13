import React from 'react';
import CheckBox from './CheckBox';

export default function CheckBoxList ({options, isCheckedAll, onCheck}) {
    //console.log('options',options)
    const checkBoxOptions = (
        <div >
            {options.map((option, index) => {
                return (
                    <CheckBox
                      key={index}
                      name={option.name}
                      value={option.value}
                      tick={option.checked}
                      onCheck={(e) => onCheck(option.value, e.target.checked)}                     />
                );
            })}
        </div>
    );

    return (
        <div className="checkbox-list">
            <CheckBox
              name="select-all"
              value="ALL"
              tick={isCheckedAll}
              onCheck={(e) => onCheck('all', e.target.checked)}
            />
            {checkBoxOptions}
        </div>
    );
}