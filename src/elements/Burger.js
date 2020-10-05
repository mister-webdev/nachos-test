import React from 'react'
import burger from '../styles/Burger.module.css'

export const Burger = ({ open, setOpen }) => {
  return (
    <div className={burger.box} onClick={() => setOpen(!open)}>
      <div className={
        open
          ? `${burger.btn} ${burger['not-active']}`
          : `${burger.btn} ${burger['active']}`
      }>
        <span className={burger.line}></span>
        <span className={burger.line}></span>
        <span className={burger.line}></span>
      </div>
    </div>
  )
}
