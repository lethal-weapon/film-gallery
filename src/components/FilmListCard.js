import React from 'react';
import {cleanCredit} from '../utilities/CreditCleaner';
import PosterHolder from '../static/images/no-poster.jpg';
import Oscar from '../static/images/oscar.svg';
import OscarNominated from '../static/images/oscar-nominated.svg';

export function FilmListCard({film}) {

  const formatTitleAndYear = (text = '') => {
    const MAX_LENGTH = 48;
    return text.length <= MAX_LENGTH ? text : <small>{text}</small>
  }

  const formatPlot = (plot = '') => {
    const fieldCount = [
      film['metacritic'] !== undefined,
      film['tomatoes'] && film['tomatoes']['rotten'] !== undefined
    ].filter(f => f).length;

    const maxLength = fieldCount === 0 ? 340 :
                      fieldCount === 1 ? 280 : 220;

    if (plot.length < maxLength * 0.9) {
      return plot;
    } else if (plot.length <= maxLength) {
      return <small>{plot}</small>
    } else {
      let words = plot.split(/\s+/);
      let newPlot = '';
      while (newPlot.length < maxLength && words.length > 0) {
        newPlot = newPlot.concat(`${words.shift()} `);
      }
      return <small>{`${newPlot.trim()}...`}</small>
    }
  }

  const formatAwards = (awards = {}) => {
    if (Object.keys(awards).length === 0) {
      return `-`;
    }
    let words = [];
    words.push(awards['wins'] ? `${awards['wins']}W` : `-`);
    words.push(`/`);
    words.push(awards['nominations'] ? `${awards['nominations']}N` : `-`);
    return words.join(' ');
  }

  const formatCreditsArray = (credits = [], take = 2) => {
    const MAX_CELL_LENGTH = 32;
    const text = credits.length === 0 ? '-' : credits
      .map(c => cleanCredit(c))
      .filter((value, index, array) => array.indexOf(value) === index)
      .slice(0, take)
      .join(', ');

    return text.length <= MAX_CELL_LENGTH ? text : <small>{text}</small>
  }

  const renderInfoTable = () =>
    <table className="film-table-list">
      <tbody>
        <tr>
          <td>Country:</td>
          <td>{formatCreditsArray(film['countries'], 3)}</td>
        </tr>
        <tr>
          <td>Language:</td>
          <td>{formatCreditsArray(film['languages'], 3)}</td>
        </tr>
        <tr>
          <td>Genre:</td>
          <td>{formatCreditsArray(film['genres'], 3)}</td>
        </tr>
        <tr>
          <td>Director:</td>
          <td>{formatCreditsArray(film['directors'], 2)}</td>
        </tr>
        <tr>
          <td>Writer:</td>
          <td>{formatCreditsArray(film['writers'], 2)}</td>
        </tr>
        <tr>
          <td>Cast:</td>
          <td>{formatCreditsArray(film['cast'], 2)}</td>
        </tr>
        {
          (film['cast'] || ['-']).length > 2 &&
          <tr>
            <td/>
            <td>{formatCreditsArray(film['cast'].slice(2), 2)}</td>
          </tr>
        }
        <tr>
          <td>Runtime:</td>
          <td>{film['runtime'] || '-'}</td>
        </tr>
      </tbody>
    </table>

  const renderRatingTable = () =>
    <table className="film-table-list">
      <tbody>
        <tr>
          <td>Rated:</td>
          <td>{film['rated'] || '-'}</td>
        </tr>
        {
          (film['tomatoes'] && (film['tomatoes']['rotten'] !== undefined)) &&
          <tr>
            <td>Tomatoes:</td>
            <td>{100 - film['tomatoes']['rotten']}%</td>
          </tr>
        }
        {
          film['metacritic'] !== undefined &&
          <tr>
            <td>Metacritic:</td>
            <td>{film['metacritic']}%</td>
          </tr>
        }
        <tr>
          <td>Awards:</td>
          <td>{formatAwards(film['awards'])}</td>
        </tr>
      </tbody>
    </table>

  const renderOscarIcon = (oscarField = -1) =>
    <>
      {
        oscarField >= 0 &&
        <div className="absolute top-3 right-1">
          {oscarField === 0 && <img src={OscarNominated} className="w-12 h-12" alt=""/>}
          {oscarField > 0 && <img src={Oscar} className="w-12 h-12" alt=""/>}
        </div>
      }
    </>

  return (
    <div className="relative mt-2 p-2 rounded-md bg-transparent hover:shadow-filmLight dark:hover:shadow-filmDark">
      {film['awards'] && renderOscarIcon(film['awards']['oscar'])}
      <div className="flex">
        <div className="flex-none">
          <img className="w-48 h-64 rounded-md"
               src={film['poster'] || PosterHolder}
               onError={(e) => e.target.src = PosterHolder}
               alt=""/>
        </div>
        <div className="flex-auto mx-4">
          <div className="text-xl font-bold text-gray-900 dark:text-gray-300">
            {formatTitleAndYear(`${film['title'] || '-'} (${film['year'] || '-'})`)}
            <span className="ml-4 font-black text-pink-500 dark:text-orange-400">
              {((film['imdb'] && film['imdb']['rating']) || 0).toFixed(1)}
            </span>
          </div>
          <div className="mt-3 grid grid-rows-1 grid-cols-12">
            <div className="col-span-6">
              {renderInfoTable()}
            </div>
            <div className="col-span-6 ml-2">
              {renderRatingTable()}
              {
                film['plot'] &&
                <p>
                  <b className="mr-2">Plot: </b>
                  {formatPlot(film['plot'].trim())}
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
