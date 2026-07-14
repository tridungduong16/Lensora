# Lensora Home UX Design

## Goal

Make the Lensora home page feel like a focused premium optical catalogue and make the three visible conversion paths usable: product discovery, mobile navigation, and appointment booking.

## Chosen Direction

Use the repository's existing gallery-retail direction rather than introduce a new brand style: true-white surfaces, near-black typography, sharp edges, restrained borders, and model/product photography as the primary visual signal. The current warm-gold styling and decorative English section labels will be removed where they dilute that direction.

## Experience Changes

- Product discovery: search and category navigation use URL query parameters to filter the existing product list. The product section reports the active result count and provides a reset action.
- Mobile navigation: the header keeps the logo and menu control visible at 375px. The menu opens an accessible navigation panel, closes after navigation, and exposes its state through `aria-expanded`.
- Booking: the appointment form remains local-only, validates native required fields, shows a confirmation after submission, and resets its fields so it never gives the impression that data was sent to an unavailable backend.
- Carousel: visible slide controls become keyboard-accessible buttons, autoplay respects reduced-motion preferences, and manual selection pauses no content.

## Information Architecture

The page remains a single landing route. Header search and category links set `query` and `category` on `/`, then jump to `#bestsellers`. The static page reads these search parameters on the server and renders only matching products. No API route, persistence layer, cart, checkout, or inventory claim will be added.

## Visual System

| Element | Decision |
| --- | --- |
| Background | `#ffffff` true white |
| Primary text/button | `#222222` |
| Secondary text | `#727272` |
| Divider / quiet surface | `#e6e6e6` / `#f5f5f5` |
| Shape | 0px radius throughout |
| Elevation | No shadows or gradients |
| Desktop grids | 3 collections, 4 products, 3 services/reviews, 2 locations |
| Tablet grids | 2 columns from 861px to 1100px |
| Mobile grids | 1 column at 860px and below |
| Controls | 44px minimum height, visible focus outline, 150–250ms color transitions |

## Component Boundaries

- `page.tsx`: product/query data, page composition, and static content.
- `storefront-header.tsx`: client-side mobile-menu state; receives navigation links and renders the search form.
- `appointment-form.tsx`: client-side success state after a local booking request.
- `hero-carousel.tsx`: image rotation and accessible slide selection.
- `globals.css`: responsive layout, visual tokens, focus states, and menu presentation.

## Validation

- Component tests cover menu state, booking confirmation, and selecting a carousel slide.
- Build and type-check must pass.
- Browser QA covers product filtering, mobile-menu interaction, local booking confirmation, desktop layout, and the standard mobile/tablet breakpoints with no horizontal overflow.

