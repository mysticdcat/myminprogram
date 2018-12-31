export const defaultPromotion = {
    id: 0,
    title: '活动标题',
    store_id: 0,
    store_lat: 0,
    store_lng: 0,
    price: 0.00,            // 起步价1元
    type: 1,                // 1：抵扣 2：折扣
    offset: 0.00,           // 0表示无门槛
    value: 0.00,            // 面额
    days: 0,               // 优惠劵的有效天数
    start_at: '0000-00-00',         // 有效期起始日期
    end_at: '0000-00-00',           // 有效期结束日期
    overed_at: null,        // 活动下架日期，NULL表示长期有效
    receive_limit: 0,       // 每用户领取上限
    day_limit: 0,           // 每日前x张名用，0表示不限
    quantity: 0,            // 劵的总发行量，0表示不限量
    received: 0,            // 本活动已领取的劵量
    used: 0,                // 本活动已核销的劵量
    used_commission: 0.00,  // 使用佣金
    receive_commission: 0.00, // 领取佣金
    content: '',            // 使用须知
    status: 0,              // 待审核
    images: [],             // 活动展示图
    store: {
        data: {
            name: '店铺名称',
            address: '',
            open_time: '',
        }
    }
}