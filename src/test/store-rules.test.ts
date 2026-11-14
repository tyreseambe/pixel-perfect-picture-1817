import { describe, expect, it } from 'vitest';
import { products, searchProducts, filterBySection } from '@/lib/products';
import { integrationSchema, newsletterSchema } from '@/lib/store-schemas';
describe('Store preparation rules', () => {
  it('removes every sample product from all catalog surfaces', () => {
    expect(products).toEqual([]);
    for (const section of ['men','women','new','essentials','sale','collections']) expect(filterBySection(section)).toEqual([]);
    expect(searchProducts('hoodie')).toEqual([]);
  });
  it('does not allow Printful activation during preparation', () => {
    expect(integrationSchema.safeParse({ key: 'printful', value: { storeId: '', guildId: '', channelId: '', announcements: false, orderAlerts: false, enabled: true } }).success).toBe(false);
  });
  it('does not allow Discord activation during preparation', () => {
    expect(integrationSchema.safeParse({ key: 'discord', value: { storeId: '', guildId: '', channelId: '', announcements: true, orderAlerts: false, enabled: true } }).success).toBe(false);
  });
  it('requires affirmative newsletter consent', () => {
    expect(newsletterSchema.safeParse({ email: 'customer@example.com', consent: false }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: 'customer@example.com', consent: true }).success).toBe(true);
  });
});