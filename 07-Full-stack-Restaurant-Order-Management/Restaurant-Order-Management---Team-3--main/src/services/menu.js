import { axiosInstance as api } from './axiosInstance'



export const getMenuByCategory = async (params = {}) => {
    try {
        const response = await api.get(`/menu/category/${params.category}`, { params })
        if (response.data) {
            return {
                success: true,
                data: response.data.data,
                total: response.data.total,
                limit: response.data.limit,
                skip: response.data.skip
            }
        } else {
            return {
                success: false,
                message: response.response?.data?.detail || 'Failed to fetch menu data'
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || error.message || 'Failed to fetch menu data'
        }
    }
}

export const getMenuCategories = async () => {
    try {
        const response = await api.get('/menu/categories')
        if (response.data) {
            return {
                success: true,
                data: response.data
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || error.message || 'Failed to fetch menu categories'
        }
    }
}