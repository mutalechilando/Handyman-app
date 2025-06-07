-- client applications
CREATE TABLE public.tenant (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    settings JSONB,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.tenant
    REPLICA IDENTITY DEFAULT;
