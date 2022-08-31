---
marp: true
theme: gaia
---

# Web Security

Alfred 2022/09/01

---

# Web Security

- ## XSS
- ## CSRF

---

## XSS

- Cross Site Scripting
- 跨站脚本攻击
- 所有运行的逻辑来自本站，自己网站的东西才能在网站运行

---

## Scripting 能干嘛

- 获取登录信息
- 劫持前端逻辑
- 发送请求
- 偷取网站任意数据
---
## XSS 攻击分类

- 反射型 - url 参数直接注入
- 存储型 - 存储到DB后读取时注入

反射性的攻击略小于存储型。反射性可以从url看出来一些端倪，用户可以察觉到。

---

## XSS 攻击注入点

- HTML节点内容
- HTML 属性
- Javascript代码
- 富文本

---

## XSS 攻击防御

- 过滤输入
- 转义输出
- CSP

---

## CSP

Content Security Policy - 内容安全策略
- child-src connect-src default-src
- font-src frame-src img-src
- mainfest-src media-src object-src
- script-src style-src worker-src

---

## CSRF

- Cross Site Request Forgy
- 跨站请求伪造
- 在其他网站对目标网站发出一些请求，在用户不知情的情况下完成的

---

## CSRF攻击原理

1. 用户登录A网站
2. A网站确认身份
3. B网站页面向A网站发起请求(带A网站登录凭证)

---
## CSRF的攻击防御

1. B网站向A网站请求
2. 携带A网站的Cookie
3. 不访问A网站的前端
4. referer为B网站

---

## CSRF的攻击防御

1. 禁止第三方网站带Cookie(same-site)
2. 在前端页面加入验证信息
3. token
4. 验证referer