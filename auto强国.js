// TODO: 通过require module (模块) 机制将全局函数抽离出去
// TODO: viewVideos
// 初始随机下拉一定距离，停留60s+，计数6篇停止
// 随机数全局函数: random(min, max)

auto.waitFor();
const waitTime = 8000;
const gapTime = 400;
// auto.js 不支持ES2015的class，也不支持字符串`${}`

function Main() {
  // 入口
}
Main.prototype.run = function() {
  let app = new App();
  // app.open('cn.xuexi.android');

  const div = ['订阅', '时评', '国际', '党史', '强国征文', '健康', '要闻', '新思想'];
  let readCount = 0;
  for(const d of div) {
    if(readCount >= 6) {
      break ;
    }
    app.chooseChannel(d);
    readCount += app.viewArticles(6-readCount, 60*1000);
    console.log("已经看了：", readCount);
  }
}

function App() {
  // 打开学习强国
}
App.prototype.open = function(name) {
  if (!name) {
    return false;
  }
  // 查看底部正中红色的学习图标
  while(!id("home_bottom_tab_icon_large").findOne(2000)) {
    toast('正在打开' + name);
    launch(name);
    sleep(waitTime);
  }
  toast('已经打开' + name);
  return true;
}
App.prototype.chooseChannel = function(name) {
  if(!className("android.widget.TextView").text("全部频道").exists()){
    let menu = className("android.widget.FrameLayout").depth(15).drawingOrder(2).findOne();
    menu.click();
    // 当前是否已在频道选择页面，不在就进入
  }
  let item = className("android.widget.TextView").depth(11).drawingOrder(1).text(name).findOne();
  sleep(gapTime);
  item.parent().parent().click();
  sleep(gapTime);
}
App.prototype.viewArticles = function(readNum, readTime) {
  // 仅查看今日的文章，
  // readNum：期望阅读数，
  // readTime: 每篇最短阅读时间
  // 返回值：实际阅读数

  let d = new Date();
  let dMonth = d.getMonth()+1;
  dMonth = dMonth>=10? dMonth: ('0' + dMonth);
  let dDay = d.getDate();
  dDay = dDay>=10? dDay: ('0' + dDay);
  let dateStr = d.getFullYear() + '-' + dMonth + '-' + dDay;
  console.log(dateStr);

  let articles = className("android.widget.TextView").depth(27).text(dateStr).find();
  if(articles.empty()) {
    console.log('no articles');
    // 应换一个频道找
    return 0;
  }

  const w = device.width/2;
  const h = device.height/7 + random(100, 200);
  const len = Math.min(articles.length, readNum);
  for(let i=0; i<len; i++) {
    clickAt(articles.get(1));
    sleep(gapTime);
    className("android.widget.TextView").text("欢迎发表你的观点").waitFor();
    swipe(w, 6*h, w, 3*h, 200);
    // 其实可以每隔一段时间滑动一下，遇到评论区停下
    sleep(readTime + random(100, 3*1000));
    // 随机多看0.1到3秒
    back();
    sleep(gapTime);
    // 按下返回键，退出这篇文章
  }

  sleep(gapTime);
  return len;
}


function clickAt(item) {
  let bounds = item.bounds();
  click(bounds.centerX(), bounds.centerY());
}


new Main().run();
