# ForesType Phase 2 — Production UI + Real Authentication + Real Data + Live Leaderboard

## Mission

Implement **Phase 2** in the currently running ForesType MERN application.

Use the two supplied reference images as the **visual source of truth**:
- Light reference = Light theme
- Dark reference = Dark theme

Use the existing running application as the **functional source of truth**.

This is not a mockup task. Build a real, working application.

**Final target:**
Reference UI + existing Phase 1 functionality + Firebase Google Auth + MongoDB + real profiles + real progression + real statistics + real leaderboard + live Socket.IO updates.

Do not create a separate demo application.

---

# 1. STRICT PHASE GATING

Only Phase 2 is allowed.

## Phase 2
- Google authentication through Firebase
- Real MongoDB users
- User profile
- EXP system
- Levels
- Profile/avatar unlocks
- Real user statistics
- Real global leaderboard
- Live leaderboard updates through Socket.IO
- UI implementation based on supplied references

## Do NOT implement
- Typing games
- Quotes system
- Advanced Theme APIs
- Future-phase features
- Hidden experimental routes belonging to later phases

Future features must remain inaccessible through direct URLs, localStorage manipulation, frontend state manipulation, or direct API requests.

---

# 2. FIRST ACTION: AUDIT THE CURRENT APPLICATION

Before changing code:

1. Inspect the complete repository.
2. Run the current application.
3. Understand the existing React structure.
4. Understand the Express backend.
5. Understand MongoDB/Mongoose setup.
6. Understand the existing Socket.IO implementation.
7. Understand routing.
8. Understand the typing engine.
9. Understand WPM/accuracy/CPM/timer calculations.
10. Understand Wikipedia content integration.
11. Understand existing settings/theme persistence.
12. Understand existing Under Development gating.
13. Identify which parts already work.
14. Identify which parts must be extended for Phase 2.

Do not blindly rewrite existing code.

Preserve working Phase 1 logic unless a change is genuinely required.

---

# 3. REFERENCE IMAGE RULE

The supplied images are visual references, not data sources.

Numbers visible in the screenshots are examples only.

For example:
- 72 WPM
- 96% accuracy
- 360 CPM
- 24 sessions
- 68 average WPM
- 92 best WPM
- chart points
- recent session values

must NOT be hardcoded.

Use real application data.

If a new account has no data, show an honest empty state.

Never fabricate users or statistics to make the UI look populated.

---

# 4. GLOBAL DESIGN LANGUAGE

The application should feel:
- peaceful
- atmospheric
- natural
- premium
- minimal
- immersive
- forest-inspired
- slightly magical/bioluminescent

Maintain the ForesType identity.

Do not directly copy Hollow Knight assets, fonts, logos, characters, or UI.

Use the supplied references for the overall visual language.

---

# 5. LIGHT AND DARK THEMES

Implement one unified component system supporting:
- Light
- Dark
- System

Light is the default.

Layout, spacing and proportions should remain consistent between themes.

Only visual tokens/background treatment should change.

## Dark
Use the supplied dark reference:
- near-black deep green background
- dark forest surfaces
- subtle green borders
- bioluminescent green accents
- off-white primary text
- muted sage secondary text
- subtle glow on active/primary elements
- dark atmospheric forest background

Suggested direction:
- Background: `#0a1410` → `#0d1a14`
- Card: `#111f18`
- Accent: `#4ade80` / `#22c55e`
- Primary text: `#e8f0ea`
- Secondary text: `#8a9a90`

## Light
Use the supplied light reference:
- white / warm cream surfaces
- very light sage background
- muted forest green
- soft shadows
- dark charcoal-green text
- airy forest imagery

Suggested direction:
- Background: `#ffffff` → `#f0f5ef`
- Card: `#ffffff`
- Accent: `#16a34a` / `#15803d`
- Primary text: `#1a2e22`
- Secondary text: `#5c6b62`

Use CSS variables/theme tokens rather than duplicated styles.

---

# 6. GLOBAL NAVIGATION

Every main screen uses the same navigation structure.

Left:
- leaf/botanical ForesType mark
- ForesType wordmark

Center:
- Practice
- Dashboard
- Stats
- Settings

Active page:
- accent color
- subtle underline/highlight

Right:
- theme controls
- real authenticated user's avatar/profile button

