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
      mesh1: null,
      mesh2: null,
    }
  },
  methods: {
    /**
     * 创建一个网格模型
     */
    createMesh1() {
      /**
      * 几何对象
      */
      let geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
      //类型数组创建顶点数据
      let vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标
        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10, //顶点6坐标
      ]);
      // 创建属性缓冲区对象
      let attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
      /**
       * 材质对象 
      */
      let basicMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
      });//材质对象(基础网格材质，不受光照影响的材质)

      let lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,//颜色
        transparent: false,//是否开启透明
        // opacity:1,//透明度
        // wireframe: true，//是否线框
      });//材质对象(Lambert网格材质，与光照有反应，漫反射)

      let phongMaterial = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
      });//材质对象(高光Phong材质,与光照有反应)

      this.mesh1 = new THREE.Mesh(geometry, lambertMaterial);//网格模型对象
      //   mesh.rotateOnAxis('y', Math.PI / 8);//绕axis轴旋转π/8//模型对象的旋转
      this.scene.add(this.mesh1);//网格模型添加到场景中
    },
    createMesh2() {
      /**
       * 几何对象
       */
      let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象，入参为半径和精度

      /**
       * 材质对象 
      */
      let basicMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
      });//材质对象(基础网格材质，不受光照影响的材质)

      let lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,//颜色
        transparent: true,//是否开启透明
        opacity: 0.9,//透明度
        // wireframe: true，//是否线框
      });//材质对象(Lambert网格材质，与光照有反应，漫反射)

      let phongMaterial = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
      });//材质对象(高光Phong材质,与光照有反应)

      this.mesh2 = new THREE.Mesh(geometry, phongMaterial);//网格模型对象
      //   mesh.scale.x = 2.0;//模型对象的放大
      this.mesh2.scale.set(0.5, 1.5, 2)//模型对象的放大
      //   mesh.translateX(100);//模型对象的平移
      this.mesh2.position.set(80, 2, 10);//模型对象的平移
      //   mesh.rotateY(Math.PI / 4);//模型对象的旋转
      // mesh.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8//模型对象的旋转
      this.scene.add(this.mesh2);//网格模型添加到场景中
    },
    /**
     * 初始化，创建场景（网格模型、光源）、相机、控制器、渲染器
     * @doc http://www.webgl3d.cn/Three.js/
     */
    init() {
      let container = document.getElementById('container');
      /**
       * 创建场景
       */
      this.scene = new THREE.Scene();
      /**
       * 创建一个网格模型
       */
      this.createMesh1();
      this.createMesh2();
      /**
     * 辅助坐标轴
     */
      let axisHelper = new THREE.AxisHelper(250);
      this.scene.add(axisHelper);
      /**
      * 光源设置
      */
      let point = new THREE.PointLight(0xffffff);//添加点光源
      point.position.set(400, 200, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      let ambient = new THREE.AmbientLight(0xffffff);//环境光
      this.scene.add(ambient);//环境光添加到场景中
      /**
       * 创建相机
       */
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大

      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);//创建一个正投影相机
      this.camera.position.set(200, 300, 200); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      //   this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);//创建一个透视相机
      //   this.camera.position.z = 1;
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
      /**
       * 渲染
       */
      this.animate(this.scene, this.renderer);
    },
    /**
     * 渲染，动画
     */
    animate(scene, camera) {
      this.renderer.render(this.scene, this.camera);//渲染场景和相机
      //   this.mesh.rotation.x += 0.01;
      //   this.mesh.rotation.y += 0.02;
      this.mesh1.rotateY(0.01)
      this.mesh2.rotateX(0.01)
      requestAnimationFrame(this.animate);// 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    },
  },
  mounted() {
    this.init();
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
  height: 100vh;
}
</style>