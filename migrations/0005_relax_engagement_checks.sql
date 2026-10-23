-- Drop the per-language / per-event CHECK lists. functions/api/engagement.js is the
-- only writer and already validates both against an allowlist, so adding a locale or
-- event no longer requires rebuilding this table. Existing aggregate counts are kept.
CREATE TABLE engagement_daily_next (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  language TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0 CHECK(count >= 0),
  PRIMARY KEY(day,event,language)
);
INSERT INTO engagement_daily_next (day,event,language,count)
SELECT day,event,language,count FROM engagement_daily;
DROP TABLE engagement_daily;
ALTER TABLE engagement_daily_next RENAME TO engagement_daily;
