import type { Variation } from '@/@types/variation'

export interface IVariationsService {
  getVariations(): Promise<Variation[]>
}
