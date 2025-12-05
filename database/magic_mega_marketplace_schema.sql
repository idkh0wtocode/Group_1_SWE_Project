CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE user_role AS ENUM ('member','admin');
CREATE TYPE listing_type AS ENUM ('good','service');
CREATE TYPE listing_status AS ENUM ('available','pending','purchased','cancelled');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email CITEXT UNIQUE NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  role user_role NOT NULL DEFAULT 'member',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type listing_type NOT NULL,
  category_id INT REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  condition_note TEXT,
  status listing_status NOT NULL DEFAULT 'available',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector tsvector
);

CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE listing_tags (
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, tag_id)
);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  rsvp_link TEXT,
  event_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE announcement_rsvps (
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (announcement_id, user_id)
);

INSERT INTO categories(name) VALUES
('Textbooks'),('Furniture'),('Clothes'),('Electronics'),('Subleases'),('Tutoring');

INSERT INTO tags(name) VALUES
('math'),('cs'),('like-new'),('used'),('python'),('moving');

INSERT INTO users(email, email_verified, role, password_hash)
VALUES ('alice@ufl.edu', TRUE, 'member', 'hash1'),
       ('admin@ufl.edu', TRUE, 'admin', 'hash2');

INSERT INTO profiles(user_id, full_name)
SELECT id, 'Alice Student' FROM users WHERE email='alice@ufl.edu';

INSERT INTO listings(seller_id, type, category_id, title, description, price_cents)
SELECT id, 'good', (SELECT id FROM categories WHERE name='Textbooks'),
       'Discrete Math Textbook', 'Great condition, minimal notes.', 3500
FROM users WHERE email='alice@ufl.edu';

INSERT INTO listings(seller_id, type, category_id, title, description, price_cents)
SELECT id, 'service', (SELECT id FROM categories WHERE name='Tutoring'),
       'CS1 Tutoring - Python', '60-minute intro Python sessions.', 2500
FROM users WHERE email='alice@ufl.edu';
