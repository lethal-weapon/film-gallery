import React from 'react';
import {useSelector} from 'react-redux';
import {Dashboard} from './Dashboard';
import {Suggestion} from './Suggestion';
import {FilmGrid} from './FilmGrid';
import {FilmList} from './FilmList';
import {DataTypes} from '../store/constants/Types';

export function Section() {
  // const queryData = useSelector((state) => state.queryData);
  // const modelData = useSelector((state) => state.modelData);
  const viewMode = useSelector((state) => state.queryData.viewMode);

  return (
    <section>
      <div className="container mx-auto w-4/5">
        <Dashboard/>
        <Suggestion/>
        <div className="animate__animated animate__fadeIn animate__slower animate__delay-4s">
          {viewMode === DataTypes.FILM_GRID && <FilmGrid/>}
          {viewMode === DataTypes.FILM_LIST && <FilmList/>}
        </div>

          {/*<div className="card bg-dark mt-2">*/}
          {/*  <div className="card-body">*/}
          {/*    <h4 className="text-warning text-center">Query / Model Data</h4>*/}
          {/*    <pre className="text-warning">*/}
          {/*        {JSON.stringify(queryData, null, 2)}*/}
          {/*      /!*{JSON.stringify(modelData, null, 2)}*!/*/}
          {/*    </pre>*/}
          {/*  </div>*/}
          {/*</div>*/}
      </div>
    </section>
  );
}
