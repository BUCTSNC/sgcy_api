import { path } from "./deps/std.ts";
import { isVoid } from "./deps/freesia.ts";
import { initDB } from "./memoryDB/db.ts";
import {
    inner,
    msToNext24,
    newDay,
    updateAll,
    updateInner,
    visitLogParser,
    visitLogSerializer,
} from "./memoryDB/logger.ts";
import { root } from "./constant.ts";

const { join } = path;

export default function init() {
    // 启动时初始化数据库
    initDB(false);
    // 每十分钟更新一次数据库
    setInterval(() => initDB(), 10 * 60 * 1000);

    // 从当前的文件中载入数据，没有文件则保持为空
    Deno.readTextFile(join(root, ".visited.json"))
        .catch(() => `[]`)
        .then(visitLogParser)
        .then((data) => {
            if (isVoid(data)) return { date: new Date(), inner: [] };
            return data;
        })
        .then((data) => {
            updateInner(data.inner);
            if (data.date.toDateString() !== new Date().toDateString()) {
                newDay();
            }
            updateAll();
            // 从下一个24点开始，自动执行newDay
            setTimeout(() => {
                setInterval(newDay, 24 * 60 * 60 * 1000);
            }, msToNext24());
            // 每分钟更新一次外部榜单
            setInterval(updateAll, 60 * 1000);
            // 每小时同步一次数据到本地
            setInterval(() => {
                Deno.writeTextFile(
                    join(root, ".visited.json"),
                    visitLogSerializer(
                        { date: new Date(), inner },
                    ),
                );
            }, 60 * 60 * 1000);
        });
}
