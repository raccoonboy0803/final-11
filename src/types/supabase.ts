export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      Cart: {
        Row: {
          cart_id: string;
          cart_product_id: string;
          cart_user_id: string;
          count: number;
          is_checked: boolean;
        };
        Insert: {
          cart_id?: string;
          cart_product_id: string;
          cart_user_id: string;
          count: number;
          is_checked: boolean;
        };
        Update: {
          cart_id?: string;
          cart_product_id?: string;
          cart_user_id?: string;
          count?: number;
          is_checked?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'Cart_cart_product_id_fkey';
            columns: ['cart_product_id'];
            isOneToOne: false;
            referencedRelation: 'Product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'Cart_cart_user_id_fkey';
            columns: ['cart_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['user_id'];
          }
        ];
      };
      Chatroom: {
        Row: {
          chatroom_id: string;
          chatroom_product_id: string;
          chatroom_seller_id: string;
          chatroom_user_id: string;
          created_at: string;
          message: string | null;
        };
        Insert: {
          chatroom_id: string;
          chatroom_product_id: string;
          chatroom_seller_id?: string;
          chatroom_user_id: string;
          created_at?: string;
          message?: string | null;
        };
        Update: {
          chatroom_id?: string;
          chatroom_product_id?: string | null;
          chatroom_seller_id?: string | null;
          chatroom_user_id?: string;
          created_at?: string;
          message?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Chatroom_chatroom_product_id_fkey';
            columns: ['chatroom_product_id'];
            isOneToOne: false;
            referencedRelation: 'Product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'Chatroom_chatroom_seller_id_fkey';
            columns: ['chatroom_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          },
          {
            foreignKeyName: 'Chatroom_chatroom_user_id_fkey';
            columns: ['chatroom_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['user_id'];
          }
        ];
      };
      Livestream: {
        Row: {
          category: string | null;
          create_at: string;
          description: string;
          is_live: boolean;
          livestream_id: string;
          livestream_product_id: string;
          livestream_seller_id: string | null;
          product_title: string;
          stream_id: string;
          stream_key: string;
          stream_title: string;
          thumbnail_url: string | null;
          video_uid: string;
        };
        Insert: {
          category?: string | null;
          create_at?: string;
          description: string;
          is_live: boolean;
          livestream_id?: string;
          livestream_product_id: string;
          livestream_seller_id?: string | null;
          product_title: string;
          stream_id: string;
          stream_key: string;
          stream_title: string;
          thumbnail_url?: string | null;
          video_uid: string;
        };
        Update: {
          category?: string | null;
          create_at?: string;
          description?: string;
          is_live?: boolean;
          livestream_id?: string;
          livestream_product_id?: string;
          livestream_seller_id?: string | null;
          product_title?: string;
          stream_id?: string;
          stream_key?: string;
          stream_title?: string;
          thumbnail_url?: string | null;
          video_uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Livestream_livestream_product_id_fkey';
            columns: ['livestream_product_id'];
            isOneToOne: false;
            referencedRelation: 'Product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'Livestream_livestream_seller_id_fkey';
            columns: ['livestream_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          }
        ];
      };
      Message: {
        Row: {
          created_at: string;
          is_read: boolean;
          message_chatroom_id: string;
          message_id: string;
          message_seller_id: string;
          message_user_id: string;
          payload: string;
        };
        Insert: {
          created_at?: string;
          is_read: boolean;
          message_chatroom_id: string;
          message_id?: string;
          message_seller_id: string;
          message_user_id: string;
          payload: string;
        };
        Update: {
          created_at?: string;
          is_read?: boolean;
          message_chatroom_id?: string;
          message_id?: string;
          message_seller_id?: string;
          message_user_id?: string;
          payload?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Message_message_chatroom_id_fkey';
            columns: ['message_chatroom_id'];
            isOneToOne: false;
            referencedRelation: 'Chatroom';
            referencedColumns: ['chatroom_id'];
          },
          {
            foreignKeyName: 'Message_message_seller_id_fkey';
            columns: ['message_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          },
          {
            foreignKeyName: 'Message_message_user_id_fkey';
            columns: ['message_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['user_id'];
          }
        ];
      };
      Order: {
        Row: {
          cost: number;
          is_payed: boolean;
          order_date: string;
          order_id: number;
          order_product_id: string;
          order_seller_id: string;
          order_user_id: string;
          quantity: number;
        };
        Insert: {
          cost: number;
          is_payed: boolean;
          order_date?: string;
          order_id?: number;
          order_product_id: string;
          order_seller_id: string;
          order_user_id: string;
          quantity: number;
        };
        Update: {
          cost?: number;
          is_payed?: boolean;
          order_date?: string;
          order_id?: number;
          order_product_id?: string;
          order_seller_id?: string;
          order_user_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Order_order_product_id_fkey';
            columns: ['order_product_id'];
            isOneToOne: false;
            referencedRelation: 'Product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'Order_order_seller_id_fkey';
            columns: ['order_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          },
          {
            foreignKeyName: 'Order_order_seller_id_fkey';
            columns: ['order_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          },
          {
            foreignKeyName: 'Order_order_user_id_fkey';
            columns: ['order_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['user_id'];
          }
        ];
      };
      Product: {
        Row: {
          category: string;
          created_at: string | null;
          description: string;
          price: number;
          product_id: string;
          product_seller_id: string;
          stock: number;
          thumbnail_url: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description: string;
          price: number;
          product_id: string;
          product_seller_id: string;
          stock: number;
          thumbnail_url: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string;
          price?: number;
          product_id?: string;
          product_seller_id?: string;
          stock?: number;
          thumbnail_url?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Product_product_seller_id_fkey';
            columns: ['product_seller_id'];
            isOneToOne: false;
            referencedRelation: 'Seller';
            referencedColumns: ['seller_id'];
          }
        ];
      };
      Review: {
        Row: {
          created_at: string | null;
          description: string;
          rating: number | null;
          review_id: string;
          review_product_id: string;
          review_user_id: string;
          review_user_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          rating?: number | null;
          review_id?: string;
          review_product_id: string;
          review_user_id: string;
          review_user_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          rating?: number | null;
          review_id?: string;
          review_product_id?: string;
          review_user_id?: string;
          review_user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Review_review_product_id_fkey';
            columns: ['review_product_id'];
            isOneToOne: false;
            referencedRelation: 'Product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'Review_review_user_id_fkey';
            columns: ['review_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['user_id'];
          }
        ];
      };
      Seller: {
        Row: {
          address: string;
          address_code: string;
          address_detail: string | null;
          avatar_url: string;
          created_at: string;
          email: string;
          phone: string;
          seller_id: string;
          user_name: string;
        };
        Insert: {
          address: string;
          address_code?: string;
          address_detail?: string | null;
          avatar_url: string;
          created_at?: string;
          email: string;
          phone: string;
          seller_id: string;
          user_name: string;
        };
        Update: {
          address?: string;
          address_code?: string;
          address_detail?: string | null;
          avatar_url?: string;
          created_at?: string;
          email?: string;
          phone?: string;
          seller_id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          address: string;
          address_code: string;
          address_detail: string;
          avatar_url: string;
          created_at: string;
          email: string;
          phone: string;
          user_id: string;
          user_name: string;
        };
        Insert: {
          address: string;
          address_code?: string;
          address_detail?: string;
          avatar_url: string;
          created_at?: string;
          email: string;
          phone: string;
          user_id: string;
          user_name: string;
        };
        Update: {
          address?: string;
          address_code?: string;
          address_detail?: string;
          avatar_url?: string;
          created_at?: string;
          email?: string;
          phone?: string;
          user_id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
