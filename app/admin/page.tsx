"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false)
  const [userRole, setUserRole] = useState<"superadmin" | "admin_kontingen" | "admin_kegiatan">("superadmin")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <AdminLayout userRole={userRole}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View as:</span>
            <Select value={userRole} onValueChange={(value: "superadmin" | "admin_kontingen" | "admin_kegiatan") => setUserRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin_kontingen">Region Admin</SelectItem>
                <SelectItem value="admin_kegiatan">Event Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Export Report</Button>
        </div>
      </div>
      {/* Tambahkan konten dashboard admin di sini, bisa copy dari project lama */}
    </AdminLayout>
  )
}