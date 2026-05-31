"use client";
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { agentsApi } from "@/lib/api";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const CHIPS = [
  "What changed overnight?",
  "What needs my decision today?",
  "Why is the water main at risk?",
  "Draft a council update",
];

const SCRIPTED: Record<string, string> = {
  "What changed overnight?":
    "Overnight changes: soil-corrosivity index on MX-118 rose 7.4→8.1 (water failure now within 90 days), wildfire-risk zone expanded ~340m toward Northgate, 23 new 311 reports (9 clustering in Westbank), AQI rose 9 points to 84 near south-corridor schools.",
  "What needs my decision today?":
    "Three decisions need your attention: (1) Authorize MX-118 emergency inspection — Water Authority is waiting; (2) Approve NE Ridge crew pre-staging — Fire & Rescue needs sign-off; (3) Confirm Westbank drainage work order — storm is Tuesday.",
  "Why is the water main at risk?":
    "Trunk main MX-118 shows a corrosivity index of 8.1 (critical threshold is 7.0) and acoustic sensors have detected pre-failure transients at two joints. The soil on the Riverside corridor has above-average chloride content, which accelerates internal corrosion. Failure probability is 82% within 90 days.",
  "Draft a council update":
    "Draft: Good morning. Our AI monitoring system has flagged two critical risks requiring council awareness: (1) Water main MX-118 in Riverside is predicted to fail within 90 days — we recommend approving emergency inspection at $40K to avoid $2.1M reactive repair; (2) Wildfire risk on NE Ridge is elevated with 430 homes in the spread band — pre-staging of crews is recommended.",
};

interface AssistantDockProps {
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

let _id = 0;
function nextId() { return ++_id; }

export default function AssistantDock({ open, onClose, isMobile = false }: AssistantDockProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "ai", text: "Hello! I'm Meridian AI. I can help you understand what's happening across the city, surface risks, and draft decisions. What would you like to know?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // On open, move focus into the dock. On Escape, close and let the parent
  // restore focus to the "Ask Meridian" trigger.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        (document.querySelector('[aria-label="Ask Meridian AI"]') as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId(), role: "user", text };
    const history = messages.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
    setMessages((m) => [...m, userMsg]);
    setInputValue("");
    setIsTyping(true);
    try {
      const res = await agentsApi.chat(text, history);
      const reply: string = res.data?.reply ?? res.data?.message ?? JSON.stringify(res.data);
      setIsTyping(false);
      setMessages((m) => [...m, { id: nextId(), role: "ai", text: reply }]);
    } catch {
      // Fall back to scripted responses if API is unavailable
      const reply = SCRIPTED[text] ?? "I'm analyzing that now. Based on the current data feeds, I'll have a detailed answer shortly.";
      setTimeout(() => {
        setIsTyping(false);
        setMessages((m) => [...m, { id: nextId(), role: "ai", text: reply }]);
      }, 1500);
    }
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Meridian AI assistant"
      style={{
        width: isMobile ? "100vw" : 392,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        borderLeft: isMobile ? "none" : "1px solid var(--rule)",
        flexShrink: 0,
        paddingBottom: isMobile ? "env(safe-area-inset-bottom, 0px)" : 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderBottom: "1px solid var(--rule)",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "var(--blue)" }} aria-hidden="true">
          <Icon name="sparkles" size={18} />
        </span>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Meridian AI</span>
        <button
          ref={closeBtnRef}
          className="btn btn-ghost"
          style={{ padding: "5px", gap: 0 }}
          onClick={onClose}
          aria-label="Close AI assistant"
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      {/* Suggestion chips */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          borderBottom: "1px solid var(--rule-soft)",
          flexShrink: 0,
        }}
      >
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => sendMessage(chip)}
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              padding: "5px 11px",
              borderRadius: "var(--r-pill)",
              border: "1px solid var(--rule)",
              background: "var(--surface-2)",
              color: "var(--ink-soft)",
              cursor: "pointer",
              transition: "background .13s, color .13s",
              fontFamily: "var(--grotesk)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--blue-wash)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--blue)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-soft)";
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "var(--r) var(--r) 4px var(--r)" : "var(--r) var(--r) var(--r) 4px",
                background: msg.role === "user" ? "var(--blue)" : "var(--surface)",
                color: msg.role === "user" ? "#fff" : "var(--ink)",
                border: msg.role === "user" ? "none" : "1px solid var(--rule)",
                fontSize: 13,
                lineHeight: 1.5,
                boxShadow: msg.role === "ai" ? "var(--sh-1)" : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start" }} aria-label="Meridian AI is typing">
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "var(--r) var(--r) var(--r) 4px",
                background: "var(--surface)",
                border: "1px solid var(--rule)",
                display: "flex",
                gap: 5,
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--ink-ghost)",
                    display: "inline-block",
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--rule)",
          display: "flex",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }}
          aria-label="Ask Meridian AI about any risk, asset, or decision"
          placeholder="Ask about any risk, asset, or decision…"
          style={{
            flex: 1,
            height: 38,
            padding: "0 14px",
            border: "1px solid var(--rule)",
            borderRadius: "var(--r-pill)",
            background: "var(--surface-2)",
            fontSize: 13,
            color: "var(--ink)",
            outline: "none",
          }}
        />
        <button
          className="btn"
          style={{ padding: "7px 14px", gap: 6, background: "var(--blue)", flexShrink: 0 }}
          onClick={() => sendMessage(inputValue)}
          disabled={isTyping}
          aria-label="Send message"
        >
          <Icon name="send" size={14} />
        </button>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
