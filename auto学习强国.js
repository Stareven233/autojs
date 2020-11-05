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

  // app.chooseChannel('强国征文');
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
  }
  clickAt(articles.get(1));

  // TODO:
  // 积分计数器，阅读页面随机下滑
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
    // 当前是否已在频道选择页面
    let menu = className("android.widget.FrameLayout").depth(15).drawingOrder(2).findOne();
    menu.click();
  }
  let item = text(name).findOne().parent().parent();
  sleep(gapTime);
  item.click();
}

function clickAt(item) {
  let bounds = item.bounds();
  click(bounds.centerX(), bounds.centerY());
}


new Main().run();
