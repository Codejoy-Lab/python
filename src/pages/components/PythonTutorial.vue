<template>
<div class="tutorial-wrap">

  <div :class="dark? 'tutorial-content-wrap inner-dark':'tutorial-content-wrap'">
    
    <div :class='dark? stepWrap+" step-bar-dark" : stepWrap'>
      <div>
        <img :src="dark? forderDark:forderSrc" class="folder-img"/>
      </div>
      <img :src="dark? stepDark:stepLight" class="step-img"/>
    </div>
    <div :class="folded? 'folded':'tutorial'">Tutorials
    </div>
  </div>

</div>
</template>

<script>

import stepLight from "../../../static/img/Step.png";
import stepDarl from "../../../static/img/step-dark.png";
import forder from "../../../static/img/folder.png";
import forderDark from "../../../static/img/folder-dark.png";

export default {
  name: 'PythonTutorial',
  props: {
    folded:Boolean,
    dark:Boolean
    },
  data () {
    return {
      forderDark:forderDark,
      stepLight:stepLight,
      stepDark:stepDarl,
      forderSrc:forder,
      stepWrap:"step-wrap",
      tutorialStyle: 'visibility: visible;'
    }
  }
}

</script>

<style scoped>


.tutorial-wrap{
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.step-wrap{
  /* padding: 10px; */
  background:#c7e9f7;
  height:inherit;
  width: 50px;
  height:100%;
  text-align: center;
}
.tutorial{
  width: 100%;
  /* font-family: 'Museo Sans Rounded 100'; */
  font-weight: 700;
  overflow: auto;
}
.tutorial-content-wrap{
  width: 100%;
  display: flex;
  height: 100%;
}
.step-img{
  /* height: 60%; */
  width: 11px;
}
.folder-img{
  height: 20px;
  margin: 16px 0 24px 0;
}
.folded{
  visibility: hidden;
  width: 0;
}
.step-bar-dark{
  background:#3c5267;
}
.inner-dark{
  background:#293C53;
  color:white;
}
</style>
