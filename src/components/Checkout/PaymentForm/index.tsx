import { WebView } from 'react-native-webview'

import { CreditCardForm } from '@/components/Checkout/PaymentForm/CreditCardForm'
import { CreditCardLabel } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardLabel'
import { PixForm } from '@/components/Checkout/PaymentForm/PixForm'
import { PixLabel } from '@/components/Checkout/PaymentForm/PixForm/PixLabel'
import { TicketForm } from '@/components/Checkout/PaymentForm/TicketForm'
import { TicketLabel } from '@/components/Checkout/PaymentForm/TicketForm/TicketLabel'
import { usePaymentForm } from '@/components/Checkout/PaymentForm/usePaymentForm'
import { RadioGroup } from '@/components/Form/RadioGroup'
import { Radio } from '@/components/Form/RadioGroup/Radio'

export function PaymentForm() {
  const { selectedPaymentMethod, totalToPay, handlePaymentMethodChange } =
    usePaymentForm()

  return (
    <>
      <RadioGroup value="payment-method" onChange={handlePaymentMethodChange}>
        <Radio
          value="credit-card"
          isSelected={selectedPaymentMethod === 'credit-card'}
          isOpen={false}
          label={<CreditCardLabel />}
        >
          <CreditCardForm />
        </Radio>

        <Radio
          value="pix"
          isSelected={selectedPaymentMethod === 'pix'}
          isOpen={false}
          label={<PixLabel />}
        >
          <PixForm total={totalToPay} />
        </Radio>

        <Radio
          value="ticket"
          isSelected={selectedPaymentMethod === 'ticket'}
          isOpen={false}
          label={<TicketLabel />}
        >
          <TicketForm total={totalToPay} />
        </Radio>
      </RadioGroup>

      {/* {checkoutUrl ? (
        <WebView
          originWhitelist={['*']}
          source={{
            uri: checkoutUrl,
          }}
          startInLoadingState={true}
          onNavigationStateChange={handlePaymentNavigation}
          onError={({ nativeEvent }) => {
            console.error('WebView error: ', nativeEvent)
          }}
          style={{
            flex: 1,
            width: SCREEN.width,
            height: SCREEN.height,
            paddingBottom: 24,
          }}
        />
      ) : (
        <YStack px={SCREEN.paddingX}>
          <Button onPress={checkout}>Abrir Checkout</Button>
        </YStack>
      )} */}
    </>
  )
}
