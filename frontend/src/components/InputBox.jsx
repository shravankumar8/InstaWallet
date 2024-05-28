import React from 'react'

export const InputBox = ({label,placeholder,onChange,value}) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input value={value} className='w-full px-2 py-1 border rounded border-slate-200' onChange={onChange} placeholder={placeholder}></input>
    </div>
  );
}

 
