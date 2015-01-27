# Simditor Attr
[![Circle CI](https://circleci.com/gh/shenqihui/simditor-attr.png?style=badge)](https://circleci.com/gh/mycolorway/simditor-emoji)


[Simditor](http://simditor.tower.im/) 的第三方扩展，为工具栏提高按钮，能够编辑 tag 属性，使用之前记得开放 simdtor 的 attr 过滤。

### 如何使用

在 Simditor 的基础上额外引用 simditor-attr 的脚本和样式

```html
<link rel="stylesheet" type="text/css" href="/assets/stylesheets/simditor-attr.css" />
<script src="/assets/javascripts/simditor-attr.js"></script>
```

配置

```javascript
new Simditor({
    textarea: textareaElement,
    ...,
    toolbar: [..., 'attr'],
    attrAllow: ['id', 'class', 'style', 'width', 'height']
})
```

###参数

**attrAllow** (Type: Array)

能进行编辑的属性。

### dev
```
git clone git@github.com:shenqihui/simditor-attr.git
cd simditor-attr
npm install
bundle install
npm i -g grunt-cli
bower install
grunt
```
访问 `http://ip:3000/`即可看到结果。