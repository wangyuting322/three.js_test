<script>
import * as THREE from 'three'
// import OrbitControls from 'three/examples/js/controls/OrbitControls'
import 'three-orbitcontrols';

export default {
  name: 'Home',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    init() {
      let container = document.getElementById('container');
      /**
       * 创建场景
       */
      this.scene = new THREE.Scene();
      /**
       * 创建一个网格模型
       */
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);//创建一个立方体几何对象
      let material = new THREE.MeshNormalMaterial();//材质对象
      this.mesh = new THREE.Mesh(geometry, material);//网格模型对象
      this.scene.add(this.mesh);//网格模型添加到场景中

      let axisHelper = new THREE.AxisHelper(250);
      this.scene.add(axisHelper);
      /**
      * 光源设置
      */
      let point = new THREE.PointLight(0xffffff);//点光源
      point.position.set(400, 200, 300);//点光源位置
      this.scene.add(point);//点光源添加到场景中
      let ambient = new THREE.AmbientLight(0x444444);//环境光
      this.scene.add(ambient);//环境光添加到场景中
      /**
       * 创建相机
       */
      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);//创建一个透视相机
      this.camera.position.z = 1;
      /**
       * 创建渲染器
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      /**
       * 创建控件对象
       */
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    },
    /**
     * 渲染，动画
     */
    animate() {
      this.renderer.render(this.scene, this.camera);//渲染场景和相机
      //   this.mesh.rotation.x += 0.01;
      //   this.mesh.rotation.y += 0.02;
      this.mesh.rotateY(0.01)
      requestAnimationFrame(this.animate);// 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
  render() {
    return (
      <div>
        <div id='container'></div>
      </div>
    )
  }
}
</script>
<style scoped>
#container {
  height: 400px;
}
</style>