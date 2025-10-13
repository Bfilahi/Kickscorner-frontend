export interface PaymentRequest{
    currency: string,
    lineItems: LineItem[]
}


interface LineItem{
    name: string,
    description: string,
    amount: number,
    quantity: number,
    imgUrl: string
}