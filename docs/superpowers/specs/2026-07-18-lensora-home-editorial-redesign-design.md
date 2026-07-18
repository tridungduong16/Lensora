# Lensora Home Editorial Redesign

## Goal

Redesign the full Lensora home page as a premium editorial eyewear experience that balances fashion imagery with Anh Thi's clinical credibility. The page must give the model and eyewear a clear visual role, keep copy concise, improve contrast and hierarchy, and preserve the existing discovery and appointment flows.

This document supersedes the visual direction in the 2026-07-12 home UX design while retaining its functional decisions for URL-driven product filtering, accessible mobile navigation, local-only appointment feedback, and the single-route storefront.

## Scope

- Redesign the header, hero, trust signals, collections, products, eye-exam story, appointment area, reviews, locations, and footer.
- Replace the current tabletop background video with the three local model images already in the repository.
- Keep existing product, review, service, store, navigation, filtering, and appointment data and behavior.
- Keep `/` as the home route and preserve the existing section anchors and internal destinations.

## Non-goals

- No backend, API route, account, cart, checkout, inventory, or persistence work.
- No new remote media dependency for the hero.
- No changes to product prices, store details, medical claims, or booking semantics.
- No unrelated refactor of subpages.

## Chosen Direction

Use an **editorial plus clinical** direction: warm ivory surfaces and deep navy brand color, generous typography, flat compositions, and people-led eyewear photography. The page should feel more like a premium optical journal than a catalogue template while keeping the eye-exam service prominent and credible.

The direction deliberately avoids the fashion-only severity of a black-and-white concept and the generic appearance of a purely clinical blue-and-white site.

## Design System

| Element | Decision |
| --- | --- |
| Page background | Warm ivory `#F3EFE7` |
| Primary brand color | Deep navy `#142A45` |
| Primary text | Charcoal `#20201E` |
| Quiet text | Muted warm gray with at least WCAG AA contrast |
| Light surface | White or a slightly lighter ivory used only for section separation |
| Shape | Predominantly square edges; only controls that need a compact pill treatment may use a full radius |
| Elevation | No gradients and no heavy shadows; hierarchy comes from color, scale, spacing, and borders |
| Display type | Large editorial headings with tight but readable leading |
| UI type | Clear sans-serif labels with restrained weight and strong focus states |
| Touch target | At least 44 by 44 pixels |
| Layout container | Consistent wide desktop container with responsive page gutters |

## Header

- Target height is approximately 76 pixels on desktop.
- The header starts transparent over the hero and gains an ivory translucent surface plus subtle backdrop blur when it is no longer visually supported by the hero.
- Reduce the current logo from 120 pixels to approximately 58–64 pixels.
- Keep the existing navigation destinations. Arrange the primary navigation with balanced spacing and give `Đặt lịch đo mắt` clear CTA treatment on desktop.
- Keep the accessible mobile menu behavior and expose the booking CTA inside the opened mobile panel.
- The header must not cover focus rings or anchored section headings.

## Hero

### Composition

- Use a full first-viewport composition, approximately `100svh` including the header.
- On desktop, use a 40/60 split: concise copy on the left and a model-led image field on the right.
- Keep all text outside the model's face and glasses. The eyewear remains the visual focal point.
- Use the three existing local model assets as an editorial carousel. Do not use the tabletop video.
- Crop each image with a protected eye-and-frame safe area. Desktop and mobile crops may differ.

### Copy

- Heading: `Nhìn rõ hơn.`
- Supporting copy: `Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm.`
- Primary CTA: `Đặt lịch đo mắt`
- Secondary CTA: `Xem bộ sưu tập` with a directional arrow icon.
- Do not add an eyebrow, kicker, promotional badge, or additional headline above the heading.

### Motion and controls

- Advance every 5–6 seconds with a crossfade and very light scale movement.
- Provide previous, next, and pause/play controls with accessible names and visible keyboard focus.
- Pause automatic advancement when the user requests reduced motion. In that mode, show the first image until the user explicitly changes it.
- Preload the first image. If a subsequent image is unavailable, retain the current visible image rather than exposing an empty frame.

## Trust Strip

Place a single strong proof strip immediately below the hero. Use four concise signals:

- `★★★★★ 4.9`
- `10.000+ khách hàng`
- `20 năm kinh nghiệm`
- `100+ thương hiệu`

On desktop the items form one horizontal row with clear separators. On narrow viewports they use horizontal scroll with snap, without hiding the first item or producing page-level overflow.

## Homepage Content Rhythm

### Featured collections

- Replace three equal cards with an asymmetric editorial composition: one dominant image and two secondary images.
- Keep collection titles, descriptions, and filter targets.
- Place text in dedicated readable zones rather than over important product detail.

### Popular products

- Keep URL query and category filtering and all current result, reset, and empty states.
- Use a spacious product grid with larger images, quiet dividers, and clear hierarchy for name, category, tag, and price.
- Product cards remain functional links to the current consultation destination; no product-detail route is invented.

### Clinical eye-exam story

