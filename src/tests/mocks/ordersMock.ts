import { ComputedOrder } from '@/@types/computedOrder'

export const ordersMock: ComputedOrder[] = [
  {
    delivered: false,
    value_products: 136.29,
    number: 739383970908649,
    id: 102855369,
    pix: {
      data: [],
    },
    shipment_service: 'ME_SEDEX_CENTRALIZADO_29',
    transactions: {
      data: [
        {
          marketplace_id: null,
          cancelled_at: null,
          metadata: {
            data: [],
          },
          billet_barcode:
            '23791.22928 60013.377209 91000.046903 2 95700000013629',
          billet_url:
            'https://api.pagar.me/1/boletos/live_clqcf4ctg5atb01m57ejewat6?format=pdf',
          installments: 1,
          authorized: true,
          payment: {
            data: {
              icon_url: 'https://icons.yampi.me/svg/card-billet.svg',
              active_config: false,
              is_pix: false,
              is_credit_card: false,
              is_pix_in_installments: false,
              is_billet: true,
              name: 'Boleto Bancário',
              alias: 'billet',
              id: 9,
              has_config: false,
              is_deposit: false,
              is_wallet: false,
            },
          },
          id: 121593397,
          buyer_installment_formated: '1x de R$ 0,00',
          bank_alias: null,
          error_message: null,
          billet_document_number: null,
          installment_value: 136.29,
          cancelled: false,
          total_logs: 0,
          billet_our_number: null,
          status: 'waiting_payment',
          installment_formated: '1x de R$ 136,29',
          billet_whatsapp_link:
            'https://api.whatsapp.com/send?phone=5512988815499&text=Aqui está o boleto do produto *Dobradiça com Mancal e pino - Pequena - 3 furos Inox*, no valor de R$ 136,29%0a%0aVencimento: *20/12/2023*%0a%0aCódigo de barras: *23791229286001337720991000046903295700000013629*%0a%0aLink: https%3A%2F%2Fapi.pagar.me%2F1%2Fboletos%2Flive_clqcf4ctg5atb01m57ejewat6%3Fformat%3Dpdf',
          billet_date: {
            date: '2023-12-20 00:00:00.000000',
            timezone: 'America/Sao_Paulo',
            timezone_type: 3,
          },
        },
      ],
    },
    items: {
      data: [
        {
          gift: false,
          price_cost: 62.26,
          quantity: 1,
          item_sku: '116000003P',
          has_recomm: 0,
          is_digital: false,
          sku_id: 151463680,
          shipment_cost: 11.77,
          bundle_name: null,
          gift_value: 0,
          price: 124.52,
          product_id: 22194035,
          bundle_id: null,
          id: 124473304,
          sku: {
            data: {
              price_cost: 62.26,
              days_availability_formated: 'Imediata',
              created_at: {
                date: '2023-09-05 11:27:22.000000',
                timezone: 'America/Sao_Paulo',
                timezone_type: 3,
              },
              availability: 0,
              title: 'Dobradiça com Mancal e pino - Pequena - 3 furos Inox',
              updated_at: {
                date: '2023-12-19 10:18:36.000000',
                timezone: 'America/Sao_Paulo',
                timezone_type: 3,
              },
              variations: [
                {
                  name: 'Material',
                  id: 2835904,
                  value_id: 39959940,
                  value: 'Inox',
                },
              ],
              product_id: 22194035,
              allow_sell_without_customization: false,
              id: 151463680,
              sku: '116000003P',
              barcode: null,
              seller_id: null,
              height: 4.7,
              order: 0,
              price_discount: 124.52,
              erp_id: null,
              length: 10.7,
              purchase_url:
                'https://seguro.sertton-industrial.com.br/r/SVKICBZOT3',
              blocked_sale: false,
              weight: 0.5,
              total_orders: null,
              quantity_managed: true,
              token: 'SVKICBZOT3',
              combinations: '39959940',
              price_sale: 164.52,
              width: 22.7,
              customizations: {
                data: [],
              },
            },
          },
          customizations: [],
        },
      ],
    },
    status: {
      data: {
        name: 'Aguardando pagamento',
        alias: 'waiting_payment',
        description: 'Aguardando confirmação de pagamento',
        id: 3,
      },
    },
    whatsapp: {
      data: {
        billet: {
          link: 'https://api.whatsapp.com/send?phone=5512988815499&text=Oi João. O seu pedido foi reservado com sucesso.%0a%0a*1 - Dobradiça com Mancal e pino - Pequena - 3 furos Inox*%0a%0aPara garantir os seus produtos, você precisa pagar o boleto o mais rápido possível, tá? Se preferir, você pode pagar usando o código de barras: %0a%0a*23791229286001337720991000046903295700000013629*',
          message:
            'Oi João. O seu pedido foi reservado com sucesso.%0a%0a*1 - Dobradiça com Mancal e pino - Pequena - 3 furos Inox*%0a%0aPara garantir os seus produtos, você precisa pagar o boleto o mais rápido possível, tá? Se preferir, você pode pagar usando o código de barras: %0a%0a*23791229286001337720991000046903295700000013629*',
        },
        order_shipped: null,
        abandoned_cart: null,
        pix: null,
      },
    },
    payments: [
      {
        icon_url: 'https://icons.yampi.me/svg/billet.svg',
        name: 'Boleto Bancário',
        alias: 'billet',
      },
    ],
    created_at: {
      date: '2023-12-19 11:06:19.000000',
      timezone: 'America/Sao_Paulo',
      timezone_type: 3,
    },
    days_delivery: 2,
    value_shipment: 11.77,
    shipping_address: {
      data: {
        receiver: 'João Pedro Carvalho dos Santos',
        city: 'São José dos Campos',
        zip_code: '12231440',
        number: '284',
        uf: 'SP',
        street: 'Rua Aguapei',
        id: 98812867,
        neighborhood: 'Vila São Bento',
        complement: '',
      },
    },
    shipment_icon_url: 'https://icons.yampi.me/svg/correios.svg',
    value_total: 136.29,
    value_discount: 50,
    date_delivery: {
      date: '2023-12-20 10:00:00.000000',
      timezone: 'America/Sao_Paulo',
      timezone_type: 3,
    },
  },
  // Adicione outros objetos ComputedOrder conforme necessário
]
