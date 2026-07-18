# Lensora Targeted UI/UX Evolution

## Goal

Refine the existing Lensora home page into a more coherent, premium, and conversion-focused optical storefront without replacing the editorial-clinical visual language introduced by the 2026-07-18 redesign.

The work keeps the current information architecture, content, local imagery, navigation destinations, URL-driven product filters, and appointment behavior. It concentrates on typography, responsive hierarchy, interaction states, accessibility, honest form feedback, and visual consistency.

## Redesign Mode

This is a **redesign-preserve** project. The current warm ivory and deep navy identity, square geometry, people-led eyewear photography, and clinical credibility remain recognizable.

The project uses targeted evolution rather than a full redesign because:

- The route structure and content hierarchy already support the primary customer journeys.
- The home page has a clear editorial-clinical identity after the recent redesign.
- Most remaining problems are presentation, responsive behavior, state design, and conversion clarity rather than structural information architecture problems.
- Preserving the current direction reduces regression risk for navigation, filtering, and booking behavior.

This document builds on `docs/superpowers/specs/2026-07-18-lensora-home-editorial-redesign-design.md`. If the two documents conflict for home-page presentation, this document is the source of truth. Existing functional decisions remain in force unless this document explicitly changes them.

## Design Read

Reading this as: a premium Vietnamese eyewear storefront for design-conscious customers who also value clinical credibility, using a restrained editorial-clinical language with image-led commerce, square geometry, and modest motion.

### Design dials

| Dial | Value | Reason |
| --- | ---: | --- |
| `DESIGN_VARIANCE` | 6 | Preserve the existing asymmetric hero and collections while keeping purchase and booking flows predictable. |
| `MOTION_INTENSITY` | 4 | Use purposeful crossfades and tactile interaction feedback without scroll hijacking or decorative animation. |
| `VISUAL_DENSITY` | 5 | Keep enough product and service information for daily shopping while removing repeated borders and card containers. |

## Current-State Audit

### Brand tokens

- Warm ivory page background: `#F3EFE7`.
- Deep navy primary brand and action color: `#142A45`.
- Charcoal body text: `#20201E`.
- Square controls and content containers.
- No heavy shadows or decorative gradients.
- Model, product, and doctor photography carry the visual hierarchy.

### Information architecture

- Home route: `/`.
- Primary destinations: `/kinh-mat`, `/kinh-ram`, `/gong-kinh`, `/bac-si`, `/do-mat`, and `/cua-hang`.
- Home-page anchors: `#collections`, `#bestsellers`, `#eye-exam`, and `#locations`.
- Primary conversion path: hero or header CTA to the appointment section.
- Product discovery path: collection filter to the URL-driven product results.

### Patterns to preserve

- The 40/60 editorial hero on desktop.
- Local model photography in the hero.
- The ivory and navy color relationship.
- The asymmetric collection composition.
- The split clinical story with the existing doctor image.
- The dominant testimonial plus supporting reviews.
- Existing semantic landmarks, heading order, focus styling, and reduced-motion support.

### Patterns to improve or retire

- System UI and Georgia typography that makes the visual identity feel generic.
- A mobile hero that extends to roughly one and a half viewports before completing its message.
- Horizontal trust-signal scrolling that hides proof points on small screens.
- Repeated bordered surfaces across collections, reviews, services, and locations.
- Product cards whose consultation destination is not visually explained.
- Header state that depends on a continuous `window` scroll listener.
- Missing active navigation treatment on subpages.
- Appointment feedback that can be read as a real server submission even though the flow is local only.
- Missing field-specific error styling and weak pressed states.
- Em-dash and en-dash characters in visible strings.
- Remote product and collection images without reserved loading and failure presentation.

### Existing dial reading

The current page is approximately `6 / 4 / 5`. The targeted evolution keeps these values and improves how consistently the page expresses them.

## Scope

- Refine shared typography and color tokens.
- Recompose the home hero for better first-viewport behavior on mobile.
- Improve header state, active navigation, and mobile menu presentation.
- Make trust signals visible without horizontal discovery cost.
- Reduce repeated card and divider treatment across home-page sections.
- Improve product browsing hierarchy and clarify consultation actions.
- Improve appointment validation, error, success, and local-only feedback.
- Add consistent hover, active, focus, loading-resilient, empty, and error presentation where applicable.
- Improve responsive behavior from 375-pixel mobile screens through wide desktop screens.
- Keep home-page and shared marketing-component changes reviewable and focused.

