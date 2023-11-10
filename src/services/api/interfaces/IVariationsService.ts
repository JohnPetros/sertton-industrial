import type { Variation } from '@/@types/variation'

export interface ICollectionsService {
  getVariations(): Promise<Variation[]>
}
