import { Tables } from "./supabase";

export type Cart = Tables<"Cart">
export type CartItemInput = Omit<Cart, 'cart_id'>;