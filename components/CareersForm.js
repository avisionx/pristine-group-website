"use client";

import { useState } from "react";
import { Field, SubmitButton, FormStatus, Honeypot } from "./FormControls";
import { FORMS, buildFormUrl } from "@/lib/site";

export default function CareersForm({ dict }) {
  const t = dict.form;
  const designations = dict.designations ?? [];
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot tripped

    const values = {
      name: data.get("name")?.trim(),
      email: data.get("email")?.trim(),
      contact: data.get("contact")?.trim(),
      designation: data.get("designation")?.trim(),
      employer: data.get("employer")?.trim(),
      linkedin: data.get("linkedin")?.trim(),
      resume: data.get("resume")?.trim(),
    };
    if (!values.name || !values.email || !values.contact || !values.designation) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    await fetch(buildFormUrl(FORMS.careers, values), { mode: "no-cors" }).catch(() => {});
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
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
          required
          placeholder={t.contactPlaceholder}
          autoComplete="tel"
        />
        <Field
          label={t.designation}
          name="designation"
          required
          list="designation-options"
          placeholder={t.designationPlaceholder}
        />
        <datalist id="designation-options">
          {designations.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
        <Field label={t.employer} name="employer" placeholder={t.employerPlaceholder} />
        <Field label={t.linkedin} name="linkedin" placeholder={t.linkedinPlaceholder} />
      </div>
      <Field label={t.resume} name="resume" placeholder={t.resumePlaceholder} />
      <div className="flex flex-wrap items-center gap-5 pt-1">
        <SubmitButton status={status}>{t.submit}</SubmitButton>
        <FormStatus status={status} successText={t.success} errorText={t.required} />
      </div>
    </form>
  );
}
