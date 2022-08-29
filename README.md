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