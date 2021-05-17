import React from 'react';
import PosterHolder from '../static/images/no-poster.jpg';

export function FilmGridRow({films}) {
  return (
    <div className="mt-4 grid grid-rows-1 grid-cols-12 gap-x-4">
      {
        films.map(film =>
          <div key={film['id']} className="col-span-3 hvr-grow">
            <img className="w-full h-80 rounded-md border border-gray-400 dark:border-dark-900"
                 src={film['poster'] || PosterHolder}
                 onError={(e) => e.target.src = PosterHolder}
                 alt=""/>
            <div className="text-center">
              <h6 className="font-bold text-gray-900 dark:text-gray-300">
                {`${film['title'] || '-'} (${film['year'] || '-'})`}
              </h6>
              <h6 className="-mt-1 font-black text-pink-500 dark:text-orange-400">
                {
                  `IMDB: ${
                    ((film['imdb'] && film['imdb']['rating']) || 0).toFixed(1)
                  }`
                }
              </h6>
            </div>
          </div>
        )
      }
    </div>
  );
}
