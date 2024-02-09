import type { Lead } from '@/@types/lead'

export interface ILeadsController {
  saveLead(email: string): Promise<void>
  getLeads(): Promise<Lead[]>
}
