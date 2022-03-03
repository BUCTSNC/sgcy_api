/**
 * like函数构建的RegExp是大小写不敏感的，除非使用flags声明
 */
export function like(content: string, flags = "i") {
    return new RegExp(`*${content}*`, flags);
}

/**
 * exact函数构建的RegExp是大小写敏感的，除非使用flags声明
 */
export function exact(content: string, flags = "") {
    return new RegExp(`^${content}$`, flags);
}

export function caseSensive(content: string) {
    return new RegExp(content);
}

export function caseInsenesive(content: string) {
    return new RegExp(content, "i");
}

/**
 * startWith函数构建的RegExp是大小不写敏感的，除非使用flags声明
 */
export function startWith(content: string, flags = "i") {
    return new RegExp(`^${content}`, flags);
}

/**
 * endWith函数构建的RegExp是大小不写敏感的，除非使用flags声明
 */
export function endWith(content: string, flags = "i") {
    return new RegExp(`${content}$`, flags);
}