import React, { useState } from 'react'
import style from '../styles/Winners.module.css'
import button from '../styles/Buttons.module.css'
import searchIcon from '../assets/search-icon.svg'
import NumberFormat from 'react-number-format'
import { TabsItem } from '../elements/TabsItem'
import { WinnerCard } from '../elements/WinnerCard'
import { Spinner } from '../elements/Spinner'
import { useFetch } from '../hooks/useFetch'
import { API_URL, SEARCH_URL } from '../config'

export const Winners = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')
  const [selectedTab, setSelectedTab] = useState('jbl_speaker')
  const [
    {
      data: { winners, currentPage, totalPages },
      loading
    },
    fetchData
  ] = useFetch(searchTerm)

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

  const searchWinners = search => {
    const filtered = search.replace(/\D/g, '')
    const endpoint = filtered.length === 11 ? `${SEARCH_URL}${filtered}` : API_URL
    setSearchTerm(filtered)
    fetchData(endpoint)
  }

  const handleSearch = e => {
    const { value } = e.target
    setInput(value)
    searchWinners(value)
  }

  const loadMore = () => {
    const endpoint = `${API_URL}?page=${currentPage + 1}`
    fetchData(endpoint)
  }

  return (
    <section className={style.wrapper}>
      <h2 className={style.heading}>Победители розыгрыша</h2>
      <p className={style.text}>Все победители будут опубликованы не позднее 31 декабря 2020 года.</p>
      <p className={style.text}>Чтобы проверить победу, введите номер телефона:</p>

      <div className={style['search-box']}>
        <NumberFormat
          type="tel"
          format="+7 (###) ###-####"
          allowEmptyFormatting mask="_"
          className={style.input}
          value={input}
          onChange={handleSearch}
        />
        <button className={button.search}>
          <img src={searchIcon} alt='' role='presentation' />
        </button>
      </div>

      {searchTerm.length === 0 ||
        searchTerm.length < 11 ||
        searchTerm.endsWith('_')
        ? (<div className={style.tabs}>
          {tabItems.map(({ id, name, title }) =>
            (<TabsItem
              key={id}
              title={title}
              onItemClicked={() => setSelectedTab(name)}
              isSelected={selectedTab === name}
            />)
          )}
        </div>)
        : null
      }

      <div className={style['winner-card-box']}>
        <>
          {selectedTab === 'main_prise'
            ? (<p className={style.text}>Победители не определены</p>)
            : null}
        </>
        <>
          {winners && winners
            .filter(item => (
              item.prise_slug === selectedTab
            ))
            .map(({ fd, ...items }) => (
              <WinnerCard {...items} key={fd} />
            ))}
        </>
      </div>
      {loading
        ? <Spinner />
        : (currentPage < totalPages &&
          selectedTab !== 'main_prise') &&
          (searchTerm.length === 0 ||
            searchTerm.length < 11 ||
            searchTerm.endsWith('_'))
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
