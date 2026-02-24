export class FindCourseReferralAmount {
    private static referralAmounts = {
        OneCourseWithoutPlacement: 150,
        TwoCoursesWithoutPlacement: 200,
        ThreeCoursesWithPlacement: 500,
        FourCoursesWithPlacement: 700
    }

    constructor () {

    }

    public static findAmount = ({courseList, additionalCourses}: {courseList: string[], additionalCourses: string[]}) => {
        if(!courseList.includes('Computer Science - Placements Made Easier')){
            if(courseList.length == 2){
                return FindCourseReferralAmount.referralAmounts.TwoCoursesWithoutPlacement;
            }
            else{
                return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
            }
        }
        else if(additionalCourses.length == 2){
            return FindCourseReferralAmount.referralAmounts.FourCoursesWithPlacement;
        }
        else if(additionalCourses.length == 1){
            return FindCourseReferralAmount.referralAmounts.ThreeCoursesWithPlacement;
        }
        return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
    }
}