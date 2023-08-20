const fs = require('fs');
const path = require('path')
module.exports = {
	// 统一 - 支付回调地址,格式为 "服务空间ID":"URL化地址"
	"notifyUrl": {
		// 测试环境服务空间-支付回调地址
		"mp-1941b3c4-65fa-4422-a644-62ccdcf2d855": "https://fc-mp-1941b3c4-65fa-4422-a644-62ccdcf2d855.next.bspapp.com/swap-pay-co",
	},
	"notifyKey": "5FB2CD73C7B53918728417C50762E6D45FB2CD73C7B53918728417C50762E6D4", // 跨云函数通信时的加密密钥，建议手动改下，不要使用默认的密钥，长度保持在64位以上即可
	// 微信支付相关
	"wxpay": {
		"enable": true, // 是否启用微信支付
		// 微信 - 小程序支付
		"mp": {
			"wx303e1c05cb60b18c":{
				"appId": "wx303e1c05cb60b18c", // 小程序的appid
				"secret": "fa2b95aa221862ced2eee07f279efb47", // 小程序的secret
				"mchId": "1649864190", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
			"wxaef005c800edcef8":{
				"appId": "wxaef005c800edcef8", // 小程序的appid
				"secret": "09dad41f472760a0a898217f114ad79a", // 小程序的secret
				"mchId": "1631304677", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert1.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key1.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
			"wxa774e1f482e2ed58":{
				"appId": "wxa774e1f482e2ed58", // 小程序的appid
				"secret": "59990f5b94854f11d20bbe72176da3dc", // 小程序的secret
				"mchId": "1577723771", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert2.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key2.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
			"wx85a0fc1aabd815c6":{
				"appId": "wx85a0fc1aabd815c6", // 小程序的appid
				"secret": "2e4807fdb3ebea0d09f8a9a717d024f8", // 小程序的secret
				"mchId": "1650761067", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert3.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key3.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
			"wx976aed88dbe828f7":{
				"appId": "wx976aed88dbe828f7", // 小程序的appid
				"secret": "2e4807fdb3ebea0d09f8a9a717d024f8", // 小程序的secret
				"mchId": "1650761067", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert3.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key3.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
			"wx7ae054f57bd117e9":{
				"appId": "wx7ae054f57bd117e9", // 小程序的appid
				"secret": "7600101e1fb09fb4877e1689a37c3689", // 小程序的secret
				"mchId": "1651072363", // 商户id
				"v3Key": "qwertyuiopasdfghjklzxcvbnm123456", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert4.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key4.pem'), // v3需要用到的证书
				"version": 3, // 启用支付的版本 2代表v2版本 3 代表v3版本
			}
		}
	}
}
