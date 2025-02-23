import { GT } from "@graphql/index"
import { PaymentInitiationMethod as DomainPaymentInitiationMethod } from "@domain/wallets"

const PaymentInitiationMethod = new GT.Enum({
  name: "PaymentInitiationMethod",
  values: {
    INTRA_LEDGER: { value: DomainPaymentInitiationMethod.IntraLedger },
    ON_CHAIN: { value: DomainPaymentInitiationMethod.OnChain },
    LIGHTNING: { value: DomainPaymentInitiationMethod.Lightning },
  },
})

export default PaymentInitiationMethod
