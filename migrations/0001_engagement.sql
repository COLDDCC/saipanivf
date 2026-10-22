CREATE TABLE IF NOT EXISTS engagement_daily (
  day TEXT NOT NULL,
  event TEXT NOT NULL CHECK(event IN ('treatment_view','contact_open','budget_use','consult_start','consult_draft','email_open','consult_copy')),
  language TEXT NOT NULL CHECK(language IN ('zh-CN','zh-TW','en','ja','ko')),
  count INTEGER NOT NULL DEFAULT 0 CHECK(count >= 0),
  PRIMARY KEY(day,event,language)
);
