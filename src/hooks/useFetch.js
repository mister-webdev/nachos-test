import { useState, useEffect } from 'react'
import { API_URL } from '../config'

export const useFetch = () => {
  const [data, setData] = useState({ winners: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = async endpoint => {
    setLoading(true)
    setError(false)

    const isLoadMore = endpoint.search('page')

    try {
      const response = await (await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Actie-Promo-Action': '0a3cfda0-21fb-4510-878a-8016a0c18e15'
        }
      })).json()

      console.log(endpoint)

      setData(prev => ({
        ...prev,
        winners:
          isLoadMore !== -1
            ? [...prev.winners, ...response.checks]
            : [...response.checks],
        currentPage: response.page,
        totalPages: response.total_pages
      }))
    } catch (error) {
      setError(true)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(API_URL)
  }, [])

  return [{ data, loading, error }, fetchData]
}
