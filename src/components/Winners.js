import React, { useState } from 'react'
import style from '../styles/Winners.module.css'
import button from '../styles/Buttons.module.css'
import searchIcon from '../assets/search-icon.svg'
import NumberFormat from 'react-number-format'
import { TabsItem } from '../elements/TabsItem'
import { WinnerCard } from '../elements/WinnerCard'
import { useFetch } from '../hooks/useFetch'

export const Winners = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('jbl_speaker')
  const [cardsToShow, setCardsToShow] = useState(5)
  const [
    {
      data: { winners }
    }
  ] = useFetch()

  const tabItems = [
    {
      id: 1,
      name: 'hoodie',
      title: 'Ежедневный приз',
    },
    {
      id: 2,
      name: 'jbl_speaker',
      title: 'Еженедельный приз',
    },
    {
      id: 3,
      name: 'main_prise',
      title: 'Главный приз',
    },
  ]

  const handleChange = e => {
    const { value } = e.target
    setSearchTerm(value)
  }

  const loadMore = () => {
    setCardsToShow(cardsToShow + 5)
  }

  return (
    <section className={style.wrapper}>
      <h2 className={style.heading}>Победители розыгрыша</h2>
      <p className={style.text}>Все победители будут опубликованы не позднее 31 декабря 2020 года.</p>
      <p className={style.text}>Чтобы проверить победу, введите номер телефона:</p>

      <div className={style['search-box']}>
        <NumberFormat
          format="+7 (###) ###-####"
          allowEmptyFormatting mask="_"
          className={style.input}
          value={searchTerm}
          onChange={handleChange}
        />
        <button className={button.search}>
          <img src={searchIcon} alt='' role='presentation' />
        </button>
      </div>

      <div className={style.tabs}>
        {tabItems.map(({ id, name, title }) =>
          (<TabsItem
            key={id}
            title={title}
            onItemClicked={() => setSelectedTab(name)}
            isSelected={selectedTab === name}
          />
          ))}
      </div>

      <div className={style['winner-card-box']}>
        <>
          {selectedTab === 'main_prise'
            ? (<p className={style.text}>Победители не определены</p>)
            : null
          }
        </>
        <>
          {!searchTerm.endsWith('_')
            ? (winners && winners
              .slice(0, cardsToShow)
              .filter(item => (
                item.prise_slug === selectedTab &&
                item.phone.endsWith(searchTerm.slice(-2))
              ))
              .map(({ fd, ...items }) => (
                <WinnerCard {...items} key={fd} />
              )))
            : (winners && winners
              .slice(0, cardsToShow)
              .filter(item => (
                item.prise_slug === selectedTab
              ))
              .map(({ fd, ...items }) => (
                <WinnerCard {...items} key={fd} />
              )))
          }
        </>
      </div>
      {cardsToShow < winners.length &&
        cardsToShow >= 5 &&
        selectedTab !== 'main_prise'
        ? (
          <button
            className={button['show-more']}
            onClick={loadMore}
          >
            Показать ещё
          </button>
        ) : null
      }
    </section>
  )
}
