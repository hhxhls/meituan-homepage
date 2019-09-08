<template>
    <div class="register-page">
        <header class="page-header">
            <div class="header-content">
                <a class="page-icon-box" href="/index">美团</a>
                <div class="to-login">
                    <span class="des">已有美团账号？</span>
                    <a href="/login" class="login btn">登录</a>
                </div>
            </div>
        </header>
        <main class="page-main">
            <div class="register-box">
                <div class="phone rg-line">
                    <label class="rg-label phone-label">手机号</label>
                    <input type="text"
                           class="rg-input phone-input"
                           :class="{warn:phoneWarn}"
                           v-model="phoneInfo"
                           @focus="clearWarn('phoneWarn')"
                           @focus.once ="hideDes"
                           @blur="verifyPhone">
                    <span class="phone-des" v-if="showPhoneDes">注册成功后，全美团通用</span>
                    <span class="warn-info phone-warn"
                          :class="{show: phoneWarn}">
                        <i class="noti warn"></i>
                        {{phoneWarn}}</span>
                    <span class="checked" :class="{show:phoneChecked}">
                        <i class="noti ok"></i>
                    </span>
                </div>
                 <div class="get-ms-code rg-line">
                     <input type="button"
                            class="btn get-ms-btn"
                            value="免费获取动态短信码"
                            @click="showCode($event)">
                 </div>
                <div class="ms-code rg-line">
                    <label class="rg-label ms-label">短信动态码</label>
                    <input type="text"
                           class="rg-input ms-input"
                           v-model="msCode"
                           @focus="clearWarn('msWarn')"
                           @blur="verifyMs">
                    <span class="warn-info ms-warn"
                            :class="{show: msWarn}">
                        <i class="noti warn"></i>
                        {{msWarn}}</span>
                    <span class="checked" :class="{show:msChecked}">
                        <i class="noti ok"></i>
                    </span>
                </div>
                <div class="pw1 rg-line">
                    <div class="input-box">
                        <label class="rg-label pw1-label">创建密码</label>
                        <input type="password"
                            class="rg-input pw1-input"
                            maxlength="32"
                            v-model="pw1"
                            @focus="clearWarn('pw1Warn')"
                            @blur="verifyPw1"
                            @input="checkPasswordStrength">
                        <span class="warn-info pw1-warn"
                              :class="{show: pw1Warn}">
                            <i class="noti warn"></i>
                            {{pw1Warn}}</span>
                    <span class="checked" :class="{show:pw1Checked}">
                        <i class="noti ok"></i>
                    </span>
                    </div>
                    <div class="pw-strength-container">
                        <div class="str-bar"
                             :class="[pwStrength]"></div>
                        <div class="str-level-box">
                            <span class="weak str-level">弱</span>
                            <span class="normal str-level">中</span>
                            <span class="strong str-level">强</span>
                        </div>
                    </div>
                </div>
                <div class="pw2 rg-line">
                    <label class="rg-label pw2-label">确认密码</label>
                    <input type="password"
                           class="rg-input pw2-input"
                           maxlength="20"
                            @focus="clearWarn('pw2Warn')"
                            @blur="verifyPw2"
                            @input="checkPasswordStrength"
                           v-model="pw2">
                    <span class="warn-info pw2-warn"
                          :class="{show: pw2Warn}">
                        <i class="noti warn"></i>
                        {{pw2Warn}}</span>
                    <span class="checked" :class="{show:pw2Checked}">
                        <i class="noti ok"></i>
                    </span>
                </div>
                <div class="submit-box rg-line">
                    <input type="button"
                           class="submit-btn btn"
                           value="同意一下协议并注册"
                           @click="registerSubmit"
                        >
                </div>
                <a class="agreement with-underline">《美团网用户协议》</a>
            </div>
        </main>
        <footer class="page-footer">
            <span class="trade-mark">©</span>
            <router-link :to="{name:'index'}" class="with-underline grey">meituan.com</router-link>
            <a href="" class="with-underline grey">京ICP证070791号</a>
            <span>京公网安备11010502025545号</span>
        </footer>
    </div>
</template>

<script>
import { userRegister } from '@/api/api';
import { mapMutations } from 'vuex';


const zxcvbn = require('zxcvbn');

