<template>
  <div>
     <ul id="contextmenu" style="display: none;">  
      <li><a>顺时针旋转</a></li>
      <li><a>逆时针旋转</a></li> 
      <li><a>放大</a></li>
      <li><a>缩小</a></li>
      <li><a>前往机器管理平台</a></li>  
      <li><a>节点详情</a></li> 
      <li><a>编辑节点</a></li>       
      <li><a>删除该节点</a></li>
    </ul>
    <ul id="linemenu" style="display: none;">        
      <li><a>删除该连线</a></li>
    </ul>
    <ul id="detail" style="display:none;background-color :#d3d3d3;"></ul>
    <div class="container">
      <div id="content">
        <div class="row clearfix">
          <div class="span2">                                                 
            <div class="coms" id="components">                                                  
              <div class="component" title="exchanger" trigger="manual">                                       
                <a class=" icon exchanger"></a>      
              </div>
              <div class="component" title="server" trigger="manual">                                                       
                <a class=" icon server"></a>           
              </div>
              <div class="component" title="subnetwork" trigger="manual">                                       
                <a class=" icon subnetwork"></a>              
              </div>
              <div class="component" title="node" trigger="manual">                             
                <a class=" icon node"></a>                       
              </div>  
              <div class="linkline" title="greenline" trigger="manual">                                                       
                <span class=" line greenline" id='1'></span>           
              </div>
              <div class="linkline" title="orangeline" trigger="manual">                                       
                <span class=" line orangeline" id='2'></span>              
              </div>
              <div class="linkline" title="redline" trigger="manual">                             
                <span class=" line redline" id='3'></span>                       
              </div>                                       
            </div>
          </div>
          <div class="span10">  
            <canvas width="850" height="400" id="target"></canvas>  
                                 
          </div>
        </div> <!-- row -->               
      </div> <!-- /content -->              
    </div> <!-- /container -->
    <canvas ref="test" width="1000" height="400"></canvas>
  </div>
</template>

<script>
// import JTopo from  'JTopo'
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var canvas = this.$refs.canvas;
      var stage = new JTopo.Stage(canvas);
      var scene = new JTopo.Scene(stage);
      var nodeFrom = new JTopo.Node("from");
      nodeFrom.setLocation(200, 200);
      scene.add(nodeFrom);
      var nodeTo = new JTopo.Node("To");
      nodeTo.setLocation(300, 200);
      scene.add(nodeTo);
      var link = new JTopo.Link(nodeFrom, nodeTo); // 增加连线
      scene.add(link);
    }
  }
};
</script>
<style scope="css">
canvas {
  letter-pacing: 10px;
}
</style>
