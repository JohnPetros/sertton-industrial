import { DrawerActions, DrawerActionType } from '@react-navigation/native'

const toggleDrawerMock = jest.fn()
const closeDrawerMock = jest.fn()

export function DrawerActionsMock() {
  jest
    .mocked(DrawerActions)
    .toggleDrawer.mockReturnValueOnce(
      toggleDrawerMock as unknown as DrawerActionType
    )

  jest
    .mocked(DrawerActions)
    .closeDrawer.mockReturnValueOnce(
      closeDrawerMock as unknown as DrawerActionType
    )

  return {
    toggleDrawerMock,
    closeDrawerMock,
  }
}
