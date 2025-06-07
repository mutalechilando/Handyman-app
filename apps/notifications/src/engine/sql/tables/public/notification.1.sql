CREATE TABLE public.notification (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES public.tenant(id),
    template_id UUID NOT NULL REFERENCES public.template(id),
    channel_id INTEGER NOT NULL REFERENCES ref.notification_channel(id),
    status_id INTEGER NOT NULL REFERENCES ref.notification_status(id),
    recipient VARCHAR(2048) NOT NULL,
    payload JSONB NOT NULL,
    scheduled_for TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notification
    REPLICA IDENTITY DEFAULT;
