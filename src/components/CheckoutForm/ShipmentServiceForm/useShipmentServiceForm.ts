import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { useAppError } from '@/components/AppError/useAppError'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { waitFor } from '@/utils/helpers/wait'

export function useShipmentServiceForm() {
  const { customer } = useCustomerContext()

  const api = useApi()

  const { products, getSelectedSkus } = useCart()

  const { throwAppError } = useAppError()

  const checkoutShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )
  const { setShipmentService, setStep } = useCheckoutStore(
    (store) => store.actions
  )

  const [isLoading, setIsLoading] = useState(false)

  async function getShipmentServices() {
    if (!customer?.selectedAddressZipcode) return

    const selectedSkus = getSelectedSkus()

    if (selectedSkus) {
      try {
        const shipmentServices = await api.getShipmentServices(
          customer.selectedAddressZipcode,
          selectedSkus
        )

        if (!checkoutShipmentService) setShipmentService(shipmentServices[0])

        return shipmentServices
      } catch (error) {
        api.handleError(error)
        throwAppError('Erro ao calcular fretes')
      }
    }
  }

  const { data: shipmentServices, refetch } = useQuery(
    ['shipment-services', customer?.selectedAddressZipcode, products],
    getShipmentServices
  )

  function handleShipmentServiceChange(shipmentServiceName: string) {
    if (!shipmentServices) return

    const selectedShipmentService = shipmentServices.find(
      (shipmentService) => shipmentService.name === shipmentServiceName
    )

    if (selectedShipmentService) setShipmentService(selectedShipmentService)
  }

  async function handleContinueCheckout() {
    if (checkoutShipmentService) {
      setIsLoading(true)

      await waitFor(1000)

      setStep(3)

      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (customer) refetch()
  }, [customer])

  return {
    shipmentServices,
    selectedShipmentService: checkoutShipmentService,
    isLoading,
    handleShipmentServiceChange,
    handleContinueCheckout,
  }
}
