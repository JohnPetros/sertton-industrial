// import { screen } from '@testing-library/react-native'
// import { http, HttpResponse } from 'msw'
// import { setupServer } from 'msw/node'

// import { parsePaymentConfigsToCreditCardTypes } from '../useCreditCardTypes'
// import { CreditCardTypes } from '..'

// import { testApi } from '@/_tests_/configs/testApi'
// import { render } from '@/_tests_/customs/customRender'
// import { paymentConfigsMock } from '@/_tests_/mocks/paymentConfigsMock'
// import { initializeApiProvider } from '@/services/api'
// import { axiosProvider } from '@/services/api/axios'
// import { Resources } from '@/services/api/config/resources'

// const server = setupServer(
//   ...testApi.DEFAULT_HANDLERS,
//   http.get(`${testApi.BASE_URL}/${Resources.CHECKOUT}/payments`, () => {
//     return HttpResponse.json({ data: paymentConfigsMock })
//   })
// )

// function mockGetIcon(iconUrl: string) {
//   server.use(
//     http.get(iconUrl, () => {
//       return HttpResponse.json('https://www.svgrepo.com/show/85091/random.svg')
//     })
//   )
// }

// describe('CreditCardTypes component', () => {
//   beforeAll(() => {
//     initializeApiProvider(axiosProvider)

//     server.listen({
//       onUnhandledRequest: 'error',
//     })
//   })

//   it.each(parsePaymentConfigsToCreditCardTypes(paymentConfigsMock))(
//     'should render credit card type $name',
//     async ({ name, icon }) => {
//       mockGetIcon(icon)

//       render(<CreditCardTypes />)

//       expect(await screen.findByTestId(name))
//     }
//   )
// })
