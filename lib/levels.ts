// Level system configuration
// Each level requires cumulative XP

export interface LevelInfo {
  level: number;
  name: string;
  minXp: number;
  color: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, name: "Nowicjusz", minXp: 0, color: "#6b7280" },
  { level: 2, name: "Uczeń AI", minXp: 100, color: "#3b82f6" },
  { level: 3, name: "Praktyk", minXp: 300, color: "#10b981" },
  { level: 4, name: "Adept Promptów", minXp: 600, color: "#8b5cf6" },
  { level: 5, name: "Specjalista AI", minXp: 1000, color: "#f59e0b" },
  { level: 6, name: "Ekspert", minXp: 1500, color: "#ef4444" },
  { level: 7, name: "Mistrz Promptów", minXp: 2200, color: "#ec4899" },
  { level: 8, name: "Architekt AI", minXp: 3000, color: "#14b8a6" },
  { level: 9, name: "Guru AI", minXp: 4000, color: "#f97316" },
  { level: 10, name: "Legenda YLY", minXp: 5000, color: "#eab308" },
];

export function getLevelForXp(xp: number): LevelInfo {
  let result = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) result = lvl;
    else break;
  }
  return result;
}

export function getNextLevel(currentLevel: number): LevelInfo | null {
  const idx = LEVELS.findIndex((l) => l.level === currentLevel);
  if (idx < 0 || idx >= LEVELS.length - 1) return null;
  return LEVELS[idx + 1];
}

export function getXpProgress(xp: number): { current: number; needed: number; percent: number } {
  const currentLvl = getLevelForXp(xp);
  const nextLvl = getNextLevel(currentLvl.level);
  if (!nextLvl) return { current: xp - currentLvl.minXp, needed: 0, percent: 100 };
  const current = xp - currentLvl.minXp;
  const needed = nextLvl.minXp - currentLvl.minXp;
  const percent = Math.min(100, Math.round((current / needed) * 100));
  return { current, needed, percent };
}

// XP rewards
export const XP_REWARDS = {
  REGISTER: 50,
  COMPLETE_LESSON: 30,
  PASS_QUIZ: 50,
  PASS_EXAM: 200,
  SEND_CHAT_MESSAGE: 2,
  FIRST_LOGIN_DAILY: 10,
  PURCHASE: 100,
} as const;
