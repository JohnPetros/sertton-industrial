import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { Address } from '@/@types/address'
import type { CreditCard } from '@/@types/creditCard'
import type { ShipmentService } from '@/@types/shipmentService'
import type { Transaction } from '@/@types/transaction'
import type { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export type CheckoutStoreState = {
  step: number
  personFormData: PersonFormData
  creditCard: CreditCard
  address: Omit<Address, 'id'>
  shipmentService: ShipmentService | null
  transaction: Transaction | null
}

export type PersonType = 'natural' | 'legal'

type CheckoutStoreActions = {
  setPersonFormData: (
    personType: PersonType,
    fieldName: string,
    value: string
  ) => void
  setStep(step: number): void
  setCreditCard(creditCardField: string, value: string): void
  setAddress(address: Omit<Address, 'id'>): void
  setShipmentService(shipmentService: ShipmentService): void
  setTransaction(transaction: Transaction): void
  resetState(): void
}

export type CheckoutStoreProps = {
  state: CheckoutStoreState
  actions: CheckoutStoreActions
}

export const initialCheckoutStoreState: CheckoutStoreState = {
  step: 2,
  personFormData: {
    naturalPerson: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
    },
    legalPerson: {
      email: '',
      phone: '',
      razaoSocial: '',
      cnpj: '',
    },
  },
  creditCard: {
    cpf: '',
    expirationDate: '',
    name: '',
    number: '',
    securityCode: '',
  },
  address: {
    receiver: '',
    zip_code: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    city: '',
    uf: '',
  },
  shipmentService: null,
  transaction: null,
}

export const useCheckoutStore = create<CheckoutStoreProps>()(
  immer((set) => {
    return {
      state: initialCheckoutStoreState,
      actions: {
        setPersonFormData(
          personType: PersonType,
          fieldName: string,
          value: string
        ) {
          return set(({ state }) => {
            if (personType === 'natural') {
              state.personFormData.naturalPerson[
                fieldName as keyof NaturalPersonFormFields
              ] = value
            }

            if (personType === 'legal') {
              state.personFormData.legalPerson[
                fieldName as keyof LegalPersonFormFields
              ] = value
            }
          })
        },

        setStep(step: number) {
          return set(({ state }) => {
            if (step <= 3) state.step = step
          })
        },

        setCreditCard(creditCardField: string, value: string) {
          return set(({ state }) => {
            state.creditCard[creditCardField as keyof CreditCard] = value
          })
        },

        setAddress(address: Omit<Address, 'id'>) {
          return set(({ state }) => {
            state.address = address
          })
        },

        setShipmentService(shipmentService: ShipmentService) {
          return set(({ state }) => {
            state.shipmentService = shipmentService
          })
        },

        setTransaction(transaction: Transaction) {
          return set(({ state }) => {
            state.transaction = transaction
          })
        },

        resetState() {
          return set({
            state: initialCheckoutStoreState,
          })
        },
      },
    }
  })
)
