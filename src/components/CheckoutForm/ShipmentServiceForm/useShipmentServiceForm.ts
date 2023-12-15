import { useQuery } from 'react-query'

import { useCart } from '@/hooks/useCart'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useShipmentServiceForm() {
  const storage = useStorage()

  const api = useApi()

  const { products: cartProducts, getSelectedSkus } = useCart()

  const setShipmentService = useCheckoutStore(
    (store) => store.actions.setShipmentService
  )
  const storedShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )

  async function getShipmentServices() {
    const selectedAddressZipcode =
      await storage.getCustomerSelectedAddressZipcode()

    // if (!selectedAddressZipcode || !cartProducts) return

    // const selectedSkus = getSelectedSkus()

    // if (selectedSkus) {
    //   try {
    //     return await api.getShipmentServices(
    //       selectedAddressZipcode,
    //       selectedSkus
    //     )
    //   } catch (error) {
    //     api.handleError(error)
    //   }
    // }
  }

  const { data: shipmentServices } = useQuery(
    ['shipment-services'],
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
