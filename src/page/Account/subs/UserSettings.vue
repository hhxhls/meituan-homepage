<template>
  <div class="user-setting" v-if="userInfo">
    <div class="titles">
      <p class="main-title">个人信息</p>
      <p class="sub-title">账户设置</p>
    </div>
    <div class="setting-box">
      <div class="setting-item" v-for="(item,index) in setting" :key="index">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <img :src="userInfo[item.content]" v-if="item.avatar" class="avatar" />
            <span v-else class="info-content">{{getDes(index)}}</span>
          </div>
        </div>
        <div class="right">
          <button
            class="common-btn"
            @click="initDialog(item.event,item.content,item.title)"
            v-imageupload="item.avatar && initAvatarDialog"
          >{{item.btn || '修改'}}</button>
        </div>
      </div>
    </div>
    <div class="dialog-mask" :class="{'in-dialog':inDialog}">
      <div class="mask-content">
        <c-dialog-box
          :title="dialogTilte"
          confirmText="确认修改"
          cancelText="取消"
          @dialogclose="toggleDialog"
          @dialogcancle="toggleDialog"
          @dialogconfirm="dispatchDialog"
        >
          <div class="dialog-content">
             <div class="change-avatar" v-if="currentDialog === 'avatarUrl'">
               <c-avatar-cropper
                :source="previewImg"
                ref="avatar"
               ></c-avatar-cropper>
             </div>
            <div class="change-username" v-else-if="currentDialog === 'username'">
              <div class="dialog-line">
                <label for class="dialog-lab">当前昵称</label>
                <span class="dialog-value">{{currentUsername}}</span>
              </div>
              <div class="dialog-line">
                <label for class="dialog-lab">新昵称</label>
                <div class="username-set input-box">
                  <input type="text" class="dialog-input" v-model="newUserName" />
                  <div class="des">以中文或英文字母开头，限4-16个字符，一个汉字为两个字符</div>
                  <i
                    class="noti"
                    :class="{warn: warn.username,ok: !warn.username && newUserName}"></i>
                </div>
              </div>
            </div>
            <div class="change-birth" v-else-if="currentDialog === 'birthday'">
              <c-date-picker
                :init-date="currentBirthday"
                @datechange="dateModify"
                class="dialog-line"
              ></c-date-picker>
            </div>
            <div class="change-password" v-else-if="currentDialog === 'safetyLevel'">
              <div class="dialog-line">
                <label class="dialog-lab">当前密码</label>
                <div class="current-pw input-box">
                  <input  type="text"
                          class="dialog-input"
                          v-model="currentPw"
                          :class="{warn:warn.currentPw}"
                          @blur="warnEmptyCurrentPw" />
                  <div class="warn-text"
                      :class="{show:warn.currentPw}">{{warn.currentPw}}</div>
                  <i
                    class="noti"
                    :class="{warn: warn.currentPw,ok: !warn.currentPw && currentPw}"></i>
                </div>

              </div>
              <div class="dialog-line">
                <label for class="dialog-lab">新密码</label>
                <div class="new-pw input-box">
                  <input
                        type="password"
                        maxlength="32"
                        class="dialog-input"
                        :class="{warn:warn.pw1}"
                        v-model="newPw1"
                        @input="checkPw1" />
                  <div class="pw-strength-container">
                    <span
                          class="weak str-level"
                          :class="{active: newPwLevel === 'weak'}">弱</span>
                    <span
                      class="normal str-level"
                      :class="{active: newPwLevel === 'normal'}"
                    >中</span>
                    <span
                      class="strong str-level"
                      :class="{active: newPwLevel === 'strong'}"
                    >强</span>
                  </div>
                   <i
                    class="noti"
                    :class="{warn: warn.pw1,ok: !warn.pw1 && newPw1}"></i>
                  <div
                    class="warn-text"
                    :class="{show:warn.pw1}">{{warn.pw1}}</div>
                  </div>
              </div>
              <div class="dialog-line">
                <label for class="dialog-lab">确认密码</label>
                <div class="confirm-pw input-box">
                  <input
                    type="password"
                    maxlength="32"
                    class="dialog-input"
                    :class="{warn:warn.pw2}"
                    v-model="newPw2"
                    @input="checkPw2" />
                  <div
                    class="warn-text"
                    :class="{show:warn.pw2}">密码不一致，请重新输入</div>
                  <i
                    class="noti"
                    :class="{warn: warn.pw2,ok: !warn.pw2 && newPw2}"></i>
                </div>
              </div>
            </div>
          </div>
        </c-dialog-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  changeUserAvatar, changeUserName, changeBirthday, changePassword,
} from '@/api/api';
import CDialogBox from '@/components/common/dialog-box/DialogBox.vue';
import CDatePicker from '@/components/common/date-picker/DatePicker.vue';
import CAvatarCropper from '@/components/account/avatar-cropper/AvatarCropper.vue';

