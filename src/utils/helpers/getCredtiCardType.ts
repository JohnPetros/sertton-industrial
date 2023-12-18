export function getCreditCardType(creditCardNumber: string) {
  const amex = new RegExp('^3[47][0-9]{13}$')
  const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$')
  const chinaUnionPay1 = new RegExp('^62[0-9]{14}[0-9]*$')
  const chinaUnionPay2 = new RegExp('^81[0-9]{14}[0-9]*$')

  const mastercard = new RegExp('^5[1-5][0-9]{14}$')
  const mastercard2 = new RegExp('^2[2-7][0-9]{14}$')

  const discover1 = new RegExp('^6011[0-9]{12}[0-9]*$')
  const discover2 = new RegExp('^62[24568][0-9]{13}[0-9]*$')
  const discover3 = new RegExp('^6[45][0-9]{14}[0-9]*$')

  const diners = new RegExp('^3[0689][0-9]{12}[0-9]*$')
  const jcb = new RegExp('^35[0-9]{14}[0-9]*$')

  if (visa.test(creditCardNumber)) {
    return 'visa'
  }
  if (amex.test(creditCardNumber)) {
    return 'amex'
  }
  if (mastercard.test(creditCardNumber) || mastercard2.test(creditCardNumber)) {
    return 'mastercard'
  }
  if (
    discover1.test(creditCardNumber) ||
    discover2.test(creditCardNumber) ||
    discover3.test(creditCardNumber)
  ) {
    return 'discover'
  }
  if (diners.test(creditCardNumber)) {
    return 'diners'
  }
  if (jcb.test(creditCardNumber)) {
    return 'jcb'
  }
  if (
    chinaUnionPay1.test(creditCardNumber) ||
    chinaUnionPay2.test(creditCardNumber)
  ) {
    return 'china union pay'
  }
  return undefined
}
