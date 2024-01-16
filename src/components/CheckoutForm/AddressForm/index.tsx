import { Controller } from 'react-hook-form'
import { usePathname } from 'expo-router'
import {
  Globe,
  Hash,
  House,
  HouseLine,
  NotePencil,
  Signpost,
  User,
} from 'phosphor-react-native'
import { Spinner, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Button } from '@/components/Button'
import { Address } from '@/components/CheckoutForm/AddressForm/Address'
import { useAddressForm } from '@/components/CheckoutForm/AddressForm/useAddressForm'
import { ShipmentServiceForm } from '@/components/CheckoutForm/ShipmentServiceForm'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { Input } from '@/components/Form/Input'
import { RadioGroup } from '@/components/Form/RadioGroup'
import { Radio } from '@/components/Form/RadioGroup/Radio'
import { Loading } from '@/components/Loading'
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
    isZipcodeLoading,
    isSubmitting,
    errors,
    handleSubmit,
    handleZipcodeChange,
    handleSelectedAddressChange,
    handleDeleteAddress,
    handleEditAddress,
    handleAddAddressButton,
    handleShowAddressesButton,
  } = useAddressForm()
  const pathname = usePathname()

  console.log({ addresses })
  console.log({ isAddressRadioGroupVisible })

  if (isLoading && isAddressRadioGroupVisible)
    return (
      <YStack mt={-48}>
        <Loading message="carregando endereços cadastrados..." size={150} />
      </YStack>
    )

  return (
    <>
      <YStack gap={24}>
        {isAddressRadioGroupVisible && (
          <Button
            testID="add-address-button"
            background="transparent"
            color="$blue500"
            fontWeight="600"
            borderWidth={1}
            borderColor="$blue500"
            onPress={handleAddAddressButton}
          >
            Cadastrar novo endereço
          </Button>
        )}

        {isAddressRadioGroupVisible &&
          !isLoading &&
          addresses?.length === 0 && (
            <EmptyItemsMessage
              title="Nenhum endereço cadastrado."
              icon={HouseLine}
              subtitle="Pressione o botão acima para cadastrar um novo endereço."
            />
          )}

        {!isAddressRadioGroupVisible && (
          <Button
            testID="show-addresses-button"
            background="transparent"
            color="$blue500"
            fontWeight="600"
            borderWidth={1}
            borderColor="$blue500"
            onPress={handleShowAddressesButton}
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
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    testID={name}
                    label="CEP"
                    keyboardType="numeric"
                    mask="zipcode"
                    value={value}
                    max={11}
                    icon={Globe}
                    isLoading={isZipcodeLoading}
                    autoFocus={!isZipcodeValid}
                    onChangeText={(zipcode) => {
                      console.log({ zipcode })
                      onChange(zipcode)
                      handleZipcodeChange(zipcode)
                    }}
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
                  render={({ field: { onChange, name, value } }) => (
                    <Input
                      testID={name}
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
                  render={({ field: { onChange, name, value } }) => (
                    <Input
                      testID={name}
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
                  render={({ field: { onChange, name, value } }) => {
                    return (
                      <Input
                        testID={name}
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
                  render={({ field: { onChange, name, value } }) => (
                    <Input
                      testID={name}
                      label="Complemento"
                      subLabel="(opcional)"
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
                  render={({ field: { onChange, name, value } }) => (
                    <Input
                      testID={name}
                      label="Destinatário"
                      value={value}
                      icon={User}
                      onChangeText={onChange}
                      error={errors.receiver?.message}
                    />
                  )}
                />

                <Button
                  testID="submit-button"
                  key={isSubmitting ? 'submitting' : 'default'}
                  onPress={handleSubmit}
                >
                  {isSubmitting ? <Spinner color="$white" /> : 'Salvar'}
                </Button>
              </>
            )}
          </>
        )}

        {isAddressRadioGroupVisible && addresses && (
          <RadioGroup
            onChange={handleSelectedAddressChange}
            value="selected-address"
          >
            {addresses.map((address) => (
              <Radio
                key={address.id}
                value={address.zip_code}
                isSelected={selectedAddressZipcode === address.zip_code}
                isOpen={true}
                label={
                  <Address
                    key={address.zip_code}
                    city={address.city}
                    neighborhood={address.neighborhood}
                    number={address.number}
                    street={address.street}
                    uf={address.uf}
                    zipcode={address.zip_code}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                  />
                }
              />
            ))}
          </RadioGroup>
        )}

        {selectedAddressZipcode &&
          isAddressRadioGroupVisible &&
          pathname !== '/profile' && <ShipmentServiceForm />}
      </YStack>
    </>
  )
}
