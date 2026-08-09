"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

  /** Never lose a message: hand the visitor a prefilled mail draft instead. */
  const openMailFallback = () => {
    const { name, email, subject, message } = getValues();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject?.trim() || `Portfolio enquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (values: ContactInput) => {
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
        toast.error(data.error ?? "Couldn't send from here", {
          description: "Opening your email app instead.",
          action: { label: "Open mail", onClick: openMailFallback },
        });
        return;
      }

      toast.error(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      toast.error("Network error", {
        description: "Check your connection, or email me directly.",
        action: { label: "Open mail", onClick: openMailFallback },
      });
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

      <Button type="submit" size="lg" disabled={isSubmitting} className={cn("mt-1 w-full sm:w-auto")}>
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
