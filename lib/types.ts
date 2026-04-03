export type SteinerType = "sanguine" | "choleric" | "phlegmatic" | "melancholic";
export type MIType =
  | "linguistic"
  | "logical"
  | "spatial"
  | "musical"
  | "bodily"
  | "interpersonal"
  | "intrapersonal"
  | "naturalist";
export type JungOrientation = "extrovert" | "introvert" | "ambi";

export interface Question {
  id: number;
  text: string;
  framework: "steiner" | "mi" | "jung";
  dimension: SteinerType | MIType | "extrovert" | "introvert";
  reversed?: boolean;
  forWhom: "child" | "parent";
}

export interface ScoreSet {
  steiner: Record<SteinerType, number>;
  mi: Record<MIType, number>;
  jung: { extrovert: number; introvert: number };
}

export interface Profile {
  primaryTemperament: SteinerType;
  secondaryTemperament: SteinerType;
  temperamentScores: Record<SteinerType, number>;
  topIntelligences: MIType[];
  miScores: Record<MIType, number>;
  orientation: JungOrientation;
  jungScores: { extrovert: number; introvert: number };
}

export interface DiagnosisResult {
  child: Profile;
  parent: Profile;
}
