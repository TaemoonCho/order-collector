const YYYYMMDDFromSeconds = (sec) => {
    const date = new Date(sec * 1000);
    const year = new Intl.DateTimeFormat("vi", { year: "numeric" }).format(
        date,
    );
    const month = new Intl.DateTimeFormat("vi", { month: "2-digit" }).format(
        date,
    );
    const day = new Intl.DateTimeFormat("vi", { day: "2-digit" }).format(date);
    return year + month + day;
};

export { YYYYMMDDFromSeconds };
