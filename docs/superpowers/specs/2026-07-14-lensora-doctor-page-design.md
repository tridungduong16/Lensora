# Lensora Doctor Page Design

## Goal

Add a dedicated `/bac-si` page to Lensora that preserves the biography, professional milestones, and real photographs from `/Users/tridungduong16/Documents/code_repo/kinhthuocanhthi`, while presenting them in Lensora's existing monochrome gallery-retail design system.

## Scope

- Add the `/bac-si` route and expose it in the shared desktop and mobile navigation.
- Present the approved doctor profile, three professional proof points, and all nine timeline milestones from the reference project.
- Use the real reference photographs, including copying the Hong Kong and 2012 National Ophthalmology Conference photographs that are not yet in Lensora.
- Keep the page static and local. Do not add an API, CMS, persistence, or a new booking flow.
- Preserve all unrelated home-page work already present in the dirty worktree.

## Information Architecture

The page contains two primary regions:

1. **Profile hero**
   - Doctor name: `Bác sĩ Nguyễn Anh Thi`.
   - Summary: eye specialist, Doctor Specialist II, Head of Department at Vinh Long Eye Hospital, with more than 30 years of experience.
   - A real doctor photograph on the right at desktop widths and below the copy on mobile.
   - Primary action links to the existing home-page eye-exam and appointment section at `/#eye-exam`.
   - Secondary action scrolls to `#hanh-trinh` on the doctor page.
   - A restrained proof strip shows `30+ năm kinh nghiệm`, `Bác sĩ CKII`, and `Thầy thuốc ưu tú`.

2. **Professional timeline**
   - Heading: `Hành trình chuyên môn của bác sĩ Nguyễn Anh Thi`.
   - Nine milestones are displayed newest first, matching the reference project's dates, titles, descriptions, and photographs.
   - Desktop uses a central rule with alternating left/right entries.
   - Tablet and mobile collapse to one readable column with the rule aligned to the left.

## Timeline Content and Assets

| Date | Milestone | Asset |
| --- | --- | --- |
| 10/03/2026 | Tham dự Giỗ tổ ngành Mắt kính lần thứ 32 | `doctor-gioto.jpg` |
| 27/02/2026 | Bằng khen Ngày Thầy thuốc Việt Nam 2026 | `doctor-bangkhen-thaythuoc.png` |
| 15/11/2025 | Hội nghị ngành Nhãn khoa Việt Nam (VIETCAN) | `doctor-danang.jpg` |
| 28/02/2025 | Nhận bằng khen của Chủ tịch UBND tỉnh Vĩnh Long | `doctor-award.png` |
| Công tác | Trưởng khoa Bệnh viện Mắt Vĩnh Long | `doctor-congtac.jpg` |
| 02/2018 | Hội nghị Nhãn khoa tại Hong Kong | `doctor-hong-kong.jpg` copied from `hoinghihongkong.jpg` |
| 01/06/2014 | Nhận bằng Bác sĩ chuyên khoa 2 — Đại học Y Dược TP.HCM | `doctor-graduation.jpg` |
| 20/10/2012 | Tham dự Hội nghị Nhãn khoa Toàn quốc | `doctor-national-conference-2012.jpg` copied from `hoinghinhankhoatoanquoc2012.jpg` |
| 1989–1995 | Tốt nghiệp Bác sĩ đa khoa YK15 — Đại học Y Dược Cần Thơ | `doctor-university.jpg` |

The hero uses `doctor-congtac.jpg`, with a stable portrait crop and a descriptive Vietnamese alternative text. Reusing it in the work-history milestone is intentional because it is the clearest individual portrait in the supplied assets.

## Visual System

The doctor page extends the approved Lensora home-page system rather than copying the reference page's blue palette and rounded cards.

| Element | Decision |
| --- | --- |
| Background | True white `#ffffff` |
| Primary text | `#222222` |
| Secondary text | `#727272` |
| Dividers and quiet surfaces | `#e6e6e6` and `#f5f5f5` |
| Shape | Square corners throughout |
| Elevation | No shadows, gradients, glows, or floating cards |
| Photography | Full-color real images, fixed aspect-ratio frames, `object-fit: cover` |
| Motion | Small color/opacity transitions only; reduced-motion safe |

The hero is editorial and spacious, with one dominant image rather than extra badges or decorative artwork. Timeline entries use open white space, rules, dates, and images instead of nested cards.

## Component and File Boundaries

- `frontend/src/app/bac-si/page.tsx`: metadata, static content, timeline data, and page composition as a server component.
- `frontend/src/app/bac-si/doctor-page.module.css`: doctor-page layout, timeline presentation, focus/hover states, and responsive rules.
- `frontend/src/components/marketing/storefront-header.tsx`: split six navigation items evenly around the logo while preserving the existing mobile menu behaviour.
- `frontend/src/components/marketing/storefront-navigation.ts`: own the six shared navigation items, including `Bác sĩ` at `/bac-si`.
- `frontend/src/components/marketing/storefront-footer.tsx`: own the existing footer markup so both routes render one consistent footer.
- `frontend/src/app/page.tsx`: consume the shared navigation and footer; no home content changes are required.
- `frontend/images/`: retain existing supplied images and add only the two missing reference photographs under descriptive names.

The doctor page reuses `StorefrontHeader`, the shared navigation data, and `StorefrontFooter` so its brand shell remains consistent with the home page. Repeated timeline markup is generated from one typed local data collection.

## Data Flow and Interactions

- All profile and timeline data is local, immutable source data rendered on the server.
- Navigation uses Next.js `Link` components.
- The profile CTA navigates to the existing home-page eye-exam section; the secondary CTA uses an in-page anchor.
- There is no client state on the doctor page. The only client-side state remains the shared mobile navigation menu.

## Failure and Accessibility Handling

- Static image imports make missing or invalid asset references fail during type/build validation instead of producing silent runtime placeholders.
- Every photograph receives meaningful Vietnamese alternative text based on its milestone.
- Heading order is one `h1`, followed by section `h2` and milestone `h3` elements.
- Timeline decoration is hidden from assistive technology; dates remain visible text within each article.
- Links retain the existing visible focus treatment and touch targets remain at least 44px on mobile.
- The layout must not horizontally overflow at 375px.

## Responsive Behaviour

- Desktop: two-column hero, three-column proof strip, alternating central timeline.
- Tablet: stacked hero and single-column timeline with a left-side rule.
- Mobile: 16px page gutters, full-width actions, compact typography, image-first timeline entries, and no clipped text or photography.

## Validation

- Add a component test proving the shared header renders the `/bac-si` link in desktop and mobile navigation.
- Add a doctor-page test covering the main heading, nine timeline entries, both CTAs, and meaningful images.
- Run the full Vitest suite, TypeScript validation, and the Next.js production build.
- Browser QA covers `/bac-si` on desktop and at 375px, mobile-menu navigation, the `#hanh-trinh` anchor, and the `/#eye-exam` CTA.
- Capture desktop and mobile screenshots and inspect image crops, hierarchy, typography, palette, spacing, timeline alignment, and overflow before handoff.

## Acceptance Criteria

- `/bac-si` renders successfully within the Lensora header and footer shell.
- The page contains the approved profile content, three proof points, nine chronological milestones, and all corresponding real images.
- The two missing reference photographs are copied into Lensora and load through static imports.
- Desktop and mobile navigation both expose `Bác sĩ`.
- The page remains faithful to Lensora's monochrome, square, shadow-free system and works without horizontal overflow.
- Tests, type-checking, build, and browser interaction checks pass.
