import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useAuth } from '@/lib/auth';
import { getAdmin, saveIntegration, resolveMessage } from '@/lib/store.functions';
import { integrationSchema } from '@/lib/store-schemas';
import { InfoPage } from './InfoPage';
import { Button } from './ui/button';
export function AdminPanel() {
  const { user, ready } = useAuth(); const load = useServerFn(getAdmin); const save = useServerFn(saveIntegration); const resolve = useServerFn(resolveMessage); const client = useQueryClient();
  const query = useQuery({ queryKey: ['admin', user?.id], queryFn: () => load(), enabled: !!user, retry: false });
  const [tab, setTab] = useState('Overview'); const [status, setStatus] = useState(''); const [busy, setBusy] = useState(false);
  if (!ready) return <InfoPage title="Store management"><p>Loading…</p></InfoPage>;
  if (!user) return <InfoPage title="Store management" intro="Sign in with an administrator account."><Button asChild><Link to="/login">Sign In</Link></Button></InfoPage>;
  if (query.error) return <InfoPage title="Store management" intro={query.error.message}><Button asChild variant="outline"><Link to="/account">My account</Link></Button></InfoPage>;
  if (!query.data) return <InfoPage title="Store management"><p>Loading…</p></InfoPage>;
  const data = query.data;
  return <div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-4xl font-medium">Store management</h1><div className="my-8 flex flex-wrap gap-2">{['Overview','Products','Orders','Messages','Integrations'].map(t => <Button key={t} variant={tab === t ? 'default' : 'outline'} onClick={() => { setTab(t); setStatus(''); }}>{t}</Button>)}</div>
    {tab === 'Overview' && <div className="grid gap-8 sm:grid-cols-3">{[['Products',data.products.length],['Recent orders',data.orders.length],['Newsletter subscribers',data.subscribers]].map(([label,value]) => <div key={label} className="border-t border-border py-5"><p className="text-muted-foreground">{label}</p><p className="mt-3 text-4xl">{value}</p></div>)}<p className="sm:col-span-3">Store payments and fulfillment are not active.</p></div>}
    {tab === 'Products' && <><h2 className="text-2xl">Products</h2><p className="mt-4 text-muted-foreground">{data.products.length ? `${data.products.length} product records.` : 'No products imported.'}</p><Button variant="outline" className="mt-5" onClick={() => setTab('Integrations')}>Printful setup</Button>{data.products.map(p => <p key={p.id} className="mt-4">{p.name} · {p.published ? 'Published' : 'Draft'}</p>)}</>}
    {tab === 'Orders' && <><h2 className="text-2xl">Orders</h2>{!data.orders.length && <p className="mt-4 text-muted-foreground">No orders yet.</p>}{data.orders.map(o => <details key={o.id} className="border-b border-border py-4"><summary>{o.id.slice(0,8)} · {o.total} {o.currency} · {o.payment_status}</summary><p>{o.email}</p><p>{o.fulfillment_status}</p></details>)}</>}
    {tab === 'Messages' && <><h2 className="text-2xl">Customer messages</h2>{!data.messages.length && <p className="mt-4 text-muted-foreground">No messages yet.</p>}{data.messages.map(m => <article key={m.id} className="border-b border-border py-6"><h3 className="font-medium">{m.subject}</h3><p className="text-sm text-muted-foreground">{m.name} · {m.email} · {m.status}</p><p className="my-4 whitespace-pre-wrap break-words">{m.message}</p><Button disabled={busy} variant="outline" onClick={async () => { setBusy(true); try {await resolve({ data: { id: m.id, status: m.status === 'resolved' ? 'new' : 'resolved' } }); await client.invalidateQueries({ queryKey: ['admin'] });} catch(e) {setStatus(e instanceof Error ? e.message : 'Could not update.');} finally {setBusy(false);} }}>{m.status === 'resolved' ? 'Reopen' : 'Mark resolved'}</Button></article>)}</>}
    {tab === 'Integrations' && <div className="grid gap-12 md:grid-cols-2">{(['printful','discord'] as const).map(key => {
      const saved = integrationSchema.shape.value.safeParse(data.settings.find(s => s.key === key)?.value);
      const v = saved.success ? saved.data : { storeId: '', guildId: '', channelId: '', announcements: false, orderAlerts: false, enabled: false };
      return <section key={key} className="border-t border-border pt-6"><h2 className="text-2xl">{key === 'printful' ? 'Printful' : 'Discord bot'}</h2><p className="mt-2 text-sm text-muted-foreground">Not connected · Preparation only</p><form className="mt-6 space-y-4" onSubmit={async e => {e.preventDefault(); setStatus(''); setBusy(true); const f = new FormData(e.currentTarget); try {await save({ data: {key, value: { storeId: String(f.get('storeId') ?? ''), guildId: String(f.get('guildId') ?? ''), channelId: String(f.get('channelId') ?? ''), announcements: f.get('announcements') === 'on', orderAlerts: f.get('orderAlerts') === 'on', enabled: false } } }); await client.invalidateQueries({ queryKey: ['admin'] }); setStatus('Preferences saved. Nothing has been connected.');} catch(e) {setStatus(e instanceof Error ? e.message : 'Could not save.');} finally {setBusy(false);} }}>
      {(key === 'printful' ? [['storeId','Printful store ID',v.storeId]] : [['guildId','Discord server ID',v.guildId],['channelId','Discord channel ID',v.channelId]]).map(([name,label,value]) => <label key={name} className="block">{label} (optional)<input name={name} aria-label={label} inputMode="numeric" pattern="[0-9]*" maxLength={40} defaultValue={value} className="mt-2 h-12 w-full border border-input px-4" /></label>)}
      {key === 'discord' && <><label className="flex gap-3"><input name="announcements" type="checkbox" defaultChecked={v.announcements} />Collection announcements</label><label className="flex gap-3"><input name="orderAlerts" type="checkbox" defaultChecked={v.orderAlerts} />Private order alerts</label></>}
      <Button disabled={busy}>Save preparation</Button><Button disabled variant="outline" className="ml-2">{key === 'printful' ? 'Import products' : 'Connect bot'}</Button></form></section>;
    })}</div>}{status && <p role="status" className="mt-6">{status}</p>}
  </div>;
}
