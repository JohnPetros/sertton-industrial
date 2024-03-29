import { useRouter } from 'expo-router'
import { ScrollView, YStack } from 'tamagui'

import { AddressForm } from '../Checkout/CheckoutForm/AddressForm'
import { LegalPersonForm } from '../Checkout/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '../Checkout/CheckoutForm/NaturalPersonForm'

import { useProfile } from './useProfile'

import { Button } from '@/components/shared/Button'
import { EmailDialog } from '@/components/shared/EmailDialog'
import { SignUpDialog } from '@/components/shared/SignUpDialog'

export function Profile() {
  const { handleFormSubmit, customer, emailDialogRef } = useProfile()
  const { back } = useRouter()

  return (
    <>
      <EmailDialog
        label="Digite seu e-mail para buscarmos seus dados de cadastro. Ou crie um ao pressionar criar cadastro."
        ref={emailDialogRef}
        fallback={
          <YStack gap={4} mt={12}>
            <SignUpDialog>
              <Button background="outline">Criar cadastro</Button>
            </SignUpDialog>
            <Button background="transparent" onPress={back}>
              Voltar
            </Button>
          </YStack>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {customer?.type === 'f' && (
          <NaturalPersonForm onSubmit={handleFormSubmit} />
        )}
        {customer?.type === 'j' && (
          <LegalPersonForm onSubmit={handleFormSubmit} />
        )}
        <YStack mt={24}>
          <AddressForm />
        </YStack>
      </ScrollView>
    </>
  )
}
