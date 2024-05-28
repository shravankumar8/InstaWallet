import React from 'react'

export  const Button = ({onClick,label}) => {

  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className="w-full text-white bg-gray-800 px-5 py-2.5  hover:bg-gray-900 focus:outline-none focus:ring-4 ng-4 focus:ring-gray-300 mb-2 me-2 font-medium  rounded-lg text-sm"
      >
        {label}
      </button>
    </div>
  );
};


