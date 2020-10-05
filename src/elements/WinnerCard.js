import React from 'react'
import style from '../styles/Winners.module.css'

export const WinnerCard = ({ prise, phone, draw_period }) => (
  <div className={style['winner-card']}>
    <span className={style.prise}>{prise}</span>
    <span className={style.phone}>{phone}</span>
    <span className={style.date}>{draw_period}</span>
  </div>
)