- Add a split editorial section using an existing doctor or examination image on one side and the eye-exam proposition on the other.
- Present three concise stages of the current service process rather than a generic equal-card grid.
- Include a link to the existing `/bac-si` page to support the clinical credibility claim.
- Do not invent qualifications, certifications, or medical claims that are absent from the repository content.

### Appointment area

- Keep the existing local-only appointment form and its current confirmation behavior.
- Place it in a deep navy section with large, high-contrast fields and one unmistakable submit CTA.
- Keep native required-field behavior, labels, and the current success status. Do not imply server delivery or a confirmed appointment.

### Reviews

- Use one dominant testimonial and two supporting testimonials instead of three identical cards.
- Keep all current review copy and names. Use rating treatment sparingly so the section does not repeat the trust strip mechanically.

### Locations

- Keep current store information and map URLs.
- Make address, opening hours, directions, and booking actions easy to scan.
- Use a restrained two-location layout on desktop and a single column on mobile.

### Footer

- Finish the page with a deep navy footer containing the logo/brand, navigation, contact details, and current legal or utility information.
- Avoid decorative content that does not provide navigation or trust value.

## Responsive Behavior

- Desktop: maintain the 40/60 hero split and asymmetric collection layout.
- Tablet: preserve the editorial hierarchy while reducing display type and moving secondary content into two-column arrangements where space permits.
- Mobile: use a single content column. Show hero copy before the model image and keep the primary CTA visible without horizontal scrolling.
- Use a mobile-specific safe crop for every model image so eyes and frames remain visible.
- The trust strip may scroll horizontally with snap; the page itself must never overflow horizontally.
- Maintain at least 44-pixel controls, readable line lengths, and clear section spacing at 375 pixels.

## Component Architecture

- `src/app/page.tsx`: remains the Server Component that reads search parameters, filters products, owns static content, and composes the page sections.
- `src/components/marketing/editorial-hero.tsx`: a focused Client Component that owns only active-slide state, timing, manual controls, image readiness, and reduced-motion behavior.
- `src/components/marketing/storefront-header.tsx`: retains mobile menu state and navigation behavior; adds presentation and CTA treatment without changing link targets.
- `src/components/marketing/appointment-form.tsx`: preserves the existing local confirmation flow.
- Existing storefront data and product filtering modules remain the source of truth.
- `src/app/globals.css`: owns the visual tokens, editorial layout, responsive behavior, focus styles, and reduced-motion styling.

The existing `hero-background-video.tsx` and MP4 asset are no longer part of the rendered home page. Their removal from the repository is optional and should only occur if they are confirmed unused after implementation.

## Data Flow

1. The server page reads `query` and `category` from the URL.
2. `filterProducts` produces the visible product list and result state.
3. Static arrays provide collections, trust signals, reviews, services, and locations.
4. Only the header, editorial hero, and appointment form maintain browser state.
5. The hero updates its active local image; it does not fetch content or change the URL.
6. Appointment submission remains local and renders its existing status message.

## Failure and Edge Handling

- If a later hero image fails to become ready, keep the current image and allow the other valid controls to continue working.
- If reduced motion is enabled, disable automatic carousel progression and scale animation.
- If product filters return no results, preserve the existing empty state and reset action.
- If JavaScript is delayed, the first hero image, headline, CTAs, server-rendered catalogue, and store content must remain readable.
- Remote catalogue imagery failures must not collapse card dimensions or page layout.

## Accessibility

- Preserve semantic landmark and heading order.
- Use meaningful image alt text for content images; decorative transition layers remain hidden from assistive technology.
- Carousel controls expose their action and current state. Pause/play state is announced through its accessible label.
- Ensure WCAG AA contrast for body copy, buttons, navigation, form labels, and focus indicators.
- Keep visible focus styling and full keyboard operation for navigation, carousel, filter links, form, map links, and CTAs.
- Motion must respect `prefers-reduced-motion`.

## Validation

### Automated

- Update home-page tests for the new heading, supporting copy, CTA labels, links, and four trust signals.
- Add hero component tests for manual slide selection, pause/play state, and reduced-motion-safe behavior.
- Preserve header, navigation, product filter, and appointment form tests.
- Run the full test suite, TypeScript type-check, and production build.

### Browser QA

- Verify at desktop, tablet, and mobile viewports, including at least 1440 by 900 and 375 by 812.
- Exercise the carousel controls, pause/play, mobile navigation, URL-driven product filters, empty product state, and appointment confirmation.
- Confirm there is no page-level horizontal overflow, clipped primary copy, obscured eyewear, or accidental text wrapping.
- Compare the final render against the accepted concept for copy, hierarchy, palette, typography, spacing, image crop, section order, controls, and responsive behavior.

## Acceptance Criteria

- The current tabletop video is not rendered on the home page.
- Hero copy never overlaps a model's face or glasses at validated viewports.
- The first viewport communicates one headline, one supporting sentence, and two CTAs without competing headlines.
- All four trust signals are prominent and readable.
- Every existing home-page section is visually aligned with the editorial-clinical system.
- Existing navigation, filtering, appointment, store, and doctor-page destinations continue to work.
- Tests, type-check, production build, and desktop/mobile visual QA pass.
