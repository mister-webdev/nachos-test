import React from 'react'
import style from '../styles/Winners.module.css'

export const TabsItem = ({
  title = '',
  isSelected = false,
  onItemClicked = () => console.error('No action'),
}) => {
  return (
    <div
      onClick={onItemClicked}
      className={
        isSelected
          ? `${style.tab} ${style['tab-selected']}`
          : `${style.tab} ${style['tab-unselected']}`}>
      <span>{title}</span>
    </div>
  )
}
