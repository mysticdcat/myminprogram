export const apiHost = "https://www.huizaiquan.com/api/";
// export const apiHost = "http://coupon.cc/api";
 //export const apiHost = "http://hzq.cc/api/";

export const imgHost = "https://img.huizaiquan.com/";
export const sckHost = "https://sck.huizaiquan.com/";
export const goHost = "https://api.huizaiquan.com/";
// export const goHost = "http://localhost:8088/";

export const storeStatus = [
    { status: -100, color: '#777777', text: '已禁用' },
    { status: -1, color: '#f5222d', text: '未通过' },
    { status: 0, color: '#1890ff', text: '审核中' },
    { status: 1, color: '#52c41a', text: '正常' },
];

export const promotionStatus = [
    { status: -100, color: '#777777', text: '已下架' },
    { status: -1, color: '#f5222d', text: '未通过' },
    { status: 0, color: '#1890ff', text: '审核中' },
    { status: 1, color: '#52c41a', text: '进行中' },
];

export const promotionMaxQuantity = 100; //最大发劵量
export const promotionMinRevMission = 1.00; //最小返利

export const pages = {
    novice: {
        url: 'https://www.huizaiquan.com/page/strategy',
        text: '常见问题',
    },
    notice: {
        url: 'https://www.huizaiquan.com/news',
        text: '官方公告',
    },
    about: {
        url: 'https://www.huizaiquan.com/page/about',
        text: '关于我们',
    }
}
