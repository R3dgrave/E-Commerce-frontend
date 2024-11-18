import { CartItem } from "./cartItem";

export interface Order{
    readonly _id?: string;
    items: CartItem[];
    paymentType: string;
    address: any;
    readonly date: Date;
    status?: string;
}