# FamilyNest v37 personal money fix

Based on v36 / v18 baseline.

Fix:
- Personal Money now only counts transactions intentionally categorized as Personal.
- Normal bills/subscriptions assigned to Alec or Patricia no longer show in Personal Money.
- Assigned bill transactions are excluded from Personal Money even if their asset is Personal.
- CSV Review simplified/sort from v36 is kept.
- Service worker remains disabled while testing.
