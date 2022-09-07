/**
 * Represents a payment method model instance
 */
export interface PaymentMethod {
	_id?: string
	account: string
	cardholder: string
	card_no: string
	expiry: string
}
