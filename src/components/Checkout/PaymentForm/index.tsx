import { WebView } from 'react-native-webview'
import { YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { CreditCardForm } from '@/components/Checkout/PaymentForm/CreditCardForm'
import { CreditCardLabel } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardLabel'
import { usePaymentForm } from '@/components/Checkout/PaymentForm/usePaymentForm'
import { RadioGroup } from '@/components/Form/RadioGroup'
import { Radio } from '@/components/Form/RadioGroup/Radio'

export function PaymentForm() {
  const { checkoutUrl, selectedPaymentMethod, handlePaymentMethodChange } =
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
