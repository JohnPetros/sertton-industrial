import { useCallback, useRef } from 'react'
import { useQuery } from 'react-query'
import { useFocusEffect } from 'expo-router'

import type { Customer } from '@/@types/customer'
import { useAppError } from '@/components/AppError/useAppError'
import { DialogRef } from '@/components/Dialog'
import { useApi } from '@/services/api'

export function useOrdersList(customer: Customer | null) {
  const api = useApi()
  const { throwAppError } = useAppError()
  const emailDialogRef = useRef<DialogRef | null>(null)

  async function getOrders() {
    if (!customer) return

    try {
      if (customer.type === 'f' && customer.cpf) {
        return await api.getOrdersByCustomerDocument(String(customer.cpf))
      }

      if (customer.type === 'j' && customer.cnpj) {
        return await api.getOrdersByCustomerDocument(String(customer.cnpj))
      }
    } catch (error) {
      api.handleError(error)
    }
  }

  const { data, error, isLoading } = useQuery(['order', customer], getOrders)

  if (error) {
    throwAppError('Erro ao tentar mostrar produtos')
  }

  useFocusEffect(
    useCallback(() => {
      if (!customer) {
        emailDialogRef.current?.open()
      } else {
        emailDialogRef.current?.close()
      }
    }, [customer])
  )

  return {
    orders: data,
    emailDialogRef,
    isLoading,
  }
}