The avatar must not remain a fake static icon once authentication is implemented.

Make the header responsive.

---

# 7. PRACTICE PAGE

Match the supplied Practice reference.

Structure:
1. Global navbar
2. Time mode caption
3. Four statistic cards
4. Typing paragraph card
5. Typing input
6. Duration selectors
7. Sound control
8. Restart control

## Time caption
Example: `TIME MODE • 60 SECONDS`

This must reflect the actual selected duration.

## Metric cards
Show:
- WPM
- Accuracy
- CPM
- Time

These values must come from the real typing engine.

Accuracy and time must render as whole integers:
- `96%`, not `96.4%`
- `24s`, not `24.3s`

Round before rendering.

## Typing panel
Use:
- large readable monospace text
- correct/incorrect character states
- muted completed text
- accent-highlighted relevant characters
- visible typing cursor
- comfortable line height

Keep the existing typing engine. Do not replace it with a visual simulation.

## Duration controls
Provide:
- 15s
- 30s
- 60s
- 120s
- Custom

They must actually control session duration.

## Bottom controls
- Sound
- Restart

Both must actually work.

---

# 8. LANDING / HERO PAGE

Match the supplied ForesType landing reference.

Show:
- forest background
- "Enter the"
- large ForesType title
- leaf divider
- "Sharpen your fingers."
- "Find your rhythm."
- "Explore further."
- Begin Practice CTA

Feature callouts:
- Improve Speed
- Track Progress
- Stay Consistent
- Explore Modes

Do not make a feature card appear functional if the corresponding feature does not exist.

Begin Practice must navigate to the real Practice experience.

---

# 9. DASHBOARD

Match the supplied Dashboard reference.

Heading: `Dashboard`

Subheading: `Track your growth through the forest.`

## Summary cards
Show real:
- Average WPM
- Best WPM
- Average Accuracy
- Total Sessions

Do not hardcode screenshot values.

## Charts
Implement:
- WPM Over Time
- Accuracy Over Time

Use real stored session data.

Do not use random/static chart data.

Time filters must actually filter data.

If there is insufficient data, show an honest empty/insufficient-data state.

## Recent Sessions
Show real:
- date/time
- duration
- mode
- WPM
- accuracy
- CPM

## Statistics
Show real:
- total typing time
- total characters
- best accuracy
- consistency

All dashboard values must come from the same authoritative data source.

---

# 10. STATS PAGE

Implement a deeper statistics view using the same visual language.

Only display statistics backed by real stored data.

Possible sections:
- WPM
- accuracy
- CPM
- consistency
- total sessions
- total typing time
- total characters
- personal bests
- trends

Do not invent statistics that cannot be calculated from actual data.

---

# 11. SESSION COMPLETE

Match the supplied Session Complete reference.

Show:
- SESSION COMPLETE
- leaf divider
- WPM
- Accuracy
- CPM
- Consistency
- Correct Characters
- Incorrect Characters
- Total Characters
- Time

Accuracy, consistency and time must be rendered as whole integers.

Buttons:
- Try Again
- New Session
- Back to Dashboard

Every button must work.

Results must come from the actual completed session.

---

# 12. SETTINGS

Match the supplied Settings reference.

Left sidebar:
- Appearance
- Typing
- Session
- Sound
- Account
- About

Appearance:
- Light
- Dark
- System

Accent selector:
- green
- teal
- blue
- indigo/purple
- pink
- orange
- other currently supported choices

Typing Preview:
`The quick brown fox jumps over the lazy dog.`

Settings must actually persist.

Do not create decorative controls that do nothing.

If a setting is not implemented, clearly mark it Under Development.

---

# 13. FIREBASE GOOGLE AUTHENTICATION

Use Firebase Authentication for Google login.

Flow:

Google
→ Firebase Authentication
→ Firebase user
→ Firebase ID token
→ Express backend
→ Firebase Admin verification
→ MongoDB user

Firebase handles authentication and identity.

MongoDB handles application data.

Never store Google passwords.

Never trust a client-provided user ID.

The backend must derive identity from the verified Firebase token.

Support:
- login
- logout
- session restoration
- loading state
- authentication failure
- token verification
- protected routes

---

# 14. MONGODB USER MODEL

Create a proper Mongoose user model.

At minimum:

