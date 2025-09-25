// src/components/EditorWithLineNumbers.tsx
import React, { useMemo, useRef, useEffect } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  rows?: number;
  wrap?: boolean;
  className?: string;
};

export default function EditorCustom({
  value,
  onChange,
  disabled,
  rows = 20,
  wrap = true,
  className = ""
}: Props) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Compute lines and memoize
  const lines = useMemo(() => {
    // Always show at least 1 line
    return (value ?? "").split("\n").length || 1;
  }, [value]);

  // Sync scroll of gutter with textarea
  useEffect(() => {
    const ta = taRef.current;
    const g = gutterRef.current;
    if (!ta || !g) return;

    const onScroll = () => {
      g.scrollTop = ta.scrollTop;
    };
    ta.addEventListener("scroll", onScroll);
    return () => ta.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent horizontal scroll mismatch by mirroring overflow behavior
  const whiteSpace = wrap ? "whitespace-pre-wrap" : "whitespace-pre";

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-[56px_1fr] gap-0 border border-[#CBD5E1] rounded-lg overflow-hidden bg-white ${className}`}
    >
      {/* Gutter */}
      <div
        ref={gutterRef}
        className="bg-[#F1F5F9] border-r border-[#E2E8F0] text-right text-xs text-[#64748B] font-mono leading-[1.5] overflow-hidden"
        style={{ userSelect: "none" }}
      >
        <div className="relative">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`px-2 ${
                i % 2 === 0 ? "bg-transparent" : "bg-[#EEF2F6]"
              }`}
              style={{ height: "1.5em", lineHeight: "1.5em" }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        {/* alternating stripes under text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ overflow: "hidden" }}
        >
          <div className={`${whiteSpace} font-mono text-sm text-transparent`}>
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "" : "bg-[#F8FAFC]"}`}
                style={{ height: "1.5em" }}
              />
            ))}
          </div>
        </div>

        <textarea
          ref={taRef}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`relative w-full bg-transparent p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[#2563EB] ${whiteSpace}`}
          style={{
            lineHeight: "1.5em",
            caretColor: "#111827",
            resize: "vertical"
          }}
          spellCheck={false}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
