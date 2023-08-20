const crypto = require('crypto'); // 云开发环境默认有这个加解密库，直接导入使用即可，无需安装
// service ：默认为sms短信服务 可根据腾讯云文档改成其他服务(通用鉴权）
// payload： 需传入该服务需要的参数
async function mainCodeV3(payload,service = 'ims',SecretId= "AKIDlMgkY5LK3VgbGfneEZcOu97oEPJwINCF",SecretKey="rRmqdaT8YicHhrlQq1xf7JFvNZWDgtqX"){
     
      // 1. 拼接规范请求串 CanonicalRequest
      var HTTPRequestMethod = 'POST'; // HTTP 请求方法（GET、POST ）。此示例取值为 POST
      var CanonicalURI = '/'; // URI 参数，API 3.0 固定为正斜杠（/）
      var CanonicalQueryString = ""; // POST请求时为空 // 内
      var CanonicalHeaders = "content-type:application/json\nhost:" + service + ".tencentcloudapi.com\n"; // sms.tencentcloudapi.com需要修改前缀短信为：sms
      var SignedHeaders = "content-type;host";
      // 传入需要做 HTTP 请求的正文 body
      var HashedRequestPayload = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex'); 
      // 拼接
      var CanonicalRequest =  HTTPRequestMethod + '\n' +
        CanonicalURI + '\n' +
        CanonicalQueryString + '\n' +
        CanonicalHeaders + '\n' +
        SignedHeaders + '\n' +
        HashedRequestPayload;
      // 2. 拼接待签名字符串
      var Algorithm = "TC3-HMAC-SHA256"; // 签名算法，目前固定为 TC3-HMAC-SHA256
      var RequestTimestamp = Math.round(new Date().getTime()/1000) + ""; // 请求时间戳，即请求头部的公共参数 X-TC-Timestamp 取值，取当前时间 UNIX 时间戳，精确到秒
      var t = new Date();
      var date = t.toISOString().substr(0, 10); // 计算 Date 日期   date = "2021-10-07"
      /**
       * Date 必须从时间戳 X-TC-Timestamp 计算得到，且时区为 UTC+0。
       * 如果加入系统本地时区信息，例如东八区，将导致白天和晚上调用成功，但是凌晨时调用必定失败。
       * 假设时间戳为 1551113065，在东八区的时间是 2019-02-26 00:44:25，但是计算得到的 Date 取 UTC+0 的日期应为 2019-02-25，而不是 2019-02-26。
       * Timestamp 必须是当前系统时间，且需确保系统时间和标准时间是同步的，如果相差超过五分钟则必定失败。
       * 如果长时间不和标准时间同步，可能导致运行一段时间后，请求必定失败，返回签名过期错误。
       */
      var CredentialScope = date + "/"+ service +"/tc3_request"; // sms为腾讯云短信服务-其他服务根据文档修改
      /**
       *  拼接 CredentialScope 凭证范围，格式为 Date/service/tc3_request ， 
       * service 为服务名，慧眼用 faceid ， OCR 文字识别用 ocr
       */
       // 将第一步拼接得到的 CanonicalRequest 再次进行哈希加密
      var HashedCanonicalRequest = crypto.createHash('sha256').update(CanonicalRequest).digest('hex'); 
      // 拼接
      var StringToSign = Algorithm + '\n' +
        RequestTimestamp + '\n' +
        CredentialScope + '\n' +
        HashedCanonicalRequest;
      // 3. 计算签名
      var SecretDate = crypto.createHmac('sha256', "TC3"+SecretKey).update(date).digest();
      var SecretService = crypto.createHmac('sha256', SecretDate).update(service).digest(); // 注意修改sms
      var SecretSigning = crypto.createHmac('sha256', SecretService).update("tc3_request").digest();
      var Signature = crypto.createHmac('sha256', SecretSigning).update(StringToSign).digest('hex');
      // 4. 拼接Authorization
      var Algorithm = "TC3-HMAC-SHA256";
      var Authorization =
        Algorithm + ' ' +
        'Credential=' + SecretId + '/' + CredentialScope + ', ' +
        'SignedHeaders=' + SignedHeaders + ', ' +
        'Signature=' + Signature
        return {
            Authorization,
            time: RequestTimestamp
        }
}
// 导出方法
/**
 * Authorization 鉴权
 * time： 当前时间戳
 */
module.exports = {
  mainCodeV3
}