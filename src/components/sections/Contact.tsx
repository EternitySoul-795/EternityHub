"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { InstagramLogo, LinkedinLogo, EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

const SOCIAL_ICONS: Record<string, typeof InstagramLogo> = {
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
  Email: EnvelopeSimple,
};

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] py-32 md:py-52">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 900, height: 900, background: "radial-gradient(circle, rgba(217,4,41,0.1) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[760px] px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.availableForWork && (
            <span className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c74]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-[#d90429]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d90429]" />
              </span>
              Available for Work
            </span>
          )}

          <h2 className="font-sans text-[clamp(2.2rem,6.5vw,5rem)] font-semibold leading-[0.9] tracking-tighter text-white">
            Let&rsquo;s build something
            <br />
            remarkable.
          </h2>

          <p className="mx-auto mt-6 max-w-[46ch] font-sans text-base leading-relaxed text-white/45">
            Got a project, a collab idea, or just want to talk design and code? My inbox is open.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 flex max-w-[480px] flex-col gap-3 text-left"
        >
          <Input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-white/30"
          />
          <Input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-white/30"
          />
          <Textarea
            required
            placeholder="What are you building?"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="rounded-xl border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30"
          />

          <Button
            type="submit"
            data-magnetic
            disabled={status === "sending"}
            className="mt-2 h-12 gap-2 self-center rounded-full px-8 text-sm font-semibold"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent — talk soon" : "Send Message"}
            {status !== "sending" && <PaperPlaneTilt size={15} weight="fill" />}
          </Button>

          {status === "error" && (
            <p className="text-center font-mono text-xs text-[#ff5c74]">
              Something went wrong &mdash; email me directly at{" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
              .
            </p>
          )}
        </motion.form>

        <div className="mt-10 flex items-center justify-center gap-4">
          {SITE.socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.label] ?? EnvelopeSimple;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-magnetic
                data-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-200 hover:border-[#d90429]/40 hover:text-white"
                aria-label={s.label}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
