import { OrderItemDTO } from "../OrderItemDTO"

export interface OrderResponse{
    id: number,
    stripeSessionId: string,
    totalQuantity: number,
    totalPrice: number,
    dateCreated: Date,
    shippingAddress: AddressDTO,
    orderItems: OrderItemDTO[]
}


interface AddressDTO{
    line1: string,
    line2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
}
