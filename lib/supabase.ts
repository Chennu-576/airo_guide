import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
};

export type Article = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Subarticle = {
  id: string;
  article_id: string;
  title: string;
  slug: string;
  content: string;
  sort_order: number;
  created_at: string;
};
