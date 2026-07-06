# FamilyNest Supabase v3

This version fixes the Supabase settings error:

> Cannot coerce the result to a single JSON object

That happened because the settings table had more than one row for the household. This version reads the newest settings row safely.

## Local test

Stop the old server with Control + C.

From this folder:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Recommended database cleanup

Run the SQL cleanup script provided in chat to keep only one settings row per household.
