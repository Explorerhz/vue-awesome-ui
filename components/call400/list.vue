<template>
  <div>
    <audio
      ref="call400_audio"
      hidden
      @timeupdate="audioTimeupdate"
      @error="audioError"
      @ended="audioEnded"
      @soundStart="soundStart"
    ></audio>
    <div>
      <div class="call400-item" v-for="item in list" :key="'id_'+item.id">
        <div class="i-line i-border-bottom">
          <a class="i-name" @click.stop="mobileDecode(item.customerPhone,item.id)">
            <tj-icon name="phone" color="#6290fd"></tj-icon>&nbsp;
            {{item.displayPhone}}
          </a>
          <span class="i-area">({{item.provinceDesc}}-{{item.cityDesc}})</span>
          <span class="i-user" @click="goCustomweDetail(item.customerId,item.employeeId)">用户信息</span>
          <span class="i-housekeeper float-right">
            <tj-icon name="call-phone"></tj-icon>
            {{item.callStatusDesc}}
          </span>
        </div>
        <div class="i-line">
          <span>呼入设备：</span>
          <span class="i-productname" @click="goDetail(item.eqId)">{{item.productName}}</span>
          <span class="i-housekeeper float-right red">{{item.productPrice}}万元</span>
        </div>
        <div class="i-line">
          <span>呼入时间：</span>
          <span class>{{item.callTimeStr}}</span>
          <span class="i-time float-right">{{item.cityManagerName}}</span>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoPo">
          <span>点&nbsp;&nbsp;评&nbsp;&nbsp;人：</span>
          <span class>{{item.recordingCommentInfoPo.commentEmployeeName}}</span>
          <span class="i-time float-right">{{item.recordingCommentInfoPo.createTime}}</span>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoPo">
          <p class="comment">{{item.recordingCommentInfoPo.commentContent}}</p>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoSumNum > 0">
          <span class="i-mark" @click="remark(item.id)">共{{item.recordingCommentInfoSumNum}}条点评 >></span>
        </div>
        <div class="i-line">
          <div class="i-audio" @click="play(item)">
            录音&nbsp;&nbsp;
            <tj-icon
              :name="currentAudioId==item.id && isPlay?'video-stop':'video-play'"
              color="#fff"
            ></tj-icon>
          </div>
          <div class="i-progress">
            <tj-progress :percentage="percentageOut(item.id)" :showPivot="false" :height="10"></tj-progress>
          </div>
          <div class="i-totaltime">{{countDown(item.id)}}</div>
        </div>
        <div class="i-line" v-if="isOpera">
          <div class="i-comment" @click="addRemark(item.id)">
            <tj-icon name="comment" color="#fb7530"></tj-icon>&nbsp;&nbsp;点评
          </div>
          <div class="i-share" @click="share(item.id)">
            <tj-icon name="share" color="#fb7530"></tj-icon>&nbsp;&nbsp;分享
            <span class="i-share-num">({{item.shareCount ? '+'+item.shareCount : 0}})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Progress from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import Dialog from "@/components/ui/dialog";
import { execute } from "@/util/native.js";
import { phoneDecode } from "@/api/common";
import config from '@/util/config';

Vue.use(Dialog);

