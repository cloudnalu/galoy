type LightningError = import("./errors").LightningError
type LnInvoiceDecodeError = import("./errors").LnInvoiceDecodeError
type LightningServiceError = import("./errors").LightningServiceError

declare const invoiceExpirationSymbol: unique symbol
type InvoiceExpiration = Date & { [invoiceExpirationSymbol]: never }

declare const encodedPaymentRequestSymbol: unique symbol
type EncodedPaymentRequest = string & { [encodedPaymentRequestSymbol]: never }

declare const paymentHashSymbol: unique symbol
type PaymentHash = string & { [paymentHashSymbol]: never }

declare const paymentSecretSymbol: unique symbol
type PaymentSecret = string & { [paymentSecretSymbol]: never }

declare const timeoutMSecsSymbol: unique symbol
type TimeoutMSecs = number & { [timeoutMSecsSymbol]: never }

type RouteHint = {
  baseFeeMTokens?: string
  channel?: string
  cltvDelta?: number
  feeRate?: number
  nodePubkey: Pubkey
}

type LnInvoice = {
  readonly amount: Satoshis | null
  readonly cltvDelta: number | null
  readonly routeHints: RouteHint[]
  readonly destination: Pubkey
  readonly paymentHash: PaymentHash
  readonly paymentSecret: PaymentSecret | null
  readonly paymentRequest: EncodedPaymentRequest
}

type PaymentRoute = {
  fee: number
  fee_mtokens: string
  hops: {
    channel: string
    channel_capacity: number
    fee: number
    fee_mtokens: string
    forward: number
    forward_mtokens: string
    public_key?: string
    timeout: number
  }[]
  messages?: {
    type: string
    value: string
  }[]
  mtokens: string
  timeout: number
  tokens: number
}

type PaymentRequestFeatures = {
  bit: number
  is_known: boolean
  is_required: boolean
  type: string
}[]

type PaymentResult = {
  safe_fee: Satoshis
  paymentSecret: PaymentSecret
}

type RegisterInvoiceArgs = {
  description: string
  satoshis: Satoshis
  expiresAt: InvoiceExpiration
}

type RegisteredInvoice = {
  invoice: LnInvoice
  pubkey: Pubkey
}

interface ILightningService {
  registerInvoice(
    registerInvoiceArgs: RegisterInvoiceArgs,
  ): Promise<RegisteredInvoice | LightningServiceError>
  payRequest({
    decodedRequest,
    timeoutMSecs,
  }: {
    decodedRequest: LnInvoice
    timeoutMSecs?: TimeoutMSecs
  }): Promise<PaymentResult | LightningServiceError>
  payToRoute({
    route,
    id,
    timeoutMSecs,
  }: {
    route: PaymentRoute
    id: Pubkey
    timeoutMSecs?: TimeoutMSecs
  }): Promise<PaymentResult | LightningServiceError>
}
