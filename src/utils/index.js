export function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatPromotionIntro(promotion, hasExpired = true) {
    let intro = [];
    const { type, overed_at, offset, day_limit, days, start_at, end_at} = promotion;

    intro.push('活动类型：' + (parseInt(type) === 1 ? '满减抵扣活动' : '优惠折扣活动'));
    intro.push('活动截止：' + (overed_at ? overed_at : '长期有效'));
    intro.push('使用门槛：' + (parseFloat(offset) ? `单笔消费满 ￥${parseFloat(offset).toFixed(2)} 可用` : '优惠劵无使用门槛'));
    if (parseInt(day_limit)) {
        intro.push(`每日限额：仅限每天前 ${parseInt(day_limit)} 可用`);
    }
    if (hasExpired) {
        intro.push('劵有效期：' + (parseInt(days) > 0 ? `自领取之日起 ${parseInt(days)} 天内有效` : `${start_at} ~ ${end_at}`));
    }

    return intro.join('\n');
}
