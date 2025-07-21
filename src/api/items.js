import { categoriesAPI, itemsAPI } from '../services/api'

// Re-export the API functions with the expected names
export const getFeaturedItems = categoriesAPI.getFeaturedItems
export const getCategories = categoriesAPI.getCategories
export const getItems = itemsAPI.getItems
export const getItem = itemsAPI.getItem
export const createItem = itemsAPI.createItem
export const updateItem = itemsAPI.updateItem
export const deleteItem = itemsAPI.deleteItem
export const toggleFavorite = itemsAPI.toggleFavorite