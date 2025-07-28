"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchAthletes } from "@/lib/store/slices/athletesSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function AthleteList() {
  const dispatch = useAppDispatch()
  const { list: athletes, loading, error } = useAppSelector(state => state.athletes)

  useEffect(() => {
    dispatch(fetchAthletes())
  }, [dispatch])

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Komponen B: Daftar Atlet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Komponen B: Daftar Atlet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Komponen B: Daftar Atlet ({athletes?.length || 0} atlet)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!athletes || athletes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada atlet yang ditambahkan</p>
          ) : (
            athletes.slice(0, 5).map((athlete, index) => (
              <div key={athlete.id || `athlete-${index}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {athlete.name ? athlete.name.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{athlete.name || 'Nama tidak tersedia'}</h3>
                  <p className="text-sm text-gray-600">
                    {athlete.region?.name || 'Wilayah tidak tersedia'} • {athlete.category || 'Kategori tidak tersedia'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={athlete.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {athlete.status || 'Status tidak tersedia'}
                  </Badge>
                  <Badge variant="outline">
                    {athlete.gender || 'Gender tidak tersedia'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 