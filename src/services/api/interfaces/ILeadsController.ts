export interface ILeadsController {
  saveLead(email: string): Promise<void>
}
