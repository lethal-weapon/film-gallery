import React from 'react';
import NotFoundImage from '../static/images/not-found.jpg';

export function NotFound() {
  return (
    <section>
      <div className="container-fluid animate__animated animate__fadeIn animate__slower animate__delay-2s">
        <div className="container text-center">
          <img src={NotFoundImage}
               alt=""
               style={{borderRadius: .5 + 'rem'}}
          />
        </div>
      </div>
    </section>
  );
}
