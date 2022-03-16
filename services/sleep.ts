export const sleep = <T>(timeout: number, data?: T) =>
    new Promise<T | undefined>((res, _rej) => {
        setTimeout(() => res(data), timeout);
    });
