export interface VideoItem {
  id: number;
  name: string;
  time: string;
  type: "youtube" | "drive" | "live";
  link: string;
  duration?: string;
  views?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  chapter?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}