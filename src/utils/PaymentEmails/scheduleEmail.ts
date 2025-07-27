import { scheduler } from "../../index";

export const scheduleEmailPaymentReminder = async(receiverEmail: string, receiverName: string, courses: string[]) => {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(targetDate.getDate() + 29);
    targetDate.setHours(9, 0, 0, 0);

    const delay = targetDate.getTime() - currentDate.getTime();

    await scheduler.add('sendPaymentReminder', {
        receiverEmail: receiverEmail,
        receiverName: receiverName,
        courses: courses,
    }, {
        delay: delay,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 3000
        }
    })
}