## Non-goals

- No new backend, API route, database, email delivery, or booking integration.
- No cart, checkout, account, inventory, prescription upload, or product-detail implementation.
- No route slug, primary navigation label, logo, legal copy, store data, product price, or medical claim changes.
- No framework migration or styling-library replacement.
- No full rewrite of subpages.
- No dark theme in this iteration. The existing brand specification intentionally defines a single light editorial theme.
- No new animation dependency and no GSAP or scroll hijacking.
- No replacement of the current brand photography.

## Visual System

### Typography

- Use `Be Vietnam Pro` through `next/font/google` for navigation, buttons, forms, body copy, prices, and functional labels.
- Use `Lora` through `next/font/google` for editorial section headings and brand moments.
- Keep the home-page H1 in the sans-serif family for direct clinical confidence.
- Do not mix type families inside one headline for emphasis.
- Use weights 400, 500, 600, and 700 to create hierarchy without relying only on size.
- Enable tabular figures for prices, slide counters, hours, and numeric proof points.
- Apply `text-wrap: balance` to large headings and `text-wrap: pretty` to body copy where supported.
- Keep body text near a 65-character maximum line length.

The serif is justified because the approved brand direction is explicitly editorial and optical-journal inspired. It is limited to headings and selected brand treatments rather than used as a generic luxury decoration.

### Color

- Retain warm ivory `#F3EFE7` as the page background.
- Retain deep navy `#142A45` as the single accent and primary action color.
- Retain charcoal `#20201E` as the primary text color.
- Derive muted text, borders, and light surfaces from the existing warm neutral family.
- Do not add purple, blue glow, secondary accent colors, gradients, or pure black.
- Validate WCAG AA contrast for body text, controls, labels, placeholders, helper text, and errors.

### Shape and elevation

- Keep cards, buttons, inputs, controls, and images square.
- Do not add drop shadows.
- Use negative space, scale, background tone, and sparse hairlines to communicate grouping.
- Keep borders only when they clarify a boundary or interaction. Do not outline every content block.

### Page theme

- Use one light editorial theme across the entire page.
- Navy full-width areas for appointment and footer are deliberate brand anchors, not independent theme changes.
- Other sections remain within the ivory and light-surface family.

## Home-Page Experience

### Header

- Preserve the current logo, navigation labels, routes, and booking CTA.
- Keep the desktop height at or below 76 pixels and ensure all navigation fits on one line.
- Replace continuous scroll-state tracking with an `IntersectionObserver` that changes the header treatment only when the hero boundary is crossed.
- Add `aria-current="page"` and a restrained visual active state on subpages.
- Keep the mobile menu button at least 48 by 48 pixels.
- Lock background scrolling while the mobile menu is open and restore it on close.
- Close the menu after navigation and when the Escape key is pressed.
- Add visible hover, pressed, and focus-visible states without introducing rounded pills.

### Hero

- Preserve the desktop 40/60 split, current headline, supporting sentence, two CTA labels, and three local model images.
- Use `min-height: 100dvh` rather than `100vh` or `100svh` for stable modern mobile viewport behavior.
- Keep the desktop headline to one line where space permits and no more than two lines at intermediate widths.
- On mobile, fit the complete copy, CTAs, and a meaningful model crop within approximately the first viewport.
- Use a compact copy region followed by a protected image region. Do not overlay text across the model's face or eyewear.
- Keep the slide controls on the image, with at least 48-pixel targets and one-line labels.
- Retain the 5.5-second crossfade. Disable autoplay and scale movement for reduced-motion users.
- Use only transform and opacity for animation.
- Maintain stable image dimensions and keep a valid slide visible when another image fails.

### Trust proof

- Keep the four approved proof points and their order.
- Desktop uses one four-column row.
- Mobile uses a two-by-two grid instead of horizontal scrolling so every proof point is immediately visible.
- Use sparse internal separators, with no enclosing card border.
- Keep numbers visually dominant and labels concise.

### Featured collections

