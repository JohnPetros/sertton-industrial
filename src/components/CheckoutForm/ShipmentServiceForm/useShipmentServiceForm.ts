import { useQuery } from 'react-query'

import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useShipmentServiceForm() {
  const { customer } = useCustomerContext()

  const api = useApi()

  const { products: cartProducts, getSelectedSkus } = useCart()

  const setShipmentService = useCheckoutStore(
    (store) => store.actions.setShipmentService
  )
  const storedShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )

  async function getShipmentServices() {
    if (!customer?.selectedAddressZipcode || !cartProducts) return

    console.log(customer.selectedAddressZipcode)

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

  const { data: shipmentServices } = useQuery(
    ['shipment-services', customer?.selectedAddressZipcode],
    getShipmentServices
  )

  function handleShipmentServiceChange(shipmentServiceName: string) {
    if (!shipmentServices) return

    const selectedShipmentService = shipmentServices.find(
      (shipmentService) => shipmentService.name === shipmentServiceName
    )

    if (selectedShipmentService) setShipmentService(selectedShipmentService)
  }

  return {
    shipmentServices,
    selectedShipmentService: storedShipmentService,
    handleShipmentServiceChange,
  }
}
