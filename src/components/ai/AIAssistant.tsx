"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkle, PaperPlaneTilt } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi — I'm ${SITE.brand}'s assistant. Ask me about skills, projects, or how to get in touch.`,
};

const FALLBACK = "The assistant isn't set up yet — reach out directly through the contact form instead.";

/** Floating launcher -> grounded chat panel, backed by /api/chat (OpenAI, streamed). */
export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const chunk = acc;
        setMessages((curr) => {
          const copy = [...curr];
          copy[copy.length - 1] = { role: "assistant", content: chunk };
          return copy;
        });
      }

      if (!acc) {
        setMessages((curr) => {
          const copy = [...curr];
          copy[copy.length - 1] = { role: "assistant", content: FALLBACK };
          return copy;
        });
      }
    } catch {
      setMessages((curr) => {
        const copy = [...curr];
        copy[copy.length - 1] = { role: "assistant", content: FALLBACK };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        data-magnetic
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#d90429] text-white shadow-[0_0_30px_rgba(217,4,41,0.5)] transition-transform hover:scale-105"
        aria-label="Open AI assistant"
      >
        <Sparkle size={22} weight="fill" />
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col border-white/10 bg-[#0a0a0a] sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white">Ask about {SITE.name.split(" ")[0]}</SheetTitle>
          <SheetDescription>Skills, projects, and experience &mdash; grounded in what&rsquo;s actually on this site.</SheetDescription>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4">
          <div className="flex flex-col gap-3 pb-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "ml-auto bg-[#d90429] text-white" : "bg-white/[0.05] text-white/80"
                }`}
              >
                {m.content || (loading && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 border-t border-white/10 p-4"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="h-11 flex-1 rounded-full border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/30"
          />
          <Button
            type="submit"
            data-magnetic
            disabled={loading || !input.trim()}
            className="h-11 w-11 shrink-0 rounded-full"
            aria-label="Send"
          >
            <PaperPlaneTilt size={16} weight="fill" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
