import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import '@lovable.dev/cloud-auth-js/styles.css';
import { Button } from '@/components/ui/button';
import { InfoPage } from './InfoPage';
import { useAuth } from '@/lib/auth';
export function AuthForm({ mode }: { mode: 'login' | 'register' | 'forgot' | 'reset' }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const navigate = useNavigate(); const { user } = useAuth();
  const title = { login: 'Sign In', register: 'Join VALE', forgot: 'Forgot password?', reset: 'New password' }[mode];
  const social = async (provider: 'google' | 'lovable') => {
    setError(''); setBusy(true);
    try { const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/account` }); if (result.error) throw result.error; if (!result.redirected) await navigate({ to: '/account' }); }
    catch (e) { setError(e instanceof Error ? e.message : 'Sign-in failed. Please try again.'); } finally { setBusy(false); }
  };
  return <InfoPage title={title}><div className="max-w-md">
    {user && mode !== 'reset' ? <><p>You are signed in.</p><Button asChild className="mt-4"><Link to="/account">My account</Link></Button></> : <>
      <form className="space-y-5" onSubmit={async e => {
        e.preventDefault(); setError(''); setMessage(''); setBusy(true);
        try {
          if (mode === 'login') { const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error; await navigate({ to: '/account' }); }
          if (mode === 'register') { const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/account` } }); if (error) throw error; setMessage('Check your email to confirm your account.'); }
          if (mode === 'forgot') { const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); if (error) throw error; setMessage('If this email has an account, a reset link has been sent.'); }
          if (mode === 'reset') { if (!user) throw new Error('Open the password reset link from your email first.'); const { error } = await supabase.auth.updateUser({ password }); if (error) throw error; setMessage('Your password has been updated.'); }
        } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); } finally { setBusy(false); }
      }}>
      {mode !== 'reset' && <label className="block">Email address<input aria-label="Email address" type="email" required maxLength={255} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4" /></label>}
      {mode !== 'forgot' && <label className="block">Password<input aria-label="Password" type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4" /></label>}
      {mode === 'register' && <label className="flex items-start gap-3 text-sm"><input type="checkbox" required className="mt-1" /> <span>I accept the <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.</span></label>}
      <Button type="submit" disabled={busy} className="h-12 w-full">{busy ? 'Please wait…' : { login: 'Sign In', register: 'Create account', forgot: 'Send reset link', reset: 'Save password' }[mode]}</Button>
      </form>
      {(mode === 'login' || mode === 'register') && <div className="mt-5 space-y-3">
        <Button variant="outline" disabled={busy} className="h-12 w-full" onClick={() => social('google')}><svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Continue with Google</Button>
        <Button disabled={busy} className="lovable-auth-button h-12 w-full" onClick={() => social('lovable')}>Continue with Lovable</Button>
        <div className="flex flex-wrap justify-between gap-3 text-sm"><Link to={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Create account' : 'Already a member? Sign in'}</Link><Link to="/forgot-password">Forgot password?</Link></div>
      </div>}
    </>}
    {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}{message && <p role="status" className="mt-4">{message}</p>}
  </div></InfoPage>;
}
