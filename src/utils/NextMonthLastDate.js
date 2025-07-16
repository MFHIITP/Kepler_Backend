const getLastDateOfNextMonth = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const lastDate = new Date(year, month + 2, 0);
    return lastDate;
}
export {getLastDateOfNextMonth}