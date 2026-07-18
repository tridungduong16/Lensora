# Lensora Header Logo Image Design

## Goal

Replace the centered `ANH THI / EYEGLASSES` text treatment in the storefront header with the supplied circular Anh Thi logo image while preserving the current navigation structure, header height, and accessibility behavior.

## Decision

Use the complete transparent circular logo from `frontend/logo.jpg`. The file is PNG image data with alpha despite its `.jpg` filename, so it can render directly over the existing ivory header without a background box.

The rendered logo will be 58 by 58 pixels on desktop and 48 by 48 pixels at header breakpoints up to 1100 pixels. The existing brand link remains centered in the navigation grid and retains its minimum 44-pixel interactive target.

## Component Contract

- `StorefrontHeader` imports the supplied image as a static Next.js image asset.
- The existing home link and accessible name `Trang chủ Kính thuốc Anh Thi` remain unchanged.
- The image is decorative inside the already named link, so it uses an empty alternative text value.
- The text-only `.brand-name` and `.brand-descriptor` elements are removed from the header only.
- Footer branding remains unchanged.

## Styling

- Keep the existing `.brand` centering, focus behavior, and 44-pixel minimum target.
- Add a `.brand-logo` rule with fixed square dimensions, `object-fit: contain`, and no shadow, border, radius, or background.
- Apply the 48-pixel size in the existing `max-width: 1100px` header breakpoint.
- Do not change the 76-pixel desktop or 72-pixel mobile header heights.

## Verification

- Component test verifies the centered brand link contains the logo image and no longer renders the text wordmark.
- Existing header interaction and accessibility tests must remain green.
- TypeScript and production build must pass.
- Rendered desktop and mobile QA verifies that the logo is centered, uncropped, and does not wrap or displace navigation.
