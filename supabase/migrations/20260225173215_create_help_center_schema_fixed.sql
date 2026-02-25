/*
  # Help Center Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
    
    - `articles`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subarticles`
      - `id` (uuid, primary key)
      - `article_id` (uuid, foreign key)
      - `title` (text)
      - `slug` (text)
      - `content` (text)
      - `sort_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (help center is public)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text DEFAULT '',
  excerpt text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subarticles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  content text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subarticles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Subarticles are publicly readable"
  ON subarticles FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_subarticles_article_id ON subarticles(article_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_articles_sort_order ON articles(sort_order);