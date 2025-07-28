import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface DashboardStats {
  totalAthletes: number
  totalRegions: number
  activeAthletes: number
  inactiveAthletes: number
  maleAthletes: number
  femaleAthletes: number
  athletesByCategory: Array<{ category: string; count: number }>
  athletesByRegion: Array<{ region: string; count: number }>
  recentAthletes: any[]
  topRegions: any[]
}

interface DashboardState {
  stats: DashboardStats
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  stats: {
    totalAthletes: 0,
    totalRegions: 0,
    activeAthletes: 0,
    inactiveAthletes: 0,
    maleAthletes: 0,
    femaleAthletes: 0,
    athletesByCategory: [],
    athletesByRegion: [],
    recentAthletes: [],
    topRegions: []
  },
  loading: false,
  error: null
}

// Async thunk untuk fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async () => {
    const [athletesResponse, regionsResponse] = await Promise.all([
      fetch('/api/athletes'),
      fetch('/api/regions')
    ])
    
    const athletes = await athletesResponse.json()
    const regions = await regionsResponse.json()

    // Calculate stats
    const totalAthletes = athletes.length
    const totalRegions = regions.length
    const activeAthletes = athletes.filter((a: any) => a.status === 'ACTIVE').length
    const inactiveAthletes = athletes.filter((a: any) => a.status === 'INACTIVE').length
    const maleAthletes = athletes.filter((a: any) => a.gender === 'Pria').length
    const femaleAthletes = athletes.filter((a: any) => a.gender === 'Wanita').length

    // Athletes by category
    const categoryCount = athletes.reduce((acc: any, athlete: any) => {
      acc[athlete.category] = (acc[athlete.category] || 0) + 1
      return acc
    }, {})
    const athletesByCategory = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count: count as number
    }))

    // Athletes by region
    const regionCount = athletes.reduce((acc: any, athlete: any) => {
      acc[athlete.region.name] = (acc[athlete.region.name] || 0) + 1
      return acc
    }, {})
    const athletesByRegion = Object.entries(regionCount).map(([region, count]) => ({
      region,
      count: count as number
    })).sort((a, b) => b.count - a.count)

    // Recent athletes (last 5)
    const recentAthletes = athletes
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    // Top regions (top 5)
    const topRegions = regions
      .sort((a: any, b: any) => (b._count?.athletes || 0) - (a._count?.athletes || 0))
      .slice(0, 5)

    return {
      totalAthletes,
      totalRegions,
      activeAthletes,
      inactiveAthletes,
      maleAthletes,
      femaleAthletes,
      athletesByCategory,
      athletesByRegion,
      recentAthletes,
      topRegions
    }
  }
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch dashboard data'
      })
  }
})

export default dashboardSlice.reducer 