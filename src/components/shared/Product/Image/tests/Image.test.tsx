import { screen } from '@testing-library/react-native'

import { SIZES } from '../constants/sizes'
import { TEST_IDS } from '../constants/test-ids'
import { Image } from '..'

import { render } from '@/_tests_/customs/customRender'
import { ImageSize } from '@/@types/productImage'

const height = 200
const width = 200
const url = 'https://image.png'
const size: ImageSize = 'medium'

describe('Image component', () => {
  it('should have width and height according to image size prop', () => {
    render(<Image width={width} height={height} url={url} size={size} />)

    const image = screen.getByTestId(TEST_IDS.image)

    expect(image.props.style.width).toBe(SIZES[size])
    expect(image.props.style.width).toBe(SIZES[size])
  })

  it('should have url', () => {
    render(<Image width={width} height={height} url={url} size={size} />)

    const image = screen.getByTestId(TEST_IDS.image)

    expect(image.props.source.uri).toBe(url)
  })
})
