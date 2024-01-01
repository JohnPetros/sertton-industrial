import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { ShipmentService } from '@/@types/shipmentService'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useShipmentServiceForm() {
  const { customer } = useCustomerContext()

  const api = useApi()

  const { products, getSelectedSkus } = useCart()

  const storedShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )
  const { setShipmentService, setStep } = useCheckoutStore(
    (store) => store.actions
  )

  const [selectedShipmentService, setSelectedShipmentService] =
    useState<ShipmentService | null>(storedShipmentService)
  const [isLoading, setIsLoading] = useState(false)

  async function getShipmentServices() {
    if (!customer?.selectedAddressZipcode) return

    const selectedSkus = getSelectedSkus()

    if (selectedSkus) {
      try {
        return await api.getShipmentServices(
          customer.selectedAddressZipcode,
          selectedSkus
        )
      } catch (error) {
        api.handleError(error)
      }
    }
  }

  const { data: shipmentServices, refetch } = useQuery(
    ['shipment-services', customer, products],
    getShipmentServices
  )

  function handleShipmentServiceChange(shipmentServiceName: string) {
    if (!shipmentServices) return

    const selectedShipmentService = shipmentServices.find(
      (shipmentService) => shipmentService.name === shipmentServiceName
    )

    if (selectedShipmentService)
      setSelectedShipmentService(selectedShipmentService)
  }

  async function handleContinueCheckout() {
    if (selectedShipmentService) {
      setIsLoading(true)

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      setShipmentService(selectedShipmentService)
      setStep(3)

      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (customer) refetch()
  }, [customer])

  return {
    shipmentServices,
    selectedShipmentService,
    isLoading,
    handleShipmentServiceChange,
    handleContinueCheckout,
  }
}
