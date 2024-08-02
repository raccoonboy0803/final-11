import { Tables } from "./supabase";

export type Review = Tables<"Review">
export type ReviewInput = Omit<Review, 'created_at' | 'review_id'>;