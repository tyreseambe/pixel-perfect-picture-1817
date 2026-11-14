import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { newsletterSchema, contactSchema, addressSchema, integrationSchema } from './store-schemas';

export const subscribeNewsletter = createServerFn({ method: 'POST' }).inputValidator(newsletterSchema).handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('newsletter_subscribers').upsert({ email: data.email }, { onConflict: 'email', ignoreDuplicates: true });
  if (error) throw new Error('Your subscription could not be saved. Please try again.');
  return { saved: true };
});
export const sendContact = createServerFn({ method: 'POST' }).inputValidator(contactSchema).handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('support_messages').insert(data);
  if (error) throw new Error('Your message could not be saved. Please try again.');
  return { saved: true };
});
export const getAccount = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const [settings, addresses, orders, role] = await Promise.all([
    context.supabase.from('customer_settings').select('*').eq('user_id', context.userId).maybeSingle(),
    context.supabase.from('addresses').select('*').eq('user_id', context.userId).order('created_at', { ascending: false }),
    context.supabase.from('orders').select('*').eq('user_id', context.userId).order('created_at', { ascending: false }),
    context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' }),
  ]);
  for (const result of [settings, addresses, orders, role]) if (result.error) throw new Error('Your account could not be loaded.');
  return { settings: settings.data, addresses: addresses.data ?? [], orders: orders.data ?? [], admin: role.data === true };
});
export const saveAccount = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(z.object({ display_name: z.string().trim().max(100), newsletter: z.boolean() })).handler(async ({ context, data }) => {
  const { error } = await context.supabase.from('customer_settings').upsert({ ...data, user_id: context.userId });
  if (error) throw new Error('Your preferences could not be saved.');
  return { saved: true };
});
export const saveAddress = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(addressSchema).handler(async ({ context, data }) => {
  const { error } = await context.supabase.from('addresses').insert({ ...data, user_id: context.userId });
  if (error) throw new Error('Your address could not be saved.');
  return { saved: true };
});
export const deleteAddress = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(z.object({ id: z.string().uuid() })).handler(async ({ context, data }) => {
  const { error } = await context.supabase.from('addresses').delete().eq('id', data.id).eq('user_id', context.userId);
  if (error) throw new Error('Your address could not be removed.');
  return { saved: true };
});
export const getAdmin = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error || !allowed) throw new Error('Administrator access is required.');
  const [products, orders, messages, settings, subscribers] = await Promise.all([
    context.supabase.from('catalog_products').select('*').order('name').limit(100),
    context.supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(100),
    context.supabase.from('support_messages').select('*').order('created_at', { ascending: false }).limit(100),
    context.supabase.from('store_settings').select('*'),
    context.supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
  ]);
  for (const result of [products, orders, messages, settings, subscribers]) if (result.error) throw new Error('Store management could not be loaded.');
  return { products: products.data ?? [], orders: orders.data ?? [], messages: messages.data ?? [], settings: settings.data ?? [], subscribers: subscribers.count ?? 0 };
});
export const saveIntegration = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(integrationSchema).handler(async ({ context, data }) => {
  const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (!allowed) throw new Error('Administrator access is required.');
  const { error } = await context.supabase.from('store_settings').upsert({ key: data.key, value: data.value });
  if (error) throw new Error('Integration preferences could not be saved.');
  return { saved: true, connected: false };
});
export const resolveMessage = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(z.object({ id: z.string().uuid(), status: z.enum(['new', 'resolved']) })).handler(async ({ context, data }) => {
  const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (!allowed) throw new Error('Administrator access is required.');
  const { error } = await context.supabase.from('support_messages').update({ status: data.status }).eq('id', data.id);
  if (error) throw new Error('Message status could not be saved.');
  return { saved: true };
});
