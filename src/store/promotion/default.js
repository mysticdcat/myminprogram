import { promotionMaxQuantity, promotionMinRevMission } from '@/config';

export const defaultPromotion = {
    id: 0,
    title: '',
    store_id: 0,
    store_lat: 0,
    store_lng: 0,
    price: 1.00,            // 起步价1元
    type: 1,                // 1：抵扣 2：折扣
    offset: 0.00,           // 0表示无门槛
    value: 1.00,            // 面额
    days:  0,               // 优惠劵的有效天数
    start_at: null,         // 有效期起始日期
    end_at: null,           // 有效期结束日期
    overed_at: null,        // 活动下架日期，NULL表示长期有效
    receive_limit: 0,       // 每用户领取上限
    day_limit: 0,           // 每日前x张名用，0表示不限
    quantity: promotionMaxQuantity,            // 劵的总发行量，0表示不限量
    received: 0,            // 本活动已领取的劵量
    used: 0,                // 本活动已核销的劵量
    used_commission: 0.00,  // 使用佣金
    receive_commission: promotionMinRevMission, // 领取佣金
    content: '本劵不支持退款、兑现、找零；\n单笔消费限用一张，不可叠加使用、不与其他优惠同享；\n本劵需在有效期内使用，过期作废；\n本活动最终解释权归本店所有。',            // 使用须知
    status: 0,              // 待审核
    images: [],             // 活动展示图
}
