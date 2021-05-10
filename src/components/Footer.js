import React from 'react';

export function Footer() {
  return (
    <footer
      className="mt-5 pb-5 bg-transparent text-center font-weight-bold"
      style={{
        color: "tomato",
        fontSize: 1.15 + 'rem',
        fontFamily: "monospace"
      }}
    >
      <span className="animate__animated animate__fadeIn animate__slower animate__delay-3s">
        All Contents &amp; Designs &copy; Sean Kramer, 2021.
      </span>
    </footer>
  );
}
