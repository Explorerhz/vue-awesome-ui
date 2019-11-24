import {
    getEmployeeListById,
    getCallRecordQueryStatus,
    findPage,
    playRecording,
    findPageRecording,
    addRecordingComment,
    findCallInRecordForMById,
    shareRecording
  } from "@/api/call400";
  
export const Call400Mixin = {
  methods: {
    parseData(listData) {
      //处理音频播放记录
      let speeds = {};
      listData &&
        listData.forEach(element => {
          let currentTime = 0;
          let percentage = 0;
          let countDown = 0;
          if(element.timeAlready>0){
            currentTime = element.timeAlready / 1000;
            currentTime = currentTime <= element.totalTime?currentTime:0;
            percentage = (element.timeAlready / 1000 / element.totalTime) * 100;
            let surplus = element.totalTime - element.timeAlready  / 1000;
            surplus = surplus<0?0:surplus;
            countDown = this.curTime(parseInt(surplus));
            percentage = percentage>100?100:percentage;
          }else{
            countDown = this.curTime(element.totalTime);
          }
          speeds[element.id?element.id:element.callCenterId] = {
            currentTime: currentTime,
            percentage: percentage,
            countDown:  countDown
          };
        });
      this.speeds = { ...speeds, ...this.speeds };
      // console.log(this.speeds);
    },
    curTime(maxtime) {
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
    },
    updateSpeeds(id, value) {
      this.speeds[id] = value;
    },
    record(params) {
      params.employeeId = this.userId;
      playRecording(params);
    },
    openRemark(id) {
      this.callCenterId = id;
      this.$refs.addRemark.open();
    },
    showRemark(id) {
      this.$refs.showRemark.open(id);
    },
    async addComment(params) {
      //保存点评
      params.employeeId = this.userId;
      const result = await addRecordingComment(params);
      if (result.ret == 0) {
        this.updateById(params.callCenterId);
        this.$refs.addRemark.close();
      }
    },
    async share(id) {
      //分享
      const params = {
        callCenterId: id,
        employeeId: this.userId
      };
      const result = await shareRecording(params);
      if (result.ret == 0) {
        this.updateById(id);
      }
    },
    async updateById(id) {
      //更新录音
      const params_ = {
        id: id,
        employeeId: this.userId
      };
      const result0 = await findCallInRecordForMById(params_);
      if (result0.ret == 0 && result0.result.datas) {
        const item = result0.result.datas[0];
        const len = this.listData.length;
        console.log(item, id);
        for (let index = 0; index < len; index++) {
          const element = this.listData[index];
          console.log("id=", element.id);
          if (element.id == id) {
            console.log("suss!");
            if (item) {
              this.$set(this.listData, index, item);
            } else {
              this.listData.splice(index, 1);
            }
            break;
          }
        }
      }
    }
  }
};