export default {
  name: "tj-call400-list",
  props: {
    list: {
      type: Array,
      default: []
    },
    speeds: Object,
    userId: Number,
    isRecord: {
      type: Boolean,
      default: true
    },
    isOpera: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Progress.name]: Progress,
    [Icon.name]: Icon
  },
  mounted() {
    try{this.sessionId = JSON.parse(execute({"method":"getSessionId","content":""})).ret;}catch(e){}
  },
  watch: {
    list() {
      // console.log("watch -- list");
    }
  },
  computed: {
    curTime() {
      return function(maxtime) {
        if (maxtime >= 0) {
          let minutes = Math.floor(maxtime / 60);
          let seconds = Math.floor(maxtime % 60);
          --maxtime;
          return (
            (minutes >= 10 ? minutes : "0" + minutes) +
            ":" +
            (seconds >= 10 ? seconds : "0" + seconds)
          );
        }
      };
    },
    timeAlready() {
      return function(value, totalTime) {
        return (value / 1000 / totalTime) * 100;
      };
    },
    percentageOut() {
      return function(id) {
        return this.speeds[id] && this.speeds[id].percentage ? this.speeds[id].percentage : 0;
      };
    },
    countDown() {
      return function(id) {
        let cd = this.speeds[id] ? this.speeds[id].countDown : "00:00";
        if(cd == '00:00'){
          cd = '已播完';
        }else{
          cd = "- "+cd;
        }
        return cd;
      };
    },
    audio() {
      return this.$refs.call400_audio;
    }
  },
  methods: {
    remark(id) {
      this.$emit("show", id);
    },
    addRemark(id) {
      this.$emit("open", id);
    },
    share(id) {
      this.$dialog
        .alert({
          title: "提示",
          message: "确认分享?",
          showCancel: true,
          mark: true
        })
        .then(val => {
          this.$emit("share", id);
        })
        .catch(val => {});
    },
    goCustomweDetail(id, managerId) {
      //客户详情
      try {
        const params = {
          method: "openH5PlainView",
          content: {
            URL: `${this.$Origin}/wapmanageApi/res/newCustomer/customerdetail.html?managerId=${managerId}&id=${id}`,
            title: "客户详情"
          }
        };
        execute(params);
      } catch (e) {
        console.log("打开客户详情异常");
      }
    },
    goDetail(id) {
      //打开车源详情
      let module_ = 2;
      let report = 0;
      try {
        const params = {
          method: "openH5PlainView",
          content: {
            URL: `${this.$Origin}/res/tzb/#/carSourceDetail?id=${id}&module=${module_}&report=${report}`,
            title: "车源详情"
          }
        };
        execute(params);
      } catch (e) {
        console.log("打开车源详情异常");
      }
    },
    async mobileDecode(mobile, id) {
      // alert(this.userId+"="+mobile+"="+id);
      try{
      const data = await phoneDecode({
        employeeId: this.userId,
        mobile: mobile,
        source: 4,
        businessId: id
      });
      if (data.ret == 0) {
        let telA = document.createElement("a");
        telA.setAttribute("href", "tel:" + data.result);
        telA.click();
      }
      let audio = this.$refs.call400_audio;
      audio && this.currentAudioId && audio.pause();
      } catch (e) {
        // alert(e);
      }
    },
    play(item) {
      let audio = this.$refs.call400_audio;
      if (this.currentAudioId != item.id) {
        this.record(false);
        this.currentAudioId = item.id;
        audio.src = item.recordFile;
        // console.log(this.speeds[item.id]);
        if (this.speeds[item.id].currentTime > 0) {
          audio.currentTime = this.speeds[item.id].currentTime;
        }
        audio.play();
        this.isPlay = true;
      } else {
        if (audio.paused) {
          audio.play();
          this.isPlay = true;
        } else {
          audio.pause();
          this.record(false);
          this.isPlay = false;
        }
      }
    },
    audioTimeupdate(e) {
      let audio = this.$refs.call400_audio;
      if (audio) {
        const callTime = audio.duration;
        const currentTime = audio.currentTime;
        const percentage = parseInt((currentTime / callTime) * 100);
        const countDown = parseInt(callTime - currentTime);
        // console.log(callTime, currentTime, percentage, countDown);
        if (percentage >= 0 && countDown >= 0) {
          this.$emit("updateSpeeds", this.currentAudioId, {
            currentTime: currentTime,
            percentage: percentage,
            countDown: this.curTime(countDown)
          });
        }
      }
    },
    audioError(e) {
      let audio = this.$refs.call400_audio;
      if (audio) {
        this.$toast.show({
          message:'缓冲中...',
          icon:'none',
          duration: 2000
        })
        audio.load();
        audio.currentTime = this.speeds[this.currentAudioId].currentTime;
        audio.play();
      }
    },
    audioEnded(e) {
      this.record(true);
      this.isPlay = false;
    },
    soundStart(e) {
      //    console.log(this.speeds[this.currentAudioId]);
      //    let audio = this.$refs.call400_audio;
      //     if(audio){
      //         this.$emit("updateSpeeds", this.currentAudioId, {
      //             percentage:this.speeds[this.currentAudioId].percentage,
      //             countDown:this.speeds[this.currentAudioId].countDown
      //         })
      //     }
    },
    record(isEnd) {
      if(!this.isRecord) return;
      const { h5Code, currentAudioId, speeds } = this;
      if (currentAudioId > 0) {
        const currentTime = Math.floor(
          speeds[currentAudioId].currentTime * 1000
        );
        const params = {
          callCenterId: currentAudioId,
          h5Code: h5Code,
          playDuration: currentTime,
          type: isEnd ? 1 : 0
        };
        this.$emit("record", params);
        //this.currentAudioId = 0;
      }
    },
    stop() {
      let audio = this.$refs.call400_audio;
      audio && (audio.pause(), this.record(false));
    }
  },
  destroyed() {
    this.stop();
  },
  data() {
    return {
      currentAudioId: 0, //当前播放ID
      isPlay: false,
      h5Code: Math.random()
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/var.less";
.call400-item {
  padding: 0 10px;
  margin-top: 10px;
  background-color: #fff;
  font-size: 13px;
  color: #4c4c4c;
}
.call400-item:first-child {
  margin-top: 0px;
}
.i-line {
  padding: 10px 0;
  overflow: hidden;
}
.i-border-bottom {
  border-bottom: 1px solid #f0f0f0;
}
.i-line::after {
  content: "";
  height: 0;
  width: 0;
  clear: both;
}
.i-name,
.i-user,
.i-mark {
  color: #6290fd;
}
.i-mark {
  background: #f5f8fa;
  padding: 10px;
}
.i-name {
  font-size: 13px;
  width: 100px;
  display: inline-block;
}
// .i-name::after {
//   content: "***********";
//   color: #6290fd;
//   font-size: 14px;
//   height: 10px;
//   width: 20px;
//   height: 20px;
//   display: inline-block;
//   vertical-align: middle;
//   text-align: center;
//   line-height: 23px;
// }
.i-user {
  font-size: 11px;
}
.red {
  color: @red;
  font-weight: bold;
}
.i-productname {
  color: #6290fd;
  width: 220px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: bottom;
  #textParse.text-ellipsis();
}
.i-level {
  font-size: 12px;
  padding: 3px 5px;
  background: rgba(98, 150, 253, 0.1);
  color: #6290fd;
  border: 1px solid rgba(98, 144, 253, 0.8);
}
.i-housekeeper {
  float: right;
}
.i-audio,
.i-progress,
.i-totaltime {
  display: inline-block;
}
.i-audio {
  background: #6290fd;
  padding: 10px 20px;
  color: @white;
  font-size: @font-size-md;
  border-radius: 4px;
}
.i-audio .tj-icon {
  font-size: @font-size-md;
}
.i-progress {
  width: 180px;
  margin: 0 10px;
}
.i-share,
.i-comment {
  background: #fff3ec;
  padding: 5px 15px;
  color: #fb7530;
  margin-right: 2px;
  float: right;
  font-size: @font-size-md;
}
.comment {
  background: #f5f8fa;
  color: #9ea4af;
  padding: 10px;
  border-radius: 3px;
}
.i-share-num {
  font-size: 10px;
}
</style>