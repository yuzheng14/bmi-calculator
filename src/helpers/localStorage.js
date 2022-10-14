export function getData(key) {
    if (!localStorage) return;

    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        console.error(`从本地存储中获取 ${key} 失败`, err);
    }
};

export function storeData(key, item) {
    if (!localStorage) return;

    try {
        return localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
        console.error(`存储 ${key} 到本地存储失败`, err);
    }
};

export function removeLastState() {
    try {
        return localStorage.removeItem("lastState");
    } catch (err) {
        console.error(`删除 lastState 失败`);
    }
}