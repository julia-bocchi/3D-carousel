const content = document.querySelector(".content"); //获取content用于旋转
const items = document.querySelectorAll(".item"); //获取容器
var animationInterval; //间隔器
let angle = 0; //选择角度
const theta = 360 / items.length; //每次增加角度
//旋转函数
function rotateCarousel() {
  angle += theta; //变化角度
  content.style.transform =
    "translateZ(" + -35 + "vw)" + "rotateY(" + -angle + "deg)";//设置变化
  content.style.transition = "transform 1s"; //使变化更流畅
}
function startAnimation() {
  //若间隔器不在则添加
  if (!animationInterval) {
    animationInterval = setInterval(rotateCarousel, 3000);//每3秒变化一次
  }
}
function pauseAnimation() {
  //移除间隔器
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}
//调用函数
startAnimation();

//图片监听事件
items.forEach((item) => {
  //获取当前元素p标签和h2标签
  const p = document.querySelectorAll("p")[`${item.dataset.id}` - 1];
  const h2 = document.querySelectorAll("h2")[`${item.dataset.id}` - 1];
  //监听鼠标进入事件
  item.addEventListener("mouseover", function (e) {
    //暂停旋转
    pauseAnimation();
    
    const multiple = 20;//设置图片随鼠标旋转移动速度;
    let mouseOverContainer = this;//获取当前目标item
    const element =
      document.querySelectorAll(".card")[`${this.dataset.id}` - 1];//获取当前目标图片
    // 给p和h2添加active类名,让其出现
    p.classList.add("active");
    h2.classList.add("active");

    //图片随鼠标旋转函数
    function transformElement(x, y) {
      let box = element.getBoundingClientRect(); //获取图片坐标
      //获取鼠标相对于图片的坐标,并除以旋转速度,来计算旋转角度
      let calcX = -(y - box.y - box.height / 2) / multiple;//图片x坐标的旋转角度因用于鼠标从图片的正上方向正下方移动,所以为负
      let calcY = (x - box.x - box.width / 2) / multiple;
      //设置图片旋转
      element.style.transform =
        "rotateX(" + calcX + "deg) rotateY(" + calcY + "deg)";
    }
    
    //鼠标移动事件,使图片随鼠标移动旋转
    mouseOverContainer.addEventListener("mousemove", (e) => {
      //若鼠标在图片上,则执行图片旋转函数
      if (e.target.tagName === "DIV") {
        window.requestAnimationFrame(function () {
          transformElement(e.clientX, e.clientY);
        });
      }
    });
    //鼠标移出事件,使图片恢复
    mouseOverContainer.addEventListener("mouseleave", (e) => {
      window.requestAnimationFrame(function () {
        element.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  });
  //监听鼠标移出事件
  item.addEventListener("mouseout", function (e) {
    //恢复3d旋转
    startAnimation();
    // 移除p和h2的active类名,让其消失
    p.classList.remove("active");
    h2.classList.remove("active");
  });
});


//按钮
function previous() {
  pauseAnimation();//暂停旋转
  angle = angle - theta;//角度减小
  updateTransform(); //更新位置
}
function nextbutton() {
  pauseAnimation(); //暂停旋转
  angle = angle + theta;//角度增大
  updateTransform(); //更新位置
}

//更新content函数
function updateTransform() {
  content.style.transform = "translateZ(-35vw) rotateY(" + -angle + "deg)";
  content.style.transition = "transform 1s";
  startAnimation(); //使旋转恢复
}

//设定按钮点击事件
document.querySelectorAll(".previous").forEach((button) => {
  button.addEventListener("click", previous);
});
document.querySelectorAll(".next").forEach((button) => {
  button.addEventListener("click", nextbutton);
});


//其他操作
const button1 = document.querySelector("#button1");//获取按钮
//点击改变背景
button1.addEventListener("click", function () {
  if (
    document.querySelector("body").style.backgroundImage ===
    'url("pic/bg1.jpg")'
  )
    document.querySelector("body").style.backgroundImage = "url('pic/bg2.jpg')";
  else
    document.querySelector("body").style.backgroundImage = 'url("pic/bg1.jpg")';
});

const button2 = document.querySelector("#button2");//获取按钮
//点击投屏
button2.addEventListener("click", function () {
  //通过总旋转次数减去轮数*60,来计算当前图片id
  let id = angle / 60 - Math.floor(angle / 360) * 6 + 1;
  //设置背景图片
  document.querySelector(
    "body"
  ).style.backgroundImage = `url('pic/pic${id}.jpg')`;
});

//标题变化
const title = document.querySelectorAll(".top");
let test = setInterval(function () {console.log((angle / 360) % 2);
  console.log(title);
  
},1000)

let change = setInterval(function () {
  if((angle / 360) % 2 === 0){
    title[0].classList.add("active");
    title[1].classList.remove("active");
  }else if ((angle / 360) % 2 === 1) {
    title[0].classList.remove("active");
    title[1].classList.add("active");
  }
},10)