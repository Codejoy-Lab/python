<template>
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col class="col-wrap">
            <div class="logo-wrap">
                <img class="logo" src='../../../static/img/Logo2.png'/>
            </div>
        </el-col>
        <el-col :span="6" :offset="12" class="col-wrap">
                <div class="right-wrap">
                    <div class="credit-wrap">
                        <el-button class="credit" >012</el-button>
                    </div>
                    <div class="message-wrap">
                        <el-button class="message" ></el-button>
                        <div class="msAlert-wrap">
                            <img class="message-alert" src='../../../static/img/msAlert.png'/>
                        </div>
                        
                    </div>
                    <div class="other-wrap">
                        <el-button class="other-setting" ></el-button>
                    </div>
            </div>
        </el-col>
    </el-row>
    
</template>

<script>


export default {
  name: 'Header'
}
</script>

<style scoped>
.logo-wrap{
    height:100%;
    width: fit-content;
    display: flex;
    align-items: center;
    
}
 .credit-wrap,.message-wrap,.other-wrap{
    height:100%;
    display: flex;
    width: fit-content;
    align-items: center;
    margin: 0 38px 0 0;
 }

.credit{
    text-align: right;
    font-weight: 700;
    /* padding: */
    color:#fe9e36;
    width: 4.5rem;
    border:none;
    background:url("../../../static/img/creditbg.png");
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    background-color: transparent;
}
.credit:hover, .credit:focus,.message:hover,.message:focus,.other-setting:hover,.other-setting:focus{
    background-color: transparent;
    color:#fe9e36;
}
.other-setting{
    height:1rem;
    border:none;
    background:url("../../../static/img/others.png");
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    background-color: transparent;
}
.message{
    height:1rem;
    border:none;
    background:url("../../../static/img/message.png");
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    background-color: transparent;
}
.message-alert{
    height: 34.5%;
}
.logo{
    height:48.5%;
    margin-left: 25px;
}
.col-wrap, .row-bg{
    height: 100%;
}
.msAlert-wrap{
    height:35%;
    display:flex;
    align-items: flex-start;
    margin-left: 3px;
}
.right-wrap{
    display: flex;
    height: 100%;
    width: 100%;
    justify-items:flex-end;
}
</style>
