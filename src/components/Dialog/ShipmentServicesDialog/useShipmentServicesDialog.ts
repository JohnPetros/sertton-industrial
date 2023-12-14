import { useState } from 'react'

import type { Address } from '@/@types/address'
import type { ShipmentService } from '@/@types/shipmentService'
import { useApi } from '@/services/api'

export function useShipmentServicesDialog(
  zipcode: string,
  shipmentServices: ShipmentService[],
  onOpenChange: (isOpen: boolean) => void
) {
  const [shipmentServicesNames, setShipmentServicesNames] = useState<string[]>(
    []
  )
  const [address, setAddress] = useState<Pick<
    Address,
    'zip_code' | 'city' | 'uf'
  > | null>(null)

  const api = useApi()

  async function handleDialogOpenChange(isOpen: boolean) {
    onOpenChange(isOpen)

    if (isOpen && shipmentServices) {
      const shipmentServicesNames: string[] = []

      for (const shipmentService of shipmentServices) {
        shipmentServicesNames.push(shipmentService.name)
      }

      setShipmentServicesNames(shipmentServicesNames)

      const address = await api.getAddressByZipcode(zipcode)

      if (address)
        setAddress({
          zip_code: zipcode,
          city: address.city,
          uf: address.uf,
        })
    }
  }

  return {
    handleDialogOpenChange,
    shipmentServicesNames,
    address,
  }
}
