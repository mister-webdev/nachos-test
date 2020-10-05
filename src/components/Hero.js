import React, { useState } from 'react'
import delicados from '../assets/logo/delicados-logo.png'
import nagnit from '../assets/logo/nagnit-logo.svg'
import sixterocka from '../assets/logo/sixterocka-logo.svg'
import nachos from '../assets/nachos/nachos.png'
import style from '../styles/Hero.module.css'
import button from '../styles/Buttons.module.css'
import { Burger } from '../elements/Burger'

export const Hero = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className={style.hero}>
      <header className={style.header}>
        <img className={style.logo} src={delicados} alt='Delicados' />
        <img className={style.logo} src={nagnit} alt='Нагнит' />
        <img className={style.logo} src={sixterocka} alt='Шестерочка' />
        <nav className={style.nav}>
          <a className={style.navlink} href='/'>Призы</a>
          <a className={style.navlink} href='/'>Правила</a>
          <a className={style.navlink} href='/'>Победители</a>
          <a className={style.navlink} href='/'>Вопросы и ответы</a>
        </nav>
        <a className={button['button-transparent']} href='/'>Личный Кабинет</a>
        <Burger setOpen={setOpen} open={open} />
      </header>
      <main className={style['hero-main']}>
        <article className={style['hero-info']}>
          <h1 className={style.heading}>Чертовски <br aria-hidden='true' /> хорошие начосы!</h1>
          <p className={style.description}>Купи пачку начасов в Нагнате или Шестерочке, зарегистрируй чек и получи возможность выиграть крутые призы!<br aria-hidden='true' />Главный приз — путешествие в Португалию, чтобы вживую увидеть пасть дьявола &laquo;Boca de inferno&raquo;</p>
          <button className={button['button-orange']}>Зарегистрировать чек</button>
        </article>
        <figure className={style['hero-picture']}>
          <img src={nachos} alt='' />
        </figure>
      </main>
    </section>
  )
}