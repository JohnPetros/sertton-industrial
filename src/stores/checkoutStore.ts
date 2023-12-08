import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export type CheckoutStoreState = {
  step: number
  personFormData: PersonFormData
}

export type PersonType = 'natural' | 'legal'

type CheckoutStoreActions = {
  setPersonFormData: (
    personType: PersonType,
    fieldName: string,
    value: string
  ) => void
  setStep(step: number): void
}

type CheckoutStoreProps = {
  state: CheckoutStoreState
  actions: CheckoutStoreActions
}

const initialState: CheckoutStoreState = {
  step: 3,
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
      },
    }
  })
)
