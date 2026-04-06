import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* ─ Hero card ─ */}
      <div className="card max-w-lg w-full p-8 md:p-12 text-center slide-up">

        {/* Title */}
        <h1
          className="font-mincho text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: "var(--forest)" }}
        >
          親子の個性診断
        </h1>
        <p
          className="text-lg mb-2 font-mincho"
          style={{ color: "var(--sage)" }}
        >
          ─ 信頼関係を育む子育てのヒント ─
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mt-6 mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          親子の個性の違いを理解し、子どもの個性・才能を伸ばしながらも
          <br />
          親自身もラクに楽しく子育てするためのアドバイスをお届けします。
        </p>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 mb-8 py-4 rounded-xl"
          style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
        >
          <div>
            <div className="text-2xl font-bold font-mincho" style={{ color: "var(--amber)" }}>
              47問
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>合計質問数</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mincho" style={{ color: "var(--amber)" }}>
              12〜15分
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>所要時間</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mincho" style={{ color: "var(--amber)" }}>
              無料
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>完全無料</div>
          </div>
        </div>

        {/* Flow */}
        <div className="flex items-center justify-center gap-2 text-xs mb-8" style={{ color: "var(--sage)" }}>
          <span className="px-3 py-1 rounded-full" style={{ background: "var(--blush)" }}>
            子ども診断（20問）
          </span>
          <span>→</span>
          <span className="px-3 py-1 rounded-full" style={{ background: "var(--blush)" }}>
            親の診断（15問）
          </span>
          <span>→</span>
          <span className="px-3 py-1 rounded-full" style={{ background: "var(--blush)" }}>
            結果表示
          </span>
        </div>

        {/* CTA */}
        <Link href="/quiz">
          <button className="btn-primary w-full justify-center text-lg py-4">
            診断をはじめる →
          </button>
        </Link>

        <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
          回答結果はサーバーに送信・保存されません
        </p>
      </div>
    </main>
  );
}
