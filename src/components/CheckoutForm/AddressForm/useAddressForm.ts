import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Address } from '@/@types/address'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { AddressFormFields, addressFormSchema, zipcodeSchema } from '@/libs/zod'
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
  } = useForm<AddressFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(addressFormSchema),
  })

  const [selectedAddressZipcode, setSelectedAddressZipcode] = useState('')
  const [isZipcodeValid, setIsZipcodeValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddressRadioGroupVisible, setIsAddressRadioGroupVisible] =
    useState(true)
  const [addressFormData, setAddressFormData] =
    useState<AddressFormFields | null>(null)

  async function getAddressesByCustomerId() {
    if (customer) {
      const addresses = await api.getAddressesByCustomerId(customer.id)

      const selectedAddressZipcode =
        (await storage.getCustomerSelectedAddressZipcode()) ??
        addresses[0].zip_code

      console.log({ selectedAddressZipcode })

      if (selectedAddressZipcode) {
        setSelectedAddressZipcode(selectedAddressZipcode)

        const selectedAddress = addresses.find(
          (address) => address.zip_code === selectedAddressZipcode
        )

        if (selectedAddress) {
          setAddressFormData({
            city: selectedAddress.city,
            street: selectedAddress.street,
            zipcode: selectedAddress.zip_code,
            uf: selectedAddress.uf,
            neighborhood: selectedAddress.neighborhood,
            complement: selectedAddress.complement,
            number: selectedAddress.number,
            receiver: customer.name ?? '',
          })

          setIsAddressRadioGroupVisible(true)
        }
      }

      return addresses
    }
  }

  const { data: addresses } = useQuery(
    ['addresses', customer],
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
      if (address) {
        setAddressFormData({
          city: address.city,
          street: address.street,
          zipcode: address.zip_code,
          uf: address.uf,
          neighborhood: address.neighborhood,
          complement: address.complement,
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

  async function handleSelectedAddressChange(selectedAddressZipcode: string) {
    setSelectedAddressZipcode(selectedAddressZipcode)
    await storage.setCustomerSelectedAddressZipcode(selectedAddressZipcode)
  }

  function handleFormSubmit(fields: AddressFormFields) {
    if (!customer) return

    const address: Address = {
      city: fields.city,
      number: fields.number,
      uf: fields.uf,
      zip_code: fields.zipcode,
      street: fields.street,
      neighborhood: fields.neighborhood,
      receiver: fields.receiver,
    }

    api.saveAddress(address, customer.id)
  }

  useEffect(() => {
    if (!addressFormData) return

    for (const fieldName of Object.keys(addressFormData)) {
      const value = addressFormData[fieldName as keyof typeof addressFormData]

      if (value) setValue(fieldName as keyof AddressFormFields, value)
    }
  }, [addressFormData])

  return {
    control,
    addresses,
    errors,
    selectedAddressZipcode,
    isAddressRadioGroupVisible,
    addressFormData,
    isZipcodeValid,
    isLoading,
    handleZipcodeChange,
    handleSelectedAddressChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
