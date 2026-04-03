"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { childQuestions, parentQuestions } from "@/lib/questions";

type Phase = "child-intro" | "child-quiz" | "parent-intro" | "parent-quiz" | "done";

const ANSWER_LABELS = [
  { label: "そう思わない", score: "0" },
  { label: "あまりそう思わない", score: "1" },
  { label: "まあそう思う", score: "2" },
  { label: "とてもそう思う", score: "3" },
];

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("child-intro");
  const [childAnswers, setChildAnswers] = useState<number[]>(Array(childQuestions.length).fill(-1));
  const [parentAnswers, setParentAnswers] = useState<number[]>(Array(parentQuestions.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const isChildPhase = phase === "child-quiz";
  const isParentPhase = phase === "parent-quiz";
  const questions = isChildPhase ? childQuestions : parentQuestions;
  const answers = isChildPhase ? childAnswers : parentAnswers;
  const setAnswers = isChildPhase ? setChildAnswers : setParentAnswers;

  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((currentQ) / totalQ) * 100 : 0;
  const currentAnswer = answers[currentQ];

  // Overall progress for top bar
  const overallProgress =
    phase === "child-intro" ? 0
    : phase === "child-quiz" ? (currentQ / (childQuestions.length + parentQuestions.length)) * 100
    : phase === "parent-intro" ? (childQuestions.length / (childQuestions.length + parentQuestions.length)) * 100
    : phase === "parent-quiz" ? ((childQuestions.length + currentQ) / (childQuestions.length + parentQuestions.length)) * 100
    : 100;

  function selectAnswer(val: number) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = val;
    setAnswers(newAnswers);
  }

  function goNext() {
    if (currentAnswer < 0) return;

    if (isChildPhase) {
      if (currentQ < childQuestions.length - 1) {
        setCurrentQ((q) => q + 1);
        setAnimKey((k) => k + 1);
      } else {
        setCurrentQ(0);
        setPhase("parent-intro");
      }
    } else if (isParentPhase) {
      if (currentQ < parentQuestions.length - 1) {
        setCurrentQ((q) => q + 1);
        setAnimKey((k) => k + 1);
      } else {
        // Submit
        const params = new URLSearchParams({
          c: JSON.stringify(childAnswers),
          p: JSON.stringify(parentAnswers),
        });
        router.push(`/result?${params.toString()}`);
      }
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setAnimKey((k) => k + 1);
    } else if (isParentPhase) {
      setCurrentQ(childQuestions.length - 1);
      setPhase("child-quiz");
    }
  }

  // ─ Intro screens ──────────────────────────────────────────
  if (phase === "child-intro") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="card max-w-md w-full p-8 text-center slide-up">
          <div className="text-5xl mb-4">🧒</div>
          <h2 className="font-mincho text-2xl font-bold mb-3" style={{ color: "var(--forest)" }}>
            まずは子どもについて答えましょう
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            お子さんの普段の様子を思い浮かべながら、
            <br />
            直感で答えてください。
            <br />
            全 <strong>20問</strong> です。
          </p>
          <div className="rounded-xl p-4 mb-6 text-left text-sm" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--sage)" }}>📋 診断内容</p>
            <ul className="mt-2 space-y-1" style={{ color: "var(--text-muted)" }}>
              <li>・ シュタイナー4気質（8問）</li>
              <li>・ MI理論・多重知能（8問）</li>
              <li>・ ユング内向/外向（4問）</li>
            </ul>
          </div>
          <button className="btn-primary w-full justify-center" onClick={() => setPhase("child-quiz")}>
            子どもの診断をはじめる →
          </button>
        </div>
      </main>
    );
  }

  if (phase === "parent-intro") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="card max-w-md w-full p-8 text-center slide-up">
          <div className="text-5xl mb-4">🌱</div>
          <div className="mb-4">
            <span className="tag" style={{ background: "#E6F4F2", color: "#1A5C56" }}>
              ✓ 子ども診断 完了
            </span>
          </div>
          <h2 className="font-mincho text-2xl font-bold mb-3" style={{ color: "var(--forest)" }}>
            次はあなた自身について答えましょう
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            親御さん自身の子育てのスタイルや日常を
            <br />
            思い浮かべながら答えてください。
            <br />
            全 <strong>15問</strong> です。
          </p>
          <div className="rounded-xl p-4 mb-6 text-left text-sm" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--sage)" }}>📋 診断内容</p>
            <ul className="mt-2 space-y-1" style={{ color: "var(--text-muted)" }}>
              <li>・ シュタイナー4気質（6問）</li>
              <li>・ MI理論・強みの知能（5問）</li>
              <li>・ ユング内向/外向（4問）</li>
            </ul>
          </div>
          <button className="btn-primary w-full justify-center" onClick={() => setPhase("parent-quiz")}>
            親の診断をはじめる →
          </button>
        </div>
      </main>
    );
  }

  // ─ Quiz screen ───────────────────────────────────────────
  const q = questions[currentQ];
  const sectionLabel = isChildPhase ? "子ども診断" : "親の診断";
  const sectionEmoji = isChildPhase ? "🧒" : "🌱";
  const sectionTotal = isChildPhase ? childQuestions.length : parentQuestions.length;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6">
      {/* Overall progress bar */}
      <div className="w-full max-w-lg mb-2">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
        </div>
        <p className="text-xs text-right mt-1" style={{ color: "var(--text-muted)" }}>
          全体 {Math.round(overallProgress)}%
        </p>
      </div>

      <div className="card max-w-lg w-full p-6 md:p-8">
        {/* Section badge */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="section-badge"
            style={{
              background: isChildPhase ? "#FEF3DA" : "#E6F4F2",
              color: isChildPhase ? "#8B5E0A" : "#1A5C56",
              borderColor: isChildPhase ? "#F5A62360" : "#4A9B8E60",
            }}
          >
            {sectionEmoji} {sectionLabel}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            {currentQ + 1} / {sectionTotal}
          </span>
        </div>

        {/* Section progress */}
        <div className="progress-track mb-8">
          <div
            className="progress-fill"
            style={{ width: `${((currentQ + 1) / sectionTotal) * 100}%` }}
          />
        </div>

        {/* Framework badge */}
        <div className="mb-4">
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: "var(--blush)", color: "var(--sage)" }}
          >
            {q.framework === "steiner"
              ? "🌿 シュタイナー4気質"
              : q.framework === "mi"
              ? "🧠 MI理論"
              : "☯ ユング内向/外向"}
          </span>
        </div>

        {/* Question */}
        <div key={animKey} className="slide-up">
          <h2
            className="font-mincho text-lg md:text-xl font-semibold leading-relaxed mb-8"
            style={{ color: "var(--forest)" }}
          >
            {q.text}
          </h2>

          {/* Answer buttons */}
          <div className="flex flex-col gap-3">
            {ANSWER_LABELS.map((opt, i) => (
              <button
                key={i}
                className={`answer-btn ${currentAnswer === i ? "selected" : ""}`}
                onClick={() => selectAnswer(i)}
              >
                <span className="score-dot">{i}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {(currentQ > 0 || isParentPhase) && (
            <button
              onClick={goBack}
              className="flex-none px-5 py-3 rounded-xl border text-sm font-medium"
              style={{
                borderColor: "var(--border)",
                color: "var(--sage)",
                background: "white",
              }}
            >
              ← 戻る
            </button>
          )}
          <button
            className="btn-primary flex-1 justify-center"
            disabled={currentAnswer < 0}
            onClick={goNext}
          >
            {isParentPhase && currentQ === parentQuestions.length - 1
              ? "結果を見る 🎉"
              : "次へ →"}
          </button>
        </div>
      </div>

      {/* Encouragement */}
      <p className="mt-4 text-xs text-center" style={{ color: "var(--text-muted)" }}>
        {currentAnswer < 0
          ? "直感で選んで大丈夫です"
          : "選択できました。次へ進みましょう"}
      </p>
    </main>
  );
}
