import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { Address } from '@/@types/address'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'
import { useValidation } from '@/services/validation'
import { AddressForm } from '@/services/validation/types/AddressForm'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { waitFor } from '@/utils/helpers/wait'

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
  const {
    customer,
    setSelectedAddressZipcode: setCustomerSelectedAddressZipcode,
  } = useCustomerContext()
  const setCheckoutAddress = useCheckoutStore(
    (store) => store.actions.setAddress
  )

  const api = useApi()
  const storage = useStorage()
  const validation = useValidation()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddressForm>({
    mode: 'onSubmit',
    resolver: validation.resolveAddressForm(),
  })

  const [isZipcodeValid, setIsZipcodeValid] = useState(false)
  const [isZipcodeLoading, setIsZipcodeLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isAddressRadioGroupVisible, setIsAddressRadioGroupVisible] =
    useState(false)
  const [addressFormData, setAddressFormData] = useState<AddressForm | null>(
    null
  )

  async function getAddressesByCustomerId() {
    if (customer) {
      const addresses = await api.getAddressesByCustomerId(customer.id)

      if (!addresses.length) return []

      let selectedAddressZipcode =
        await storage.getCustomerSelectedAddressZipcode()

      if (!selectedAddressZipcode) {
        selectedAddressZipcode = addresses[0].zip_code
      }

      if (selectedAddressZipcode) {
        setCustomerSelectedAddressZipcode(selectedAddressZipcode)

        const selectedAddress = addresses.find(
          (address) => address.zip_code === selectedAddressZipcode
        )

        if (selectedAddress) {
          const addressData = {
            city: selectedAddress.city,
            street: selectedAddress.street,
            zipcode: selectedAddress.zip_code,
            uf: selectedAddress.uf,
            neighborhood: selectedAddress.neighborhood,
            complement: selectedAddress.complement,
            number: selectedAddress.number,
            receiver: customer.name ?? '',
          }
          setAddressFormData(addressData)

          setCheckoutAddress({ ...addressData, zip_code: addressData.zipcode })

          setIsAddressRadioGroupVisible(true)
        }
      }

      return addresses
    }

    return []
  }

  const {
    data: addresses,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(['addresses'], getAddressesByCustomerId, {
    enabled: !!customer,
  })

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
    setValue('zipcode', '')
    setIsZipcodeValid(false)
  }

  function handleShowAddressesButton() {
    console.log('handleShowAddressesButton')
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

  async function handleZipcodeChange(zipcode: string) {
    const { isValid } = validation.validateZipcode(zipcode)

    if (!isValid) {
      setIsZipcodeValid(false)
      return
    }

    try {
      setIsZipcodeLoading(true)
      const address = await getAddressByZipcode(zipcode)

      console.log('address', { address })

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
      setIsZipcodeLoading(false)
    }
  }

  function handleSelectedAddressChange(selectedAddressZipcode: string) {
    setCustomerSelectedAddressZipcode(selectedAddressZipcode)

    const address = getCustomerAddressByZipcode(selectedAddressZipcode)
    if (address) setCheckoutAddress(address)
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

    if (isSelected && addresses) {
      setCustomerSelectedAddressZipcode(addresses[0].zip_code)
      setCheckoutAddress(addresses[0])
    }
  }

  async function handleFormSubmit(fields: AddressForm) {
    if (!customer) return
    setIsSubmitting(true)

    await waitFor(1000)

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
      setIsSubmitting(false)
      setCustomerSelectedAddressZipcode(address.zip_code)
      setIsAddressRadioGroupVisible(true)
      setCheckoutAddress(address)
      return
    }

    addressAddingMutation.mutate({
      address: submitedAddress,
      customerId: customer.id,
    })
    setIsSubmitting(false)
    setCustomerSelectedAddressZipcode(submitedAddress.zip_code)
    setIsAddressRadioGroupVisible(true)
  }

  useEffect(() => {
    if (!addressFormData) return

    setValue('number', '')

    for (const fieldName of Object.keys(addressFormData)) {
      const value = addressFormData[fieldName as keyof typeof addressFormData]

      if (value) setValue(fieldName as keyof AddressForm, value)
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
    isLoading: isLoading || isFetching,
    isZipcodeLoading,
    isSubmitting,
    handleZipcodeChange,
    handleEditAddress,
    handleDeleteAddress,
    handleSelectedAddressChange,
    handleAddAddressButton,
    handleShowAddressesButton,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleFormSubmit,
  }
}