- Preserve one dominant collection and two supporting collections.
- Keep current images, titles, descriptions, and URL filter destinations.
- Reduce container borders and use surface contrast plus spacing to separate entries.
- Keep image and copy as distinct readable regions.
- Use one consistent interaction: image scale and CTA underline shift on hover, plus a subtle pressed transform.
- Mobile stacks the three collections in one column with a stable 4:3 image area.

### Popular products

- Preserve URL-driven `category` and `query` filtering, result count, reset action, and empty state.
- Keep product cards visually light, with no enclosing border or shadow.
- Desktop uses four columns; tablet uses two columns.
- Mobile uses two columns at 390 pixels and above, and one column below 390 pixels when copy or touch targets would become cramped.
- Keep product name, category, tag, and price in a stable order.
- Add a visible `Tư vấn tại cửa hàng` link to `/#locations` so the destination is not hidden behind the image alone.
- Do not invent product-detail routes. Product consultation actions continue to use the existing location destination.
- Reserve media aspect ratio before remote images load. Image failure must retain a neutral surface and readable product information.

### Clinical story

- Preserve the doctor image, current copy, three service steps, and `/bac-si` link.
- Keep the desktop split composition and collapse it to one column below tablet width.
- Remove unnecessary enclosing borders and let the image, service sequence, and spacing establish hierarchy.
- Retain numbered process markers because they communicate a real sequence, but style them as functional steps rather than decorative section numbering.

### Appointment area

- Preserve field names, field order, option values, and local-only behavior.
- Keep labels above inputs and helper or error text below each field.
- Add client-side validation for required name, Vietnamese phone-number shape, and selected need.
- Do not clear entered values until the form reaches its local success state.
- Error messages identify the field and correction needed. Do not use `window.alert()`.
- The success state explicitly says that the request has been checked locally and still requires confirmation by phone. It must not claim that a server received the request.
- Include a visible telephone fallback using the existing store number.
- Maintain strong contrast for labels, placeholders, error messages, focus rings, and the submit button on navy.

### Reviews

- Preserve one dominant quote and two supporting quotes.
- Remove repeated card borders where spacing and typography already provide grouping.
- Keep quote bodies to three visual lines when practical at desktop sizes.
- Replace em-dash attribution separators with a line break or regular hyphen.
- Use one rating treatment in the section and avoid repeating stars on every quote when authorship and hierarchy are sufficient.

### Store section

- Preserve store name, address, opening hours, map URL, phone number, and booking action.
- Prioritize address, hours, and three actions with clear scan order.
- Reduce the large bordered-card appearance to one structured location block with sparse dividers.
- Stack actions vertically on mobile with at least 48-pixel targets.
- Replace visible en-dash time separators with regular hyphens.

### Footer

- Preserve the brand, current navigation, contact information, and copyright.
- Keep the navy footer as the final brand anchor.
- Replace uppercase micro-labels with sentence case.
- Use regular hyphens in opening-hour ranges.
- Do not add placeholder legal links. Privacy and terms links are deferred until real destinations and approved copy exist.

## Component Architecture

- `src/app/layout.tsx`: owns `next/font` configuration and exposes font variables to the application.
- `src/app/page.tsx`: remains a Server Component that reads URL search parameters, filters products, and composes the home-page sections.
- `src/components/marketing/storefront-header.tsx`: owns only mobile-menu state and the discrete hero-boundary state produced by `IntersectionObserver`.
- `src/components/marketing/editorial-hero.tsx`: owns active-slide, pause, failure, and reduced-motion behavior.
- `src/components/marketing/appointment-form.tsx`: owns field validation and local submission status.
- `src/components/marketing/storefront-footer.tsx`: remains presentational and uses existing destinations and contact information.
- `src/components/marketing/storefront-data.ts`: remains the source of truth for products, services, and locations.
- `src/lib/product-filter.ts`: remains the source of truth for product filtering.
- `src/app/globals.css`: owns shared tokens, home-page layout, responsive rules, component states, and reduced-motion fallbacks.

No new global state is required. Continuous animation values stay inside Framer Motion rather than React state.

## Data Flow

