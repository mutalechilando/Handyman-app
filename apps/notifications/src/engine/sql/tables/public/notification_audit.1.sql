CREATE TABLE public.notification_audit (
    id BIGSERIAL PRIMARY KEY,
    notification_id UUID NOT NULL REFERENCES public.notification(id),
    old_status_id INTEGER NOT NULL REFERENCES ref.notification_status(id),
    new_status_id INTEGER NOT NULL REFERENCES ref.notification_status(id),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notification_audit
    REPLICA IDENTITY DEFAULT;
