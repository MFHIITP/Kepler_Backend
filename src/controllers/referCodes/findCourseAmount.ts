export class FindCourseReferralAmount {
    private static referralAmounts = {
        OneCourseWithoutPlacement: 150,
        TwoCoursesWithoutPlacement: 300,
        ThreeCoursesWithoutPlacement: 450,
        FourCoursesWithoutPlacement: 600,
        ThreeCoursesWithPlacement: 375,
        FourCoursesWithPlacement: 375
    }

    constructor () {

    }

    public static findAmount = ({courseList, additionalCourses}: {courseList: string[], additionalCourses: string[]}) => {
        if(!courseList.includes('Computer Science - Placements Made Easier')){
            if(courseList.length == 2){
                return FindCourseReferralAmount.referralAmounts.TwoCoursesWithoutPlacement;
            }
            else if(courseList.length == 3){
                return FindCourseReferralAmount.referralAmounts.ThreeCoursesWithoutPlacement;
            }
            else if(courseList.length == 4){
                return FindCourseReferralAmount.referralAmounts.FourCoursesWithoutPlacement;
            }
            else{
                return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
            }
        }
        else if(courseList.includes('Computer Science - Placements Made Easier')){
            return FindCourseReferralAmount.referralAmounts.FourCoursesWithPlacement;
        }
        return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
    }
}
