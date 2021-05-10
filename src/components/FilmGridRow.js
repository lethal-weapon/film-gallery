import React from 'react';
import PosterHolder from '../static/images/no-poster.jpg';
import '../static/styles/Film.css';

export function FilmGridRow({films}) {
  return <div className="row mt-3">
    {
      films.map(film =>
        <div key={`${film['title']}-${film['year']}`} className="col-3">
          <div className="card bg-transparent hvr-grow">
            <img className="card-img-top film-poster-grid"
                 src={film['poster'] || PosterHolder}
                 onError={(e) => e.target.src = PosterHolder}
                 alt=""/>
            <div className="card-body">
              <h6 className="film-title-grid">
                {`${film['title'] || '-'} (${film['year'] || '-'})`}
              </h6>
              <h6 className="film-rating-grid">
                {
                  `IMDB: ${
                    ((film['imdb'] && film['imdb']['rating']) || 0).toFixed(1)
                  }`
                }
              </h6>
            </div>
          </div>
        </div>
      )
    }
  </div>
}
