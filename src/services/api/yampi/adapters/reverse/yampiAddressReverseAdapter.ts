import type { YampiAddress } from '../../types/YampiAddress'

import type { Address } from '@/@types/address'

export function yampiAddressReverseAdapter(address: Address) {
  const yampiAddress: YampiAddress = {
    id: Number(address.id),
    receiver: address.receiver,
    zip_code: address.zipcode,
    street: address.street,
    number: address.number,
    neighborhood: address.neighborhood,
    complement: address.complement ?? '',
    city: address.city,
    uf: address.uf,
  }

  return yampiAddress
}
