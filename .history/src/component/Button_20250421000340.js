import React from 'react'
import './Button.css';

const Button = ({children,type, onClick}) => {
  return (
    <div className='button'>
        <button onClick={onClick} type={type}>
          {children}
        </button>
    </div>
  )
}

export default Button
