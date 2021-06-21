const koreanToDeliveryTime = (sourceString) => {
    const testRegEx =
        /((0?[1-9]|1[012])(월))(\s|)((?:\b)(([1-9]|0[1-9]|[1-2][0-9]|3[0-1])?)(?:\b|\/)(일))(\s|)(\([월화수목금토일]\)|)(\s|)(([01]?[0-9]|2[0-3]):([0-5][0-9])(\s|)-(\s|)([01]?[0-9]|2[0-3]):([0-5][0-9]))/gi;
    if (testRegEx.test(sourceString)) {
        try {
            const str = sourceString.replace(/\s/g, "");
            let month = 0;
            let day = 0;
            // date and weekdays
            const regExForMonth = /([0-9]?)([0-9])(월)/gi;
            const monthString = str.match(regExForMonth)[0];
            month = parseInt(monthString.split("월")[0]);
            if (month > 12 || month <= 0) return null;

            const regExForDay =
                /((?:\b)(([1-9]|0[1-9]|[1-2][0-9]|3[0-1])?)(?:\b|\/)(일))/gi;
            const dayString = str.match(regExForDay)[0];
            day = parseInt(dayString.split("일")[0]);

            // time
            const regExForTimes =
                /(([01]?[0-9]|2[0-3]):([0-5][0-9]))-(([01]?[0-9]|2[0-3]):([0-5][0-9]))/gi;
            const timesString = str.match(regExForTimes)[0];
            const splitedTimeString = timesString.split("-");
            const startTime =
                splitedTimeString[0].length < 5
                    ? "0" + splitedTimeString[0]
                    : splitedTimeString[0];
            const endTime =
                splitedTimeString[1].length < 5
                    ? "0" + splitedTimeString[1]
                    : splitedTimeString[1];

            const now = new Date();
            let year = now.getFullYear();

            // Final format must be YYYY-MM-DDThh:mm+07
            let dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
                day < 10 ? "0" : ""
            }${day}`;
            let startDateString = `${dateString}T${startTime}:00+07:00`;
            if (Date.parse(startDateString) < now.getTime()) {
                year += 1;
                dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
                    day < 10 ? "0" : ""
                }${day}`;
            }

            // const startDate = new Date(startDateString);
            const startTimestamp = Math.floor(
                Date.parse(startDateString) / 1000,
            );
            // const endDateString = `${dateString}T${endTime}:00+07:00`;
            // const endTimestamp = Date.parse(endDateString);
            // const endDate = new Date(endDateString);

            return {
                startTimestamp: startTimestamp,
                // endTimestamp: endTimestamp,
                keyString: `${dateString} ${startTime}~${endTime}`,
            };
        } catch (error) {
            return null;
        }

        // const regExForStartHour = //gi;
        // const regExForStartMin = //gi;
        // const regExForEndHour = //gi;
        // const regExForEndMin = //gi;
    } else return null;
};

export { koreanToDeliveryTime };