```js
{
  firebaseUid,
  email,
  displayName,
  googlePhotoURL,

  selectedAvatar,

  level,
  experience,
  lifetimeExperience,

  unlockedAvatars,

  stats: {
    testsCompleted,
    totalCharacters,
    totalCorrectCharacters,
    bestWpm,
    averageWpm,
    bestAccuracy,
    averageAccuracy,
    totalTypingTime
  },

  createdAt,
  updatedAt
}
```

Firebase UID must be unique.

Do not create duplicate MongoDB users for repeated logins.

Use appropriate indexes.

---

# 15. REAL PROFILE

The profile must load from MongoDB.

Show real:
- display name
- Google profile image where appropriate
- selected avatar
- level
- EXP
- EXP progress
- unlocked avatars
- typing statistics
- best WPM
- average WPM
- accuracy
- sessions
- logout

Changes must persist.

Refresh must not reset data.

---

# 16. AVATAR / PROFILE-PICTURE UNLOCKS

Build an extensible avatar system.

Each avatar should conceptually have:
- ID
- name
- asset
- unlock requirement
- description
- unlock state

The backend determines unlock eligibility.

The client cannot unlock avatars by editing localStorage or sending arbitrary requests.

Users may only select avatars that the backend confirms are unlocked.

Default avatar must always be available.

---

# 17. EXP AND LEVEL SYSTEM

Do NOT invent the final progression formula.

Before implementing final EXP logic, ask me to provide:
1. EXP per completed test
2. WPM contribution
3. accuracy contribution
4. character contribution
5. duration contribution
6. consistency contribution
7. bonuses
8. penalties
9. abandoned-test behavior
10. level thresholds/formula
11. maximum level
12. avatar unlock requirements

Build the progression service so rules can be inserted centrally.

Do not scatter EXP calculations through UI components.

---

# 18. SERVER-AUTHORITATIVE PROGRESSION

The frontend must never directly set:
- EXP
- level
- lifetime EXP
- unlocked avatars

The server calculates and persists these.

Flow:

Typing result
→ validation
→ EXP calculation
→ level calculation
→ avatar unlock evaluation
→ statistics update
→ MongoDB update
→ response
→ leaderboard update

Protect against:
- negative EXP
- impossible results
- arbitrary levels
- arbitrary avatar unlocks
- replayed requests
- duplicate completions
- malformed requests

---

# 19. REAL SESSION STORAGE

Completed sessions must be stored in MongoDB so they can power:
- Dashboard
- Stats
- Recent Sessions
- charts
- progression
- leaderboard-related calculations

Create a suitable Session model.

At minimum consider:
- user ID
- completed timestamp
- duration
- mode
- WPM
- accuracy
- CPM
- consistency
- correct characters
- incorrect characters
- total characters
- unique completion/session ID

Do not fabricate historical sessions.

---

# 20. REAL GLOBAL LEADERBOARD

The leaderboard must be 100% database-backed.

Every entry must correspond to an actual authenticated MongoDB user.

Never use:
- fake users
- demo users
- placeholder names
- random scores
- static JSON
- hardcoded ranks
- generated fake data

If there are zero users, show:
`No ranked users yet.`

If there are two users, show two users.

Do not create fake users to fill the page.

---

# 21. LEADERBOARD RANKING

Use deterministic server-side ranking.

Primary ranking:
`lifetimeExperience DESC`

Use a deterministic tie-breaker, for example:
1. lifetime EXP descending
2. best WPM descending
3. stable database ID ascending

Rank must be calculated by the backend/database.

The frontend must not calculate authoritative rank.

---

# 22. CURRENT USER RANK

Authenticated users should be able to see their real rank.

Example:

```text
Your Rank
#27

Level 9
4,820 EXP
```

This must be based on actual database state.

---

# 23. LIVE LEADERBOARD

Use Socket.IO for real-time leaderboard updates.

Architecture:

```text
Real user completes typing test
        ↓
Backend validates result
        ↓
MongoDB is updated
        ↓
Leaderboard ranking changes
        ↓
Socket.IO broadcasts update
        ↓
Connected clients update without refresh
```

Do not emit on every keystroke.

Leaderboard updates should happen after meaningful persisted state changes.

Use a dedicated leaderboard subscription/room/channel where appropriate.

