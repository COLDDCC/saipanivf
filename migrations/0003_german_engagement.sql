-- Extend the language constraint without discarding existing aggregate counts.
CREATE TABLE engagement_daily_with_german (
  day TEXT NOT NULL,
  event TEXT NOT NULL CHECK(event IN ('treatment_view','contact_open','budget_use','consult_start','consult_draft','email_open','consult_copy')),
  language TEXT NOT NULL CHECK(language IN ('zh-CN','zh-TW','en','ja','ko','es','de')),
  count INTEGER NOT NULL DEFAULT 0 CHECK(count >= 0),
  PRIMARY KEY(day,event,language)
);
INSERT INTO engagement_daily_with_german (day,event,language,count)
SELECT day,event,language,count FROM engagement_daily;
DROP TABLE engagement_daily;
ALTER TABLE engagement_daily_with_german RENAME TO engagement_daily;
