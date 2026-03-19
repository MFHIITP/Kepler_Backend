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

export const playlistData: { [key: string]: VideoItem[] } = {
  dsa: [],
  ml: [],
  webdev: [],
  fundamentals: [
    {
      id: 1,
      name: "GFG POTD 25/8/2025",
      time: "55:30",
      type: "drive",
      link: "https://drive.google.com/file/d/15uQmVE9Lw27VkwIkqHQF4s5qApTsOye7/preview",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
  ],
};