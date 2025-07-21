import { useState, useEffect } from 'react'

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall()
        setData(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = async (asyncFunction) => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      return result
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error, setError }
}