# Printful and Discord activation checklist

Both services are deliberately inactive. Preparation settings save identifiers and future notification preferences only. No API keys are requested, no bot is provisioned, and no provider calls run.

## Printful
1. Connect a Printful account securely after the owner requests activation.
2. Implement an admin-authorized, paginated sync adapter for Printful store sync products and their sync variants. Confirm the current API and granted scopes before implementation.
3. Map provider IDs, variant sizes/colors, EUR retail prices, availability and real images into catalog drafts. Keep provider IDs as strings.
4. Review and publish real products. Wire all storefront catalog reads to published records; never restore examples as a fallback.
5. Add server-priced checkout with a configured payment provider. Paid-order verification must precede any Printful fulfillment request; use idempotent provider references.
6. Verify signed provider callbacks, shipping estimates, taxes, cancellations, refunds and fulfillment updates before accepting orders.

## Discord
1. Ask which future bot actions should be enabled when activation is requested; saved preferences are not authorization to send messages.
2. Link the Discord connection securely, invite the bot to the chosen server, and verify channel permissions.
3. Keep customer details out of public announcements. Confirm any private order notification destination explicitly.
4. Add server-side messaging and signed interaction verification only after activation.

## Launch prerequisites
Real products, payment provider, shipping/tax policies, business/legal contact details and a designated administrator are still required. Newsletter consent is stored, but no marketing campaigns are sent. Traffic and conversion figures must come from real analytics, not invented values.