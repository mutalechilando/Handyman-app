CREATE TABLE sys.setting (
    "key" VARCHAR(64),
    "value" VARCHAR(256),
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("key")
);

ALTER TABLE sys.setting
    REPLICA IDENTITY DEFAULT;
