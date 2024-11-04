# readme
##【css+js】实现3d相册的基本原理
## 1.3d轮播实现

通过css的3d效果，改变每个图片的位置，通过旋转父级元素实现

##### 1.开启3d

```css
开启3样式
transform-style:preserve-3d;
3d透视实现3d效果
perspective: 1000px;
```

##### 2.设置子代元素

```css
 transform: rotateY(填入角度) translateZ(35vw);
```

translateZ来控制元素与屏幕的远近，还有不让元素堆在一起的作用

rotateY来旋转角度，根据元素数量来决定旋转角度

##### 3.设置旋转动画

```js
function rotateCarousel() {
  angle += theta; //变化角度
  content.style.transform =
    "translateZ(" + -35 + "vw)" + "rotateY(" + -angle + "deg)";//设置变化
  content.style.transition = "transform 1s"; //使变化更流畅
}
```

theta为变化角度，来控制每次旋转多少度，angle为当前容器角度，然后将变化的角度加到元素上，来实现转动

## 2.图片随鼠标旋转

##### 1.设定旋转函数

```js
function transformElement(x, y) {
      let box = element.getBoundingClientRect(); //获取图片坐标
      //获取鼠标相对于图片的坐标,并除以旋转速度,来计算旋转角度
      let calcX = -(y - box.y - box.height / 2) / multiple;//图片x坐标的旋转角度因用于鼠标从图片的正上方向正下方移动,所以为负
      let calcY = (x - box.x - box.width / 2) / multiple;
      //设置图片旋转
      element.style.transform =
        "rotateX(" + calcX + "deg) rotateY(" + calcY + "deg)";
    }
```

box存的是图片坐标，calcX是要沿x轴旋转角度，calcY是要沿y轴旋转角度。

其中multiple是设定旋转幅度或者速率，准确来说是敏感度，计算公式如下：

angle = 鼠标相对坐标 / Sensitivity，Sensitivity越小，转动角度越大

##### 2.设定监听事件

移入事件

```js
//鼠标移动事件,使图片随鼠标移动旋转
    mouseOverContainer.addEventListener("mousemove", (e) => {
      //若鼠标在图片上,则执行图片旋转函数
      if (e.target.tagName === "DIV") {
        window.requestAnimationFrame(function () {
          transformElement(e.clientX, e.clientY);
        });
      }
    });
```

移出事件

重置图片位置

```js
mouseOverContainer.addEventListener("mouseleave", (e) => {
      window.requestAnimationFrame(function () {
        element.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  });
```



### 参考来源

[【CSS】3D旋转轮播教学_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV14z4y1w7cg/?spm_id_from=333.880.my_history.page.click&vd_source=fcbece0799d72366ad76fcf857a0c04b)

[【CSS3+HTML+JS】 3D卡片旋转动效-鼠标跟随_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1XT411J78u/?spm_id_from=333.880.my_history.page.click&vd_source=fcbece0799d72366ad76fcf857a0c04b)
