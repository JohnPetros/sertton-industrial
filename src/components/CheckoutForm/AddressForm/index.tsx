import { Controller } from 'react-hook-form'
import {
  Globe,
  Hash,
  House,
  NotePencil,
  Signpost,
  User,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Button } from '@/components/Button'
import { AddressesRadioGroup } from '@/components/CheckoutForm/AddressForm/AddressesRadioGroup'
import { AddressRadioItem } from '@/components/CheckoutForm/AddressForm/AddressesRadioGroup/AddressRadioItem'
import { useAddressForm } from '@/components/CheckoutForm/AddressForm/useAddressForm'
import { Heading } from '@/components/CheckoutForm/Heading'
import { Input } from '@/components/Form/Input'
import { SCREEN } from '@/utils/constants/screen'

export function AddressForm() {
  const {
    control,
    addresses,
    addressFormData,
    selectedAddressZipcode,
    isAddressRadioGroupVisible,
    isZipcodeValid,
    isLoading,
    errors,
    handleSubmit,
    handleZipcodeChange,
    handleSelectedAddressChange,
    handleDeleteAddress,
    handleEditAddress,
    toggleAddressRadioGroupVisibility,
  } = useAddressForm()

  console.log(isAddressRadioGroupVisible)

  return (
    <YStack gap={24}>
      <Heading
        step={2}
        title="Entrega"
        subtitle="Cadastre ou selecione um endereço."
      />

      {addresses && isAddressRadioGroupVisible && (
        <Button
          background="transparent"
          color="$blue500"
          fontWeight="600"
          borderWidth={1}
          borderColor="$blue500"
          onPress={toggleAddressRadioGroupVisibility}
        >
          Cadastrar novo endereço
        </Button>
      )}

      {addresses && !isAddressRadioGroupVisible && (
        <Button
          background="transparent"
          color="$blue500"
          fontWeight="600"
          borderWidth={1}
          borderColor="$blue500"
          onPress={toggleAddressRadioGroupVisibility}
        >
          Ver endereços cadastrados
        </Button>
      )}

      {!isAddressRadioGroupVisible && (
        <>
          <YStack gap={8}>
            <Controller
              control={control}
              name="zipcode"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="CEP"
                  keyboardType="numeric"
                  mask="zipcode"
                  value={value}
                  max={11}
                  icon={Globe}
                  isLoading={isLoading}
                  onChangeText={(value) => handleZipcodeChange(value, onChange)}
                  error={errors.zipcode?.message}
                />
              )}
            />
            {isZipcodeValid && addressFormData && (
              <Text>
                {addressFormData.city} / {addressFormData.uf}
              </Text>
            )}
          </YStack>

          {isZipcodeValid && (
            <>
              <Controller
                control={control}
                name="street"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Rua"
                    value={value}
                    icon={Signpost}
                    onChangeText={onChange}
                    error={errors.street?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="number"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Número"
                    keyboardType="numeric"
                    value={value}
                    icon={Hash}
                    onChangeText={onChange}
                    error={errors.number?.message}
                    w={(SCREEN.width - SCREEN.paddingX * 2) * 0.4}
                  />
                )}
              />

              <Controller
                control={control}
                name="neighborhood"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      label="Bairro"
                      value={value}
                      icon={House}
                      onChangeText={onChange}
                      error={errors.neighborhood?.message}
                    />
                  )
                }}
              />

              <Controller
                control={control}
                name="complement"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Complemento"
                    isOptional
                    value={value}
                    icon={NotePencil}
                    onChangeText={onChange}
                    error={errors.complement?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="receiver"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Destinatário"
                    value={value}
                    icon={User}
                    onChangeText={onChange}
                    error={errors.receiver?.message}
                  />
                )}
              />

              <Button onPress={handleSubmit}>Salvar</Button>
            </>
          )}
        </>
      )}

      {isAddressRadioGroupVisible && addresses && (
        <AddressesRadioGroup
          onSelectedAddressChange={handleSelectedAddressChange}
        >
          {addresses.map((address) => (
            <AddressRadioItem
              key={address.zip_code}
              city={address.city}
              neighborhood={address.neighborhood}
              number={address.number}
              street={address.street}
              uf={address.uf}
              zipCode={address.zip_code}
              isSelected={selectedAddressZipcode === address.zip_code}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))}
        </AddressesRadioGroup>
      )}
    </YStack>
  )
}