const zxcvbn = require('zxcvbn');

export default {
  components: {
    CDialogBox,
    CDatePicker,
    CAvatarCropper,
  },

  data() {
    return {
      inDialog: false, // 是否开启会话窗口
      dialogTilte: '', // 会话窗口标题栏
      previewImg: '', // 修改头像的预览图片信息
      currentDialog: '', // 当前会话窗口类型
      currentUsername: '', // 当前用户名
      currentBirthday: '', // 当前用户生日信息
      currentPw: '', // 修改密码时输入的当前密码
      newUserName: '', // 修改用户名时输入的新用户名
      newBirthday: '', // 修改用户生日时选定的新用户生日信息
      newPw1: '', // 修改密码时输入新密码
      newPw2: '', // 修改密码时输入的确认新密码
      newPwLevel: 'none', // 新密码强度，初始值是none
      warn: { // 验证不通过时的各类提示信息
        username: '',
        currentPw: '',
        pw1: '',
        pw2: '',
      },
      setting: [ // 各用户设置栏目的页面静态数据
        {
          title: '头像',
          content: 'avatarUrl',
          avatar: true,
          event: 'initAvatarDialog',
        },
        {
          title: '昵称',
          content: 'username',
          event: 'initUsernameDialog',
        },
        {
          title: '生日',
          content: 'birthday',
          event: 'initBirthdayDialog',
        },
        {
          title: '换绑手机',
          content: 'mobile',
          btn: '换绑',
        },
        {
          title: '登录密码',
          content: 'safetyLevel',
          pw: true,
          event: 'initPasswordDialog',
        },
      ],
    };
  },
  computed: {
    ...mapState(['username']),
    ...mapState('account', ['userInfo']),
  },
  methods: {
    ...mapActions('account', ['dispatchUserInfo']),
    ...mapMutations('account', ['changeUserInfo']),
    getDes(index) { // 获取各是定栏目的文字描述信息
      const item = this.setting[index];
      const info = this.userInfo;
      if (item.pw) { // 如果栏目是密码安全栏目，根据安全等级获得描述
        let strength;
        if (info[item.content] < 2) {
          strength = '弱';
        } else if (info[item.content] < 3) {
          strength = '中';
        } else {
          strength = '强';
        }

        return `安全强度：${strength}`;
      }
      return info[item.content];
    },

    initDialog(key, type, title) { // 根据修改设定类型初始化会话窗内容
      if (this[key]) {
        this.currentDialog = type;
        this.dialogTilte = `修改${title}`;
        this[key]();
      }
    },

    initAvatarDialog(imgData) { // 初始化修改头像窗口
      if (!imgData) {
        return;
      }
      this.inDialog = true;
      this.previewImg = imgData;
    },

    initUsernameDialog() { // 初始化修改用户名窗口
      this.warn.username = '';
      this.inDialog = true;
    },
    initBirthdayDialog() { // 初始化修改生日窗口
      this.newBirthday = '';
      this.inDialog = true;
    },
    initPasswordDialog() { // 初始化修改密码窗口
      this.warn.pw1 = '';
      this.warn.pw2 = '';
      this.warn.currentPw = '';
      this.inDialog = true;
    },

    toggleDialog() { // 控制会话窗口的开关
      this.inDialog = !this.inDialog;
    },

    dispatchDialog() { // 在用户点击会话窗口的确认按钮时，根据当前会话类型进行操作
      const type = this.currentDialog;
      switch (type) {
        case 'avatarUrl':
          this.changeAvatar();
          break;
        case 'username':
          this.changeUsername();
          break;
        case 'birthday':
          this.changeBirthDay();
          break;
        case 'safetyLevel':
          this.changePassWord();
          break;
        default:
          break;
      }
    },
    async changeAvatar() { // 修改头像信息
      const canvas = this.$refs.avatar.cropper.getCroppedCanvas({
        maxWidth: 100,
        maxHeight: 100,
      });
      const avatar = canvas.toDataURL();
      this.$refs.avatar.cropper.clear();
      const res = await changeUserAvatar({
        username: this.username,
        avatar,
      });
      const info = Object.assign({}, this.userInfo);
      info.avatarUrl = res.data.data.avatar;
      this.changeUserInfo(info);
      this.previewImg = '';
      this.inDialog = false;
      this.currentDialog = '';
    },
    async changeUsername() { // 修改用户名信息
      const res = await changeUserName({
        username: this.username,
        newUsername: this.newUserName,
      });
      const info = Object.assign({}, this.userInfo);
      info.username = res.data.data.newUsername;
      this.changeUserInfo(info);
      this.currentUsername = res.data.data.newBirthday;
      this.newUserName = '';
      this.inDialog = false;
      this.currentDialog = '';
    },
    async changeBirthDay() { // 修改生日信息
      const res = await changeBirthday({
        username: this.username,
        newBirthday: this.newBirthday,
      });
      const info = Object.assign({}, this.userInfo);
      info.birthday = res.data.data.newBirthday;
      this.changeUserInfo(info);
      this.currentBirthday = res.data.data.newBirthday;
      this.newBirthday = '';
      this.inDialog = false;
      this.currentDialog = '';
      this.sendChangeRequset();
    },
    async changePassWord() { // 修改密码信息
      if (!this.warn.pw1
          && !this.warn.pw2
          && !this.warn.currentPw
          && this.newPw1
          && this.newPw2
          && this.currentPw
      ) {
        const res = await changePassword({
          username: this.username,
          password: this.currentPw,
          newPassword: this.newPw1,
        });
        if (res.data.status === 'success') {
          this.inDialog = false;
          this.newPw1 = '';
          this.newPw2 = '';
        } else {
          this.newPw1 = '';
          this.newPw2 = '';
          this.warn.pw2 = res.data.status;
        }
      }
    },
    // 日期选择器选定日期的回调函数
    dateModify(date) {
      this.newBirthday = date;
    },
    // 当当前密码输入栏失去焦点时检查栏目是否为空，并给出提示
    warnEmptyCurrentPw() {
      if (this.currentPw) {
        this.warn.currentPw = '';
      } else {
        this.warn.currentPw = '当前密码不能为空';
      }
    },
    // 检查新密码是否合法
    checkPw1() {
      const { score } = zxcvbn(this.newPw1);
      if (this.newPw1 === '' || this.newPw1.length < 8 || score < 1) {
        this.newPwLevel = 'none';
        if (this.newPw1 === '') {
          this.warn.pw1 = '请输入新密码';
        } else {
          this.warn.pw1 = '密码要求8位-32位，包含字母、数字、特殊字符中的两种或以上';
        }
      } else {
        this.warn.pw1 = '';
        if (score < 2) {
          this.newPwLevel = 'weak';
        } else if (score < 3) {
          this.newPwLevel = 'normal';
        } else {
          this.newPwLevel = 'strong';
        }
      }
    },
    // 确认两次输入的新密码相同
    checkPw2() {
      if (this.newPw2 === '') {
        this.warn.pw2 = '';
      } else if (this.newPw1 !== this.newPw2) {
        this.warn.pw2 = true;
      } else {
        this.warn.pw2 = '';
      }
    },
  },
  created() {
    this.dispatchUserInfo();
  },
  watch: {
    userInfo(newVal) {
      this.currentUsername = newVal.username;
      this.currentBirthday = newVal.birthday;
    },
  },
};
</script>

<style lang="scss">
@import "@/style/account/user-settings.scss";
</style>
