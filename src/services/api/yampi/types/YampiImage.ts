export type YampiImageSize = 'thumb' | 'small' | 'medium' | 'large' | 'xLarge'

export type YampiImage = {
  [key in YampiImageSize]: {
    width: number
    height: number
    url: string
  }
}
