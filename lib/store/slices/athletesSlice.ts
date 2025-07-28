import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Athlete {
  id: string
  name: string
  gender: string
  birthDate: Date
  category: string
  status: string
  region: {
    id: string
    name: string
  }
  createdAt?: Date
  updatedAt?: Date
}

interface AthletesState {
  list: Athlete[]
  loading: boolean
  error: string | null
  filters: {
    search: string
    category: string
    region: string
    status: string
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
  }
}

const initialState: AthletesState = {
  list: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    region: 'all',
    status: 'all'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: 1
  }
}

// Async thunks
export const fetchAthletes = createAsyncThunk(
  'athletes/fetchAthletes',
  async () => {
    const response = await fetch('/api/athletes')
    const data = await response.json()
    console.log('Fetched athletes:', data)
    return data
  }
)

export const addAthlete = createAsyncThunk(
  'athletes/addAthlete',
  async (athlete: Omit<Athlete, 'id'>) => {
    const response = await fetch('/api/athletes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: athlete.name,
        birthDate: athlete.birthDate,
        gender: athlete.gender,
        category: athlete.category,
        status: athlete.status,
        regionId: athlete.region.id
      }),
    })
    const data = await response.json()
    return data
  }
)

export const updateAthlete = createAsyncThunk(
  'athletes/updateAthlete',
  async (athlete: Athlete) => {
    const response = await fetch('/api/athletes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athlete),
    })
    const data = await response.json()
    return data
  }
)

export const deleteAthlete = createAsyncThunk(
  'athletes/deleteAthlete',
  async (id: string) => {
    await fetch(`/api/athletes?id=${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

const athletesSlice = createSlice({
  name: 'athletes',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.currentPage = 1
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
      state.pagination.currentPage = 1
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.filters.region = action.payload
      state.pagination.currentPage = 1
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        region: 'all',
        status: 'all'
      }
      state.pagination.currentPage = 1
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch athletes
      .addCase(fetchAthletes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage)
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch athletes'
      })
      // Add athlete
      .addCase(addAthlete.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      // Update athlete
      .addCase(updateAthlete.fulfilled, (state, action) => {
        const index = state.list.findIndex(athlete => athlete.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      // Delete athlete
      .addCase(deleteAthlete.fulfilled, (state, action) => {
        state.list = state.list.filter(athlete => athlete.id !== action.payload)
      })
  }
})

export const {
  setSearch,
  setCategoryFilter,
  setRegionFilter,
  setStatusFilter,
  setCurrentPage,
  clearFilters
} = athletesSlice.actions

export default athletesSlice.reducer 