import { CreditCardLabel } from './CreditCardForm/CreditCardLabel'
import { PixLabel } from './PixForm/PixLabel'
import { TicketLabel } from './TicketForm/TicketLabel'
import { CreditCardForm } from './CreditCardForm'
import { PixForm } from './PixForm'
import { TicketForm } from './TicketForm'
import { usePaymentForm } from './usePaymentForm'

import { RadioGroup } from '@/components/shared/RadioGroup'
import { Radio } from '@/components/shared/RadioGroup/Radio'

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
