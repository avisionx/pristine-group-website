"use client";

import { useState } from "react";
import { Field, TextArea, SubmitButton, FormStatus, Honeypot } from "./FormControls";
import { FORMS, buildFormUrl } from "@/lib/site";

export default function ContactForm({ dict }) {
  const t = dict.form;
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot tripped — silently ignore

    const values = {
      name: data.get("name")?.trim(),
      email: data.get("email")?.trim(),
      contact: data.get("contact")?.trim(),
      message: data.get("message")?.trim(),
    };
    if (!values.name || !values.email || !values.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // no-cors: the submission is recorded; the opaque response can't be read.
    await fetch(buildFormUrl(FORMS.contact, values), { mode: "no-cors" }).catch(() => {});
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <Field label={t.name} name="name" required placeholder={t.namePlaceholder} autoComplete="name" />
      <Field
        label={t.email}
        name="email"
        type="email"
        required
        placeholder={t.emailPlaceholder}
        autoComplete="email"
      />
      <Field
        label={t.contact}
        name="contact"
        type="tel"
        placeholder={t.contactPlaceholder}
        autoComplete="tel"
      />
      <TextArea label={t.message} name="message" required placeholder={t.messagePlaceholder} />
      <div className="flex flex-wrap items-center gap-5 pt-1">
        <SubmitButton status={status}>{t.submit}</SubmitButton>
        <FormStatus status={status} successText={t.success} errorText={t.required} />
      </div>
    </form>
  );
}
