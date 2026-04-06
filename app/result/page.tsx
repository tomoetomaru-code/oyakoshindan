"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { childQuestions, parentQuestions } from "@/lib/questions";
import {
  buildResult,
  steinerLabel,
  steinerColor,
  steinerEmoji,
  miLabel,
  miEmoji,
  orientationLabel,
  orientationDesc,
  steinerDesc,
  miDesc,
  combinationAdvice,
  getCombinationKey,
  parentSelfCare,
} from "@/lib/scoring";
import { SteinerType, MIType } from "@/lib/types";
import Link from "next/link";

function ResultContent() {
  const params = useSearchParams();
  const cParam = params.get("c");
  const pParam = params.get("p");

  if (!cParam || !pParam) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full p-8 text-center">
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>診断データが見つかりません。</p>
          <Link href="/quiz"><button className="btn-primary">診断をはじめる</button></Link>
        </div>
      </main>
    );
  }

  const childAnswers: number[] = JSON.parse(cParam);
  const parentAnswers: number[] = JSON.parse(pParam);
  const result = buildResult(childAnswers, parentAnswers, childQuestions, parentQuestions);
  const { child, parent } = result;

  const combinationKey = getCombinationKey(child.primaryTemperament, parent.primaryTemperament);
  const combo = combinationAdvice[combinationKey];
  const selfCare = parentSelfCare[parent.primaryTemperament];
  const childTempInfo = steinerDesc[child.primaryTemperament];
  const parentTempInfo = steinerDesc[parent.primaryTemperament];

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center slide-up mb-2">
          <div className="text-4xl mb-3">🎉</div>
          <h1 className="font-mincho text-2xl md:text-3xl font-bold" style={{ color: "var(--forest)" }}>
            診断が完了しました
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            お子さんと親御さんの個性プロフィールをお届けします
          </p>
        </div>

        {/* ① お子さんの個性・特性 */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🧒</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              お子さんの個性・特性
            </h2>
          </div>
          <div className="rounded-xl p-5 mb-4"
            style={{ background: `${steinerColor[child.primaryTemperament]}18`, border: `1.5px solid ${steinerColor[child.primaryTemperament]}40` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{steinerEmoji[child.primaryTemperament]}</span>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--sage)" }}>メインタイプ</p>
                <h3 className="font-mincho text-xl font-bold" style={{ color: "var(--forest)" }}>
                  {steinerLabel[child.primaryTemperament]}
                </h3>
                <p className="text-sm" style={{ color: steinerColor[child.primaryTemperament] }}>
                  {childTempInfo.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>サブタイプ：</span>
              <span className="font-medium px-2 py-0.5 rounded-full text-xs"
                style={{ background: `${steinerColor[child.secondaryTemperament]}20`, color: steinerColor[child.secondaryTemperament] }}>
                {steinerEmoji[child.secondaryTemperament]} {steinerLabel[child.secondaryTemperament]}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="rounded-xl p-3" style={{ background: "#E6F4F2", border: "1px solid #4A9B8E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#1A5C56" }}>✨ 強み</p>
              <ul className="space-y-1">
                {childTempInfo.strengths.slice(0, 3).map((s, i) => (
                  <li key={i} className="text-xs" style={{ color: "#1A5C56" }}>・{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-4" style={{ background: "#FEF3DA", border: "1px solid #F5A62330" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#8B5E0A" }}>🌱 サポートのヒント</p>
              <p className="text-sm leading-relaxed" style={{ color: "#8B5E0A" }}>{childTempInfo.supportText}</p>
            </div>
          </div>
          <div className="rounded-xl px-4 py-4"
            style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧭</span>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>エネルギーの方向</p>
                <p className="font-medium text-sm" style={{ color: "var(--forest)" }}>
                  {orientationLabel[child.orientation]}
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
              {orientationDesc[child.orientation]}
            </p>
          </div>
        </section>

        {/* ② お子さんの得意な遊び方 */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎮</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              お子さんの得意な遊び方
            </h2>
          </div>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>現在の上位3つ</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {child.topIntelligences.map((mi, i) => (
              <span key={mi} className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ background: i === 0 ? "var(--forest)" : "var(--blush)", color: i === 0 ? "white" : "var(--sage)" }}>
                {miEmoji[mi]} {miLabel[mi]}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            {child.topIntelligences.slice(0, 3).map((mi, i) => {
              const info = miDesc[mi];
              const rankLabel = i === 0 ? "第1位" : i === 1 ? "第2位" : "第3位";
              const rankBg = i === 0 ? "var(--forest)" : i === 1 ? "var(--blush)" : "#F0F0F0";
              const rankColor = i === 0 ? "white" : i === 1 ? "var(--sage)" : "#888";
              return (
                <div key={mi} className="rounded-xl p-4"
                  style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{miEmoji[mi]}</span>
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded-full mr-2"
                        style={{ background: rankBg, color: rankColor }}>
                        {rankLabel}
                      </span>
                      <span className="font-semibold text-sm" style={{ color: "var(--forest)" }}>{info.title}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{info.learningStyle}</p>
                  <div className="flex flex-wrap gap-1">
                    {info.activities.map((a, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full"
                        style={{ background: "var(--blush)", color: "var(--sage)" }}>{a}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ③ 親御さんの個性・特性 */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🌱</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              親御さんの個性・特性
            </h2>
          </div>
          <div className="rounded-xl p-5 mb-4"
            style={{ background: `${steinerColor[parent.primaryTemperament]}18`, border: `1.5px solid ${steinerColor[parent.primaryTemperament]}40` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{steinerEmoji[parent.primaryTemperament]}</span>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--sage)" }}>メインタイプ</p>
                <h3 className="font-mincho text-xl font-bold" style={{ color: "var(--forest)" }}>
                  {steinerLabel[parent.primaryTemperament]}
                </h3>
                <p className="text-sm" style={{ color: steinerColor[parent.primaryTemperament] }}>
                  {parentTempInfo.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>サブタイプ：</span>
              <span className="font-medium px-2 py-0.5 rounded-full text-xs"
                style={{ background: `${steinerColor[parent.secondaryTemperament]}20`, color: steinerColor[parent.secondaryTemperament] }}>
                {steinerEmoji[parent.secondaryTemperament]} {steinerLabel[parent.secondaryTemperament]}
              </span>
            </div>
          </div>
          <div className="rounded-xl px-4 py-4 mb-4"
            style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧭</span>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>エネルギーの方向</p>
                <p className="font-medium text-sm" style={{ color: "var(--forest)" }}>{orientationLabel[parent.orientation]}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
              {orientationDesc[parent.orientation]}
            </p>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl p-4" style={{ background: "#FDECEA", border: "1px solid #E05A4E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#9B2C22" }}>⚡ イライラしやすい場面</p>
              <ul className="space-y-1">
                {selfCare.irritationTriggers.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: "#7A2020" }}>・{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-4" style={{ background: "#E6F4F2", border: "1px solid #4A9B8E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#1A5C56" }}>🌿 自分との付き合い方</p>
              <ul className="space-y-1">
                {selfCare.selfCareTips.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: "#1A5C56" }}>・{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ④ 親御さんの強み */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💪</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              親御さんの強み
            </h2>
          </div>
          <div className="space-y-3">
            {selfCare.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
                <span className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--forest)", color: "white" }}>{i + 1}</span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--forest)" }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ⑤ 親子の組み合わせ */}
        {combo && (
          <section className="card p-6 slide-up">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💞</span>
              <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
                親子の組み合わせ
              </h2>
            </div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${steinerColor[child.primaryTemperament]}20`, color: steinerColor[child.primaryTemperament] }}>
                {steinerEmoji[child.primaryTemperament]} お子さん：{steinerLabel[child.primaryTemperament]}
              </span>
              <span style={{ color: "var(--text-muted)" }}>×</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${steinerColor[parent.primaryTemperament]}20`, color: steinerColor[parent.primaryTemperament] }}>
                {steinerEmoji[parent.primaryTemperament]} 親御さん：{steinerLabel[parent.primaryTemperament]}
              </span>
            </div>
            <div className="rounded-xl p-4"
              style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{combo.description}</p>
            </div>
          </section>
        )}

        {/* ⑥ お子さんへの関わり方アドバイス */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              お子さんへの関わり方アドバイス
            </h2>
          </div>
          <ul className="space-y-3 mb-6">
            {childTempInfo.parentTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
                <span className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--forest)", color: "white" }}>{i + 1}</span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--forest)" }}>{tip}</span>
              </li>
            ))}
          </ul>
          {/* Support yell */}
          <div className="rounded-xl p-5"
            style={{ background: "linear-gradient(135deg, #FEF3DA, #E6F4F2)", border: "1.5px solid var(--border)" }}>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--forest)" }}>🌸 あなたへのエール</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--forest)" }}>
              {childTempInfo.supportYell}
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-10">
          <button className="btn-primary w-full justify-center" onClick={() => window.print()}>
            🖨 結果を印刷・保存する
          </button>
          <Link href="/" className="w-full">
            <button className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ border: "1.5px solid var(--border)", background: "white", color: "var(--sage)" }}>
              ← トップに戻る
            </button>
          </Link>
          <Link href="/quiz" className="w-full">
            <button className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ border: "1.5px solid var(--border)", background: "white", color: "var(--sage)" }}>
              🔁 もう一度診断する
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p style={{ color: "var(--text-muted)" }}>結果を計算中...</p>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}
