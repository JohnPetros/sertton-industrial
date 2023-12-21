import { Address } from '@/@types/address'

export type ComputedOrder = {
  delivered: boolean
  value_products: number
  authorized: boolean
  number: number
  status_id: number
  id: number
  pix: {
    data: unknown[] // Adicione o tipo adequado para o array, se aplicável
  }
  shipment_service: string
  transactions: {
    data: {
      marketplace_id: unknown // Adicione o tipo adequado se aplicável
      cancelled_at: unknown // Adicione o tipo adequado se aplicável
      metadata: {
        data: unknown[] // Adicione o tipo adequado para o array, se aplicável
      }
      billet_barcode: string
      billet_url: string
      installments: number
      authorized: boolean
      payment: {
        data: {
          icon_url: string
          active_config: boolean
          is_pix: boolean
          is_credit_card: boolean
          is_pix_in_installments: boolean
          is_billet: boolean
          name: string
          alias: string
          id: number
          has_config: boolean
          is_deposit: boolean
          is_wallet: boolean
        }
      }
      id: number
      buyer_installment_formated: string
      bank_alias: unknown // Adicione o tipo adequado se aplicável
      error_message: unknown // Adicione o tipo adequado se aplicável
      billet_document_number: unknown // Adicione o tipo adequado se aplicável
      installment_value: number
      cancelled: boolean
      total_logs: number
      billet_our_number: unknown // Adicione o tipo adequado se aplicável
      status: string
      installment_formated: string
      billet_whatsapp_link: string
      billet_date: {
        date: string
        timezone: string
        timezone_type: number
      }
    }[]
  }
  value_discount: number
  items: {
    data: {
      gift: boolean
      price_cost: number
      quantity: number
      item_sku: string
      has_recomm: number
      is_digital: boolean
      sku_id: number
      shipment_cost: number
      bundle_name: unknown // Adicione o tipo adequado se aplicável
      gift_value: number
      price: number
      product_id: number
      bundle_id: unknown // Adicione o tipo adequado se aplicável
      id: number
      sku: {
        data: {
          price_cost: number
          days_availability_formated: string
          created_at: {
            date: string
            timezone: string
            timezone_type: number
          }
          availability: number
          title: string
          updated_at: {
            date: string
            timezone: string
            timezone_type: number
          }
          variations: {
            name: string
            id: number
            value_id: number
            value: string
          }[]
          product_id: number
          allow_sell_without_customization: boolean
          id: number
          sku: string
          barcode: unknown // Adicione o tipo adequado se aplicável
          seller_id: unknown // Adicione o tipo adequado se aplicável
          height: number
          order: number
          price_discount: number
          erp_id: unknown // Adicione o tipo adequado se aplicável
          length: number
          purchase_url: string
          blocked_sale: boolean
          weight: number
          total_orders: unknown // Adicione o tipo adequado se aplicável
          quantity_managed: boolean
          token: string
          combinations: string
          price_sale: number
          width: number
          customizations: {
            data: unknown[] // Adicione o tipo adequado para o array, se aplicável
          }
        }
      }
      customizations: unknown[] // Adicione o tipo adequado para o array, se aplicável
    }[]
  }
  status: {
    data: {
      name: string
      alias: string
      description: string
      id: number
    }
  }
  whatsapp: {
    data: {
      billet: {
        link: string
        message: string
      }
      order_shipped: unknown // Adicione o tipo adequado se aplicável
      abandoned_cart: unknown // Adicione o tipo adequado se aplicável
      pix: unknown // Adicione o tipo adequado se aplicável
    }
  }
  payments: {
    icon_url: string
    name: string
    alias: string
  }[]
  created_at: {
    date: string
    timezone: string
    timezone_type: number
  }
  days_delivery: number
  value_shipment: number
  spreadsheet: {
    data: {
      total_item: number
      total_cost: number
      shipping_state: string
      customization: string
      shipping_city: string
      delivered: number
      billet_barcode: string
      customer_document: string
      shipping_neighborhood: string
      payment: string
      shipping_address: string
      sku: string
      payment_date: string
      shipping_street: string
      product: string
      quantity: number
      customer_phone: string
      shipping_number: string
      gateway_transaction_id: string
      credit_card: unknown // Adicione o tipo adequado se aplicável
      cancelled_date: string
      customer_email: string
      shipping_complement: string
      customer: string
      status: string
      shipping_zip_code: string
    }[]
  }
  shipping_address: {
    data: Address
  }
  shipment_icon_url: string
  value_total: number
  date_delivery: {
    date: string
    timezone: string
    timezone_type: number
  }
}
