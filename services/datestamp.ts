const DAY = 24 * 60 * 60 * 1000

export const getDateStamp = (date?: Date | string | number): string => {
    const timestamp = (date === undefined ? new Date() : new Date(date)).getTime();
    return String((timestamp - timestamp % DAY) / DAY)
}