import Fly from 'flyio/dist/npm/wx';
import { apiHost } from '@/config';

const fly = new Fly;
// fly.interceptors.request.use((request) => {
//
// });

fly.interceptors.response.use(response => {
    wx.hideLoading();
    return response.data;
}, err => {
    wx.hideLoading();
    return err.response;
});

fly.config.baseURL = apiHost;

export default fly;
