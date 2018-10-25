// ==UserScript==
// @name         Bilibili Evolved (Preview)
// @version      1.5.12
// @description  增强哔哩哔哩Web端体验. (预览版分支)
// @author       Grant Howard, Coulomb-G
// @match        *://*.bilibili.com/*
// @match        *://*.bilibili.com
// @run-at       document-end
// @updateURL    https://github.com/the1812/Bilibili-Evolved/raw/preview/bilibili-evolved.preview.user.js
// @downloadURL  https://github.com/the1812/Bilibili-Evolved/raw/preview/bilibili-evolved.preview.user.js
// @supportURL   https://github.com/the1812/Bilibili-Evolved/issues
// @homepage     https://github.com/the1812/Bilibili-Evolved
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         https://raw.githubusercontent.com/the1812/Bilibili-Evolved/preview/images/logo.png
// ==/UserScript==
(self$ =>
{
    const $ = unsafeWindow.$ || self$;
    const settings = {
        forceWideMinWidth: "1368px",
        forceWide: false,
        darkScheduleStart: "18:00",
        darkScheduleEnd: "6:00",
        darkSchedule: false,
        blurSettingsPanel: false,
        blurVideoControl: false,
        toast: true,
        fullTweetsTitle: true,
        removeVideoTopMask: false,
        removeLiveWatermark: true,
        harunaScale: true,
        removeAds: true,
        hideTopSearch: false,
        touchVideoPlayerDoubleTapControl: false,
        touchVideoPlayerAnimation: false,
        touchNavBar: false,
        touchVideoPlayer: false,
        watchLaterRedirect: true,
        expandDanmakuList: true,
        customStyleColor: "#00A0D8",
        blurBackgroundOpacity: 0.382,
        overrideNavBar: true,
        showBanner: true,
        useDarkStyle: false,
        useNewStyle: true,
        useCache: true,
        cache: {}
    };
    const fixedSettings = {
        guiSettings: true,
        viewCover: true,
        notifyNewVersion: true,
        clearCache: true,
        fixFullscreen: false,
        downloadVideo: true,
        latestVersionLink: "https://github.com/the1812/Bilibili-Evolved/raw/preview/bilibili-evolved.preview.user.js",
        currentVersion: "1.5.12"
    };
    function loadSettings()
    {
        for (const key in settings)
        {
            settings[key] = GM_getValue(key, settings[key]);
        }
        for (const key in fixedSettings)
        {
            settings[key] = fixedSettings[key];
        }
    }
    function saveSettings(newSettings)
    {
        for (const key in settings)
        {
            GM_setValue(key, newSettings[key]);
        }
    }
    function onSettingsChange(change)
    {
        for (const key in settings)
        {
            GM_addValueChangeListener(key, change);
        }
    }
    function loadResources()
    {
        Resource.root = "https://raw.githubusercontent.com/the1812/Bilibili-Evolved/preview/";
        Resource.all = {
            style: new Resource("min/style.min.scss", 1),
            oldStyle: new Resource("min/old.min.scss", 1),
            scrollbarStyle: new Resource("min/scrollbar.min.css", 1),
            darkStyle: new Resource("min/dark.min.scss", 2),
            darkStyleImportant: new Resource("min/dark-important.min.scss"),
            darkStyleNavBar: new Resource("min/dark-navbar.min.scss"),
            touchPlayerStyle: new Resource("min/touch-player.min.scss", 3),
            navbarOverrideStyle: new Resource("min/override-navbar.min.css", 4),
            noBannerStyle: new Resource("min/no-banner.min.css", 5),
            removeAdsStyle: new Resource("min/remove-promotions.min.css", 6),
            guiSettingsStyle: new Resource("min/gui-settings.min.scss", 0),
            fullTweetsTitleStyle: new Resource("min/full-tweets-title.min.css", 7),
            imageViewerStyle: new Resource("min/image-viewer.min.scss", 8),
            toastStyle: new Resource("min/toast.min.scss", 9),
            blurVideoControlStyle: new Resource("min/blur-video-control.min.css", 10),
            forceWideStyle: new Resource("min/force-wide.min.scss"),
            downloadVideoStyle: new Resource("min/download-video.min.scss"),

            guiSettingsDom: new Resource("min/gui-settings.min.html"),
            imageViewerDom: new Resource("min/image-viewer.min.html"),
            downloadVideoDom: new Resource("min/download-video.min.html"),
            latestVersion: new Resource("version.txt"),

            guiSettings: new Resource("min/gui-settings.min.js"),
            useDarkStyle: new Resource("min/dark-styles.min.js"),
            useNewStyle: new Resource("min/new-styles.min.js"),
            overrideNavBar: new Resource("min/override-navbar.min.js"),
            touchNavBar: new Resource("min/touch-navbar.min.js"),
            touchVideoPlayer: new Resource("min/touch-player.min.js"),
            expandDanmakuList: new Resource("min/expand-danmaku.min.js"),
            removeAds: new Resource("min/remove-promotions.min.js"),
            watchLaterRedirect: new Resource("min/watchlater.min.js"),
            hideTopSearch: new Resource("min/hide-top-search.min.js"),
            harunaScale: new Resource("min/haruna-scale.min.js"),
            removeLiveWatermark: new Resource("min/remove-watermark.min.js"),
            fullTweetsTitle: new Resource("min/full-tweets-title.min.js"),
            viewCover: new Resource("min/view-cover.min.js"),
            notifyNewVersion: new Resource("min/notify-new-version.min.js"),
            toast: new Resource("min/toast.min.js"),
            removeVideoTopMask: new Resource("min/remove-top-mask.min.js"),
            blurVideoControl: new Resource("min/blur-video-control.min.js"),
            darkSchedule: new Resource("min/dark-schedule.min.js"),
            forceWide: new Resource("min/force-wide.min.js"),
            clearCache: new Resource("min/clear-cache.min.js"),
            downloadVideo: new Resource("min/download-video.min.js")
        };
        (function ()
        {
            this.guiSettings.dependencies = [
                this.guiSettingsDom,
                this.guiSettingsStyle
            ];
            this.useDarkStyle.dependencies = [
                this.darkStyle,
                this.darkStyleImportant,
                this.darkStyleNavBar,
                this.scrollbarStyle
            ];
            this.useNewStyle.dependencies = [
                this.style,
                this.oldStyle,
                this.scrollbarStyle
            ];
            this.overrideNavBar.dependencies = [
                this.navbarOverrideStyle,
                this.noBannerStyle
            ];
            this.touchVideoPlayer.dependencies = [
                this.touchPlayerStyle
            ];
            this.removeAds.dependencies = [
                this.removeAdsStyle
            ];
            this.fullTweetsTitle.dependencies = [
                this.fullTweetsTitleStyle
            ];
            this.viewCover.dependencies = [
                this.imageViewerDom,
                this.imageViewerStyle
            ];
            this.notifyNewVersion.dependencies = [
                this.latestVersion
            ];
            this.toast.dependencies = [
                this.toastStyle
            ];
            this.blurVideoControl.dependencies = [
                this.blurVideoControlStyle
            ];
            this.forceWide.dependencies = [
                this.forceWideStyle
            ];
            this.downloadVideo.dependencies = [
                this.downloadVideoDom,
                this.downloadVideoStyle
            ];
        }).apply(Resource.all);
        (function ()
        {
            this.guiSettings.displayName = "设置";
            this.useDarkStyle.displayName = "夜间模式";
            this.useNewStyle.displayName = "样式调整";
            this.overrideNavBar.displayName = "搜索栏置顶";
            this.touchNavBar.displayName = "顶栏触摸优化";
            this.touchVideoPlayer.displayName = "播放器触摸支持";
            this.expandDanmakuList.displayName = "自动展开弹幕列表";
            this.removeAds.displayName = "删除广告";
            this.watchLaterRedirect.displayName = "稍后再看重定向";
            this.hideTopSearch.displayName = "隐藏搜索推荐";
            this.harunaScale.displayName = "缩放看板娘";
            this.removeLiveWatermark.displayName = "删除直播水印";
            this.fullTweetsTitle.displayName = "展开动态标题";
            this.viewCover.displayName = "查看封面";
            this.notifyNewVersion.displayName = "新版本提醒";
            this.toast.displayName = "显示消息";
            this.removeVideoTopMask.displayName = "删除视频标题层";
            this.blurVideoControl.displayName = "模糊视频控制栏背景";
            this.darkSchedule.displayName = "夜间模式计划时段";
            this.forceWide.displayName = "强制宽屏";
        }).apply(Resource.all);
    }
    function downloadText(url, load, error)
    {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => load && load(xhr.responseText));
        xhr.addEventListener("error", () => error && error(xhr.responseText));
        xhr.withCredentials = true;
        xhr.open("GET", url);
        xhr.send();
    }
    // Placeholder class for Toast
    class Toast
    {
        constructor() { }
        show() { }
        dismiss() { }
        static show() { }
        static info() { }
        static success() { }
        static error() { }
    }
    class Observer
    {
        constructor(element, callback)
        {
            this.element = element;
            this.callback = callback;
            this.observer = null;
            this.options = { childList: true, subtree: true };
        }
        start()
        {
            if (this.element)
            {
                this.observer = new MutationObserver(this.callback);
                this.observer.observe(this.element, this.options);
            }
            return this;
        }
        stop()
        {
            this.observer && this.observer.disconnect();
            return this;
        }
        static subtree(selector, callback)
        {
            callback();
            return new Array(...document.querySelectorAll(selector))
                .map(it =>
                {
                    return new Observer(it, callback).start();
                });
        }
        static attributes(selector, callback)
        {
            callback();
            return new Array(...document.querySelectorAll(selector))
                .map(it =>
                {
                    const observer = new Observer(it, callback);
                    observer.options = {
                        childList: false,
                        subtree: false,
                        attributes: true
                    };
                    return observer.start();
                });
        }
        static all(selector, callback)
        {
            callback();
            return new Array(...document.querySelectorAll(selector))
                .map(it =>
                {
                    const observer = new Observer(it, callback);
                    observer.options = {
                        childList: true,
                        subtree: true,
                        attributes: true
                    };
                    return observer.start();
                });
        }
    }
    class SpinQuery
    {
        constructor(query, condition, action, onFailed)
        {
            this.maxRetry = 30;
            this.retry = 0;
            this.queryInterval = 500;
            this.query = query;
            this.condition = condition;
            this.action = action;
            this.onFailed = onFailed;
        }
        start()
        {
            this.tryQuery(this.query, this.condition, this.action, this.onFailed);
        }
        tryQuery(query, condition, action, onFailed)
        {
            if (this.retry >= this.maxRetry)
            {
                if (onFailed)
                {
                    onFailed();
                }
            }
            else
            {
                const result = query();
                if (condition(result))
                {
                    action(result);
                }
                else
                {
                    this.retry++;
                    setTimeout(() => this.tryQuery(query, condition, action, onFailed), this.queryInterval);
                }
            }
        }
        static any(query, action)
        {
            new SpinQuery(query, it => it.length > 0, action).start();
        }
        static count(query, count, action)
        {
            new SpinQuery(query, it => it.length === count, action).start();
        }
    }
    class ColorProcessor
    {
        constructor(hex)
        {
            this.hex = hex;
        }
        get rgb()
        {
            return this.hexToRgb(this.hex);
        }
        getHexRegex(alpha, shorthand)
        {
            const repeat = shorthand ? "" : "{2}";
            const part = `([a-f\\d]${repeat})`;
            const count = alpha ? 4 : 3;
            const pattern = `#?${part.repeat(count)}`;
            return new RegExp(pattern, "ig");
        }
        _hexToRgb(hex, alpha)
        {
            const isShortHand = hex.length < 6;
            if (isShortHand)
            {
                const shorthandRegex = this.getHexRegex(alpha, true);
                hex = hex.replace(shorthandRegex, function ()
                {
                    let result = "";
                    let i = 1;
                    while (arguments[i])
                    {
                        result += arguments[i].repeat(2);
                        i++;
                    }
                    return result;
                });
            }

            const regex = this.getHexRegex(alpha, false);
            const regexResult = regex.exec(hex);
            if (regexResult)
            {
                const color = {
                    r: parseInt(regexResult[1], 16),
                    g: parseInt(regexResult[2], 16),
                    b: parseInt(regexResult[3], 16)
                };
                if (regexResult[4])
                {
                    color.a = parseInt(regexResult[4], 16) / 255;
                }
                return color;
            }
            else if (alpha)
            {
                const rgb = this._hexToRgb(hex, false);
                if (rgb)
                {
                    rgb.a = 1;
                    return rgb;
                }
            }
            return null;
        }
        hexToRgb(hex)
        {
            return this._hexToRgb(hex, false);
        }
        hexToRgba(hex)
        {
            return this._hexToRgb(hex, true);
        }
        rgbToHsb(rgb)
        {
            const { r, g, b } = rgb;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;
            const s = Math.round((max === 0 ? 0 : delta / max) * 100);
            const v = Math.round(max / 255 * 100);

            let h;
            if (delta === 0)
            {
                h = 0;
            }
            else if (r === max)
            {
                h = (g - b) / delta % 6;
            }
            else if (g === max)
            {
                h = (b - r) / delta + 2;
            }
            else if (b === max)
            {
                h = (r - g) / delta + 4;
            }
            h = Math.round(h * 60);
            if (h < 0)
            {
                h += 360;
            }

            return { h: h, s: s, b: v };
        }
        get hsb()
        {
            return this.rgbToHsb(this.rgb);
        }
        get grey()
        {
            const color = this.rgb;
            return 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        }
        get foreground()
        {
            const color = this.rgb;
            if (color && this.grey < 0.35)
            {
                return "#000";
            }
            return "#fff";
        }
        makeImageFilter(originalRgb)
        {
            const { h, s, b } = this.rgbToHsb(originalRgb);
            const targetColor = this.hsb;

            const hue = targetColor.h - h;
            const saturate = (s - targetColor.s) / 100 + 100;
            const brightness = (b - targetColor.b) / 100 + 100;
            const filter = `hue-rotate(${hue}deg) saturate(${saturate}%) brightness(${brightness}%)`;
            return filter;
        }
        get blueImageFilter()
        {
            const blueColor = {
                r: 0,
                g: 160,
                b: 213
            };
            return this.makeImageFilter(blueColor);
        }
        get pinkImageFilter()
        {
            const pinkColor = {
                r: 251,
                g: 113,
                b: 152
            };
            return this.makeImageFilter(pinkColor);
        }
        get brightness()
        {
            return `${this.foreground === "#000" ? "100" : "0"}%`;
        }
        get filterInvert()
        {
            return this.foreground === "#000" ? "" : "invert(1)";
        }
    }
    // [Offline build placeholder]
    class ResourceType
    {
        constructor(name, preprocessor)
        {
            this.name = name;
            this.preprocessor = preprocessor || (text => text);
        }
        static fromUrl(url)
        {
            if (url.indexOf(".scss") !== -1 || url.indexOf(".css") !== -1)
            {
                return this.style;
            }
            else if (url.indexOf(".html") !== -1 || url.indexOf(".htm") !== -1)
            {
                return this.html;
            }
            else if (url.indexOf(".js") !== -1)
            {
                return this.script;
            }
            else if (url.indexOf(".txt") !== -1)
            {
                return this.text;
            }
            else
            {
                return this.unknown;
            }
        }
        static get style()
        {
            return new ResourceType("style", style =>
            {
                const color = new ColorProcessor();
                const hexToRgba = text =>
                {
                    const replaceColor = (text, shorthand) =>
                    {
                        const part = `([a-f\\d]${shorthand ? "" : "{2}"})`.repeat(4);
                        return text.replace(new RegExp(`(#${part})[^a-f\\d]`, "ig"), (original, it) =>
                        {
                            const rgba = color.hexToRgba(it);
                            if (rgba)
                            {
                                return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})${original.slice(-1)}`;
                            }
                            else
                            {
                                return original;
                            }
                        });
                    };
                    return replaceColor(replaceColor(text, false), true);
                };
                for (const key of Object.keys(settings))
                {
                    style = style
                        .replace(new RegExp("\\$" + key, "g"), settings[key]);
                }
                return hexToRgba(style);
            });
        }
        static get html()
        {
            return new ResourceType("html", html =>
            {
                const keys = Object.keys(Resource.all).filter(key => Resource.all[key].displayName);
                for (const key of keys)
                {
                    html = html
                        .replace(new RegExp(`(<checkbox\\s*?indent=".+?"\\s*?key="${key}"\\s*?dependencies=".*?">)[^\\0]*?(</checkbox>)`, "g"),
                            `$1${Resource.all[key].displayName}$2`);
                }
                return html
                    .replace(/<category>([^\0]*?)<\/category>/g, `
                    <li class="indent-center category">
                        <span class="settings-category">$1</span>
                    </li>
                `).replace(/<checkbox\s*?indent="(.+?)"\s*?key="(.+?)"\s*?dependencies="(.*?)">([^\0]*?)<\/checkbox>/g, `
                    <li class="indent-$1">
                        <label class="gui-settings-checkbox-container">
                            <input key="$2" type="checkbox" dependencies="$3" checked/>
                            <svg class="gui-settings-ok" viewBox="0 0 24 24">
                                <path />
                            </svg>
                            <span>$4</span>
                        </label>
                    </li>
                `).replace(/<textbox\s*?indent="(.+?)"\s*key="(.+?)"\s*?dependencies="(.*?)">([^\0]*?)<\/textbox>/g, `
                    <li class="indent-$1">
                        <label class="gui-settings-textbox-container">
                            <span>$4</span>
                            <input key="$2" dependencies="$3" spellcheck="false" type="text" />
                        </label>
                    </li>
                `);
            });
        }
        static get script()
        {
            return new ResourceType("script");
        }
        static get text()
        {
            return new ResourceType("text");
        }
        static get unknown()
        {
            return new ResourceType("unknown");
        }
    }
    class Resource
    {
        get downloaded()
        {
            return this.text !== null;
        }
        get key()
        {
            return Object.keys(Resource.all).find(k => Resource.all[k] === this);
        }
        constructor(url, priority)
        {
            this.url = Resource.root + url;
            this.dependencies = [];
            this.priority = priority;
            this.text = null;
            this.type = ResourceType.fromUrl(url);
            this.displayName = "";
        }
        loadCache()
        {
            const key = this.key;
            if (!settings.cache || !settings.cache[key])
            {
                return null;
            }
            else
            {
                return settings.cache[key];
            }
        }
        download()
        {
            const key = this.key;
            return new Promise((resolve, reject) =>
            {
                if (this.downloaded)
                {
                    resolve(this.text);
                }
                else
                {
                    Promise.all(this.dependencies.map(r => r.download())).then(() =>
                    {
                        // +#Offline build placeholder
                        const apply = text =>
                        {
                            this.text = this.type.preprocessor(text);
                            resolve(this.text);
                        };
                        if (settings.useCache)
                        {
                            const cache = this.loadCache(key);
                            if (cache !== null)
                            {
                                apply(cache);
                            }
                            downloadText(this.url, text =>
                            {
                                if (cache !== text)
                                {
                                    if (cache === null)
                                    {
                                        apply(text);
                                    }
                                    if (typeof offlineData === "undefined")
                                    {
                                        settings.cache[key] = text;
                                        saveSettings(settings);
                                    }
                                }
                            }, error => reject(error));
                        }
                        else
                        {
                            downloadText(this.url,
                                text => apply(text),
                                error => reject(error));
                        }
                        // -#Offline build placeholder
                    });
                }
            });
        }
        getStyle(id)
        {
            const style = this.text;
            if (style === null)
            {
                console.error("Attempt to get style which is not downloaded.");
            }
            let attributes = `id='${id}'`;
            if (this.priority !== undefined)
            {
                attributes += ` priority='${this.priority}'`;
            }
            return `<style ${attributes}>${style}</style>`;
        }
        getPriorStyle(root)
        {
            if (this.priority !== undefined)
            {
                let insertPosition = this.priority - 1;
                let formerStyle = root.find(`style[priority='${insertPosition}']`);
                while (insertPosition >= 0 && formerStyle.length === 0)
                {
                    formerStyle = root.find(`style[priority='${insertPosition}']`);
                    insertPosition--;
                }
                if (insertPosition < 0)
                {
                    return null;
                }
                else
                {
                    return formerStyle;
                }
            }
            else
            {
                return null;
            }
        }
        applyStyle(id, important)
        {
            if ($(`#${id}`).length === 0)
            {
                const element = this.getStyle(id);
                const root = important ? $("body") : $("head");
                const priorStyle = this.getPriorStyle(root);
                if (priorStyle === null)
                {
                    if (important)
                    {
                        root.after(element);
                    }
                    else
                    {
                        root.prepend(element);
                    }
                }
                else
                {
                    priorStyle.after(element);
                }
            }
        }
    }
    class ResourceManager
    {
        constructor()
        {
            this.data = Resource.all;
            this.attributes = {};
            this.setupColors();
        }
        setupColors()
        {
            this.color = new ColorProcessor(settings.customStyleColor);
            settings.foreground = this.color.foreground;
            settings.blueImageFilter = this.color.blueImageFilter;
            settings.pinkImageFilter = this.color.pinkImageFilter;
            settings.brightness = this.color.brightness;
            settings.filterInvert = this.color.filterInvert;
        }
        fetchByKey(key)
        {
            const resource = Resource.all[key];
            if (!resource)
            {
                return null;
            }
            const promise = resource.download();
            return new Promise(resolve =>
            {
                promise.then(text =>
                {
                    this.applyComponent(key, text);
                    resolve();
                }).catch(reason =>
                {
                    // download error
                    console.error(`Download error, XHR status: ${reason}`);
                    Toast.error(`无法下载组件<span>${Resource.all[key].displayName}</span>`, "错误");
                });
            });
        }
        fetch()
        {
            return new Promise(resolve =>
            {
                const promises = [];
                for (const key in settings)
                {
                    if (settings[key] === true && key !== "toast")
                    {
                        const promise = this.fetchByKey(key);
                        if (promise)
                        {
                            promises.push(promise);
                        }
                    }
                }
                this.validateCache();
                Promise.all(promises).then(() =>
                {
                    this.applySettingsWidgets();
                    resolve();
                });
            });
        }
        applyComponent(key, text)
        {
            const func = eval(text);
            if (func)
            {
                try
                {
                    const attribute = func(settings, this) || {};
                    this.attributes[key] = attribute;
                }
                catch (error)
                {
                    // execution error
                    console.error(`Failed to apply feature "${key}": ${error}`);
                    Toast.error(`加载组件<span>${Resource.all[key].displayName}</span>失败`, "错误");
                }
            }
        }
        applySettingsWidgets()
        {
            const panel = $(".gui-settings-panel");
            if (panel.length === 0)
            {
                return;
            }
            for (const info of Object.values(this.attributes)
                .filter(it => it.settingsWidget)
                .map(it => it.settingsWidget))
            {
                if (info.after)
                {
                    panel.find(info.after()).after(info.content);
                }
                else if (info.before)
                {
                    panel.find(info.before()).before(info.content);
                }

                if (info.success)
                {
                    info.success();
                }
            }
        }
        getDefaultStyleId(key)
        {
            return key.replace(/([a-z][A-Z])/g,
                g => `${g[0]}-${g[1].toLowerCase()}`);
        }
        applyStyle(key, id)
        {
            if (id === undefined)
            {
                id = this.getDefaultStyleId(key);
            }
            Resource.all[key].applyStyle(id, false);
        }
        applyImportantStyle(key, id)
        {
            if (id === undefined)
            {
                id = this.getDefaultStyleId(key);
            }
            Resource.all[key].applyStyle(id, true);
        }
        applyStyleFromText(text)
        {
            $("head").prepend(text);
        }
        applyImportantStyleFromText(text)
        {
            $("body").after(text);
        }
        getStyle(key, id)
        {
            return Resource.all[key].getStyle(id);
        }
        validateCache()
        {
            if (settings.cache.version !== settings.currentVersion)
            {
                settings.cache = {};
            }
            if (settings.cache.version === undefined)
            {
                settings.cache.version = settings.currentVersion;
            }
            saveSettings(settings);
        }
    }

    loadResources();
    loadSettings();
    const resources = new ResourceManager();
    if (settings.toast)
    {
        resources.fetchByKey("toast").then(() =>
        {
            Toast = resources.attributes.toast.export;
            resources.fetch();
        });
    }
    else
    {
        resources.fetch();
    }

})(window.jQuery.noConflict(true));
