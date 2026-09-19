# Design research — MyDermaLife Login V2 — 2026-09-19

## Classification and authority

**Tier B: material extension inside an established identity.** This work does
not create another MyDermaLife visual direction. It extends the approved
cream/clay editorial web system into authentication while preserving Login V2's
security and protocol behavior.

Product and visual authority inspected in the MyDermaLife workspace:

- `PRODUCT.md`: French-first DermaTech care for melanin-rich skin, honest
  capability boundaries, patient care journey separated from commerce.
- `DESIGN.md`: Playfair Display for editorial display, Inter for UI/body,
  terracotta `#C45A2A`, cream `#F4F1EA`, paper `#FFFCFA`, ink `#1A1614`, the
  approved MyDermaLife wordmark, and organic living-skin imagery.
- `design-system/packages/react`: canonical `@mydermalife/react/kit`; Login must
  not invent a parallel button, field, notice, or state grammar.
- The user's 2026-09-19 instruction explicitly authorizes an owned custom
  Login V2 experience. It supersedes the older `DESIGN.md` sentence limiting
  ZITADEL to configuration, but it does not transfer product authorization to
  ZITADEL.

The canonical staging IAM estate and Ops authentication record remain in the
Identity repository at MyDermaLife commit `a9aee80`, under
`docs/identity/2026-09-12-ops-estate.md` and
`docs/identity/2026-09-12-ops-authentication.md`. That census is explicitly
partial; this design note does not claim a newer or broader IAM inventory.

## Persona and governing question

**Primary persona:** a prospective or returning Patient, usually French-first
and often on a phone, who needs to enter or create the correct care space
without understanding IAM terminology.

**Secondary personas:** an invited Doctor, Specialist, Store operator, or
Internal staff member entering an organization-scoped product. Persona labels
shape copy and presentation; ZITADEL organization policy and MyDermaLife
membership/permission checks remain the authority.

**Job:** identify or select the right account, use an allowed authentication
method, recover safely, and arrive back in the requesting product with no doubt
about which space was entered.

**Governing question:** “Am I entering the right MyDermaLife space, and what is
the one safe next step?”

## Surface lock

- **Routes:** the existing English canonical Login V2 route tree under
  `/ui/v2/login/*`.
- **States:** login name, account selection, password/passkey/external provider,
  Patient registration, verification, MFA/OTP, recovery, error, signed-in
  self-service, and logout.
- **Devices:** mobile-first at 390 px, then compact laptop and 1280–1440 px
  desktop.
- **In scope:** composition, type, brand assets, method hierarchy, truthful
  progress/recovery feedback, French-default presentation, English choice, and
  policy-aware registration copy.
- **Out of scope:** changing OIDC grants, opening registration for invited
  populations, granting product access, creating business memberships, hiding
  authorization failures, or inventing a phone-OTP protocol.

## Authentication-method decision

| Decision | Contract |
| --- | --- |
| Human interaction | Interactive Login V2 for organization-scoped first-party web/BFF clients |
| Protocol | Preserve authorization code with S256 PKCE and the existing auth-request context |
| Login application | Official Next.js Login V2 at the backend-compatible `v4.17.2` source revision |
| Login server authority | Preserve the supported confidential server component and least-privilege Login Client credential; no credential reaches the browser |
| Human methods | Render only methods enabled by the effective organization policy: password, passkey/passwordless, configured external IdP, and required MFA/OTP |
| Session custody | Preserve Login V2's server-managed cookie/session and OIDC proxy behavior |
| Organization context | Preserve explicit organization scopes/domain resolution; branding must follow the effective organization without changing the population boundary |
| Product authorization | MyDermaLife services decide active identity, membership, role, business scope, and permission after authentication |
| Logout | Clear the product session and ZITADEL session; an explicit logout must require a fresh sign-in rather than silently reselecting the prior account |

Rejected alternatives:

- A standalone custom token or password issuer would duplicate ZITADEL's
  security boundary and lose supported Session/OIDC behavior.
- A copied `apps/login` folder would separate the app from its client/proto
  sources and is not supported by the current upstream build graph.
- A generic ZITADEL theme-only skin cannot meet the approved MyDermaLife
  composition and state requirements.
