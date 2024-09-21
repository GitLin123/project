//封装一个函数：获取一个时间结果
export const getTime = () => {
  let message = "";
  let hours = new Date().getHours();
  if (hours <= 9) {
    message = "上午";
  } else if (hours <= 12) {
    message = "早上";
  } else if (hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
