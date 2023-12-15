import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Address } from '@/@types/address'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { AddressFormFields, addressFormSchema, zipcodeSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

type MutationCustomerAdressAddingParams = {
  address: Omit<Address, 'id'>
  customerId: number
}

type MutationCustomerAdressUpdatingParams = {
  address: Address
  customerId: number
}

type MutationCustomerAdressDeletingParams = {
  addressId: number
  customerId: number
}

export function useAddressForm() {
  const { customer, setSelectedAddressZipcode } = useCustomerContext()
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

  // const [selectedAddressZipcode, setSelectedAddressZipcode] = useState('')
  const [isZipcodeValid, setIsZipcodeValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddressRadioGroupVisible, setIsAddressRadioGroupVisible] =
    useState(true)
  const [addressFormData, setAddressFormData] =
    useState<AddressFormFields | null>(null)

  async function getAddressesByCustomerId() {
    if (customer) {
      const addresses = await api.getAddressesByCustomerId(customer.id)

      if (!addresses) return

      const selectedAddressZipcode =
        (await storage.getCustomerSelectedAddressZipcode()) ??
        addresses[0].zip_code

      if (selectedAddressZipcode) {
        setSelectedAddressZipcode(selectedAddressZipcode)
        await storage.setCustomerSelectedAddressZipcode(selectedAddressZipcode)

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

          setSelectedAddressZipcode(selectedAddress.zip_code)
          setIsAddressRadioGroupVisible(true)
        }
      }

      return addresses
    }
  }

  const { data: addresses, refetch } = useQuery(
    ['addresses', customer],
    getAddressesByCustomerId,
    {
      enabled: !!customer,
    }
  )

  const addressAddingMutation = useMutation(
    ({ address, customerId }: MutationCustomerAdressAddingParams) =>
      api.saveAddress(address, customerId),
    {
      onSuccess: () => refetch(),
      onError: (error) => {
        api.handleError(error)
      },
    }
  )

  const addressUpdatingMutation = useMutation(
    ({ address, customerId }: MutationCustomerAdressUpdatingParams) =>
      api.updateAddress(address, customerId),
    {
      onSuccess: () => refetch(),
      onError: (error) => {
        api.handleError(error)
      },
    }
  )

  const addressDeletingMutation = useMutation(
    ({ addressId, customerId }: MutationCustomerAdressDeletingParams) =>
      api.deleteAddress(addressId, customerId),
    {
      onSuccess: () => refetch(),
      onError: (error) => {
        api.handleError(error)
      },
    }
  )

  function handleAddAddressButton() {
    setIsAddressRadioGroupVisible(false)
    setSelectedAddressZipcode('')
    setValue('zipcode', '')
    setIsZipcodeValid(false)
  }

  function handleShowAddressesButton() {
    setIsAddressRadioGroupVisible(true)
  }

  function getCustomerAddressByZipcode(zipcode: string) {
    return addresses?.find((address) => address.zip_code === zipcode)
  }

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
        Keyboard.dismiss()
      } else {
        setIsZipcodeValid(false)
        setError('zipcode', {
          message: 'Nenhum endereço encontrado para esse CEP',
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
  }

  function handleEditAddress(zipcode: string) {
    const address = getCustomerAddressByZipcode(zipcode)

    if (address) {
      setAddressFormData({
        city: address.city,
        street: address.street,
        zipcode: address.zip_code,
        uf: address.uf,
        neighborhood: address.neighborhood,
        complement: address.complement,
        number: address.number,
        receiver: customer?.name ?? '',
      })
      setIsAddressRadioGroupVisible(false)
      setIsZipcodeValid(true)
    }
  }

  async function handleDeleteAddress(zipcode: string) {
    const address = getCustomerAddressByZipcode(zipcode)

    if (!address || !customer) return

    addressDeletingMutation.mutate({
      addressId: address.id,
      customerId: customer.id,
    })

    const isSelected = address.zip_code === customer.selectedAddressZipcode

    if (isSelected && addresses)
      setSelectedAddressZipcode(addresses[0].zip_code)
  }

  async function handleFormSubmit(fields: AddressFormFields) {
    if (!customer) return

    const submitedAddress: Omit<Address, 'id'> = {
      city: fields.city,
      number: fields.number,
      uf: fields.uf,
      zip_code: fields.zipcode,
      street: fields.street,
      neighborhood: fields.neighborhood,
      receiver: fields.receiver,
    }

    const customerAddress = getCustomerAddressByZipcode(
      submitedAddress.zip_code
    )

    if (customerAddress) {
      const address: Address = {
        id: customerAddress.id,
        ...submitedAddress,
      }

      addressUpdatingMutation.mutate({ address, customerId: customer.id })
      setSelectedAddressZipcode(address.zip_code)
      setIsAddressRadioGroupVisible(true)
      return
    }

    addressAddingMutation.mutate({
      address: submitedAddress,
      customerId: customer.id,
    })
    setIsAddressRadioGroupVisible(true)
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
    hasCustomerAddress: addresses && addresses.length > 0,
    errors,
    selectedAddressZipcode: customer?.selectedAddressZipcode ?? '',
    isAddressRadioGroupVisible,
    addressFormData,
    isZipcodeValid,
    isLoading,
    handleZipcodeChange,
    handleEditAddress,
    handleDeleteAddress,
    handleSelectedAddressChange,
    handleAddAddressButton,
    handleShowAddressesButton,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
