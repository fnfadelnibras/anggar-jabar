import { prisma } from "./prisma"

export interface ActivityData {
  type: 'athlete' | 'region' | 'admin' | 'system'
  action: 'created' | 'updated' | 'deleted' | 'logged_in' | 'logged_out' | 'status_changed'
  description: string
  userId?: string
  metadata?: Record<string, any>
}

export async function logActivity(data: ActivityData) {
  try {
    await prisma.activity.create({
      data: {
        type: data.type,
        action: data.action,
        description: data.description,
        userId: data.userId,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}

// Helper functions for common activities
export async function logAthleteCreated(athleteName: string, userId?: string) {
  await logActivity({
    type: 'athlete',
    action: 'created',
    description: `New athlete added: ${athleteName}`,
    userId,
  })
}

export async function logAthleteUpdated(athleteName: string, userId?: string) {
  await logActivity({
    type: 'athlete',
    action: 'updated',
    description: `Athlete updated: ${athleteName}`,
    userId,
  })
}

export async function logAthleteDeleted(athleteName: string, userId?: string) {
  await logActivity({
    type: 'athlete',
    action: 'deleted',
    description: `Athlete deleted: ${athleteName}`,
    userId,
  })
}

export async function logRegionCreated(regionName: string, userId?: string) {
  await logActivity({
    type: 'region',
    action: 'created',
    description: `New region added: ${regionName}`,
    userId,
  })
}

export async function logRegionUpdated(regionName: string, userId?: string) {
  await logActivity({
    type: 'region',
    action: 'updated',
    description: `Region updated: ${regionName}`,
    userId,
  })
}

export async function logAdminLogin(adminName: string, userId?: string) {
  await logActivity({
    type: 'admin',
    action: 'logged_in',
    description: `Admin logged in: ${adminName}`,
    userId,
  })
}

export async function logAdminCreated(adminName: string, userId?: string) {
  await logActivity({
    type: 'admin',
    action: 'created',
    description: `New admin added: ${adminName}`,
    userId,
  })
} 