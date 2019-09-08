import axios from './axios-decoration';

/*
  * 获得header城市信息
  * */
export const getCurrentLocation = params => axios.get('/common/current-location', { params });

/*
* 获得"猜你喜欢"通用推荐项目
* */

export const getUserLike = params => axios.get('/common/user-like', { params });

/*
* 获得"美团导航"栏目列表数据
* */
export const getHotNav = params => axios.get('/common/hot-nav', { params });

/*
* 获得搜索栏热词
* */
export const getHotSeachWords = params => axios.get('/common/hot-search-words', { params });

/*
* 获得搜索框搜索提示
* */

export const getSearchRecommend = params => axios.get('/common/search-recommend', { params });

/*
* 评论点赞
* */

export const toggleCommentLike = params => axios.post('/common/toggle-like', params);


/*
 * 获得首页"有格调"推荐项目信息
 * */
export const getIndexElegant = params => axios.get('/index/index-elegant', { params });

/*
* 获得首页"狠优惠"推荐项目信息
* */

export const getIndexDiscount = params => axios.get('/index/index-discount', { params });

/*
* 获得首页"猫眼电影"推荐项目信息
* */

export const getIndexMovie = params => axios.get('/index/index-movie', { params });

/*
* 获得首页"推荐民宿"推荐项目信息
* */

export const getIndexZhenguo = params => axios.get('/index/index-zhenguo', { params });

/*
* 获得切换城市页面省份列表信息
* */
export const getProvinceList = params => axios.get('/change-city/province-list', { params });

/*
* 获得切换城市页面省份列表信息
* */
export const getCityList = params => axios.get('/change-city/city-list', { params });

/*
* 获得所有城市首字母列表
* */

export const getCityAlphabet = params => axios.get('/change-city/city-alphabet', { params });

/*
* 获得所有城市首字母列表
* */

export const getHotCity = params => axios.get('/change-city/hot-city', { params });

/*
* 获得所有城市搜索列表
* */

export const getCitySuggestion = params => axios.get('/change-city/city-suggestion', { params });

/*
* 获得产品搜索列表
* */

export const getSearchInfo = params => axios.get('/search/search-info', { params });

/*
* 获得产品搜索列表
* */

export const getSearchFilter = params => axios.get('/search/search-filter', { params });

/*
* 获得产品信息
* */

export const getProductInfo = params => axios.get('/product/product-info', { params });

/*
* 获得产品评论
* */

export const getProductComment = params => axios.get('/product/product-comment', { params });


/*
* 获得附近产品
* */

export const getProductNearby = params => axios.get('/product/product-nearby', { params });
/*
* 获得团购信息
* */

export const getGroupbuyInfo = params => axios.get('/groupbuy/groupbuy-info', { params });

/*
* 获得团购评论
* */

export const getGroupbuyComment = params => axios.get('/groupbuy/groupbuy-comment', { params });

/*
* 用户登录
* */

export const verifyUserLogin = params => axios.post('/login/user-login', params);

/*
* 用户注册
* */

export const userRegister = params => axios.post('/register/user-register', params);

/*
* 获得用户简略信息
* */

export const getUserBrief = params => axios.get('/account/user-brief', { params });

/*
* 获得用户详细信息
* */

export const getUserInfo = params => axios.get('/account/user-info', { params });

/*
* 获得用户订单
* */

export const getUserOrder = params => axios.get('/account/user-order', { params });


/*
* 获得用户收藏
* */

export const getUserFavor = params => axios.get('/account/user-favor', { params });

/*
* 删除用户收藏
* */

export const deleteUserFavor = params => axios.post('/account/delete-favor', params);

/*
* 获得用户折扣券
* */

export const getUserVoucher = params => axios.get('/account/user-voucher', { params });

/*
* 更改用户头像
* */

export const changeUserAvatar = params => axios.post('/account/change-avatar', params);

/*
* 更改用户名
* */

export const changeUserName = params => axios.post('/account/change-username', params);

/*
* 更改生日
* */

export const changeBirthday = params => axios.post('/account/change-birthday', params);

/*
* 更改密码
* */

export const changePassword = params => axios.post('/account/change-password', params);
