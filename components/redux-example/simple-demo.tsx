"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchAthletes } from "@/lib/store/slices/athletesSlice"
import { fetchRegions as fetchRegionsAction } from "@/lib/store/slices/regionsSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SimpleDemo() {
  const dispatch = useAppDispatch()
  const athletes = useAppSelector(state => state.athletes)
  const regions = useAppSelector(state => state.regions)

  useEffect(() => {
    dispatch(fetchAthletes())
    dispatch(fetchRegionsAction())
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchAthletes())
    dispatch(fetchRegionsAction())
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Simple Redux Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Athletes State:</h3>
              <div className="bg-gray-100 p-2 rounded text-sm">
                <p><strong>Loading:</strong> {athletes.loading ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {athletes.error || 'None'}</p>
                <p><strong>Count:</strong> {athletes.list?.length || 0} athletes</p>
                {athletes.list && athletes.list.length > 0 && (
                  <div className="mt-2">
                    <p><strong>First Athlete:</strong></p>
                    <pre className="text-xs bg-white p-2 rounded">
                      {JSON.stringify(athletes.list[0], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Regions State:</h3>
              <div className="bg-gray-100 p-2 rounded text-sm">
                <p><strong>Loading:</strong> {regions.loading ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {regions.error || 'None'}</p>
                <p><strong>Count:</strong> {regions.list?.length || 0} regions</p>
                {regions.list && regions.list.length > 0 && (
                  <div className="mt-2">
                    <p><strong>First Region:</strong></p>
                    <pre className="text-xs bg-white p-2 rounded">
                      {JSON.stringify(regions.list[0], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handleRefresh} className="w-full">
              🔄 Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 