1. The server page reads `category` and `query` from the URL.
2. `filterProducts` returns the visible product set.
3. Static storefront data provides collections, proof points, services, reviews, products, and store information.
4. The header controls menu visibility and a discrete hero-boundary state from `IntersectionObserver`.
5. The hero cycles through local images without fetching data or changing the URL.
6. The appointment component validates local inputs, renders field-level errors, and shows a local-only confirmation state.
7. Existing links continue to drive navigation, filtering, maps, telephone calls, and anchor movement.

## States and Error Handling

### Navigation

- Closed, open, current-page, hover, pressed, and keyboard-focus states.
- Escape closes the mobile menu.
- Focus remains visible and does not move behind the fixed header.

### Hero

- Initial, playing, paused, reduced-motion, manual-navigation, and image-failure states.
- A failed inactive image is skipped.
- A failed active image moves to the next valid slide without showing an empty frame.

### Products

- Default, filtered, empty-filter, image-loading, and image-failure presentation.
- Empty results keep the existing reset action.

### Appointment form

- Idle, field-error, and local-success states.
- Submission is blocked until visible field errors are resolved.
- Success text does not imply server delivery or confirmed booking.
- The phone fallback remains available in every state.

## Accessibility

- Preserve semantic header, navigation, main, section, article, form, and footer landmarks.
- Preserve one H1 and a logical heading order.
- Add or preserve a skip-to-content link.
- Keep all interactive targets at least 44 by 44 pixels.
- Meet WCAG AA contrast for normal text and controls.
- Use visible `:focus-visible` treatment with sufficient offset.
- Use `aria-current="page"` for active navigation.
- Associate each form error with its input using `aria-describedby` and expose invalid fields with `aria-invalid`.
- Announce local appointment success with an appropriate live region.
- Respect `prefers-reduced-motion` for autoplay, crossfades, image scaling, and smooth scrolling.
- Keep meaningful alt text focused on the image content. Do not use em-dashes in alt text.

## Performance

- Keep the first hero image prioritized and reserve its dimensions.
- Lazy-load below-the-fold product and collection imagery.
- Avoid continuous window scroll listeners.
- Animate only transforms and opacity.
- Do not add new runtime libraries.
- Keep CLS below `0.1` by reserving media dimensions and avoiding layout-changing font fallbacks.
- Target LCP below `2.5s` and INP below `200ms` on a representative mobile profile.

## Testing Strategy

### Automated tests

- Preserve all existing tests before implementation.
- Add failing tests before each behavior change.
- Test header open, close, Escape, current-page state, and menu navigation.
- Test hero manual navigation, pause and resume, image failure, and reduced-motion behavior.
- Test appointment field validation, accessible error associations, local success, and phone fallback.
- Test home-page copy, anchors, trust proof, filter results, empty products, and consultation destinations.
- Run the full Vitest suite and TypeScript type-check.
- Run the Next.js production build.

### Responsive and visual QA

- Validate at 1440 by 900, 1024 by 768, 768 by 1024, 414 by 896, 390 by 844, and 375 by 667.
- Confirm the hero message and both CTAs appear within or very near the first viewport on mobile.
- Confirm eyewear remains visible in every hero crop.
- Confirm trust proof forms a two-by-two grid on mobile.
- Confirm product columns switch without clipped labels or horizontal overflow.
- Exercise filters, empty results, hero controls, mobile navigation, form errors, local success, map links, and telephone links.
- Validate keyboard-only navigation and reduced-motion mode.
- Inspect both remote-image success and failure presentation.

## Acceptance Criteria

- The page still reads unmistakably as the approved Lensora editorial-clinical brand.
- Routes, primary navigation labels, anchors, logo treatment, form fields, and URL filters remain stable.
- The mobile hero no longer consumes roughly one and a half viewports before completing its message.
- All four trust signals are visible on mobile without horizontal scrolling.
- Typography uses the approved font pairing consistently.
- Sections use spacing and hierarchy rather than repeated card borders.
- Product consultation actions are visible and understandable.
- Header interaction does not depend on a continuous scroll listener.
- The appointment form provides field-level errors and honest local-only success feedback.
- Visible copy contains no em-dash or en-dash characters.
- Interactive elements have hover, pressed, and focus-visible feedback.
- Reduced-motion behavior, image failures, filtered products, empty results, and form errors have complete states.
- There is no page-level horizontal overflow at the validated viewports.
- All tests, type-check, production build, and responsive visual QA pass.
