import { screen } from '@testing-library/react-native'

import { Banner } from '../Banner'

import { TEST_IDS } from './utils/test-ids'

import { render } from '@/_tests_/customs/customRender'

const imageUrl = 'http://mock.png'

describe('Banner component', () => {
  it('Should have image url as prop', () => {
    render(<Banner imageUrl={imageUrl} />)

    const image = screen.getByTestId(TEST_IDS.bannerImage)

    expect(image.props.source.uri).toBe(`https://${imageUrl}`)
  })
})