- Stock Login V2 can find users by verified phone and can use SMS OTP as a
  configured factor, but it does not establish the requested new-user
  phone-number-plus-code primary registration contract. That capability needs
  its own recovery, uniqueness, abuse, SMS-provider, and Session API decision;
  the visual fork must not pretend it already exists.

## Incumbent system inspected

At `v4.17.2`, `apps/login` is a Next.js App Router application. It already owns
the behavior-bearing primitives and flows: `DynamicTheme`, `ThemeWrapper`,
`Card`, `TextInput`, `Button`, IDP buttons, language switching, account
selection, registration, OTP, recovery, and server actions. Branding and
effective login settings are loaded per organization. French translations are
present; the instance/organization settings determine the default language.

The live unscoped route currently presents a dark generic centered card with no
MyDermaLife identity. The live Patient organization handoff is light, includes
the approved wordmark and French account selection, but remains a generic card
floating in a large empty field. The current source can switch between
top-to-bottom and side-by-side layouts, yet neither layout carries the approved
editorial geometry or clearly names the requested product space.

Preserve the route state machine, server actions, accessibility semantics,
safe redirect handling, base path, and upstream tests. Replace only the
presentation layer after a MyDermaLife kit-consumption boundary is agreed. If
the kit cannot yet be consumed as a versioned package, fix that package/release
boundary first rather than copying primitives into this fork.

## Focused same-job references

### Live MyDermaLife Login V2

- **Observed:** direct unscoped login and Patient organization account
  selection at `auth.stormbyva.com/ui/v2/login`.
- **Keep:** one clear action, explicit account selection, language control,
  policy-derived methods, and the correct organization-scoped wordmark.
- **Reject:** generic dark fallback, anonymous empty canvas, detached utility
  controls, and a card that does not explain the current care space.

### Notion login

- **Observed:** a focused identifier-first flow with clearly ordered email,
  social, passkey, and SSO options plus explicit sign-up and legal links.
- **Keep:** strong method hierarchy, readable alternatives, and a single
  primary identifier action.
- **Reject:** the provider-button grid, generic productivity copy, blue action
  color, and centered SaaS-column silhouette. These teach convention, not
  MyDermaLife identity.

### MyDermaLife public site

- **Observed:** cream/paper field, editorial serif scale, clay action, thin
  ruled structure, wordmark, and large quiet areas around clinical copy.
- **Keep:** the type relationship, material palette, generous reading rhythm,
  and careful clinical voice.
- **Reject:** transplanting the marketing hero, nav, conversion copy, or
  decorative depth into a repeated authentication task.

## Inherited system and required addition

**Inherit:** wordmark, Playfair/Inter hierarchy, cream/paper/ink/clay tokens,
fine rules, organic skin contour, French-light default, English option, quiet
clinical voice, and the canonical kit's fields/actions/notices.

**Add:** request context that names the destination and population; a
mobile-first form rhythm; a visually clear hierarchy among primary,
alternative, recovery, and registration actions; honest pending/invalid/
expired/unavailable states; and continuity between account selection, factor
choice, verification, callback, and explicit logout.

Do not show the public Patient/Doctor/Specialist/Store chooser inside Login V2.
That chooser belongs at the public `/login` entry. Once a product authorization
request reaches Login V2, its client and organization context are already the
authority and the page should reinforce, not reopen, that choice. Ops remains
absent from the public chooser.

## Composition wireframes

### Mobile-first, 390 px

```text
┌──────────────────────────────────┐
│ MyDermaLife wordmark        FR ▾ │  64
├──────────────────────────────────┤
│ thin organic skin/material band │  72
│ PATIENT · VOTRE ESPACE DE SOIN  │
├──────────────────────────────────┤
│ Se connecter                    │
│ One sentence of job/context     │
│                                 │
│ Label                           │
│ [ identifier                  ] │
│ [ Continuer                    ] │
│                                 │
│ ─── autres méthodes permises ─ │
│ [ provider / passkey rows      ] │
│                                 │
│ Recovery · registration policy │
├──────────────────────────────────┤
│ Confidentialité · Aide          │
└──────────────────────────────────┘
```

The form owns the viewport; decoration never pushes the first usable field
below the fold. Controls remain at least 44 px high, method rows stay full-width,
and utility controls belong in the header/footer rather than floating off-grid.

