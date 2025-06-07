CREATE TABLE public.delivery_attempt (
    id BIGSERIAL PRIMARY KEY,
    notification_id UUID NOT NULL REFERENCES public.notification(id),
    channel_id INTEGER NOT NULL REFERENCES ref.notification_channel(id),
    attempt_number INTEGER NOT NULL DEFAULT 1,
    status_id INTEGER NOT NULL REFERENCES ref.delivery_status(id),
    attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    error_message TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.delivery_attempt
    REPLICA IDENTITY DEFAULT;
