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
  const {
    selectedPaymentMethod,
    totalToPay,
    createTransaction,
    handlePaymentMethodChange,
  } = usePaymentForm()

  return (
    <>
      <RadioGroup value="payment-method" onChange={handlePaymentMethodChange}>
        <Radio
          value="credit-card"
          isSelected={selectedPaymentMethod === 'credit-card'}
          isOpen={false}
          label={<CreditCardLabel />}
        >
          <CreditCardForm onPay={createTransaction} />
        </Radio>

        <Radio
          value="pix"
          isSelected={selectedPaymentMethod === 'pix'}
          isOpen={false}
          label={<PixLabel />}
        >
          <PixForm
            total={totalToPay}
            onGenerate={() => createTransaction('pix')}
          />
        </Radio>

        <Radio
          value="ticket"
          isSelected={selectedPaymentMethod === 'ticket'}
          isOpen={false}
          label={<TicketLabel />}
        >
          <TicketForm
            total={totalToPay}
            onGenerate={() => createTransaction('ticket')}
          />
        </Radio>
      </RadioGroup>
    </>
  )
}
