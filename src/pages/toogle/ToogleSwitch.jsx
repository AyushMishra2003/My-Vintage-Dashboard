import React from 'react'


const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-10 h-4 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        isActive ? 'bg-green-500' : 'bg-gray-400'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isActive ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </div>
  );
};


export default ToggleSwitch