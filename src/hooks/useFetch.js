import { useState, useEffect } from 'react'

export const useFetch = () => {
  const [data, setData] = useState({ winners: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchData(url = '') {
    setLoading(true)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Actie-Promo-Action': '0a3cfda0-21fb-4510-878a-8016a0c18e15'
        }
      })
      setLoading(false)
      return response.json()
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData("https://stage.actie.ru/api/v1/checks/winners")
      .then((data) => setData({ winners: data.checks }))
  }, [])

  return [{ data, loading, error }]
}
