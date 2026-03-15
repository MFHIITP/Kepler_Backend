export class MapCourseToGoogleGroup {
    private static courseToGroupMap: Record<string, string[]> = {
        "Computer Science - DSA for Placement and Contests": ["dsa"],
        "Computer Science - Artificial Intelligence: Explore the Future": ["ml"],
        "Computer Science - Development Crash Course: Projects Made Easier": ["webdev"],
        "Computer Science - Fundamentals Course: Crack GATE With Ease": ["fundamentals"],
        "Computer Science - Placements Made Easier": ["webdev", "dsa", "fundamentals", "ml"]
    }

    public static getCourseToGoogleGroup = (courseName: string) => {
        return MapCourseToGoogleGroup.courseToGroupMap[courseName];
    }
}