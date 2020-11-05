auto.waitFor();
const waitTime = 8000;
// auto.js 不支持ES2015的class，也不支持字符串`${}`

function Main() {
  // 入口
}
Main.prototype.run = function() {
  let app = new App();
  app.open('cn.xuexi.android');
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

new Main().run();
