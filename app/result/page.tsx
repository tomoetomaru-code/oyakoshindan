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
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>
            診断データが見つかりません。
          </p>
          <Link href="/quiz">
            <button className="btn-primary">診断をはじめる</button>
          </Link>
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

  // Max steiner score for bar width (2 questions × 3 points = 6 max for parent, child same)
  const childMaxSteiner = Math.max(...Object.values(child.temperamentScores));
  const parentMaxSteiner = Math.max(...Object.values(parent.temperamentScores));

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ─ Header ─ */}
        <div className="text-center slide-up mb-2">
          <div className="text-4xl mb-3">🎉</div>
          <h1 className="font-mincho text-2xl md:text-3xl font-bold" style={{ color: "var(--forest)" }}>
            診断が完了しました
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            お子さんと親御さんの個性プロフィールをお届けします
          </p>
        </div>

        {/* ─ Child profile ─ */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🧒</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              子どものプロフィール
            </h2>
          </div>

          {/* Primary temperament */}
          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: `${steinerColor[child.primaryTemperament]}18`, border: `1.5px solid ${steinerColor[child.primaryTemperament]}40` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{steinerEmoji[child.primaryTemperament]}</span>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--sage)" }}>主気質</p>
                <h3 className="font-mincho text-xl font-bold" style={{ color: "var(--forest)" }}>
                  {steinerLabel[child.primaryTemperament]}
                </h3>
                <p className="text-sm" style={{ color: steinerColor[child.primaryTemperament] }}>
                  {childTempInfo.tagline}
                </p>
              </div>
            </div>

            {/* Secondary */}
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>副気質：</span>
              <span
                className="font-medium px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: `${steinerColor[child.secondaryTemperament]}20`,
                  color: steinerColor[child.secondaryTemperament],
                }}
              >
                {steinerEmoji[child.secondaryTemperament]} {steinerLabel[child.secondaryTemperament]}
              </span>
            </div>
          </div>

          {/* Temperament bars */}
          <div className="mb-4 space-y-2">
            {(Object.entries(child.temperamentScores) as [SteinerType, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([type, score]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs w-16 text-right" style={{ color: "var(--text-muted)" }}>
                    {steinerLabel[type]}
                  </span>
                  <div className="flex-1 meter-track">
                    <div
                      className="meter-fill"
                      style={{
                        width: childMaxSteiner > 0 ? `${(score / 6) * 100}%` : "0%",
                        background: steinerColor[type],
                      }}
                    />
                  </div>
                  <span className="text-xs w-6" style={{ color: "var(--text-muted)" }}>{score}</span>
                </div>
              ))}
          </div>

          {/* Top intelligences */}
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: "var(--sage)" }}>
              🧠 得意な学び方（上位3知能）
            </p>
            <div className="flex flex-wrap gap-2">
              {child.topIntelligences.map((mi, i) => (
                <span
                  key={mi}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: i === 0 ? "var(--forest)" : "var(--blush)",
                    color: i === 0 ? "white" : "var(--sage)",
                  }}
                >
                  {miEmoji[mi]} {miLabel[mi]}
                </span>
              ))}
            </div>
          </div>

          {/* Jung */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
          >
            <span className="text-lg">☯</span>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>エネルギーの方向</p>
              <p className="font-medium text-sm" style={{ color: "var(--forest)" }}>
                {orientationLabel[child.orientation]}
                <span className="ml-2 text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                  （外{child.jungScores.extrovert}点 / 内{child.jungScores.introvert}点）
                </span>
              </p>
            </div>
          </div>

          {/* Strengths & challenges */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ background: "#E6F4F2", border: "1px solid #4A9B8E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#1A5C56" }}>✨ 強み</p>
              <ul className="space-y-1">
                {childTempInfo.strengths.slice(0, 3).map((s, i) => (
                  <li key={i} className="text-xs" style={{ color: "#1A5C56" }}>・{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3" style={{ background: "#FEF3DA", border: "1px solid #F5A62330" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#8B5E0A" }}>🌱 サポートポイント</p>
              <ul className="space-y-1">
                {childTempInfo.challenges.slice(0, 3).map((c, i) => (
                  <li key={i} className="text-xs" style={{ color: "#8B5E0A" }}>・{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─ Parent profile ─ */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🌱</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              親のプロフィール
            </h2>
          </div>

          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: `${steinerColor[parent.primaryTemperament]}18`, border: `1.5px solid ${steinerColor[parent.primaryTemperament]}40` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{steinerEmoji[parent.primaryTemperament]}</span>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--sage)" }}>主気質</p>
                <h3 className="font-mincho text-xl font-bold" style={{ color: "var(--forest)" }}>
                  {steinerLabel[parent.primaryTemperament]}
                </h3>
                <p className="text-sm" style={{ color: steinerColor[parent.primaryTemperament] }}>
                  {parentTempInfo.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>副気質：</span>
              <span
                className="font-medium px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: `${steinerColor[parent.secondaryTemperament]}20`,
                  color: steinerColor[parent.secondaryTemperament],
                }}
              >
                {steinerEmoji[parent.secondaryTemperament]} {steinerLabel[parent.secondaryTemperament]}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
          >
            <span className="text-lg">☯</span>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>エネルギーの方向</p>
              <p className="font-medium text-sm" style={{ color: "var(--forest)" }}>
                {orientationLabel[parent.orientation]}
              </p>
            </div>
          </div>
        </section>

        {/* ─ Combination advice ─ */}
        {combo && (
          <section className="card p-6 slide-up">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💞</span>
              <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
                親子の組み合わせ
              </h2>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${steinerColor[child.primaryTemperament]}20`, color: steinerColor[child.primaryTemperament] }}
              >
                {steinerEmoji[child.primaryTemperament]} 子：{steinerLabel[child.primaryTemperament]}
              </span>
              <span style={{ color: "var(--text-muted)" }}>×</span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${steinerColor[parent.primaryTemperament]}20`, color: steinerColor[parent.primaryTemperament] }}
              >
                {steinerEmoji[parent.primaryTemperament]} 親：{steinerLabel[parent.primaryTemperament]}
              </span>
            </div>

            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
            >
              <p className="font-mincho font-semibold mb-2" style={{ color: "var(--forest)" }}>
                {combo.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {combo.description}
              </p>
            </div>

            <p className="text-xs font-medium mb-3" style={{ color: "var(--sage)" }}>
              🌿 子どもへの関わり方
            </p>
            <ul className="space-y-2 mb-4">
              {combo.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--forest)" }}
                >
                  <span style={{ color: "var(--amber)" }}>▸</span>
                  {tip}
                </li>
              ))}
            </ul>

            <div
              className="rounded-xl p-4"
              style={{ background: "#FFF3E4", border: "1px solid #C8731A30" }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: "var(--amber)" }}>
                💡 親のイライラ対策
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#7A4A10" }}>
                {combo.parentIrritation}
              </p>
            </div>
          </section>
        )}

        {/* ─ MI learning advice ─ */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧠</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              子どもの得意な学び方
            </h2>
          </div>
          <div className="space-y-4">
            {child.topIntelligences.slice(0, 2).map((mi, i) => {
              const info = miDesc[mi];
              return (
                <div
                  key={mi}
                  className="rounded-xl p-4"
                  style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{miEmoji[mi]}</span>
                    <div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full mr-2"
                        style={{ background: i === 0 ? "var(--forest)" : "var(--blush)", color: i === 0 ? "white" : "var(--sage)" }}
                      >
                        {i === 0 ? "第1位" : "第2位"}
                      </span>
                      <span className="font-semibold text-sm" style={{ color: "var(--forest)" }}>
                        {info.title}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{info.learningStyle}</p>
                  <div className="flex flex-wrap gap-1">
                    {info.activities.map((a, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: "var(--blush)", color: "var(--sage)" }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─ Parent self-care ─ */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🫶</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              親自身のトリセツ
            </h2>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              （{steinerLabel[parent.primaryTemperament]}タイプの親御さんへ）
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl p-4" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "var(--sage)" }}>
                📌 あなたの傾向
              </p>
              <ul className="space-y-1">
                {selfCare.tendencies.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: "var(--forest)" }}>
                    ・{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-4" style={{ background: "#FDECEA", border: "1px solid #E05A4E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#9B2C22" }}>
                ⚡ イライラしやすい場面
              </p>
              <ul className="space-y-1">
                {selfCare.irritationTriggers.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: "#7A2020" }}>
                    ・{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-4" style={{ background: "#E6F4F2", border: "1px solid #4A9B8E30" }}>
              <p className="text-xs font-medium mb-2" style={{ color: "#1A5C56" }}>
                🌿 自分との付き合い方
              </p>
              <ul className="space-y-1">
                {selfCare.selfCareTips.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: "#1A5C56" }}>
                    ・{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─ Parent tips for child ─ */}
        <section className="card p-6 slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h2 className="font-mincho text-lg font-bold" style={{ color: "var(--forest)" }}>
              子どもへの関わり方アドバイス
            </h2>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
            {steinerLabel[child.primaryTemperament]}タイプのお子さんに特に効果的な関わり方
          </p>
          <ul className="space-y-3">
            {childTempInfo.parentTips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
              >
                <span
                  className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--forest)", color: "white" }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--forest)" }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─ Actions ─ */}
        <div className="flex flex-col gap-3 pb-10">
          <button
            className="btn-primary w-full justify-center"
            onClick={() => window.print()}
          >
            🖨 結果を印刷・保存する
          </button>
          <Link href="/" className="w-full">
            <button
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ border: "1.5px solid var(--border)", background: "white", color: "var(--sage)" }}
            >
              ← トップに戻る
            </button>
          </Link>
          <Link href="/quiz" className="w-full">
            <button
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ border: "1.5px solid var(--border)", background: "white", color: "var(--sage)" }}
            >
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
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p style={{ color: "var(--text-muted)" }}>結果を計算中...</p>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
