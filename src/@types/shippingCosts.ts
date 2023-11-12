export type ShippingCosts = {
  [name in string]: {
    id: string
    service_name: string
    city: string
    uf: string
    formated_delivery_time: string
    price: number
    zipcode: string
  }
}
