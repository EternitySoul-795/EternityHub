import type { NextRequest } from "next/server";
import OpenAI from "openai";
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import { SERVICES } from "@/data/services";
import { TIMELINE } from "@/data/timeline";

export const runtime = "nodejs";

/** Builds the system prompt from the same data that drives the site, so the assistant can't drift from reality. */
function buildSystemPrompt() {
  const projects = PROJECTS.map(
    (p) => `- ${p.title} (${p.subtitle}, ${p.status}): ${p.description} Tech: ${p.tags.join(", ")}. Live: ${p.href}`
  ).join("\n");

  const skills = SKILL_CATEGORIES.map(
    (c) => `${c.label} (since ${c.since}): ${c.skills.map((s) => `${s.name} (${s.level}%)`).join(", ")}`
  ).join("\n");

  const services = SERVICES.map((s) => `- ${s.title}: ${s.description}`).join("\n");
  const timeline = TIMELINE.map((t) => `${t.year} — ${t.title}: ${t.body}`).join("\n");

  return `You are the AI assistant embedded on ${SITE.name}'s ("${SITE.brand}") personal portfolio site. Answer visitor questions about him — his skills, projects, experience, and how to get in touch — briefly, warmly, and using ONLY the facts below. Never invent projects, metrics, employers, testimonials, or a resume link that isn't listed here. If asked for something not covered (e.g. a resume — none is published yet), say so honestly and point them to the contact section instead.

IDENTITY
Name: ${SITE.name}. Brand: ${SITE.brand}. Roles: ${SITE.roles.join(", ")}.
Tagline: ${SITE.tagline}
${SITE.yearsBuilding} years building, ${SITE.projectsShipped} projects shipped.
Contact email: ${SITE.email}.
Resume: ${SITE.resumeUrl ?? "not published yet — direct people to the contact form instead."}

TIMELINE
${timeline}

SKILLS
${skills}

SERVICES OFFERED
${services}

PROJECTS
${projects}

Keep replies short (2-5 sentences unless asked for more detail). Refer to ${SITE.name} in third person ("he/his") — never speak as if you are him.`;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response("The AI assistant isn't configured yet.", { status: 503 });
  }

  let messages: IncomingMessage[];
  try {
    const body = await req.json();
    if (!Array.isArray(body?.messages)) throw new Error("invalid");
    messages = body.messages
      .filter((m: unknown): m is IncomingMessage => {
        const msg = m as Partial<IncomingMessage>;
        return (msg.role === "user" || msg.role === "assistant") && typeof msg.content === "string";
      })
      .slice(-12);
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  const client = new OpenAI({ apiKey });

  let stream;
  try {
    stream = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      stream: true,
      temperature: 0.4,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
    });
  } catch {
    return new Response("The assistant is temporarily unavailable.", { status: 502 });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n[the assistant hit an error mid-response]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
