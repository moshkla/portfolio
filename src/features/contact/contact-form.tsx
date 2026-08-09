"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, Check, Copy, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  /** Set when the message could not be delivered from the site. */
  const [failure, setFailure] = useState<string | null>(null);
  const [copied, setCopied] = useState<"email" | "message" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const composeBody = () => {
    const { name, email, message } = getValues();
    return `Name: ${name}\nEmail: ${email}\n\n${message}`;
  };

  const openMailDraft = () => {
    const { name, subject } = getValues();
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject?.trim() || `Portfolio enquiry from ${name}`
    )}&body=${encodeURIComponent(composeBody())}`;
  };

  const copy = async (what: "email" | "message") => {
    const text = what === "email" ? profile.email : composeBody();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Couldn't copy — please select the text manually.");
    }
  };

  const onSubmit = async (values: ContactInput) => {
    setFailure(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSent(true);
        reset();
        toast.success("Message sent", { description: "I'll get back to you shortly." });
        return;
      }

      const data = (await res.json().catch(() => null)) as
        | { error?: string; fallback?: boolean }
        | null;

      if (data?.fallback) {
        // Show a persistent panel rather than a toast: a toast auto-dismisses
        // after a few seconds and would take the only recovery route with it.
        setFailure(data.error ?? "This message couldn't be sent from the site.");
        return;
      }

      toast.error(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setFailure("Couldn't reach the server — you may be offline.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
          Subject <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <Input id="subject" placeholder="Flutter role, consulting, collaboration…" {...register("subject")} />
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about the project, the team and the timeline."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {/*
        Delivery fallback.
        Stays on screen until the visitor acts. `mailto:` silently does nothing
        on machines with no mail client configured, so the address is also shown
        as copyable text and WhatsApp is offered as a second route. The typed
        message is never cleared on failure.
      */}
      {failure && (
        <div
          role="alert"
          className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-5"
        >
          {/* amber-200 measures 1.19:1 on the light card — needs a dark
              counterpart per theme. amber-700 is 4.82:1 on light. */}
          <p className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-200">
            <AlertTriangle className="size-4 shrink-0" aria-hidden />
            {failure}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your message is still in the form below — nothing is lost. Send it directly instead:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={openMailDraft}>
              <Mail aria-hidden />
              Open in email app
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => copy("message")}>
              {copied === "message" ? <Check aria-hidden /> : <Copy aria-hidden />}
              {copied === "message" ? "Copied" : "Copy message"}
            </Button>
            <Button asChild variant="secondary" size="sm">
              <a href={profile.links.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-500/20 pt-4">
            <span className="text-xs text-muted-foreground">Or email me at</span>
            <code className="rounded-md bg-foreground/[0.06] px-2 py-1 text-xs text-foreground">
              {profile.email}
            </code>
            <button
              type="button"
              onClick={() => copy("email")}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {copied === "email" ? (
                <>
                  <Check className="size-3" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3" aria-hidden />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden />
            {sent ? "Send another" : "Send message"}
          </>
        )}
      </Button>

      <p aria-live="polite" className="sr-only">
        {sent ? "Your message was sent." : ""}
      </p>
    </form>
  );
}
