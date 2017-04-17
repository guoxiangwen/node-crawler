let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
var mkdirp = require('mkdirp');
// let http = require('http');
// let https = require('https');

//最新合集
let newCollection = [{ "title": "", "href": "http://1024.luj8le.rocks/pw/undefined" }, { "title": "[04.17] ◆◆最新の亚洲无码の最新合集㊣♀[04.17]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607181.html" }, { "title": "[04.17] ◆◆最新の日本骑兵の精品合集㊣♀[04.17]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607179.html" }, { "title": "[04.17] ◆◆最新の欧美無碼の精品合集㊣♀[04.17]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607177.html" }, { "title": "[04.17] ❉老含及❉★★強片大推★★有碼中文精品合集04.17", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607167.html" }, { "title": "", "href": "http://1024.luj8le.rocks/pw/undefined" }, { "title": "[04.17] ★★国产高清の最新合集★☆ [04.18]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607080.html" }, { "title": "[04.17] ★★欧美無碼の精品合集★☆ [04.18]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/607079.html" }, { "title": "[04.16] ★♥最新の欧美無碼웃#新片合集㊣♥ [04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606628.html" }, { "title": "[04.16] ★♥最新の亞洲無碼웃#新片合集㊣♥ [04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606596.html" }, { "title": "[04.16] ❉老含及❉有碼中文精品合集04.16", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606581.html" }, { "title": "[04.16] ❉老含及❉有碼精品合集04.16", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606526.html" }, { "title": "[04.16] lanfeng 正片大片延迟合集 [4.8]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606419.html" }, { "title": "[04.16] lanfeng 国产延迟合集 [4.10]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606418.html" }, { "title": "[04.16] ★●最新の日本骑兵高清の原档合集㊣● [04.16] [29部]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606385.html" }, { "title": "[04.16] ★★国产高清の最新合集★☆ [04.17]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606023.html" }, { "title": "[04.16] ★★欧美無碼の精品合集★☆ [04.17]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/606022.html" }, { "title": "[04.16] ★★灣搭★★超級偷拍專輯♂04.16", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605868.html" }, { "title": "[04.16] ◆◆最新の亚洲无码の最新合集㊣♀[04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605842.html" }, { "title": "[04.16] ◆◆最新の日本骑兵の精品合集㊣♀[04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605839.html" }, { "title": "[04.16] ◆◆最新の欧美無碼の精品合集㊣♀[04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605836.html" }, { "title": "[04.16] ★♥最新の欧美無碼웃#新片合集㊣♥ [04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605829.html" }, { "title": "[04.15] ★♥最新の亞洲無碼웃#新片合集㊣♥ [04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605654.html" }, { "title": "[04.15] ❉老含及❉有碼中文精品合集04.15", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605614.html" }, { "title": "[04.15] ❉老含及❉有碼精品合集04.15", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605567.html" }, { "title": "[04.15] ★●最新の日本骑兵高清の原档合集㊣● [04.15] [23部]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605368.html" }, { "title": "[04.15] ★★国产高清の最新合集★☆ [04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605055.html" }, { "title": "[04.15] ★★欧美無碼の精品合集★☆ [04.16]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/605054.html" }, { "title": "[04.15] ◆◆最新の亚洲无码の最新合集㊣♀[04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604785.html" }, { "title": "[04.15] ◆◆最新の欧美無碼の精品合集㊣♀[04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604784.html" }, { "title": "[04.15] ◆◆最新の日本骑兵の精品合集㊣♀[04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604783.html" }, { "title": "", "href": "http://1024.luj8le.rocks/pw/undefined" }, { "title": "[04.14] ★♥最新の欧美無碼웃#新片合集㊣♥ [04.14]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604710.html" }, { "title": "[04.14] ❉老含及❉有碼中文精品合集04.14", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604649.html" }, { "title": "[04.14] ★●最新の日本骑兵高清の原档合集㊣● [04.14] [30部]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604594.html" }, { "title": "[04.14] ★♥最新の亞洲無碼웃#新片合集㊣♥ [04.14]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604545.html" }, { "title": "[04.14] ❉灣搭❉無敵動畫合集04.14", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604372.html" }, { "title": "[04.14] ❉老含及❉★★強片大推★★精品合集04.14", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604353.html" }, { "title": "[04.14] lanfeng 正片大片延迟合集 [4.6]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604283.html" }, { "title": "[04.14] lanfeng 正片大片延迟合集 [4.5]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/604250.html" }, { "title": "[04.14] ❉老含及❉有碼精品合集04.14", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603998.html" }, { "title": "[04.14] ★★国产高清の最新合集★☆ [04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603908.html" }, { "title": "[04.14] ★★欧美無碼の精品合集★☆ [04.15]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603907.html" }, { "title": "[04.14] ◆◆最新の日本骑兵の精品合集㊣♀[04.14]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603739.html" }, { "title": "[04.14] ◆◆最新の欧美無碼の精品合集㊣♀[04.14]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603736.html" }, { "title": "[04.14] ◆◆最新の亚洲无码の最新合集㊣♀[04.14]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603730.html" }, { "title": "[04.14] ★♥最新の欧美無碼웃#新片合集㊣♥ [04.13]", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603705.html" }, { "title": "[04.13] ❉老含及❉有碼中文精品合集04.13", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603656.html" }, { "title": "[04.13] ❉老含及❉有碼精品合集04.13", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603635.html" }, { "title": "[04.13] ❉老含及❉★★強片大推★★精品合集04.13", "href": "http://1024.luj8le.rocks/pw/htm_data/3/1704/603570.html" }, { "title": "", "href": "http://1024.luj8le.rocks/pw/undefined" }];
let newCollection_item = {
    title: '',
    href: ''
};
const hrefPrefix = 'http://1024.luj8le.rocks/pw/'

class Crawler {
    static getUrl() {
            return "http://1024.luj8le.rocks/pw/thread.php?fid=3";
        }
        //国产
    static async asyncGetMadeInChina() {
            // console.log(await this.getList());
            let lists = await this.getList();
            console.log(lists);

            // console.log(guochan)
        }
        //同步获取
    static getMadeInChina() {
        let madeInChinaList = newCollection.filter((item) => {
            return item.title.indexOf("国产") > -1;
        });
    }

    /**
     * 下载一个页面的资源
     */
    static loadResource(obj = "高清", uri = "http://1024.luj8le.rocks/pw/htm_data/3/1704/607080.html") {
            request(uri, (err, rep, body) => {
                if (!err) {
                    let $ = cheerio.load(body);
                    $("#read_tpc")
                        //创建目录
                    mkdirp(obj, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    // resolve(newCollection);
                } else {
                    console.log(err);
                }
            })
            console.log(uri);
        }
        /**
         * 获取最新合集list
         */
    static getList() {
        return new Promise((resolve, reject) => {
            request(this.getUrl(), (err, rep, body) => {
                    if (!err) {
                        let $ = cheerio.load(body);
                        $('#ajaxtable tbody tr').each(function(index, item) {
                            if (index > 4) {
                                let title = $(this).children().eq(1).find('h3').find('a').text();
                                let href = `${hrefPrefix}` + $(this).children().eq(1).find('h3').find('a').attr('href');
                                newCollection_item = { title, href };
                                newCollection.push(newCollection_item);
                            }
                        }, this);
                        resolve(newCollection);
                    } else {
                        console.log(err)
                    }
                })
                // http.get(this.getUrl(), (res) => {
                //     res.setEncoding('utf-8');
                //     let html = "";
                //     res.on('data', (chunk) => {
                //         html += chunk;
                //     });
                //     res.on('error', (error) => {
                //         console.log(error)
                //         reject(error)
                //     })
                //     res.on('end', () => {
                //         let $ = cheerio.load(html);
                //         $('#ajaxtable tbody tr').each(function(index, item) {
                //             if (index > 4) {
                //                 let title = $(this).children().eq(1).find('h3').find('a').text();
                //                 let href = `${hrefPrefix}` + $(this).children().eq(1).find('h3').find('a').attr('href');
                //                 newCollection_item = { title, href };
                //                 newCollection.push(newCollection_item);
                //             }
                //         }, this);
                //         resolve(newCollection);
                //     })
                // })
        })
    }
}
Crawler.loadResource();