import { useState, useEffect, useCallback } from 'react'
import { useAuthStore } from '../store/authStore'
import { handleApiError } from '../services/api'

// Custom hook for API calls with loading, error, and data states
export const useApi = (apiCall, dependencies = [], options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuthStore()
  
  const {
    enabled = true,
    onSuccess,
    onError,
    initialData = null,
    refetchOnAuth = false
  } = options

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      const responseData = response.data
      setData(responseData)
      
      if (onSuccess) {
        onSuccess(responseData)
      }
    } catch (err) {
      const errorInfo = handleApiError(err)
      setError(errorInfo)
      
      if (onError) {
        onError(errorInfo)
      }
    } finally {
      setLoading(false)
    }
  }, [apiCall, enabled, onSuccess, onError])

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setLoading(false)
    } else {
      fetchData()
    }
  }, [...dependencies, fetchData])

  // Refetch when authentication state changes if specified
  useEffect(() => {
    if (refetchOnAuth && !loading) {
      fetchData()
    }
  }, [isAuthenticated, refetchOnAuth, fetchData, loading])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  const mutate = useCallback((newData) => {
    setData(newData)
  }, [])

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    mutate,
    isError: !!error,
    isSuccess: !loading && !error && data !== null
  }
}

// Custom hook for async actions (mutations)
export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(async (asyncFunction, options = {}) => {
    const { onSuccess, onError, onFinally } = options
    
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      setData(result)
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return { success: true, data: result }
    } catch (err) {
      const errorInfo = handleApiError(err)
      setError(errorInfo)
      
      if (onError) {
        onError(errorInfo)
      }
      
      return { success: false, error: errorInfo }
    } finally {
      setLoading(false)
      if (onFinally) {
        onFinally()
      }
    }
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  return { 
    execute, 
    loading, 
    error, 
    data,
    reset,
    isError: !!error,
    isSuccess: !loading && !error && data !== null
  }
}

// Hook for paginated data
export const usePaginatedApi = (apiCall, dependencies = [], options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  
  const { enabled = true, pageSize = 20 } = options

  const fetchData = useCallback(async (pageNum = 1, reset = false) => {
    if (!enabled) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await apiCall({ page: pageNum, page_size: pageSize })
      const responseData = response.data
      
      if (reset || pageNum === 1) {
        setData(responseData.results || [])
      } else {
        setData(prev => [...prev, ...(responseData.results || [])])
      }
      
      setTotalCount(responseData.count || 0)
      setHasMore(!!responseData.next)
      setPage(pageNum)
    } catch (err) {
      const errorInfo = handleApiError(err)
      setError(errorInfo)
    } finally {
      setLoading(false)
    }
  }, [apiCall, enabled, pageSize])

  useEffect(() => {
    fetchData(1, true)
  }, [...dependencies, fetchData])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1, false)
    }
  }, [fetchData, loading, hasMore, page])

  const refresh = useCallback(() => {
    fetchData(1, true)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    hasMore,
    page,
    totalCount,
    loadMore,
    refresh,
    isError: !!error,
    isSuccess: !loading && !error
  }
}

// Hook for real-time data (polling)
export const usePolling = (apiCall, interval = 5000, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPolling, setIsPolling] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      if (!loading) setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      const errorInfo = handleApiError(err)
      setError(errorInfo)
    } finally {
      setLoading(false)
    }
  }, [apiCall, loading])

  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchData])

  useEffect(() => {
    let intervalId

    if (isPolling) {
      intervalId = setInterval(fetchData, interval)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPolling, interval, fetchData])

  const startPolling = useCallback(() => {
    setIsPolling(true)
  }, [])

  const stopPolling = useCallback(() => {
    setIsPolling(false)
  }, [])

  return {
    data,
    loading,
    error,
    isPolling,
    startPolling,
    stopPolling,
    refetch: fetchData,
    isError: !!error,
    isSuccess: !loading && !error && data !== null
  }
}

// Hook for form submissions
export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submit = useCallback(async (submitFunction, options = {}) => {
    const { onSuccess, onError, resetOnSuccess = true } = options
    
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      const result = await submitFunction()
      setSuccess(true)
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      if (resetOnSuccess) {
        setTimeout(() => setSuccess(false), 3000)
      }
      
      return { success: true, data: result }
    } catch (err) {
      const errorInfo = handleApiError(err)
      setError(errorInfo)
      
      if (onError) {
        onError(errorInfo)
      }
      
      return { success: false, error: errorInfo }
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }, [])

  return {
    submit,
    loading,
    error,
    success,
    reset,
    isError: !!error,
    isSuccess: success
  }
}