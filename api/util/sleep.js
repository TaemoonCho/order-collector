const interval = parseInt(process.env.IMWEB_API_CALL_INTERVAL_MILSEC);

const sleep = (ms = interval) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export { sleep };
