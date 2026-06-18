# LocalMind 下载页上线说明

这个目录是一个纯静态下载页，只需要上传 `index.html`、`assets/`，以及你的 Windows 安装包即可。

## 推荐网址

推荐使用独立子域名：

```text
https://localmind.haiyne.cn/
```

这样用户打开后直接进入 LocalMind 下载页，不会先看到 `www.haiyne.cn` 企业主页。不要在企业主页里放这个链接，就不会从主页导航暴露出来。

如果使用这种地址：

```text
https://www.haiyne.cn/localmind/
```

用户也能直接进入下载页，但他们手动删掉 `/localmind/` 后仍然会看到企业主页，所以不如独立子域名干净。

## 安装包直链

下载按钮的地址在这里修改：

```text
assets/config.js
```

默认写法是：

```js
window.LOCALMIND_DOWNLOAD_URL = "downloads/LocalMind-1.0.0-setup.exe";
```

如果你把安装包放在下载页目录里的 `downloads/` 文件夹，并命名为 `LocalMind-1.0.0-setup.exe`，就不需要改代码。

也可以换成腾讯云 COS 直链，例如：

```js
window.LOCALMIND_DOWNLOAD_URL = "https://你的COS域名/LocalMind-1.0.0-setup.exe";
```

要求：链接必须免登录、无广告、无中间页面，浏览器点击后直接下载安装包。腾讯云 COS 里建议给 `.exe` 设置 `Content-Disposition: attachment`。

## 腾讯云上线方式

### 方式 1：轻量服务器 / CVM + Nginx

1. 在腾讯云 DNS 里添加解析：`localmind.haiyne.cn` 指向你的服务器公网 IP。
2. 在服务器上创建一个独立网站目录，例如 `/www/wwwroot/localmind.haiyne.cn/`。
3. 上传本目录内的所有内容到这个网站目录。
4. 把安装包上传到 `/www/wwwroot/localmind.haiyne.cn/downloads/LocalMind-1.0.0-setup.exe`。
5. 在 Nginx 新增一个站点，域名填 `localmind.haiyne.cn`，根目录填上面的目录。
6. 配置 HTTPS 证书。
7. 访问 `https://localmind.haiyne.cn/` 测试页面，点击按钮测试是否直接下载。

### 方式 2：腾讯云 COS 静态网站

1. 新建一个 COS 存储桶。
2. 上传 `index.html`、`assets/` 和安装包。
3. 开启静态网站功能，默认首页设置为 `index.html`。
4. 绑定自定义域名 `localmind.haiyne.cn`。
5. 配置 CDN/HTTPS。
6. 确认安装包链接是公开读取，并且点击后直接下载。

## 搜索引擎

页面已加入：

```html
<meta name="robots" content="noindex,nofollow" />
```

这会尽量避免搜索引擎收录下载页。它不影响你把链接发给用户直接访问。
