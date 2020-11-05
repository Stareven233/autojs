auto.waitFor();
const waitTime = 12000;

launch('com.wisedu.cpdaily');
sleep(waitTime);
// let appName = "今日校园";
// launchApp(appName);
// 成功率低，会开成主题壁纸，但手机上直接运行就可以...


const msg_btn = id("tv_tab_title").className("android.widget.TextView").text("消息").findOne(waitTime).parent().parent();
msg_btn.click();
sleep(200);

const msg_div = className('android.widget.RelativeLayout').id('rc_item_conversation').findOne(waitTime);
msg_div.click();

// let unsigned = className('android.widget.TextView').id('tv_show').text('未签到 >\n\n').findOne(waitTime).parent().parent().parent().parent();
// unsigned.click();
sleep(2000);
const unsignedBox = className('android.widget.TextView').id('tv_show').text('未签到 >\n\n').findOne(waitTime).bounds();
click(unsignedBox.centerX(), unsignedBox.centerY());

className("android.view.View").text("定位签到").findOne(waitTime).parent().click();
sleep(2000);

className("android.view.View").text("小于37.3度").findOne(waitTime).parent().parent().child(1).click();
// 弱智布局，View互相套来套去，范围相互覆盖，看错好久

sleep(200);
className("android.view.View").text("否").findOne(waitTime).parent().parent().child(1).click();
sleep(200);
// // console.log(className("android.view.View").text("立即签到").findOne(waitTime));
// className("android.view.View").text("立即签到").findOne(waitTime).click();
