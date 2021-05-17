import React from 'react';
import NotFoundImage from '../static/images/not-found.jpg';

export function NotFound() {
  return (
    <section className="animate__animated animate__fadeIn animate__slower animate__delay-2s">
      <div className="container mx-auto w-4/5">
        <div className="grid justify-items-center">
          <div>
            <img className="rounded-md"
                 src={NotFoundImage}
                 alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