Example event concepts:
- `leaderboard:subscribe`
- `leaderboard:update`
- `leaderboard:error`

The REST leaderboard endpoint remains the source for initial load/recovery.

Socket.IO is the live delivery mechanism, not the database.

---

# 24. SOCKET.IO RESILIENCE

If Socket.IO disconnects:
- typing should continue locally where Phase 1 already supports it
- leaderboard can recover through REST
- reconnect should resynchronize current leaderboard state

Do not let a WebSocket failure corrupt ranking.

Test reconnect behavior.

---

# 25. MULTI-USER LIVE TEST

This is mandatory.

Use at least two real authenticated test accounts if possible.

### User A
- logs in with Google
- gets a real MongoDB profile
- completes a real typing test
- receives real EXP
- profile updates
- leaderboard updates

### User B
- logs in with Google
- has a real MongoDB profile
- views leaderboard

When User A completes a qualifying test, User B must see the leaderboard update without manually refreshing.

Do not claim live leaderboard support without testing multi-client synchronization.

---

# 26. DUPLICATE COMPLETION PROTECTION

A single completed session must not grant EXP multiple times if its request is replayed.

Use a unique completion/session identifier or another robust idempotency strategy.

Same completion submitted twice:
- EXP awarded once
- second request does not duplicate progression

---

# 27. API SECURITY

Authenticated API endpoints must verify Firebase ID tokens.

Reject:
- missing token
- malformed token
- expired token
- invalid token
- unauthorized user
- unauthorized profile modification
- arbitrary EXP updates
- arbitrary level updates
- arbitrary avatar unlocking

Never expose:
- Firebase Admin credentials
- MongoDB credentials
- private authentication data
- server secrets

---

# 28. ENVIRONMENT VARIABLES

Never hardcode secrets.

Use environment variables for:
- MongoDB URI
- Firebase client configuration where applicable
- Firebase Admin credentials
- server configuration
- allowed origins
- other secrets

Do not put MongoDB credentials or Firebase Admin credentials into the React bundle.

Do not commit `.env`.

Do not print secrets in logs.

If credentials are missing, tell me exactly which variables are needed.

Do not invent credentials.

---

# 29. REAL DATA RULE

The application must always prefer real data over visual completeness.

Never create a hardcoded leaderboard like:

```js
const leaderboard = [
  { name: "Alex", exp: 18200 },
  { name: "Sam", exp: 16100 }
];
```

Never generate fake chart points.

Never seed fake production users.

Never copy screenshot values into the database.

Empty data is acceptable and should be represented honestly.

---

# 30. FOREST BACKGROUND SYSTEM

Create a reusable forest environment/background component.

Do not duplicate one huge background image into every page.

Support:
- Light background treatment
- Dark background treatment
- overlays
- responsive positioning

Keep content readable over the background.

The forest should enhance the interface, not reduce usability.

---

# 31. DESIGN TOKENS

Centralize:
- background
- surface
- elevated surface
- primary text
- secondary text
- border
- accent
- error
- success
- warning
- shadow
- glow
- radius
- spacing
- typography

Use theme tokens rather than scattered hardcoded colors.

---

# 32. TYPOGRAPHY

Use:
- refined display/serif-like typography for major branding/headings where appropriate
- readable UI font
- monospace font for typing-related content

Typing content and preview should prioritize readability.

Do not use proprietary/copyrighted game fonts.

---

# 33. ICONOGRAPHY

Use one coherent icon system.

Icons should be:
- minimal
- thin
- consistent
- functional

Avoid mixing unrelated icon styles.

---

# 34. RESPONSIVE DESIGN

The application must work on:
- desktop
- laptop
- tablet
- mobile

On small screens:
- dashboard cards stack
- charts resize
- settings sidebar adapts
- navigation adapts
- typing content remains readable
- controls remain touch-friendly

Do not simply scale down the desktop layout.

---

# 35. LOADING STATES

Never flash fake data while real data loads.

Provide loading states for:
- authentication
- profile
- dashboard
- statistics
- leaderboard
- sessions

Skeletons or subtle forest-themed loading indicators are acceptable.

---

# 36. EMPTY STATES

Use honest empty states.

Example:
`Your journey begins here. Complete your first typing session to start tracking your growth.`

Leaderboard:
`No ranked users yet. Complete a typing session to enter the leaderboard.`

