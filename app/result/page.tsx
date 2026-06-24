"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
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
import Link from "next/link";

function ResultContent() {
  const params = useSearchParams();
  const cParam = params.get("c");
  const pParam = params.get("p");

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");

    // Webフォントが完全に読み込まれるのを待つ
    await document.fonts.ready;

    // ▼▼色が薄くなる問題の解決策▼▼
    // html2canvasが解釈できない透過カラーコードやCSS変数を、
    // ブラウザが計算済みの「正確な濃い色(RGBA)」に一時的に変換して強制適用します。
    const allElements = element.querySelectorAll<HTMLElement>("*");
    const originalStyles = new Map<HTMLElement, string | null>();

    allElements.forEach((el) => {
      // 元のスタイルを記憶
      originalStyles.set(el, el.getAttribute("style"));
      
      // ブラウザが現在画面に描画している「本当の色」を取得
      const computed = window.getComputedStyle(el);
      
      let currentStyle = el.getAttribute("style") || "";
      if (currentStyle && !currentStyle.endsWith(";")) {
        currentStyle += "; ";
      }

      const color = computed.color;
      const bg = computed.backgroundColor;
      const borderColor = computed.borderColor;

      // 取得した「本当の色」を、強制的に( !important )インラインスタイルとして上書き
      if (color && color !== "rgba(0, 0, 0, 0)") currentStyle += `color: ${color} !important; `;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") currentStyle += `background-color: ${bg} !important; `;
      if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") currentStyle += `border-color: ${borderColor} !important; `;

      el.setAttribute("style", currentStyle);
    });
    // ▲▲ここまで▲▲

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // ▼一時的に書き換えたスタイルを元の状態に戻す（画面の表示がおかしくならないようにするため）
    allElements.forEach((el) => {
      const orig = originalStyles.get(el);
      if (orig === null || orig === "") {
        el.removeAttribute("style");
      } else if (orig) {
        el.setAttribute("style", orig);
      }
    });

    // PDF作成処理
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let position = 0;
    let remaining = imgHeight;

    while (remaining > 0) {
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      remaining -= pageHeight;
      if (remaining > 0) {
        pdf.addPage();
        position -= pageHeight;
      }
    }

    pdf.save("親子の個性診断結果.pdf");
  };

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
    <main className="min-h-screen px-4 py-10 bg-white" ref={contentRef}>
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

        {/* Disclaimer */}
        <div className="rounded-xl px-5 py-4 slide-up"
          style={{ background: "#F0F7F4", border: "1px solid #4A9B8E40" }}>
          <p className="text-xs leading-relaxed" style={{ color: "#2D6B5E" }}>
            💡 この診断は、お子さんや親御さんの<strong>傾向を知るためのヒント</strong>です。スコアや結果よりも、読んでみて「そうかも！」と感じた部分を大切にしてください。同じお子さんでも日によって答えが変わることもあります。あくまで子育てのヒントとして、気軽にお使いください🌿
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
              const rankBg = i === 0 ? "var(--forest)" : i === 1 ? "var(--blush)" : "#F0
