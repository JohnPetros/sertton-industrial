import { View } from 'react-native'
import { fireEvent, screen } from '@testing-library/react-native'

import { Address } from '../Address'

import { render } from '@/_tests_/customs/customRender'
import { addressesMock } from '@/_tests_/mocks/addressesMock'

const Pencil = () => <View />
const Trash = () => <View />

jest.mock('phosphor-react-native', () => ({
  Pencil: () => {
    return <Pencil />
  },
  Trash: () => {
    return <Trash />
  },
}))

const onEditMock = jest.fn()
const onDeleteMock = jest.fn()

const addressMock = addressesMock[0]

function renderAddressComponent() {
  const { debug } = render(
    <Address
      city={addressMock.city}
      zipcode={addressMock.zip_code}
      number={addressMock.number}
      uf={addressMock.uf}
      neighborhood={addressMock.neighborhood}
      street={addressMock.street}
      onEdit={onEditMock}
      onDelete={onDeleteMock}
    />
  )

  debug()
}

describe('Address component', () => {
  it('should render address data', () => {
    renderAddressComponent()

    expect(
      screen.getByText(
        `${addressMock.street}, ${addressMock.number} - ${addressMock.neighborhood}`
      )
    ).toBeTruthy()
    expect(
      screen.getByText(
        `${addressMock.zip_code} | ${addressMock.city} - ${addressMock.uf}`
      )
    ).toBeTruthy()
  })

  it('should call function on edit', () => {
    renderAddressComponent()

    fireEvent.press(screen.getByTestId('edit-button-' + addressMock.zip_code))

    expect(onEditMock).toHaveBeenCalledWith(addressMock.zip_code)
  })

  it('should show alert on delete delete', () => {
    renderAddressComponent()

    fireEvent.press(screen.getByTestId('delete-button-' + addressMock.zip_code))

    expect(screen.getByTestId('alert')).toBeTruthy()
  })
})
