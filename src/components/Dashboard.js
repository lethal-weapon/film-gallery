import React from 'react';
import {SearchText} from './SearchText';
import {SearchMode} from './SearchMode';
import {FilterField} from './FilterField';
import {FILTER_OPTIONS, IS_MULTIPLE_OPTIONS} from '../store/constants/FilterOptions';

export function Dashboard() {
  return (
    <div className="p-3 rounded-lg bg-blue-300 dark:bg-dark-800
                    animate__animated animate__fadeIn animate__slower animate__delay-2s">
      <div className="grid grid-rows-1 grid-cols-12">
        <div className="col-span-10 px-4">
          <SearchText/>
          {
            FILTER_OPTIONS.map(o =>
              Object.keys(o).map(k =>
                <FilterField
                  key={k}
                  fieldName={k}
                  fieldValues={o[k]}
                  isMultipleOptionField={IS_MULTIPLE_OPTIONS[k]}
                />
              )
            )
          }
        </div>
        <div className="col-span-2 pt-2">
          <SearchMode/>
        </div>
      </div>
    </div>
  );
}
