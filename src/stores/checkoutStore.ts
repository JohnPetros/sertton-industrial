import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ShipmentService } from '@/@types/shipmentService'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export type CheckoutStoreState = {
  step: number
  personFormData: PersonFormData
  shipmentService: ShipmentService | null
}

export type PersonType = 'natural' | 'legal'

type CheckoutStoreActions = {
  setPersonFormData: (
    personType: PersonType,
    fieldName: string,
    value: string
  ) => void
  setStep(step: number): void
  setShipmentService(step: ShipementService): void
}

type CheckoutStoreProps = {
  state: CheckoutStoreState
  actions: CheckoutStoreActions
}

const initialState: CheckoutStoreState = {
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
  shipmentService: null,
}

export const useCheckoutStore = create<CheckoutStoreProps>()(
  immer((set) => {
    return {
      state: initialState,
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

        setShipmentService(shipmentService: ShipmentService) {
          return set(({ state }) => {
            state.shipmentService = shipmentService
          })
        },
      },
    }
  })
)
