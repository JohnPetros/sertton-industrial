import { View } from 'react-native'
import { screen } from '@testing-library/react-native'

import { Radio } from '../Radio'
import { RadioGroup } from '..'

import { render } from '@/_tests_/customs/customRender'

const onChangeMock = jest.fn()

describe('Radio component', () => {
  it('should not render children if is not open and not selected', () => {
    const labelMock = 'labelMock'
    const valueMock = 'valueMock'
    const childrenTestId = 'radio-children'

    render(
      <RadioGroup value={valueMock} onChange={onChangeMock}>
        <Radio
          isOpen={false}
          isSelected={false}
          label={labelMock}
          value={valueMock}
        >
          <View testID={childrenTestId} />
        </Radio>
      </RadioGroup>
    )

    expect(screen.queryByTestId(childrenTestId)).not.toBeTruthy()
  })

  it('should call render properly', () => {
    const labelMock = 'labelMock'
    const valueMock = 'valueMock'
    const childrenTestId = 'radio-children'

    render(
      <RadioGroup value={valueMock} onChange={onChangeMock}>
        <Radio
          isOpen={false}
          isSelected={false}
          label={labelMock}
          value={valueMock}
        >
          <View testID={childrenTestId} />
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText(labelMock)).toBeTruthy()
  })

  it('should call function on press radio', () => {
    const labelMock = 'labelMock'
    const valueMock = 'valueMock'
    const childrenTestId = 'radio-children'

    render(
      <RadioGroup value={valueMock} onChange={onChangeMock}>
        <Radio
          isOpen={false}
          isSelected={false}
          label={labelMock}
          value={valueMock}
        >
          <View testID={childrenTestId} />
        </Radio>
      </RadioGroup>
    )

    expect(screen.queryByTestId(childrenTestId)).not.toBeTruthy()
  })
})