Do not fill empty states with fake content.

---

# 37. ERROR STATES

Handle gracefully:
- Firebase unavailable
- Google login cancelled
- invalid token
- MongoDB unavailable
- session save failure
- leaderboard failure
- Socket.IO disconnect
- profile update failure

Do not expose stack traces, secrets, connection strings, or internal server details.

---

# 38. PERFORMANCE

Typing responsiveness is the highest priority.

Avoid:
- expensive re-renders on every keystroke
- unnecessary network calls
- emitting Socket.IO events on every character
- oversized background assets
- unnecessary chart recalculation
- loading all users into application memory for leaderboard ranking

Use database-side sorting/pagination.

Add appropriate indexes.

---

# 39. PHASE 1 REGRESSION

After Phase 2, verify:
- typing
- WPM
- accuracy
- CPM
- timer
- consistency
- Socket.IO session functionality
- Wikipedia content
- persistence
- Light mode
- Dark mode
- System mode
- existing settings
- existing navigation

Do not allow Phase 2 to break Phase 1.

---

# 40. TWO-PASS REVIEW

## Pass 1 — Engineering
Review:
- architecture
- Firebase authentication
- Firebase Admin verification
- MongoDB schemas
- indexes
- API security
- authorization
- Socket.IO authentication
- leaderboard correctness
- ranking determinism
- duplicate submissions
- EXP integrity
- race conditions
- database consistency
- error handling
- secret exposure
- performance

Fix discovered problems.

## Pass 2 — UX / VISUAL
Compare the running application directly against both supplied images.

Review:
- spacing
- typography
- proportions
- cards
- navbar
- forest imagery
- colors
- borders
- shadows
- glow
- charts
- settings
- session complete
- responsive behavior
- Light theme
- Dark theme

Fix visual discrepancies without sacrificing functionality.

---

# 41. FUNCTIONAL VERIFICATION

Every visible interactive element must actually work:
- navigation
- Google login
- logout
- profile
- avatar selection
- theme switch
- accent selection
- typing
- duration selection
- restart
- sound
- dashboard filters
- charts
- settings
- session completion
- EXP
- level
- leaderboard
- live leaderboard

If something is not implemented, show an Under Development state rather than making it appear functional.

---

# 42. END-TO-END DATA FLOW

Verify:

```text
Google Account
      ↓
Firebase User
      ↓
Verified Firebase ID Token
      ↓
MongoDB User
      ↓
Real Typing Session
      ↓
Validated Result
      ↓
Real Statistics
      ↓
Real EXP
      ↓
Real Level
      ↓
Real Avatar Unlock
      ↓
Real Profile
      ↓
Real Leaderboard
      ↓
Socket.IO Live Update
      ↓
Other Real Users See Update
```

Every stage must use real data.

---

# 43. FINAL QUALITY BAR

The application must not feel like:
- a static mockup
- a generated dashboard
- a Dribbble clone
- a demo with fake users
- disconnected pages

It should feel like one cohesive real product.

The forest visual identity should remain consistent throughout.

---

# 44. FINAL REPORT

After implementation, provide:

## Phase 2 Completion Report

### UI
- pages implemented
- design system
- Light theme
- Dark theme
- responsive behavior

### Authentication
- Firebase Google Auth
- token verification
- protected routes

### Database
- MongoDB models
- indexes
- session storage
- user storage

### Progression
- EXP rules implemented
- level system
- avatar unlock system

### Leaderboard
- ranking algorithm
- real database source
- current-user rank
- Socket.IO live updates
- multi-user test results

### Testing
- authentication
- profile
- typing
- progression
- leaderboard
- live synchronization
- mobile
- Light
- Dark
- System
- Phase 1 regression

### Security
- token validation
- authorization
- duplicate submission protection
- secret handling

### Files
- created
- modified

### Remaining
- limitations
- issues
- deployment requirements

Do not claim a feature works unless it was actually tested.

If something could not be tested, explicitly say so.

---

# 45. STOP CONDITION

After Phase 2 is complete and verified:

**STOP.**

Do not begin Phase 3.

Do not add games.

Do not add quotes.

Do not add future theme APIs.

Do not add unrelated features.

The goal is a complete, real, production-oriented Phase 2 integrated into the existing ForesType application.
