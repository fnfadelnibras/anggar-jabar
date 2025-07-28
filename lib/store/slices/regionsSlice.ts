import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Region {
  id: string
  name: string
  code: string
  description?: string
  _count?: {
    athletes: number
  }
}

interface RegionsState {
  list: Region[]
  loading: boolean
  error: string | null
  filters: {
    search: string
    athletesCount: string
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
  }
}

const initialState: RegionsState = {
  list: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    athletesCount: 'all'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: 1
  }
}

// Async thunks
export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async () => {
    const response = await fetch('/api/regions')
    const data = await response.json()
    console.log('Fetched regions:', data)
    return data
  }
)

export const addRegion = createAsyncThunk(
  'regions/addRegion',
  async (region: Omit<Region, 'id'>) => {
    const response = await fetch('/api/regions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(region),
    })
    const data = await response.json()
    return data
  }
)

export const updateRegion = createAsyncThunk(
  'regions/updateRegion',
  async (region: Region) => {
    const response = await fetch('/api/regions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(region),
    })
    const data = await response.json()
    return data
  }
)

export const deleteRegion = createAsyncThunk(
  'regions/deleteRegion',
  async (id: string) => {
    await fetch(`/api/regions?id=${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.currentPage = 1
    },
    setAthletesCountFilter: (state, action: PayloadAction<string>) => {
      state.filters.athletesCount = action.payload
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        athletesCount: 'all'
      }
      state.pagination.currentPage = 1
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch regions
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage)
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch regions'
      })
      // Add region
      .addCase(addRegion.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      // Update region
      .addCase(updateRegion.fulfilled, (state, action) => {
        const index = state.list.findIndex(region => region.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      // Delete region
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.list = state.list.filter(region => region.id !== action.payload)
      })
  }
})

export const {
  setSearch,
  setAthletesCountFilter,
  setCurrentPage,
  clearFilters
} = regionsSlice.actions

export default regionsSlice.reducer 