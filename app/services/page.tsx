import { db } from '@/lib/db'
import { ServicesPageClient } from '@/components/services/ServicesPageClient'

async function getServices() {
  try {
    return await db.service.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: 'asc' },
    })
  } catch {
    return []
  }
}

export const metadata = {
  title: 'Design & Renovation Services',
  description:
    'From interior design consultations to full home renovations — Maison Avant-Garde brings bold design to life.',
}

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesPageClient services={services as any} />
}
