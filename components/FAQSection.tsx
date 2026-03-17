"use client";

import { useState } from "react";

const faqs = [
  {
    question: "このイベントは無料ですか？",
    answer:
      "はい、このイベントへの参加は無料です。ただし、事前に参加登録が必要です。",
  },
  {
    question: "オンライン参加は可能ですか？",
    answer:
      "このイベントは対面（In-Person）開催のみとなります。オンラインでのストリーミングは予定しておりません。",
  },
  {
    question: "GitHub や Figma のアカウントは必要ですか？",
    answer:
      "事前準備として GitHub アカウントをお持ちであることを推奨しますが、必須ではありません。イベント当日に登壇者のデモをご覧いただけます。",
  },
  {
    question: "キャンセルはできますか？",
    answer:
      "参加登録後にキャンセルをご希望の場合は、イベント開催の 2 日前までにお知らせください。",
  },
  {
    question: "懇親会はありますか？",
    answer:
      "はい、プログラム終了後に参加者同士のネットワーキングのための懇親会を予定しています。軽食・飲み物をご用意します。",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-text-primary font-medium text-sm hover:text-accent-blue transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          viewBox="0 0 16 16"
          className={`w-4 h-4 fill-text-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
        </svg>
      </button>
      {open && (
        <p className="text-text-secondary text-sm pb-4 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-12 border-t border-border-subtle">
      <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-text-primary mb-6">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-accent-purple flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.92 6.085h.001a.749.749 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 0 1 1.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.071-.21.127-.291.174l-.007.004a1.27 1.27 0 0 0-.187.117.583.583 0 0 0-.167.16.953.953 0 0 0-.127.406.75.75 0 1 1-1.5-.03 2.453 2.453 0 0 1 .35-1.1 2.08 2.08 0 0 1 .37-.37c.116-.086.243-.16.35-.22l.013-.007c.087-.048.165-.091.234-.137a1.954 1.954 0 0 0 .316-.245.943.943 0 0 0 .147-.26.642.642 0 0 0 .046-.25.96.96 0 0 0-.23-.601.985.985 0 0 0-.627-.232c-.332 0-.569.093-.75.219a1.024 1.024 0 0 0-.274.325ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
        よくある質問 / FAQ
      </h2>

      <div className="bg-bg-card border border-border-default rounded-2xl px-6 py-2">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
