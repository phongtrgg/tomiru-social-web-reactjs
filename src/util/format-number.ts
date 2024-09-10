export const formatUserBalance = (num: number) => {
    const formattedNum = num.toFixed(2);

    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(".", ".");
};
