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
  dsa: [
    {
      id: 1,
      name: "GFG POTD 19/8/2025",
      time: "45:30",
      type: "drive",
      link: "https://drive.google.com/file/d/15uQmVE9Lw27VkwIkqHQF4s5qApTsOye7/preview",
      duration: "45:30",
      views: "12.5K",
      isCompleted: true,
      chapter: "Chapter 1: Calculus Basics",
      difficulty: "beginner",
    },
    {
      id: 2,
      name: "GFG POTD 20/8/2025",
      time: "52:15",
      type: "youtube",
      link: "https://youtu.be/uLWgzhrwqxE?si=0TyB-6-MZzeN6OjH",
      duration: "52:15",
      views: "8.9K",
      isCompleted: false,
      chapter: "Chapter 2: Differential Equations",
      difficulty: "intermediate",
    },
    {
      id: 3,
      name: "GFG POTD 21/8/2025",
      time: "38:45",
      type: "youtube",
      link: "https://youtu.be/sex3ZyedK-c?si=PlPJCRh0tVAsoZiT",
      duration: "38:45",
      views: "15.2K",
      isCompleted: false,
      isLocked: false,
      chapter: "Chapter 3: Linear Algebra",
      difficulty: "advanced",
    },
    {
      id: 4,
      name: "GFG POTD 22/8/2025",
      time: "67:22",
      type: "live",
      link: "https://youtu.be/LpSZNZU3BNo?si=21C_c3VsCfOz7blg",
      duration: "67:22",
      views: "6.1K",
      isCompleted: false,
      chapter: "Chapter 4: Complex Analysis",
      difficulty: "advanced",
    },
    {
      id: 5,
      name: "GFG POTD 23/8/2025",
      time: "41:18",
      type: "youtube",
      link: "https://youtu.be/vespTK1Ri0c?si=iTRLxww4CYLcvf_S",
      duration: "41:18",
      views: "9.7K",
      isCompleted: false,
      chapter: "Chapter 5: Statistics",
      difficulty: "intermediate",
    },
    {
      id: 6,
      name: "GFG POTD 24/8/2025",
      time: "41:18",
      type: "drive",
      link: "https://youtu.be/s3vm6rLWDAg?si=ibMLwkJKayDUi5uJ",
      duration: "41:18",
      views: "9.7K",
      isCompleted: false,
      chapter: "Chapter 5: Statistics",
      difficulty: "intermediate",
    },
  ],
  ml: [
    {
      id: 1,
      name: "GFG POTD 25/8/2025",
      time: "55:30",
      type: "youtube",
      link: "https://youtu.be/rl3_zPFaRR4?si=yMmfoc6gh3098OOQ",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
  ],
  webdev: [
    {
      id: 1,
      name: "GFG POTD 25/8/2025",
      time: "55:30",
      type: "youtube",
      link: "https://youtu.be/rl3_zPFaRR4?si=yMmfoc6gh3098OOQ",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
  ],
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