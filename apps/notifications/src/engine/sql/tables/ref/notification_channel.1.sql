CREATE TABLE ref.notification_channel (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE ref.notification_channel
    REPLICA IDENTITY DEFAULT;
