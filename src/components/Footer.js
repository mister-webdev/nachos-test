import React from 'react'
import style from '../styles/Footer.module.css'
import button from '../styles/Buttons.module.css'
import toTop from '../assets/icons/to-top.svg'
import bgFlames from '../assets/bg-flames-orange-2.png'


export const Footer = () => {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={style.footer}>
      <div className={style.flames}>
        <img src={bgFlames} alt='' role='presentation' />
      </div>
      <div className={style.info}>
        <p className={style.copyright}>
          <span>&copy; 2020,  &laquo;Акти&raquo;</span>
          <span>Все права защищены.</span>
        </p>
        <p className={style.phone}>
          <span>8 (909) 444-45-13</span>
          <span>Звонок по России бесплатный.</span>
          <span>Пн-Сб с 9:00 до 19:00 (МСК)</span>
        </p>
        <button
          className={button['to-top']}
          onClick={scrollTop}
        ><img src={toTop} role='presentation' alt='' /></button>
      </div>
    </footer>
  )
}
