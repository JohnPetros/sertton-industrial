export type ImageSize = 'small' | 'thumb' | 'medium' | 'large'

export type Image = {
  [key in ImageSize]: {
    width: number
    height: number
    url: string
  }
}
