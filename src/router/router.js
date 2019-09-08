/* eslint-disable global-require */

const Mainsite = r => require.ensure([], () => r(require('@/layout/MainSite.vue')), 'Mainsite');
const Default = r => require.ensure([], () => r(require('@/layout/Default.vue')), 'Default');

const Index = r => require.ensure([], () => r(require('@/page/Index/Index.vue')), 'Index');
const ChangeCity = r => require.ensure([], () => r(require('@/page/ChangeCity/ChangeCity.vue')), 'ChangeCity');
const Search = r => require.ensure([], () => r(require('@/page/Search/Search.vue')), 'Search');
const Product = r => require.ensure([], () => r(require('@/page/Product/Product.vue')), 'Product');
const Groupbuy = r => require.ensure([], () => r(require('@/page/Groupbuy/Groupbuy.vue')), 'Groupbuy');
const Account = r => require.ensure([], () => r(require('@/page/Account/Account.vue')), 'Account');
const UserInfos = r => require.ensure([], () => r(require('@/page/Account/subs/UserInfos.vue')), 'UserInfos');
const UserOrders = r => require.ensure([], () => r(require('@/page/Account/subs/UserOrders.vue')), 'UserOrders');
const UserFavors = r => require.ensure([], () => r(require('@/page/Account/subs/UserFavors.vue')), 'UserFavors');
const UserVouchers = r => require.ensure([], () => r(require('@/page/Account/subs/UserVouchers.vue')), 'UserVouchers');
const UserSettings = r => require.ensure([], () => r(require('@/page/Account/subs/UserSettings.vue')), 'UserSettings');

const Login = r => require.ensure([], () => r(require('@/page/Login/Login.vue')), 'Login');
const Register = r => require.ensure([], () => r(require('@/page/Register/Register.vue')), 'Register');

const NotFound = r => require.ensure([], () => r(require('@/page/NotFound/NotFound.vue')), 'NotFound');


export default [
  {
    path: '/',
    name: 'mainsite', // header + main + footer 结构模板
    component: Mainsite,
    redirect: '/index',
    children: [
      {
        path: '/index', // 首页
        name: 'index',
        component: Index,
      },
      {
        path: '/change-city', // 切换城市页
        name: 'change-city',
        component: ChangeCity,
      },
      {
        path: '/search', // 搜索页
        name: 'search',
        component: Search,
      },
      {
        path: '/product/:id', // 产品页
        name: 'product',
        component: Product,
      },
      {
        path: '/groupbuy', // 团购详情页
        name: 'groupbuy',
        component: Groupbuy,
      },
      {
        path: '/account', // 用户账户内容页
        name: 'account',
        redirect: '/account/userinfos',
        component: Account,
        meta: { requireAuth: true },
        children: [
          {
            path: '/account/userinfos', // 用户信息页
            name: 'userinfos',
            component: UserInfos,
          },
          {
            path: '/account/userorders/:status', // 用户订单页
            name: 'userorders',
            component: UserOrders,
          },
          {
            path: '/account/userfavors/:status', // 用户收藏页
            name: 'userfavors',
            component: UserFavors,
          },
          {
            path: '/account/uservouchers/:status', // 用户优惠券页
            name: 'uservouchers',
            component: UserVouchers,
          },
          {
            path: '/account/settings', // 用户设置页
            name: 'settings',
            component: UserSettings,
          },
        ],
      },
      {
        name: 'not-found',
        path: '/not-found',
        component: NotFound,
      },
    ],
  },
  {
    path: '/default', // 空白页面模板
    redirect: '/login',
    component: Default,
    children: [
      {
        path: '/login', // 用户登录页
        name: 'login',
        component: Login,
      },
      {
        path: '/register', // 用户注册页
        name: 'register',
        component: Register,
      },
    ],
  },
  { path: '*', redirect: 'not-found' },
];
