const faqs = [
  {
    question: "このイベントの目的は何ですか？",
    answer:
      "GitHub × Figma Mixerは、エンジニアとデザイナーが職種の垣根を越えてつながることを目的としたネットワーキングイベントです。GitHubとFigmaにより、コードとデザインの融合をテーマに、参加者同士のカジュアルな交流の場を提供します。",
  },
  {
    question: "本イベントの参加資格は何ですか？",
    answer:
      "本イベントは招待制です。参加をご希望の方は御社担当のGitHub営業までお問い合わせください。",
  },
  {
    question: "参加登録はどのような流れですか？",
    answer:
      "本ウェブサイトの「参加登録依頼」フォームに記入して送信してください。送信したのみでは参加は確定していません。参加確定された方には確定Eメールと当日のチェックインに必要なQRコードをお送りします。",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-[#f3f4f6]">
      <div className="max-w-[960px] mx-auto px-4">
        <h2 className="text-5xl font-bold text-black mb-12">FAQ</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold text-black leading-snug">
                {faq.question}
              </h3>
              <p className="text-[16px] text-[#57606a] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