### Desktop, 1280–1440 px

```text
┌───────────────────────┬────────────────────────────────────┐
│ organic editorial     │ MyDermaLife                  FR ▾  │
│ field, 38–42%         │                                    │
│                       │ PATIENT · VOTRE ESPACE DE SOIN     │
│ destination/context   │ Se connecter                       │
│ and one clinical line │ [ focused form column, max 460 ]   │
│                       │                                    │
│ quiet evidence note   │ recovery / policy / legal          │
└───────────────────────┴────────────────────────────────────┘
```

The split is one continuous full-height composition, not a card beside an
aside. The editorial field carries place and identity; the paper field carries
the task. Account selection and error/recovery states preserve the same
silhouette.

## Component and state contract

- Reuse or upstream a canonical MyDermaLife kit primitive before creating a
  Login-only equivalent. Upstream Login components keep protocol/state logic
  and may wrap kit presentation rather than being rewritten wholesale.
- The primary action is clay and unique. Provider/passkey methods are secondary
  rows, not equal-weight conversion cards.
- Show the destination as a human label (Patient, Doctor, Specialist, Store,
  Internal) derived from a trusted client/organization mapping. Never expose
  raw client IDs, organization IDs, domains, or implementation status.
- Patient may see registration only when the effective Patient policy allows
  it. Invited populations get an honest invitation/recovery path, never a
  disabled “Register” tease.
- Unknown account, wrong organization, expired code, denied product access,
  unavailable provider, and callback failure need distinct copy and recovery.
- Account selection must not expose one organization's remembered account in a
  different organization's request.
- Light is the branded default. A forced organization theme must not briefly
  flash system dark mode. Theme choice is secondary to readability and policy.

## Beyond the object

**Minimum object:** an accessible form that submits an allowed method and
renders the server result.

**Meaningful moments:** arriving in the correct care space, the server accepting
an identifier/factor, waiting for a verification outcome, recovering from an
expired or wrong code, and explicitly leaving the session.

**Response grammar:** quiet, truth-bound continuity. A thin clay progress rule
may advance only while a real server action is pending and settles only after
the server accepts the step. The form keeps its spatial position across steps;
the context label and wordmark remain fixed so the person never feels moved to
another product. Validation errors appear beside the responsible field without
shaking the whole page. Explicit logout resolves to a clean signed-out state
and the next visit asks for credentials again.

Routine focus, language changes, provider lists, and account rows remain quiet.
No confetti, bounce, fake progress, decorative spinner delays, or success state
before callback completion. Reduced-motion mode removes translation and uses
opacity/color only; interruption retains entered non-secret context where safe
and never replays a completion response.

## Pre-code checks

- **Logo-off:** cream/paper split, serif/UI rhythm, clay verb, fine rules, and
  organic material still read as MyDermaLife.
- **Neighbor swap:** a generic health platform cannot use the destination-aware
  care-space language and living-skin editorial field unchanged.
- **Silhouette:** mobile is a disciplined full-width task; desktop is a 40/60
  editorial/task field, not a centered SaaS card.
- **Three-state:** normal, invalid/recovery, and completion/return preserve the
  same composition and organization context.
- **Explanation:** every divergence follows the existing brand, mobile patient
  job, or organization-safety boundary.
- **Response-off:** the form remains complete; the response layer adds truthful
  continuity and acknowledgement, never authority.

## Implementation and proof order

1. Establish versioned access to the canonical MyDermaLife brand/kit or an
   approved adapter owned by that kit; do not copy a second system.
2. Implement the shared shell and state primitives without changing server
   actions, redirect safety, session handling, or organization policy.
3. Close mobile login/account/registration/recovery first, then desktop.
4. Verify French default and persisted English, light-first rendering without
   a dark flash, keyboard/focus behavior, long translated copy, reduced motion,
   and disabled/loading/error recovery.
5. Exercise Patient self-registration; invited Pro/Store/Internal denial;
   password, passkey, configured external IdP, applicable MFA/OTP; account
   selection; reset/verification; callback; explicit logout; and wrong-org
   isolation against staging.
6. Compare rendered mobile and desktop geometry with this note and the approved
   MyDermaLife references before any GitOps promotion.
