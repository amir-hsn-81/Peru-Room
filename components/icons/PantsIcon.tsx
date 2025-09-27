
import React from 'react';

const PantsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 4.875c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v14.25c0 1.036-.84 1.875-1.875 1.875h-.375c-1.036 0-1.875-.84-1.875-1.875V4.875zm15 0c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v14.25c0 1.036-.84 1.875-1.875 1.875h-.375c-1.036 0-1.875-.84-1.875-1.875V4.875zm-7.5 0v14.25"
    />
  </svg>
);
export default PantsIcon;

