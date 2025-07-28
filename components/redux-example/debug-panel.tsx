"use client"

import { useAppSelector } from "@/lib/store/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugPanel() {
  const athletes = useAppSelector(state => state.athletes)
  const regions = useAppSelector(state => state.regions)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🐛 Debug Panel - Redux State</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Athletes State:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(athletes, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Regions State:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(regions, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 