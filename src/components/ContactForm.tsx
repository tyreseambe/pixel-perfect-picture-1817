import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { sendContact } from '@/lib/store.functions';
import { Button } from './ui/button';
export function ContactForm() {
  const send = useServerFn(sendContact); const [busy,setBusy] = useState(false); const [error,setError] = useState(''); const [done,setDone] = useState(false);
  if(done) return <p role="status">Your message has been received. Thank you.</p>;
  return <form className="max-w-xl space-y-5" onSubmit={async e => {e.preventDefault();setBusy(true);setError('');const f = new FormData(e.currentTarget);try{await send({data:{name:String(f.get('name')),email:String(f.get('email')),subject:String(f.get('subject')),message:String(f.get('message'))}});setDone(true);}catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}}}>
  {[['name','Name'],['email','Email address'],['subject','Subject']].map(([name,label]) => <label key={name} className="block">{label}<input aria-label={label} name={name} required type={name==='email'?'email':'text'} maxLength={name==='email'?255:100} className="mt-2 h-12 w-full border border-input px-4" /></label>)}<label className="block">Message<textarea aria-label="Message" name="message" required minLength={10} maxLength={5000} rows={6} className="mt-2 w-full border border-input p-4" /></label><Button disabled={busy}>{busy?'Sending…':'Send message'}</Button>{error&&<p role="alert" className="text-destructive">{error}</p>}</form>;
}
