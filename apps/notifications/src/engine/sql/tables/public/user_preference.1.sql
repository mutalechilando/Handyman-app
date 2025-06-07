CREATE TABLE public.user_preference (
    user_id UUID NOT NULL,
    tenant_id UUID NOT NULL REFERENCES public.tenant(id),
    channel_id INTEGER NOT NULL REFERENCES ref.notification_channel(id),
    opted_out BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, tenant_id, channel_id)
);

ALTER TABLE public.user_preferences
    REPLICA IDENTITY DEFAULT;
