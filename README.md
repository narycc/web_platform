这个项目是基于[Create React App](https://github.com/facebookincubator/create-react-app)建立的。

下面是一些如何执行公共任务的内容。
[这里](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) 可以找到这份指南的最新版本。


## 内容列表

- [版本更新](#updating-to-new-releases)
- [反馈](#sending-feedback)
- [文件夹结构](#folder-structure)
- [可用脚本](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [编辑器中的语法高亮](#syntax-highlighting-in-the-editor)
- [编辑器中展示的Lint 输出](#displaying-lint-output-in-the-editor)
- [依赖安装](#installing-a-dependency)
- [引入组件](#importing-a-component)
- [添加样式](#adding-a-stylesheet)
- [后处理CSS](#post-processing-css)
- [添加图片和字体](#adding-images-and-fonts)
- [public 文件夹的使用](#using-the-public-folder)
- [全局变量的使用](#using-global-variables)
- [添加Bootstrap](#adding-bootstrap)
- [Adding Flow 添加Flow](#adding-flow)
- [添加自定义环境变量](#adding-custom-environment-variables)
- [我可以使用装饰符吗？](#can-i-use-decorators)
- [与Node后台交互](#integrating-with-a-node-backend)
- [开发环境中API请求代理](#proxying-api-requests-in-development)
- [开发环境中使用https](#using-https-in-development)
- [在服务器端自动生成动态meta 标签](#generating-dynamic-meta-tags-on-the-server)
- [运行测试](#running-tests)
  - [文件名规则](#filename-conventions)
  - [命令行交互](#command-line-interface)
  - [版本控制集成](#version-control-integration)
  - [编写测试](#writing-tests)
  - [测试组件](#testing-components)
  - [使用第三方断言库](#using-third-party-assertion-libraries)
  - [初始化测试环境](#initializing-test-environment)
  - [Focusing and Excluding Tests](#focusing-and-excluding-tests)
  - [覆盖率报告](#coverage-reporting)
  - [持续集成](#continuous-integration)
  - [禁用jsdom](#disabling-jsdom)
  - [Experimental Snapshot Testing ](#experimental-snapshot-testing)
  - [编辑器集成](#editor-integration)
- [开发独立组件](#developing-components-in-isolation)
- [开发一个PWA](#making-a-progressive-web-app)
- [发布](#deployment)
  - [Serving Apps with Client-Side Routing](#serving-apps-with-client-side-routing)
  - [Building for Relative Paths相对路径编译](#building-for-relative-paths)
  - [Firebase](#firebase)
  - [GitHub 页面](#github-pages)
  - [Heroku](#heroku)
  - [Modulus](#modulus)
  - [Netlify](#netlify)
  - [Now](#now)
  - [S3 and CloudFront](#s3-and-cloudfront)
  - [Surge](#surge)
- [问题解决](#troubleshooting)
  - [`npm test` 在macOS Sierra hang 住](#npm-test-hangs-on-macos-sierra)
  - [`npm run build` 失败](#npm-run-build-silently-fails)
- [还缺什么呢？](#something-missing)

## 版本更新

Create React App 被分成了两个包：

* `create-react-app` 是一个用来新建项目的全局命令行工具。
* `react-scripts` 是被生成的项目中的一个开发依赖。 

你几乎不用去更新create-react-app本身，它将所有的设置都代理给react-scripts 了。

每次运行create-react-app的时候，它都会使用最新版本的react-scripts,这样你就能在新项目中自动获得所有的新特性和优化。

要将当前项目更新为新版本的react-scripts, [打开更改日志](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md), 找到你当前的版本，然后执行升级命令。

通常修改package.json中 react-scripts的本版号，然后执行npm install 就够了，但是最好还是先看下一下修改日志，以防重大改变引发问题。

我们尽量将重大改变细化，使用户能无感的更新react-scripts.

## 反馈

欢迎及时将问题反馈给我们[反馈](https://github.com/facebookincubator/create-react-app/issues)。

## 文件结构

创建成功之后，你的文件结构看起来像这样：

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```


项目要编译成功，**这些文件的文件名必须正确**：

* `public/index.html` 是页面模板；
* `src/index.js` 是Javascript 的入口文件。

其他文件你都可以删除或者重命名。

你可能会在src下面新建子目录。为了快速编译，只有src下面的文件会被webpack处理。
你需要将相关的JS 和CSS文件都放在src 里面，否则webpack会无视它们。

只有public文件夹下面的文件能在public/index.html中使用。Javascript 和HTML的使用，阅读下面的介绍。

但是，你也可以创建一些高层的目录。它们不会被包含到生产编译中，所以你可以用这些目录来放置一些类似文档的东西。

## 可用脚本

在项目文件夹下，可以执行：

### `npm start`

在开发环境下运行App。在浏览器中打开[http://localhost:3000](http://localhost:3000) 可预览。

每次编辑的时候，这个页面会重新加载。lint 错误会在控制台中打印出来。

### `npm test`

在watch 模式下启动测试运行。更多详情，参考[运行测试](#running-tests)

### `npm run build`

将线上版本app编译到build 文件夹下面。它在生产环境模式下面正确绑定React 并且将性能最优化。
编译之后文件是最小化了，文件名包含hash值。你的app就可以发布了。

更多关于发布的信息，参考[发布](#deployment)。

### `npm run eject`

**注意：这是一个单向的操作。一旦你执行eject 那就不能回退了**

如果你对编译工具和配置设置不满意，你任何时候都可以eject。这个命令会把你编译依赖从你的项目移除。

取而代之的是，它会把所有的配置文件和过渡依赖（webpack,babel,ESLint等）拷贝到你的项目中，这样就能完全控制它们。除了eject之外其他所有的命令都仍能工作，但是它们都指向这些拷贝过来的脚本，你可以调整它们。这时，你就只能靠你自己了。

你不一定非得用eject。这些精细的特性设置适合中小型发布，而且你没有义务一定要使用这个特性。但是我们明白如果要使用这个特性的时候，你不能自定义它就不会好用。

## 编辑器的语法高亮

配置你最喜欢的文本编辑器的语法高亮，前往[Babel文档](https://babeljs.io/docs/editors)并按照指引配置。文章覆盖了绝大部分主流编辑器。
## 在编辑器中展示Lint 输出

>注意：这个特性在react-scripts@0.2.0或者更高版本中支持。

一些编辑器，包括Sublime Text, Atom 和Visual Studio Code, 提供了ESLint 的插件。

这些插件不是lint必须的。你应该在终端或者浏览器控制台查看lint输出。但，如果你更希望在编辑器中就展示lint 的结果，那你需要做一些额外的操作。

你首先需要为你的编辑器安装ESLint 插件。

>**Atom `linter-eslint` 用户的提示**

>如果你正在使用Atom 的linter-eslint 插件，要确保**使用全局ESLint 安装**选线被选中。

><img src="http://i.imgur.com/yVNNHJM.png" width="300">

然后将下面的代码块添加到项目的package.json 文件中：

```js
{
  // ...
  "eslintConfig": {
    "extends": "react-app"
  }
}
```

最后，你需要安装一些全局的包：

```sh
npm install -g eslint-config-react-app@0.3.0 eslint@3.8.1 babel-eslint@7.0.0 eslint-plugin-react@6.4.1 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-flowtype@2.21.0
```

我们承认这种方式并不是最优的，但是由于我们隐藏ESLint 依赖的方式，安装全局包确实是必要的。ESLint团队已经在[努力解决](https://github.com/eslint/eslint/issues/3458),未来几个月后，可能就没有必要了。

## 依赖安装

生成的项目依赖了React和ReactDOM，它也包含了一系列被Create React APP 开发使用的依赖。你可能也会使用npm 安装其他依赖，比如React Router：

```
npm install --save <library-name>
```

## 引入组件

由于Babel,项目支持ES6 模块。我们仍然可以使用require() 和module.exports, 鼓励使用[`import` 和 `export`](http://exploringjs.com/es6/ch_modules.html) 

例如：

### `Button.js`

```js
import React, { Component } from 'react';

class Button extends Component {
  render() {
    // ...
  }
}

export default Button; // 不要忘记使用 export default!
```

### `DangerButton.js`


```js
import React, { Component } from 'react';
import Button from './Button'; // 丛另一个文件中引入组件

class DangerButton extends Component {
  render() {
    return <Button color="red" />;
  }
}

export default DangerButton;
```

注意[default 和命名的export的区别](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)。错误通常根源于此。建议当一个模块只export 一个内容的时候（比如一个组件），使用default import和export。这样能保证`export default Button` 和 `import Button from './Button'` 是同样的内容。

命名的export 在到处多个方法模块的时候有用。一个模块可能最多一个default export 和任意多个命名export。

了解更多ES6 模块化知识：

* [何时使用花括号?](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)
* [探索ES6模块化](http://exploringjs.com/es6/ch_modules.html)
* [理解ES6模块化](https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules)

## 添加样式

项目设置使用[Webpack](https://webpack.github.io/)处理所有的资源。webpack 提供了一种自定义的方式扩展JavaScript 的import 概念。为了表示一个Javascript 文件依赖一个css文件，你需要**在Javascript文件中引入CSS**

### `Button.css`

```css
.Button {
  padding: 20px;
}
```

### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // 告诉webpack, Button.js文件使用了这些样式。

class Button extends Component {
  render() {
    // 你可以把它们当正常的css 样式一样使用
    return <div className="Button" />;
  }
}
```

**React并不需要这样** 但很多小伙伴发现这个特性非常方便。 你可以阅读关于这种方式的好处[这里](https://medium.com/seek-ui-engineering/block-element-modifying-your-javascript-components-d7f99fcab52b)。然而，如果要使用webpack之外的其他编译工具和环境的时候，这样会让你的代码可移植性更差。 

在开发环境中，按这种依赖方式我们编辑的样式会立即重载显示。在生产环境，所有的css文件会被集中放到编译输出的一个最小化了的.css 文件中。

如果你关注这种webpack语法的使用方式，你可以把所有的css 都放到src/index.css 文件中。它将会在src/index.js文件中引用。 但是如果你以后要移植到别的编译工具中，可以直接把这个import删除就好了。

## 后处理 CSS

这个项目设置最小化了css，并且通过[Autoprefixer](https://github.com/postcss/autoprefixer)自动给它们加上了兼容性前缀，因为你不用担心。

例如这个：

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

变成了这样：

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

当前不支持如Less 等预处理工具或者跨css文件的共享变量。

## 添加图像和字体

使用webpack时，静态资源如图片和字体文件的使用方式和css 类似。

你可以在一个Javascript 模块中引入一张图片。这就相当于告诉webpack 将这张图片包含在bundle 中。与css引入不一样的是，引入一张图片或者一个字体返回一个字符串，这个字符串是你代码中可以使用的最终的图片路径。

例子如下：
```js
import React from 'react';
import logo from './logo.png'; // 告诉webpack这个js 文件爱你使用这张图片

console.log(logo); // /logo.84287d09.png

function Header() {
  // 引入的结果是这张图片的url
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

这样能够保证当你编译项目的时候，webpack能够正确的把这些图片挪到build 文件夹下面，并且提供正确的路径。

CSS中也生效：

```css
.Logo {
  background-image: url(./logo.png);
}
```

webpack 会查找css中所有的相对模块引用（它们欧式以“./”开头），然后在编译的时候全部替换成最终路径。如果你不小心输入错误或者删除了一个重要的文件，会出现编译错误，就像你引入了一个不存在Javascript 模块。编译bundle中的这个最终路径是webpack 根据内容hash 产生的。如果未来文件内容发生变化，webpack 在生产环境中会提供不一样的名字，所以你不用担心静态资源缓存的问题。

请注意这也是webpack 自定义的一个特性。

**React并不需要它**但是很多人爱它，（react native 的图片机制类似）。另外一种处理静态资源的方式会在下一章节中描述。

## `public` 文件夹的使用

>注意：这个特性在`react-scripts@0.5.0` 及更高的版本中可用。

如上所述，通常鼓励在Javascript 中import静态资源。这种机制有很多好处：

* 脚本和样式都被最小化和组织到一起，避免了额外的网络开销。
* 文件缺失引起编译错误，而不是把404错误推向用户。
* 文件名包含内容hash值，所以不用担心老版本的浏览器缓存问题。


但是，有一个应急方法可以添加模块系统之外的静态文件。

如果你把一个文件放在public 文件夹里面，它就不会被webpack处理。它会被原封不动地拷贝到build文件夹下面。要使用public中的静态资源，需要使用一个叫PUBLIC_URL的特殊变量。

在index.html中，你可以像这样使用：

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

只有public文件夹下面的文件可以通过%PUBLIC_URL%前缀访问。如果你需要使用src 或者node_modules下面的文件你需要将文件拷贝到public 下面，显示表明你的意图，让它们成为你build 的一部分。

当你执行npm run build的时候，Create React App 会把`%PUBLIC_URL%`替换成一个正确的绝对路径，这样就算是你使用了客户端路由，或者寄主在一个非根url 上的文件都能正常访问。

在Javascript代码中，你可以使用`process.env.PUBLIC_URL` 达到同样的目的：

```js
render() {
  // 注意这是一个应急方法，谨慎使用 
  // 如上文“添加图片和字体”所述的， 通常推荐使用import 静态资源url 
  return (<img src=`{process.env.PUBLIC_URL + '/img/logo.png'}`/>);
}
```

记住这种方式的缺点：
* public文件夹下面的文件都不能后处理或者最小化。
* 缺失的文件在编译期间无法调用，会直接抛给用户404错误。
* 最终文件名不会包含内容hash值，这样每次变化时需要加上访问参数或者重命名。

但是，从html 中访问像[`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest) 或者包含打包好的代码之外的小块脚本如[`pace.js`](http://github.hubspot.com/pace/docs/welcome/) 会非常方便。

注意，如果你要添加一个生命全局变量的`<script>`，你还需要阅读接下来的章节。

## 使用全局变量

如果你要在html文件中包含一个定义了全局变量的脚本，并且尝试在代码中使用其中的某些全局变量，linter 会提示它找不到变量的定义。

你可以通过显示地从window对象上读取全局变量避免报错的情况，比如：

```js
const $ = window.$;
```

很明显这样你就是在有意地使用一个全局变量而不是拼写错误。

另外你可以通过在任意一行代码之后加上`// eslint-disable-line` 强制linter 忽略它。

## 添加 Bootstrap

你不是必须非得和React 一起使用[React Bootstrap](https://react-bootstrap.github.io)，但是它是一个集成Bootstrap 和React app 的流行库。如果你需要它，你可以在Create React App 中按照这些步骤集成它：

从NPM中安装 react bootstrap 和bootstrap。React Bootstrap 不包含Bootstrap CSS，因此你也需要安装：

```
npm install react-bootstrap --save
npm install bootstrap@3 --save
```

在```src/index.js``` 文件中引入Bootstrap CSS 和选择的Bootstrap 主题CSS：

```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```

```src/App.js```中引入必要的React Bootstrap 组件，或者你自定义的组件：

```js
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
```

现在你已经准备好了，在你的组件的render 方法中使用引入的React Bootstrap 组件了。这里有一个使用React Bootstrap重做的例子，[`App.js`](https://gist.githubusercontent.com/gaearon/85d8c067f6af1e56277c82d19fd4da7b/raw/6158dd991b67284e9fc8d70b9d973efe87659d72/App.js)。

## 添加 Flow

类型检查Flow 默认生成的`.flowconfig`，[当前不支持](https://github.com/facebookincubator/create-react-app/issues/72)。运行会产生这样的错误信息：

```js
node_modules/fbjs/lib/Deferred.js.flow:60
 60:     Promise.prototype.done.apply(this._promise, arguments);
                           ^^^^ property ‘done’. Property not found in
495: declare class Promise{
  Promise. See lib: /private/tmp/flow/flowlib_34952d31/core.js:495

node_modules/fbjs/lib/shallowEqual.js.flow:29
 29:     return x !== 0 || 1 / (x: $FlowIssue) === 1 / (y: $FlowIssue);
                                   ^^^^^^^^^^ identifier `$FlowIssue`. Could not resolve name
```

要修复这个，需要像这样修改你的`.flowconfig`：

```ini
[ignore]
<PROJECT_ROOT>/node_modules/fbjs/.*
```

重新运行flow，就不会再有问题了。

## 添加自定义环境变量

>这个特性只在`react-scripts@0.2.3`及更高的版本下支持

你的项目中可以使用你环境中声明的变量，就好像它们是在你的JS文件声明的一样。默认情况下，你可以使用`NODE_ENV` 和其他以`REACT_APP_`开头的环境变量。这些环境变量会在`process.env`上定义。比如，你有一个叫`REACT_APP_SECRET_CODE`的环境变量，那么在JS 中就可以通过`process.env.REACT_APP_SECRET_CODE`访问，`process.env.NODE_ENV` 也是。

>注意：修改任何环境变量，如果开发server 正在运行都要进行重启。

这些环境变量在展示项目在哪里部署，敏感数据在何处调用等不在版本控制之外的信息的时候非常有用。

首先，环境变量要定义。例如，假设你要想在`<form>` 中调用环境变量中定义的密码：

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

在编译期间，`process.env.REACT_APP_SECRET_CODE`会被环境变量`REACT_APP_SECRET_CODE`当前的值替换。记住，`NODE_ENV`变量会自动设置。

当你在浏览器中访问这个app，并观察`<input>`的时候，你会看到它的值被设置为`abcdef`，并且当你执行npm start 的时候，粗体的文字会显示当前在开发环境下。

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

`NODE_ENV`对于执行条件行为时也非常有用：

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

上面form 会查找环境中一个叫`REACT_APP_SECRET_CODE`的变量。为了获取它的值，你需要在环境中定义它。有两种方式定义：或者在shell 中定义，或者在一个.env 文件中定义。

### 在shell 中添加临时环境变量

定义环境变量因操作系统不同而不同。这种方式的变量只在shell session 期间存在，明白这一点非常重要。

#### Windows (cmd.exe)

```cmd
set REACT_APP_SECRET_CODE=abcdef&&npm start
```
（注意：这里是故意缺少空格的）

#### Linux, OS X (Bash)

```bash
REACT_APP_SECRET_CODE=abcdef npm start
```

### 在.env 中添加开发环境变量

>注意这个特性仅在`react-scripts@0.5.0`及以上版本中可用。

要定义一个永久的环境变量，在你的项目的根路径下创建一个.env 的文件。

```
REACT_APP_SECRET_CODE=abcdef
```

如果机器没有显示地设置它们，那么这些值就是这些变量的默认值。更多详细信息，参见[.env 文档](https://github.com/motdotla/dotenv)

>注意：如果你在为开发环境定义环境变量，你的CI 或者主机平台大部分也坑内需要这些变量。查看相关文档看看怎么操作。例如，看看两篇文档[Travis CI](https://docs.travis-ci.com/user/environment-variables/) 和 [Heroku](https://devcenter.heroku.com/articles/config-vars)


## 我可以使用修饰符吗？

很多流行的库在文档中使用[修饰符](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)。Create React App暂时不支持修饰符，因为：

* 它是一个试验阶段的议案，会发生变化。
* 当前的规格说明，Babel 没有正式支持。
* 如果规格说明变了，我们不可能去写一个codemod, 因为facebook 内部没有使用。

但是，在很多场景下，你也可以在不使用修饰符的情况下重写基于修饰符的代码，请参考下面两篇引文：
* [#214](https://github.com/facebookincubator/create-react-app/issues/214)
* [#411](https://github.com/facebookincubator/create-react-app/issues/411)

修饰符的规格说明发展到稳定阶段的时候，Create React App会增加对它的支持的。

## 集成Node 后台

参考[学习教程](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)来获得如何集成一个运行在其他端口的Node 后台，并且使用fetch() 访问后台接口的相关指导。你可以在Github上找到类似的实例：[这里](https://github.com/fullstackreact/food-lookup-demo).

## 开发环境代理API请求

>注意这个特性仅在`react-scripts@0.2.3`及以上版本可用。

大家通常都是将前端React app 和后端实现放在同一个主机和端口上。例如，app 部署之后的生产环境设置像这样：

```
/             - 返回静态服务器上的React app的 index.html
/todos        - 返回静态服务器上的React app的 index.html
/api/todos    - 服务器处理所有的后台实现的 /api/\* 请求
```

这样的设置是非必须的。但是，如果你像这样设置。写请求`fetch('/api/todos')`的时候非常方便，开发的时候不用担心重定向它们到别的主机或者端口。

要在开发阶段将开发服务器的请求代理到你的API服务器上，需要在`package.json` 文件中增加一个proxy 字段，如：
```js
  "proxy": "http://localhost:4000",
```

这样，当你在开发环境中`fetch('/api/todos')` 的时候，开发服务器会知道它不是一个静态资源，然后就会讲请求代理到`http://localhost:4000/api/todos`上。开发服务器会尝试以非text/html的accept 头信息的方式发送请求。

这样就方便地避免了[CORS 跨域问题](http://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations)，以及这类的报错信息。

```
Fetch API cannot load http://localhost:4000/api/todos. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

proxy 只在开发环境中生效（以npm start 起的服务），生产环境上正常访问像/api/todos这样的url 就要再另作配置了。不一定非得要/api 开头，所有非text/html accept头信息的请求都会被转发到特定的代理上。

当前proxy 选项只能处理HTTP请求，无法代理WebSocket链接。如果proxy 的扩展性不够，你也可以这样做：

* 允许服务器跨域([Express怎么做](http://enable-cors.org/server_expressjs.html)).
* 使用[环境变量](#adding-custom-environment-variables) 注入正确的服务器主机和端口到app中。 

## 在开发环境中使用HTTPs

>这个特性仅在react-scripts@0.4.0及以上版本中支持。

你可能需要在开发服务器上部署HTTPS。当使用[proxy特性](#proxying-api-requests-in-development)来代理已经部署了HTTPS 协议的服务器上的API会很好用。

这样的话，要将环境变量HTTPS设置为true, 然后跟以前一样执行npm start:
#### Windows (cmd.exe)

```cmd
set HTTPS=true&&npm start
```

(注意：这里是故意省略掉空格的)

#### Linux, OS X (Bash)

```bash
HTTPS=true npm start
```

服务器会使用一个自己注册的证书，所以访问页面的时候，web浏览器会有提示信息。

## 在服务器端动态生成meta 标签

由于 Create React App不支持服务端渲染，你可能会很好奇怎么动态生成<meta>标签，并反映到当前的URL中。要回答这个问题，我们推荐在HTML中增加预置位置，像这样：
```html
<!doctype html>
<html lang="en">
  <head>
    <meta property="og:title" content="%OG_TITLE%">
    <meta property="og:description" content="%OG_DESCRIPTION%">
```

然后，在服务端，不管你用的什么后台，你可以将index.html读入到内存中，然后根据当前URL替换%OG_TITLE% 和%OG_DESCRIPTION% 以及其他预置的值。只要确保插入的值不会破坏页面，插入到HTML是安全的就可以。

如果你使用的是Node服务，你甚至可以在客户端和服务端共享路由匹配逻辑。但是，对于一些小应用，分别在两者上进行路由匹配也能工作地很好。

## 运行测试

>这个特性仅在react-scripts@0.3.0及以上版本中可用。
>[阅读升级指南学习如何在旧项目中进行测试](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md#migrating-from-023-to-030)

Create React App 使用[Jest](https://facebook.github.io/jest/) 作为它的测试工具。为了继承它，我们给Jest做了一次[大的修复升级](https://facebook.github.io/jest/blog/2016/09/01/jest-15.html) ,如果在几年前你听说了它的很多不好的地方，现在不妨再试试。

Jest 基于Node的测试工具。这意味着测试总是在Node 环境中运行，而不是在一个真正的浏览器中运行。这能加快我们的迭代速度，减少怪异问题。

因为有Jest 的[jsdom](https://github.com/tmpvar/jsdom)，它提供了浏览器的全局变量，比如window，它们的行为和真正的浏览器几乎一样。Jest 是用来对你的逻辑和组件进行单元测试的，而不是测试DOM的奇怪问题。

我们建议你单独使用一款用于浏览器端到端的测试工具，如果你需要的话。它超出了Create React App的范围。

### 文件名规范

Jest 会根据一下流行的命名规范查找测试文件：

*  __tests__ 文件夹下面以.js的文件。
* .test.js 结尾的文件
* .spec.js 结尾的文件

.test.js 或者.spec.js 或者__tests__文件夹下的文件可以放在src顶层文件夹的任意层级下。

我们建议把测试文件放和被测试的代码放在一块，这样相对引用会更短。如果App.test.js 和App.js文件放在同一个文件夹，那么测试只需要import App from './App'， 而不用一长串的相对路径。在大型项目中，同路径放置也能更快的找到测试文件。

### 命令行交互

执行npm test的时候，Jest 会处于watch模式。每当你保存文件的时候，它就会重新运行测试用例，就像npm start重新编译代码一样。

watcher 提供了一个可交互的命令行界面用来运行所有的测试用例。它这样的设计方式能开着命令行享受快速重新运行测试的快乐。你可以通过watcher每次运行之后打印出来的“Watch usage”的提示学习相关命令[Jest watch 模式](http://facebook.github.io/jest/img/blog/15-watch.gif)

### 版本控制集成

默认情况下，当执行npm test的时候，Jest 只会运行从上次提到现在变动过的文件对应的测试。这是一种快速测试的优化方案，不用管你有多少测试用例。但是，那是在假设你的没有频繁提交没有通过测试测代码的前提下。

Jest 会显示地提醒，它运行的是从上次提交到目前变动了的文件相关的测试。如果你运行所有的测试用例，可以在watch 模式下按下a 按键。

在[持续集成](#continuous-integration)服务器上，Jest总是会运行所有的测试用例，除非这个项目不在Git 或者 Mercurial 仓库上。

### 测试编写

通过在it()和test()中添加测试名和代码来创建测试。你也可以选择使用describe() 来包裹it() 和ttest() 的逻辑代码块，但这不是非必须的。

Jest 提供了一个内置的全局函数expect() 用来做判断。一个基本的测试看起来像这样：
```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

所有Jest支持的`expect()` 匹配方法的[文档在这里](http://facebook.github.io/jest/docs/api.html#expect-value)。你也可以使用
[`jest.fn()` 和 `expect(fn).toBeCalled()`](http://facebook.github.io/jest/docs/api.html#tobecalled) 来创建模拟方法。

### 测试组件

组件测试技术有很多。范围从校验组件渲染不会抛出异常的冒烟测试，到浅层渲染，测试输出结果，到完全渲染，测试组件的生命周期，以及状态变化。

不同的项目根据组件的变化频率以及它们包含的逻辑进行不同的测试权衡。如果你还没有决定使用何种测试策略，我们推荐你对组件先进行简单的冒烟测试：
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
```

这个测试挂载了一个组件，并且保证它在渲染的时候不会报错。这样的测试只要一点点工作就能提供很多结果，它们作为一个开始的点。你在src/App.test.js 文件中会找到这个测试用例。

当你遇到改变组件引起的bug的时候，你会更加清楚你的应用中哪一块需要更多的测试。这或许是个引入更多具体的对预期输出和行为进行测试的断言的好时机。

如果你倾向于单独测试组件中渲染的子组件的话，我们推荐[Enzyme](http://airbnb.io/enzyme/) 的[`shallow()` 渲染API](http://airbnb.io/enzyme/docs/api/shallow.html)。你也可以用它来写冒烟测试：

```sh
npm install --save-dev enzyme react-addons-test-utils
```

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
```

与之前的使用ReactDOM.render()的冒烟测试不同，这个测试只渲染了<App>，并没有渲染更深层次的内容。例如，即使<App>自身渲染<Button>的时候报错，这个用例也会通过。浅层渲染非常适合单独的单元测试，但是你可能还希望创建一些完全渲染的测试用例来保证组件集成的正确性。Enzyme 支持[用mount 进行完全渲染](http://airbnb.io/enzyme/docs/api/mount.html)，你可以用它进行状态变化测试和组件生命周期测试。

更多的测试技术，你可以阅读[Enzyme 文档](http://airbnb.io/enzyme/)。 Enzyme 文档使用Chai 和Sinon 来做断言，但是你可以不用它们，Jest 提供了内置的expect() 和jest.fn() 来做检测。

这是一个用Jest 比较方法来重写的用Enzyme文档检测具体输出的例子：

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
```

所有Jest比较方法的[文档在这里](http://facebook.github.io/jest/docs/api.html#expect-value)。与此同时，只要你愿意，你也可以使用第三方的断言库比如[Chai](http://chaijs.com/) 。


### Using Third Party Assertion Libraries

We recommend that you use `expect()` for assertions and `jest.fn()` for spies. If you are having issues with them please [file those against Jest](https://github.com/facebook/jest/issues/new), and we’ll fix them. We intend to keep making them better for React, supporting, for example, [pretty-printing React elements as JSX](https://github.com/facebook/jest/pull/1566).

However, if you are used to other libraries, such as [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/), or if you have existing code using them that you’d like to port over, you can import them normally like this:

```js
import sinon from 'sinon';
import { expect } from 'chai';
```

and then use them in your tests like you normally do.

### Initializing Test Environment

>Note: this feature is available with `react-scripts@0.4.0` and higher.

If your app uses a browser API that you need to mock in your tests or if you just need a global setup before running your tests, add a `src/setupTests.js` to your project. It will be automatically executed before running your tests.

For example:

#### `src/setupTests.js`
```js
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
```

### Focusing and Excluding Tests

You can replace `it()` with `xit()` to temporarily exclude a test from being executed.<br>
Similarly, `fit()` lets you focus on a specific test without running any other tests.

### Coverage Reporting

Jest has an integrated coverage reporter that works well with ES6 and requires no configuration.<br>
Run `npm test -- --coverage` (note extra `--` in the middle) to include a coverage report like this:

![coverage report](http://i.imgur.com/5bFhnTS.png)

Note that tests run much slower with coverage so it is recommended to run it separately from your normal workflow.

### Continuous Integration

By default `npm test` runs the watcher with interactive CLI. However, you can force it to run tests once and finish the process by setting an environment variable called `CI`.

When creating a build of your application with `npm run build` linter warnings are not checked by default. Like `npm test`, you can force the build to perform a linter warning check by setting the environment variable `CI`. If any warnings are encountered then the build fails.

Popular CI servers already set the environment variable `CI` by default but you can do this yourself too:

### On CI servers
#### Travis CI

1. Following the [Travis Getting started](https://docs.travis-ci.com/user/getting-started/) guide for syncing your GitHub repository with Travis.  You may need to initialize some settings manually in your [profile](https://travis-ci.org/profile) page.
1. Add a `.travis.yml` file to your git repository.
```
language: node_js
node_js:
  - 4
  - 6
cache:
  directories:
    - node_modules
script:
  - npm test
  - npm run build
```
1. Trigger your first build with a git push.
1. [Customize your Travis CI Build](https://docs.travis-ci.com/user/customizing-the-build/) if needed.

### On your own environment
##### Windows (cmd.exe)

```cmd
set CI=true&&npm test
```

```cmd
set CI=true&&npm run build
```

(Note: the lack of whitespace is intentional.)

##### Linux, OS X (Bash)

```bash
CI=true npm test
```

```bash
CI=true npm run build
```

The test command will force Jest to run tests once instead of launching the watcher.

>  If you find yourself doing this often in development, please [file an issue](https://github.com/facebookincubator/create-react-app/issues/new) to tell us about your use case because we want to make watcher the best experience and are open to changing how it works to accommodate more workflows.

The build command will check for linter warnings and fail if any are found.

### Disabling jsdom

By default, the `package.json` of the generated project looks like this:

```js
  // ...
  "scripts": {
    // ...
    "test": "react-scripts test --env=jsdom"
  }
```

If you know that none of your tests depend on [jsdom](https://github.com/tmpvar/jsdom), you can safely remove `--env=jsdom`, and your tests will run faster.<br>
To help you make up your mind, here is a list of APIs that **need jsdom**:

* Any browser globals like `window` and `document`
* [`ReactDOM.render()`](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render)
* [`TestUtils.renderIntoDocument()`](https://facebook.github.io/react/docs/test-utils.html#renderintodocument) ([a shortcut](https://github.com/facebook/react/blob/34761cf9a252964abfaab6faf74d473ad95d1f21/src/test/ReactTestUtils.js#L83-L91) for the above)
* [`mount()`](http://airbnb.io/enzyme/docs/api/mount.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

In contrast, **jsdom is not needed** for the following APIs:

* [`TestUtils.createRenderer()`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) (shallow rendering)
* [`shallow()`](http://airbnb.io/enzyme/docs/api/shallow.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

Finally, jsdom is also not needed for [snapshot testing](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html). Longer term, this is the direction we are interested in exploring, but snapshot testing is [not fully baked yet](https://github.com/facebookincubator/create-react-app/issues/372) so we don’t officially encourage its usage yet.

### 实验中的快照测试

Snapshot testing is a new feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output.
快照测试是Jest的一个新特性。

This feature is experimental and still [has major usage issues](https://github.com/facebookincubator/create-react-app/issues/372) so we only encourage you to use it if you like experimental technology. We intend to gradually improve it over time and eventually offer it as the default solution for testing React components, but this will take time. [Read more about snapshot testing.](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html)

### Editor Integration

If you use [Visual Studio Code](https://code.visualstudio.com), there is a [Jest extension](https://github.com/orta/vscode-jest) which works with Create React App out of the box. This provides a lot of IDE-like features while using a text editor: showing the status of a test run with potential fail messages inline, starting and stopping the watcher automatically, and offering one-click snapshot updates. 

![VS Code Jest Preview](https://cloud.githubusercontent.com/assets/49038/20795349/a032308a-b7c8-11e6-9b34-7eeac781003f.png)

## Developing Components in Isolation

Usually, in an app, you have a lot of UI components, and each of them has many different states.
For an example, a simple button component could have following states:

* With a text label.
* With an emoji.
* In the disabled mode.

Usually, it’s hard to see these states without running a sample app or some examples.

Create React App doesn't include any tools for this by default, but you can easily add [React Storybook](https://github.com/kadirahq/react-storybook) to your project. **It is a third-party tool that lets you develop components and see all their states in isolation from your app**.

![React Storybook Demo](http://i.imgur.com/7CIAWpB.gif)

You can also deploy your Storybook as a static app. This way, everyone in your team can view and review different states of UI components without starting a backend server or creating an account in your app.

**Here’s how to setup your app with Storybook:**

First, install the following npm package globally:

```sh
npm install -g getstorybook
```

Then, run the following command inside your app’s directory:

```sh
getstorybook
```

After that, follow the instructions on the screen.

Learn more about React Storybook:

* Screencast: [Getting Started with React Storybook](https://egghead.io/lessons/react-getting-started-with-react-storybook)
* [GitHub Repo](https://github.com/kadirahq/react-storybook)
* [Documentation](https://getstorybook.io/docs)
* [Snapshot Testing](https://github.com/kadirahq/storyshots) with React Storybook

## Making a Progressive Web App

You can turn your React app into a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) by following the steps in [this repository](https://github.com/jeffposnick/create-react-pwa).

## Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file. For example, Python contains a built-in HTTP server that can serve static files:

```sh
cd build
python -m SimpleHTTPServer 9000
```

If you're using [Node](https://nodejs.org/) and [Express](http://expressjs.com/) as a server, it might look like this:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(9000);
```

Create React App is not opinionated about your choice of web server. Any static file server will do. The `build` folder with static assets is the only output produced by Create React App.

However this is not quite enough if you use client-side routing. Read the next section if you want to support URLs like `/todos/42` in your single-page app.

### Serving Apps with Client-Side Routing

If you use routers that use the HTML5 [`pushState` history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) under the hood (for example, [React Router](https://github.com/ReactTraining/react-router) with `browserHistory`), many static file servers will fail. For example, if you used React Router with a route for `/todos/42`, the development server will respond to `localhost:3000/todos/42` properly, but an Express serving a production build as above will not.

This is because when there is a fresh page load for a `/todos/42`, the server looks for the file `build/todos/42` and does not find it. The server needs to be configured to respond to a request to `/todos/42` by serving `index.html`. For example, we can amend our Express example above to serve `index.html` for any unknown paths:

```diff
 app.use(express.static('./build'));

-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, './build', 'index.html'));
 });
```

Now requests to `/todos/42` will be handled correctly both in development and in production.

### Building for Relative Paths

By default, Create React App produces a build assuming your app is hosted at the server root.<br>
To override this, specify the `homepage` in your `package.json`, for example:

```js
  "homepage": "http://mywebsite.com/relativepath",
```

This will let Create React App correctly infer the root path to use in the generated HTML file.


### Firebase

Install the Firebase CLI if you haven't already by running `npm install -g firebase-tools`. Sign up for a [Firebase account](https://console.firebase.google.com/) and create a new project. Run `firebase login` and login with your previous created Firebase account.

Then run the `firebase init` command from your project's root. You need to choose the **Hosting: Configure and deploy Firebase Hosting sites** and choose the Firebase project you created in the previous step. You will need to agree with `database.rules.json` being created, choose `build` as the public directory, and also agree to **Configure as a single-page app** by replying with `y`.

```sh
    === Project Setup

    First, let's associate this project directory with a Firebase project.
    You can create multiple project aliases by running firebase use --add,
    but for now we'll just set up a default project.

    ? What Firebase project do you want to associate as default? Example app (example-app-fd690)

    === Database Setup

    Firebase Realtime Database Rules allow you to define how your data should be
    structured and when your data can be read from and written to.

    ? What file should be used for Database Rules? database.rules.json
    ✔  Database Rules for example-app-fd690 have been downloaded to database.rules.json.
    Future modifications to database.rules.json will update Database Rules when you run
    firebase deploy.

    === Hosting Setup

    Your public directory is the folder (relative to your project directory) that
    will contain Hosting assets to uploaded with firebase deploy. If you
    have a build process for your assets, use your build's output directory.

    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ✔  Wrote build/index.html

    i  Writing configuration info to firebase.json...
    i  Writing project information to .firebaserc...

    ✔  Firebase initialization complete!
```

Now, after you create a production build with `npm run build`, you can deploy it by running `firebase deploy`.

```sh
    === Deploying to 'example-app-fd690'...

    i  deploying database, hosting
    ✔  database: rules ready to deploy.
    i  hosting: preparing build directory for upload...
    Uploading: [==============================          ] 75%✔  hosting: build folder uploaded successfully
    ✔  hosting: 8 files uploaded successfully
    i  starting release process (may take several minutes)...

    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/example-app-fd690/overview
    Hosting URL: https://example-app-fd690.firebaseapp.com
```

For more information see [Add Firebase to your JavaScript Project](https://firebase.google.com/docs/web/setup).

### GitHub Pages

>Note: this feature is available with `react-scripts@0.2.0` and higher.

#### Step 1: Add `homepage` to `package.json`

**The step below is important!**<br>
**If you skip it, your app will not deploy correctly.**

Open your `package.json` and add a `homepage` field:

```js
  "homepage": "https://myusername.github.io/my-app",
```

Create React App uses the `homepage` field to determine the root URL in the built HTML file.

#### Step 2: Install `gh-pages` and add `deploy` to `scripts` in `package.json`

Now, whenever you run `npm run build`, you will see a cheat sheet with instructions on how to deploy to GitHub Pages.

To publish it at [https://myusername.github.io/my-app](https://myusername.github.io/my-app), run:

```sh
npm install --save-dev gh-pages
```

Add the following script in your `package.json`:

```js
  // ...
  "scripts": {
    // ...
    "deploy": "npm run build&&gh-pages -d build"
  }
```

(Note: the lack of whitespace is intentional.)

#### Step 3: Deploy the site by running `npm run deploy`

Then run:

```sh
npm run deploy
```

#### Step 4: Ensure your project's settings use `gh-pages`

Finally, make sure **GitHub Pages** option in your GitHub project settings is set to use the `gh-pages` branch:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">

#### Step 5: Optionally, configure the domain

You can configure a custom domain with GitHub Pages by adding a `CNAME` file to the `public/` folder.

#### Notes on client-side routing

GitHub Pages doesn't support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`). This is because when there is a fresh page load for a url like `http://user.github.io/todomvc/todos/42`, where `/todos/42` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/todos/42`. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:

* You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to `hashHistory` for this effect, but the URL will be longer and more verbose (for example, `http://user.github.io/todomvc/#/todos/42?_k=yknaj`). [Read more](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#histories) about different history implementations in React Router.
* Alternatively, you can use a trick to teach GitHub Pages to handle 404 by redirecting to your `index.html` page with a special redirect parameter. You would need to add a `404.html` file with the redirection code to the `build` folder before deploying your project, and you’ll need to add code handling the redirect parameter to `index.html`. You can find a detailed explanation of this technique [in this guide](https://github.com/rafrex/spa-github-pages).

### Heroku

Use the [Heroku Buildpack for Create React App](https://github.com/mars/create-react-app-buildpack).<br>
You can find instructions in [Deploying React with Zero Configuration](https://blog.heroku.com/deploying-react-with-zero-configuration).

### Modulus

See the [Modulus blog post](http://blog.modulus.io/deploying-react-apps-on-modulus) on how to deploy your react app to Modulus.

## Netlify

**To do a manual deploy to Netlify's CDN:**

```sh
npm install netlify-cli
netlify deploy
```

Choose `build` as the path to deploy.

**To setup continuous delivery:**

With this setup Netlify will build and deploy when you push to git or open a pull request:

1. [Start a new netlify project](https://app.netlify.com/signup)
2. Pick your Git hosting service and select your repository
3. Click `Build your site`

**Support for client-side routing:**

To support `pushState`, make sure to create a `public/_redirects` file with the following rewrite rules:

```
/*  /index.html  200
```

When you build the project, Create React App will place the `public` folder contents into the build output.

### Now

See [this example](https://github.com/xkawi/create-react-app-now) for a zero-configuration single-command deployment with [now](https://zeit.co/now).

### S3 and CloudFront

See this [blog post](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af) on how to deploy your React app to Amazon Web Services [S3](https://aws.amazon.com/s3) and [CloudFront](https://aws.amazon.com/cloudfront/).

### Surge

Install the Surge CLI if you haven't already by running `npm install -g surge`. Run the `surge` command and log in you or create a new account. You just need to specify the *build* folder and your custom domain, and you are done.

```sh
              email: email@domain.com
           password: ********
       project path: /path/to/project/build
               size: 7 files, 1.8 MB
             domain: create-react-app.surge.sh
             upload: [====================] 100%, eta: 0.0s
   propagate on CDN: [====================] 100%
               plan: Free
              users: email@domain.com
         IP Address: X.X.X.X

    Success! Project is published and running at create-react-app.surge.sh
```

Note that in order to support routers that use HTML5 `pushState` API, you may want to rename the `index.html` in your build folder to `200.html` before deploying to Surge. This [ensures that every URL falls back to that file](https://surge.sh/help/adding-a-200-page-for-client-side-routing).

## 排忧解难

### `npm test` macOS Sierra上hang 住

If you run `npm test` and the console gets stuck after printing `react-scripts test --env=jsdom` to the console there might be a problem with your [Watchman](https://facebook.github.io/watchman/) installation as described in [facebookincubator/create-react-app#713](https://github.com/facebookincubator/create-react-app/issues/713).

We recommend deleting `node_modules` in your project and running `npm install` (or `yarn` if you use it) first. If it doesn't help, you can try one of the numerous workarounds mentioned in these issues:

* [facebook/jest#1767](https://github.com/facebook/jest/issues/1767)
* [facebook/watchman#358](https://github.com/facebook/watchman/issues/358)
* [ember-cli/ember-cli#6259](https://github.com/ember-cli/ember-cli/issues/6259)

It is reported that installing Watchman 4.7.0 or newer fixes the issue. If you use [Homebrew](http://brew.sh/), you can run these commands to update it:

```
watchman shutdown-server
brew update
brew reinstall watchman
```

You can find [other installation methods](https://facebook.github.io/watchman/docs/install.html#build-install) on the Watchman documentation page.

If this still doesn't help, try running `launchctl unload -F ~/Library/LaunchAgents/com.github.facebook.watchman.plist`.

There are also reports that *uninstalling* Watchman fixes the issue. So if nothing else helps, remove it from your system and try again.

### `npm run build` silently fails

It is reported that `npm run build` can fail on machines with no swap space, which is common in cloud environments. If [the symptoms are matching](https://github.com/facebookincubator/create-react-app/issues/1133#issuecomment-264612171), consider adding some swap space to the machine you’re building on, or build the project locally.

## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/facebookincubator/create-react-app/issues) or [contribute some!](https://github.com/facebookincubator/create-react-app/edit/master/packages/react-scripts/template/README.md)
