export type ImageSize = 'thumb' | 'small' | 'medium' | 'large' | 'xLarge'

export type Image = {
  [key in ImageSize]: {
    width: number
    height: number
    url: string
  }
}
