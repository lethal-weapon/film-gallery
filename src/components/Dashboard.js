import React from 'react';
import {SearchMode} from './SearchMode';
import {SearchText} from './SearchText';
import {FilterField} from './FilterField';
import {FILTER_OPTIONS, IS_MULTIPLE_OPTIONS} from '../store/constants/FilterOptions';

export function Dashboard() {
  return (
    <div className="card bg-dark animate__animated animate__fadeIn animate__slower animate__delay-2s">
      <div className="card-body pb-2">
        <div className="row">
          <div className="col-10">
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
          <div className="col-2">
            <SearchMode/>
          </div>
        </div>
      </div>
    </div>
  );
}
