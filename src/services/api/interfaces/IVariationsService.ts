import type { Variation } from '@/@types/variation'

export interface IVariationsController {
  getVariations(): Promise<Variation[]>
}
