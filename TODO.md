# Task: Fix Loading Error and Make Sleep Mode Automatic

## Steps to Complete:

- [x] Fix loading error by wrapping app instantiation in DOMContentLoaded in app.js
- [x] Remove sleep button from HTML (index.html)
- [x] Remove sleepBtn reference from ui/components.js
- [x] Remove sleepBtn event listener from core/events.js and add auto-sleep logic in updateTime()
- [x] Add sleep mode styles to styles/styles.css

## Followup Steps:

- [ ] Test app loads without errors
- [ ] Verify sleep mode auto-triggers between 23:00-05:00
- [ ] Confirm styles match focus/lockdown