export default {
  data() {
    return {
      phoneInfo: '', // 注册用手机号
      phoneWarn: '', // 对手机号的合法性提示
      phoneChecked: false, // 手机号是否通过验证
      showPhoneDes: true,
      msCode: '', // 短信验证码
      msWarn: '', // 验证码提示
      msChecked: false, // 验证码是否通过验证
      pw1: '', // 用户输入的密码设置
      pw1Warn: '', // 密码提示
      pw1Checked: false, // 密码是否通过验证
      pwStrength: 'none', // 密码强度
      pw2: '', // 再次输入的密码
      pw2Warn: '', // 再次输入密码的提示信息
      pw2Checked: false, // 再次输入的密码是否通过验证
    };
  },
  methods: {
    ...mapMutations(['changeUsername']),
    // 清除页面提示信息
    clearWarn(key) {
      if (!key.includes('Warn')) {
        return;
      }

      this[key] = '';
    },
    // 验证输入手机号合法性
    verifyPhone() {
      if (this.phoneInfo === '') {
        this.phoneWarn = '请输入您的手机号码';
        this.phoneChecked = false;
      } else if (Number.isNaN(Number(this.phoneInfo)) || this.phoneInfo.length !== 11) {
        this.phoneWarn = '请输入正确的11位手机号码';
        this.phoneChecked = false;
      } else {
        this.phoneChecked = true;
      }
      return this.phoneChecked;
    },
    // 隐藏初始的电话说明
    hideDes() {
      this.showPhoneDes = false;
    },
    // 在点击发送验证码后，提示一个模拟的测试验证码
    showCode(e) {
      const event = e;
      this.showPhoneDes = false;
      const verify = this.verifyPhone();
      if (verify) {
        event.target.value = '测试码123456';
      }
    },
    // 对短信验证码进行检验
    verifyMs() {
      if (this.msCode === '') {
        this.msWarn = '请输入短信动态码';
        this.msChecked = false;
      } else if (Number.isNaN(Number(this.msCode)) || this.msCode.length !== 6) {
        this.msWarn = '输入错误，请重新输入';
        this.msChecked = false;
      } else {
        this.msChecked = true;
      }
      return this.msChecked;
    },
    // 检验密码
    verifyPw1() {
      if (this.pw1 === '') {
        this.pw1Warn = '请填写密码';
        this.pw1Checked = false;
      } else if (this.pw1.length < 6) {
        this.pw1Warn = '密码太短，至少6个字符';
        this.pw1Checked = false;
      } else {
        this.pw1Checked = true;
      }
      return this.pw1Checked;
    },
    // 检查密码强度
    checkPasswordStrength() {
      const { score } = zxcvbn(this.pw1);
      if (this.pw1 === '') {
        this.pwStrength = 'none';
        return;
      }
      if (score < 1 || this.pw1.length < 6) {
        this.pwStrength = 'weak';
      } else if (score < 3) {
        this.pwStrength = 'normal';
      } else {
        this.pwStrength = 'strong';
      }
    },
    // 检查再次输入的密码
    verifyPw2() {
      if (this.pw1 === '') {
        this.pw2Warn = '请再次密码';
        this.pw2Checked = false;
      } else if (this.pw1 !== this.pw2) {
        this.pw2Warn = '两次输入的密码不一致，请重新输入';
        this.pw2Checked = false;
      } else {
        this.pw2Checked = true;
      }
      return this.pw2Checked;
    },
    // 用户提交注册信息
    registerSubmit() {
      const {
        verifyPhone,
        verifyMs,
        verifyPw1,
        verifyPw2,
        phoneInfo,
        pw1,
      } = this;
      const verifyArr = [verifyPhone(),
        verifyMs(),
        verifyPw1(),
        verifyPw2()];
      const allChecked = verifyArr.every(ele => ele);
      if (allChecked) {
        this.sendRegisterRequest(phoneInfo, pw1);
      }
    },
    // 向后台验证注册信息
    async sendRegisterRequest(phone, password) {
      const res = await userRegister({
        phone,
        password,
      });
      if (res.data.status === 'success') {
        this.changeUsername(res.data.data.username);
        this.$writeCache('username', {
          name: res.data.data.username,
          time: new Date().getTime() / 1000,
        });
        this.$router.push({ name: 'index' });
      } else {
        this.phoneWarn = res.data.msg;
      }
    },
  },


};
</script>

<style lang="scss">
    @import '@/style/register/register.scss';
</style>
