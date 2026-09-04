# Bhairava Enterprises website audit

Audit date: 4 September 2026

## Verified source material retained

- Business name: Bhairava Enterprises.
- Bangalore address shown consistently in the existing site: #95, 6th Cross, Sri Vinayakanagara, Thigalarpalya, Bangalore 560058.
- Phone and WhatsApp: +91 87469 93767.
- Email: info@bhairavaent.com.
- Service categories already established by the owner: hydraulic systems, electrical panels and service, industrial pipeline work, and industrial material trading.
- The root-level project gallery JPEGs are treated as owner-supplied photographs. Their captions describe only visible features, not client names, performance, certification, or project outcomes.

## Confirmed problems

1. The full `node_modules` directory (more than 1,300 files) is committed to source control; no `.gitignore` exists.
2. Ten files use `.png` names but contain JPEG data.
3. `power-pack-ac.png` and `power-pack-single-face.png` are byte-for-byte duplicates.
4. `control-panel-plc.png`, `control-panel-vfd.png`, and `control-panel-relay.png` are byte-for-byte duplicates despite representing different products.
5. The electrical and pipeline service imagery therefore cannot be trusted as a product-to-photo mapping.
6. The term “Single-Face AC Power Pack” is incorrect; it must be “Single-Phase AC Power Pack.”
7. Detailed pressure, flow, voltage, material, stock, standards, response-time, cleanliness and test claims appear without owner-supplied evidence.
8. Marketing text includes unsupported claims such as “leading,” “authorised,” “24/7,” “ISO & CE,” “zero downtime,” “certified,” “300+ bar,” and “NAS 6.”
9. Canonical, Open Graph, Twitter and structured-data coverage is incomplete and inconsistent; `www` and non-`www` URLs are mixed.
10. The sitemap and robots files are absent from the repository.
11. The public Web3Forms access key is repeated in HTML. Although Web3Forms keys are client-side identifiers, the current forms lack a bot trap and origin restrictions cannot be verified from source.
12. The mobile drawer and enquiry modal do not fully contain keyboard focus, and background content is not made inert while overlays are open.
13. Navigation is inconsistent: Gallery is missing from most page menus.
14. Two thank-you pages duplicate the same content.
15. Obsolete TODO comments and build-only logo conversion scripts remain in production source.

## Uncertain claims removed or reduced

- Exact component specifications and standards in the trading catalogue.
- Stock-status and popularity badges.
- Exact hydraulic pressure, motor-power, tank-capacity, filtration and test ratings.
- ISO/CE compliance, certified supply, emergency availability and “zero downtime.”
- “Authorised supplier,” “leading firm,” and similar status claims.
- Any suggestion that a generic or duplicated asset is a photograph of a specific product.

## Missing genuine assets

- PLC/control-panel project photograph.
- VFD/drive-panel project photograph.
- Relay-control-panel project photograph.
- Hydraulic pipeline installation photograph.
- Chiller pipeline installation photograph.
- Process-water pipeline installation photograph.
- A verified photograph specifically showing a single-phase AC hydraulic power pack.

Until the owner supplies these, the affected sections use branded, neutral SVG category illustrations that cannot be mistaken for project photography.

## Implemented change plan

- Correct terminology and rewrite unsupported copy at category level.
- Replace untrustworthy service-card photos with neutral labelled illustrations.
- Rename real JPEG payloads with `.jpg` extensions and remove unused duplicates.
- Standardise metadata, canonical URLs, social cards and LocalBusiness/Organization data.
- Add `robots.txt`, `sitemap.xml`, `.gitignore`, a security policy, and an owner-verification checklist.
- Improve navigation consistency, focus handling, modal semantics, form validation, bot protection, responsive behaviour and reduced-motion support.
- Run local link, asset, HTML-structure, JSON-LD, form and responsive rendering checks.
