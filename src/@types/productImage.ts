export type ImageSize = 'thumb' | 'small' | 'medium' | 'large' | 'xLarge'

export type Image = {
  size: ImageSize
  width: number
  height: number
  url: string
}
