import { useState } from "react";
import { z } from "zod";
const email = z.string().trim().email().max(255);
export function Newsletter() {
  const [v, setV] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const [err, setErr] = useState("");
  return (
    <section className="bg-muted px-5 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="headline text-4xl md:text-5xl">Join the VALE community.</h2>
        <p className="mt-4 text-muted-foreground">First word on new collections. No spam, unsubscribe anytime.</p>
        {state === "done" ? (
          <p className="mt-8 font-medium" role="status">Thanks — you're on the list.</p>
        ) : (
          <form noValidate className="mt-8 space-y-4 text-left" onSubmit={(e) => {
            e.preventDefault();
            if (!email.safeParse(v).success) { setErr("Please enter a valid email address."); setState("error"); return; }
            if (!consent) { setErr("Please confirm you'd like to receive emails."); setState("error"); return; }
            setState("done");
          }}>
            <div className="flex gap-2">
              <input type="email" value={v} onChange={(e) => setV(e.target.value)} placeholder="Email address" aria-label="Email address" className="h-12 flex-1 rounded-full border border-input bg-background px-5 outline-none focus:border-foreground" />
              <button className="pill bg-primary text-primary-foreground">Sign up</button>
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-current" />
              I agree to receive marketing emails from VALE and accept the privacy policy.
            </label>
            {state === "error" && <p className="text-sm text-destructive" role="alert">{err}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
