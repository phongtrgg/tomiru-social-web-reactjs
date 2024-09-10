import format from "date-fns/format";
import isYesterday from "date-fns/isYesterday";
import isMonday from "date-fns/isMonday";
import isTuesday from "date-fns/isTuesday";
import isWednesday from "date-fns/isWednesday";
import isThursday from "date-fns/isThursday";
import isFriday from "date-fns/isFriday";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import isToday from "date-fns/isToday";
import usLang from "date-fns/locale/en-US/index";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { PollResponse } from "../types/tweet";
import { HOUR_MINUTE_AMPM } from "../constants/common-constants";
import { t } from "i18next";

export const formatDate = (date: Date): string => {
    return format(date, "MMM d");
};

export const formatScheduleDate = (date: Date): string => {
    return format(date, "EEE, MMM d, yyyy 'at' hh:mm a");
};

export const formatChatMessageDate = (date: Date): string => {
    const datePattern = format(date, HOUR_MINUTE_AMPM, { locale: usLang });

    if (isToday(date)) return datePattern;

    if (isYesterday(date)) return `Yesterday at ${datePattern}`;

    if (isMonday(date)) return `Mon ${datePattern}`;

    if (isTuesday(date)) return `Tue ${datePattern}`;

    if (isWednesday(date)) return `Wed ${datePattern}`;

    if (isThursday(date)) return `Thu ${datePattern}`;

    if (isFriday(date)) return `Fri ${datePattern}`;

    if (isSaturday(date)) return `Sat ${datePattern}`;

    if (isSunday(date)) return `Sun ${datePattern}`;

    return format(date, "MMM dd, hh:mm a", { locale: usLang });
};

export const voteFormatDate = (poll: PollResponse): string => {
    const diffInDays = differenceInDays(new Date(poll?.createdAt!), Date.now());
    const diffInHours = differenceInHours(new Date(poll?.createdAt!), Date.now());
    const diffInMinutes = differenceInMinutes(new Date(poll?.createdAt!), Date.now());

    if (diffInDays !== 0) {
        return diffInDays + " days";
    } else if (diffInHours !== 0) {
        return diffInHours + " hours";
    } else {
        return diffInMinutes + " minutes";
    }
};
export const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return t("just now");
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${t("minutes ago")}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${t("hours ago")}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} ${t("days ago")}`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} ${t("weeks ago")}`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} ${t("months ago")}`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} ${t("years ago")}`;
};
//hàm format lại thời gian từ Timestamp
export const formatTimestamp = (time: string) => {
    const timestamp = time;
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("en-GB");
};
export const formatVaultEndTime = (milliseconds: number) => {
    let totalSeconds = Math.floor(milliseconds / 1000);

    const days = Math.floor(totalSeconds / (24 * 3600));
    totalSeconds %= 24 * 3600;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
};
