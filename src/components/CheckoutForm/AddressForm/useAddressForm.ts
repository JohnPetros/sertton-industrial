import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Address } from '@/@types/address'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { addressFormSchema, AdressFormFields, zipcodeSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

export function useAddressForm() {
  const { customer } = useCustomerContext()
  const api = useApi()
  const storage = useStorage()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AdressFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(addressFormSchema),
  })

  const [selectedAddressZipcode, setSelectedAddressZipcode] = useState('')
  const [isZipcodeValid, setIsZipcodeValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [addressFormData, setAddressFormData] = useState<Partial<Address>>({})

  async function getAddressesByCustomerId() {
    if (customer) {
      const addresses = await api.getAddressesByCustomerId(customer.id)

      const selectedAddressZipcode =
        await storage.getCustomerSelectedAddressZipcode()

      if (selectedAddressZipcode) {
        setSelectedAddressZipcode(selectedAddressZipcode)

        const selectedAddress = addresses.find(
          (address) => address.zip_code === selectedAddressZipcode
        )

        if (selectedAddress) setAddressFormData(selectedAddress)
      }

      return addresses
    }
  }

  const { data: adresses } = useQuery(
    ['adresses', customer],
    getAddressesByCustomerId,
    {
      enabled: !!customer,
    }
  )

  async function getAddressByZipcode(zipcode: string) {
    try {
      return await api.getAddressByZipcode(zipcode)
    } catch (error) {
      api.handleError(error)
    }
  }

  async function handleZipcodeChange(
    zipcode: string,
    zipcodeChangeHandler: (zipcode: string) => void
  ) {
    zipcodeChangeHandler(zipcode)

    const { success: isValid } = zipcodeSchema.safeParse(zipcode)

    if (!isValid) {
      setIsZipcodeValid(false)
      return
    }

    try {
      setIsLoading(true)
      const address = await getAddressByZipcode(zipcode)
      console.log(address)

      if (address) {
        setAddressFormData({
          ...address,
          number: '',
          receiver: customer?.name ?? '',
        })

        setIsZipcodeValid(true)
        clearErrors()
      } else {
        setIsZipcodeValid(false)
        setError('zipcode', {
          message: 'Endereço não encontrado para esse CEP',
        })
      }
    } catch (error) {
      console.error(error)
      setIsZipcodeValid(false)
    } finally {
      setIsLoading(false)
    }
  }

  function handleFormSubmit(fields: AdressFormFields) {
    console.log(fields)
  }

  useEffect(() => {
    for (const fieldName of Object.keys(addressFormData)) {
      const value = addressFormData[fieldName as keyof typeof addressFormData]

      if (value) setValue(fieldName as keyof AdressFormFields, value)
    }
  }, [addressFormData])

  return {
    control,
    adresses,
    errors,
    selectedAddressZipcode,
    addressFormData,
    isZipcodeValid,
    isLoading,
    handleZipcodeChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
