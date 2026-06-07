"use client";

import clsx from "clsx";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const baseField =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/45 transition-colors focus:border-brand-blue focus:outline-none";

export function Field({ label, name, required, help, list, type = "text", ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </label>
      <input id={name} name={name} type={type} list={list} required={required} className={baseField} {...props} />
      {help ? <p className="mt-1.5 text-xs text-ink-soft">{help}</p> : null}
    </div>
  );
}

export function TextArea({ label, name, required, rows = 6, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </label>
      <textarea id={name} name={name} rows={rows} required={required} className={clsx(baseField, "resize-none")} {...props} />
    </div>
  );
}

export function SubmitButton({ children, status }) {
  const sending = status === "sending";
  const sent = status === "success";
  return (
    <button
      type="submit"
      disabled={sending}
      className="group bg-gradient-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-lift)] disabled:opacity-70"
    >
      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? <Check className="h-4 w-4" /> : null}
      {children}
      {!sending && !sent ? (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      ) : null}
    </button>
  );
}

export function FormStatus({ status, successText, errorText }) {
  if (status === "success") {
    return <p className="text-sm font-medium text-brand-blue">{successText}</p>;
  }
  if (status === "error") {
    return <p className="text-sm font-medium text-brand-red">{errorText}</p>;
  }
  return null;
}

// Honeypot: hidden from humans, tempting to bots. If filled, we silently drop.
export function Honeypot({ name = "company" }) {
  return (
    <div className="absolute left-[-9999px]" aria-hidden>
      <label htmlFor={name}>Company</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
