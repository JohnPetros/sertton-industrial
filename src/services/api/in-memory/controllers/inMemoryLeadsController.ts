import { ILeadsController } from '../../interfaces/ILeadsController'

import type { Lead } from '@/@types/lead'

export function inMemoryLeadsController(): ILeadsController {
  const leads: Lead[] = []

  return {
    async saveLead(email: string) {
      leads.push({ email })
    },
    async getLeads() {
      return leads
    },
  }
}
