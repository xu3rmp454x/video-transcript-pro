# Video Speed Reader

## Build
- Replace the blank home screen with a polished bilingual landing page at `/`, including the exact headline, subtitle, three feature cards, sign-in action, and 2026 footer.
- Add a working account flow with email/password and Google sign-in, including registration, sign-out, password recovery, and clear confirmation/error states.
- Add a protected upload workspace with a focused video drop zone, processing status, recent transcript list, and account menu.
- Keep this milestone honest: upload and transcript rows will demonstrate the workspace experience; actual transcription processing and email delivery are not part of this request.

## Visual direction
- Use a crisp editorial/productivity aesthetic: warm paper background, near-black typography, vivid red-orange actions, technical grid accents, and restrained motion.
- Make the product itself visible immediately through a transcript/workflow preview rather than generic decoration.
- Ensure the experience works cleanly across desktop and mobile.

## Technical details
- Enable Lovable Cloud for secure user accounts; no separate profile table is needed.
- Use protected TanStack routes for the workspace and public routes for sign-in and password reset.
- Add route-specific titles and social descriptions, then verify sign-in states, route protection, responsive layout, and preview health.
