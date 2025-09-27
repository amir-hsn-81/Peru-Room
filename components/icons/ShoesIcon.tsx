
import React from 'react';

const ShoesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-2.59 1.9-3.97 4.97-3.97 8.22v4.8m4.49-4.49a14.95 14.95 0 00-6.16-3.42m6.16 3.42a14.95 14.95 0 013.83 5.03m-3.83-5.03a14.95 14.95 0 01-6.16-3.42m0 0a14.95 14.95 0 00-3.83 5.03m6.16-3.42a14.95 14.95 0 00-6.16-3.42"
    />
  </svg>
);
export default ShoesIcon;
