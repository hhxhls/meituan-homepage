<template>
    <div class="login-page">
        <header class="page-head">
            <a href="" class="img-link">美团网</a>
        </header>
        <main class="page-main">
            <div class="img-box">
                <img src="/image/login/login-cover.jpg" alt="" class="cover-img">
            </div>
            <div class="login-wrap">
             <form class="login-box">
                <div class="warn-info" :class="{show:warnMsg}">
                    <i class="tip warn"></i>
                    {{warnMsg}}
                </div>
                <p class="login-toggle">
                    <span class="des">账号登录</span>
                    <span class="toggle" @click="toggleLogType">
                        <span> {{logType === 'pw'?'手机动态码登录':'普通方式登录'}}</span>
                        <i :class="{'cell':logType === 'pw','head': logType === 'ms'}"></i>
                    </span>
                </p>
                <div class="login-info">
                    <div class="phone-no input-box"
                         :class="{active:activeInput==='phone'}">
                        <span class="local-no">+86
                            <i class="arrow"></i>
                        </span>
                        <input type="text"
                               placeholder="手机号"
                               class="phone-input input-content"
                               v-model="userIdentifier"
                               @focus="inputActive('phone')"
                               @blur="inputBlur">
                    </div>
                    <div class="verify">
                        <div class="pw-log input-box"
                            :class="{active:activeInput==='pw'}"
                            v-if="logType === 'pw'" >
                            <i class="icon"></i>
                            <input type="password"
                                placeholder="密码"
                                class="pw-input input-content"
                                v-model="password"
                                @focus="inputActive('pw')"
                                @blur="inputBlur">
                        </div>
                        <div class="ms-log input-box"
                            :class="{active:activeInput==='ms'}"
                             v-else>
                            <i class="icon"></i>
                            <input type="text"
                                placeholder="动态码"
                                class="ms-input input-content"
                                v-model="messageCode"
                                @focus="inputActive('ms')"
                                @blur="inputBlur">
                            <input type="button"
                                   class="send-code"
                                   :value="sendBtnMsg"
                                   @click="getMsCode">
                        </div>
                    </div>
                </div>
                <p class="foget-pw">
                    <a href="">忘记密码?</a>
                    </p>
                <input type="submit"
                       class="btn submit"
                       value="登录"
                       @click.prevent="logBtnClick">
                <div class="noti">
                    <div class="no-register" v-if="logType === 'pw'">
                        还没有账号？
                        <a href="/register">免费注册</a>
                    </div>
                    <div class="agree" v-else>
                    提示：未注册美团账号的手机号，登录时将自动注册美团账号，且代表您已同意
                    <a href="">《美团网用户协议》</a>
                    </div>
                </div>
                 <div class="third-party-login">
                    <h4 class="title">用合作网站账号登录</h4>
                    <div class="third-party-icons">
                        <a class="qq" href=""></a>
                        <a class="weibo" href=""></a>
                    </div>
                 </div>
             </form>
            </div>
        </main>
        <footer class="page-footer">
            <ul class="about">
                <li> <a href="">关于美团</a></li>
                <li> <a href="">加入我们</a></li>
                <li> <a href="">商家入驻</a></li>
                <li> <a href="">帮助中心</a></li>
                <li> <a href="">美团手机版</a></li>
            </ul>
            <div class="copy">
                <span>@2019 </span>
                <a href="">美团网团购</a>
                <span> meituan.com </span>
                <a href="">京ICP证070791号 </a>
                <span>京公网安备11010502025545号</span>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { verifyUserLogin } from '@/api/api';

export default {
  data() {
    return {
      logType: 'pw', // 登录方式
      userIdentifier: '', // 用户登录手机号
      password: '', // 密码
      messageCode: '', // 短信验证码
      activeInput: '', // 密码 / 验证码 内容
      alreadySent: false, // 是否已发送验证码
      resendCount: 60, // 验证码再发送倒计时
      sendBtnMsg: '获取手机动态码', // 验证码按钮信息
      warnMsg: '', // 提示信息
    };
  },
  methods: {
    ...mapMutations(['changeUsername']),
    // 切换登录方式
    toggleLogType() {
      this.userIdentifier = '';
      this.password = '';
      this.messageCode = '';
      if (this.logType === 'pw') {
        this.logType = 'ms';
      } else {
        this.logType = 'pw';
      }
    },
    // 密码/ 验证码 输入框聚焦时清空提示信息
    inputActive(input) {
      this.warnMsg = '';
      this.activeInput = input;
    },
    // 密码/ 验证码 输入框失去焦点
    inputBlur() {
      this.activeInput = '';
    },
    // 修改提示信息
    warn(msg) {
      this.warnMsg = msg;
    },
    // 进行登录信息验证
    logInfoVerify() {
      let condition = false;
      let nameType;
      let codeType;
      const { userIdentifier } = this;
      let verifyCode;
      const reg = /^[0-9]{11}$/;
      if (this.logType === 'pw') {
        nameType = '账号';
        codeType = '密码';
        verifyCode = this.password;
      } else {
        nameType = '手机号';
        codeType = '动态码';
        verifyCode = this.messageCode;
      }
      if (nameType === '手机号' && !this.alreadySent) {
        this.warn(`请先获取${codeType}`);
      } else if (userIdentifier === '' && this.password === '') {
        this.warn(`请输入${nameType}和${codeType}`);
      } else if (verifyCode === '') {
        this.warn(`请输入${codeType}`);
      } else if (userIdentifier === '') {
        this.warn(`请输入${nameType}`);
      } else if (!reg.test(userIdentifier)) {
        this.warn(`请输入正确的${nameType}`);
      } else {
        condition = true;
      }
      return condition;
    },
    // 用户点击登录按钮
    logBtnClick() {
      const {
        userIdentifier, logType, password, messageCode,
      } = this;
      const verifyRet = this.logInfoVerify();
      if (verifyRet) {
        this.sendVerifyRequest(userIdentifier, password, messageCode, logType);
      }
    },
    // 向后台验证用户登录信息
    async sendVerifyRequest(identifier, password, messageCode, type) {
      const res = await verifyUserLogin({
        identifier,
        password,
        messageCode,
        type,
      });
      const { data } = res;
      this.userIdentifier = '';
      this.password = '';
      this.messageCode = '';
      if (data.status === 'success') {
        this.changeUsername(data.data.username);
        this.$writeCache('username', {
          name: data.data.username,
          time: new Date().getTime() / 1000,
        });
        this.$router.push({ name: 'index' });
      } else {
        this.warn(data.msg);
      }
    },
    // 模拟发送短信验证码
    getMsCode() {
      this.alreadySent = true;
      const timer = window.setInterval(() => {
        if (this.resendCount) {
          this.resendCount = this.resendCount - 1;
          this.sendBtnMsg = `重新获取(${this.resendCount})`;
        } else {
          clearInterval(timer);
          this.sendBtnMsg = '重新获取';
          this.resendCount = 60;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/login/login.scss';
</style>
