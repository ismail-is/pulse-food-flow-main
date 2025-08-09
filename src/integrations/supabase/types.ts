export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      order_history: {
        Row: {
          created_at: string
          delivered_at: string | null
          delivery_date: string
          delivery_time: string
          id: string
          items: Json
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          delivery_date: string
          delivery_time: string
          id?: string
          items: Json
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          delivery_date?: string
          delivery_time?: string
          id?: string
          items?: Json
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          item_category: string
          item_name: string
          meal_time: Database["public"]["Enums"]["meal_type"]
          order_id: string
          price: number | null
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          item_category: string
          item_name: string
          meal_time: Database["public"]["Enums"]["meal_type"]
          order_id: string
          price?: number | null
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          item_category?: string
          item_name?: string
          meal_time?: Database["public"]["Enums"]["meal_type"]
          order_id?: string
          price?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_time: string
          diet_preferences:
            | Database["public"]["Enums"]["diet_preference"][]
            | null
          id: string
          is_active: boolean
          meal_type: Database["public"]["Enums"]["meal_type"]
          notes: string | null
          order_type: Database["public"]["Enums"]["order_type"]
          start_date: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_time: string
          diet_preferences?:
            | Database["public"]["Enums"]["diet_preference"][]
            | null
          id?: string
          is_active?: boolean
          meal_type: Database["public"]["Enums"]["meal_type"]
          notes?: string | null
          order_type: Database["public"]["Enums"]["order_type"]
          start_date: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_time?: string
          diet_preferences?:
            | Database["public"]["Enums"]["diet_preference"][]
            | null
          id?: string
          is_active?: boolean
          meal_type?: Database["public"]["Enums"]["meal_type"]
          notes?: string | null
          order_type?: Database["public"]["Enums"]["order_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          id: string
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      "Pulse test 1": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      diet_preference:
        | "none"
        | "keto"
        | "high-protein"
        | "vegan"
        | "vegetarian"
        | "gluten-free"
        | "dairy-free"
      meal_type:
        | "breakfast"
        | "lunch"
        | "dinner"
        | "breakfast-lunch"
        | "lunch-dinner"
        | "breakfast-dinner"
        | "all-meals"
      order_status:
        | "pending"
        | "in-kitchen"
        | "out-for-delivery"
        | "delivered"
        | "cancelled"
      order_type: "one-time" | "weekly" | "monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      diet_preference: [
        "none",
        "keto",
        "high-protein",
        "vegan",
        "vegetarian",
        "gluten-free",
        "dairy-free",
      ],
      meal_type: [
        "breakfast",
        "lunch",
        "dinner",
        "breakfast-lunch",
        "lunch-dinner",
        "breakfast-dinner",
        "all-meals",
      ],
      order_status: [
        "pending",
        "in-kitchen",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      order_type: ["one-time", "weekly", "monthly"],
    },
  },
} as const
