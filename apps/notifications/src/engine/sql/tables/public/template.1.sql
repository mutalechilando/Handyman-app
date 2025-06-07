CREATE TABLE public.template (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES public.tenant(id),
    channel_id INTEGER NOT NULL REFERENCES ref.notification_channel(id),
    name TEXT NOT NULL,
    language VARCHAR(64),
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    version INT NOT NULL DEFAULT 1
    is_active BOOLEAN DEFAULT true,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(tenant_id, channel_id, name, version)
);

ALTER TABLE ref.template
    REPLICA IDENTITY DEFAULT;
