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
- 向目标网站注入恶意脚本，获取敏感信息Cookie

---

## XSS 攻击分类

- 反射型 - url 参数直接注入
- 存储型 - 存储到DB后读取时注入

---

## XSS 攻击注入点

- HTML节点内容
- HTML 属性
- Javascript代码
- 富文本

---

## XSS 攻击防御

- 输入过滤
- 转义HTML
- 白名单 - https://jsxss.com/zh/index.html
- HttpOnly
- CSP

---

## CSP

Content Security Policy - 内容安全策略
- default-src
- img-src
- script-src
- style-src
- worker-src
- ...

---

## CSRF

- Cross Site Request Forgery
- 跨站请求伪造

---

## CSRF攻击原理

1. 登录受信任的网站A，并生成Cookie
2. B网站页面向A网站发起请求(携带用户的cookie)
---
## CSRF的攻击特点

1. 携带A网站的Cookie
2. 不访问A网站的前端
3. referer为B网站

---

## CSRF的攻击防御

1. 禁止第三方网站带Cookie(same-site)
2. 在前端页面加入验证信息
3. token
4. 验证referer

---
# Thanks