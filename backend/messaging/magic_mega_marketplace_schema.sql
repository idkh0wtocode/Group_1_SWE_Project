DROP TABLE IF EXISTS Messaging CASCADE;
DROP TABLE IF EXISTS QueueMessage CASCADE;

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

CREATE TABLE QueueMessage(
  SenderID TEXT,
  ReceiverID TEXT,
  LastMessageID INT,
  PRIMARY KEY (SenderID, ReceiverID)
);

CREATE TABLE Messaging (
  MessageID SERIAL PRIMARY KEY,
  SenderID TEXT,
  ReceiverID TEXT,
  Content TEXT,
  Timestamp TIMESTAMPTZ DEFAULT now()
);

-- Conversations (QueueMessage)
INSERT INTO QueueMessage (SenderID, ReceiverID, LastMessageID)
VALUES ('Jason', 'Alex', NULL);

INSERT INTO QueueMessage (SenderID, ReceiverID, LastMessageID)
VALUES ('David', 'Julian', NULL);

-- Messages (Messaging) - no ConversationID column now
INSERT INTO Messaging (SenderID, ReceiverID, Content)
VALUES ('Jason', 'Alex', 'Hello!');

INSERT INTO Messaging (SenderID, ReceiverID, Content)
VALUES ('Alex', 'Jason', 'Hi there!');

INSERT INTO Messaging (SenderID, ReceiverID, Content)
VALUES ('David', 'Julian', 'Hey, are you free tomorrow?');

INSERT INTO Messaging (SenderID, ReceiverID, Content)
VALUES ('Julian', 'David', 'Yes, lets meet at 5.');

-- Update QueueMessage with last message IDs
UPDATE QueueMessage SET LastMessageID = 2 WHERE SenderID = 'Jason' AND ReceiverID = 'Alex';
UPDATE QueueMessage SET LastMessageID = 4 WHERE SenderID = 'David' AND ReceiverID = 'Julian';

/*
psql -U cen3031 -d magic_mega_marketplace
psql -U postgres -d postgres
postgres=# DROP DATABASE magic_mega_marketplace;
DROP DATABASE
postgres=# DROP ROLE cen3031;
DROP ROLE
postgres=# CREATE ROLE cen3031 LOGIN PASSWORD 'devpass';
CREATE ROLE
postgres=# CREATE DATABASE magic_mega_marketplace OWNER cen3031;
CREATE DATABASE
\q
psql -U cen3031 -d magic_mega_marketplace -f magic_mega_marketplace_schema.sql



SELECT *
FROM Messaging
WHERE (SenderID = 'Jason' AND ReceiverID = 'Alex')
   OR (SenderID = 'Alex' AND ReceiverID = 'Jason')
ORDER BY Timestamp;
*/