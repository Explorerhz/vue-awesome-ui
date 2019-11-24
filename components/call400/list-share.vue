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
      <div class="call400-item" v-for="item in list" :key="'id_'+item.callCenterId">
        <span class="read-state unread" v-if="item.listenStatus == 0">未读</span>
			  <span class="read-state already" v-else-if="item.listenStatus == 1">已读</span>
        <div class="i-line" style="font-weight: bold;">
          <span>城市经理：</span>
          <span>{{item.recordingEmployeeName}}【{{item.recordingEmployeeCorps}}】</span>
        </div>
        <div class="i-line">
          <div class="i-audio" @click="play(item)">
            录音&nbsp;&nbsp;
            <tj-icon
              :name="currentAudioId==item.callCenterId && isPlay?'video-stop':'video-play'"
              color="#fff"
            ></tj-icon>
          </div>
          <div class="i-progress">
            <tj-progress :percentage="percentageOut(item.callCenterId)" :showPivot="false" :height="10"></tj-progress>
          </div>
          <div class="i-totaltime">{{countDown(item.callCenterId)}}</div>
        </div>
        <div class="i-line">
          <span>{{item.shareEmployeeNname}}【{{item.shareEmployeeRole}}】{{item.createTime}} 分享</span>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoVo">
          <span>点&nbsp;&nbsp;评&nbsp;&nbsp;人：</span>
          <span class>{{item.recordingCommentInfoVo.commentEmployeeName}}</span>
          <span class="i-time float-right">{{item.recordingCommentInfoVo.createTime}}</span>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoVo">
          <p class="comment">{{item.recordingCommentInfoVo.commentContent}}</p>
        </div>
        <div class="i-line" v-if="item.recordingCommentInfoVo && item.recordingCommentInfoVo.moreStr != ''">
          <span class="i-mark" @click="remark(item.callCenterId)">{{item.recordingCommentInfoVo.moreStr}} >></span>
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

Vue.use(Dialog);

export default {
  name: "tj-call400-list-share",
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
  mounted() {},
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
        return this.speeds[id] ? this.speeds[id].percentage : 0;
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
            URL: `${this.$Origin}/res/newCustomer/customerdetail.html?managerId=${managerId}`,
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
            URL: `${this.$Origin}/res/newEquipment/carSource.html
              ?id=${id}&module=${module_}&report=${report}`,
            title: "车源详情"
          }
        };
        execute(params);
      } catch (e) {
        console.log("打开车源详情异常");
      }
    },
    async mobileDecode(mobile, id) {
      const response = await phoneDecode({
        employeeId: this.userId,
        mobile: mobile,
        source: 4,
        businessId: id
      });
      const data = response.data;
      if (data.ret == 0) {
        let telA = document.createElement("a");
        telA.setAttribute("href", "tel:" + data.result);
        telA.click();
      }
      let audio = this.$refs.call400_audio;
      audio && this.currentAudioId && audio.pause();
    },
    play(item) {
      let audio = this.$refs.call400_audio;
      if (this.currentAudioId != item.callCenterId) {
        this.record(false);
        this.currentAudioId = item.callCenterId;
        audio.src = item.recordFile;
        // console.log(this.speeds[item.id]);
        if (this.speeds[item.callCenterId].currentTime > 0) {
          audio.currentTime = this.speeds[item.callCenterId].currentTime;
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
      if (!isEnd) return;
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
  position: relative;
  overflow: hidden;
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
  padding: 5px;
  margin:5px ;
  display: inline-block;
}
.i-name {
  font-size: 18px;
  width: 90px;
  display: inline-block;
}
.i-name::after {
  content: "***********";
  color: #6290fd;
  font-size: 14px;
  height: 10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 23px;
}
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
.read-state{
	 position: absolute;
	 right: -22px;
	 top: -20px;
	 width: 50px;
	 height: 45px;
	 line-height: 75px;
	 z-index: 20;
	 color:#FFF;
	 text-align:center;
	 transform: rotate(45deg);
 }
 .already{
	 background: #BDC1C9;
 }
 .unread{
	 background: #62D792;
 }
</style>