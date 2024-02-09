import { YampiAddress } from '../types/YampiAddress'

import type { Address } from '@/@types/address'

export function yampiAddressAdapter(yampiAddress: YampiAddress): Address {
  const address: Address = {
    id: String(yampiAddress.id),
    receiver: yampiAddress.receiver,
    zipcode: yampiAddress.zip_code,
    street: yampiAddress.street,
    number: yampiAddress.number,
    neighborhood: yampiAddress.neighborhood,
    complement: yampiAddress.complement,
    city: yampiAddress.city,
    uf: yampiAddress.uf,
  }

  return address
}
