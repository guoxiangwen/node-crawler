let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
var mkdirp = require('mkdirp');
// let http = require('http');
// let https = require('https');

//最新合集
let newCollection = []
let newCollection_item = {
    title: '',
    href: ''
};
const hrefPrefix = 'http://1024.luj8le.rocks/pw/';
const options = {
    timeout: 15000,
    headers: {

    }
}

class Crawler {
    static getUrl() {
            return "http://1024.luj8le.rocks/pw/thread.php?fid=3";
        }
        //同步获取
    static getMadeInChinaList() {
            let madeInChinaList = newCollection.filter((item) => {
                return item.title.indexOf("国产") > -1;
            });
            return madeInChinaList;
        }
        //
    static async asyncGetMadeInChina() {
        let list = await this.getList();
        // return list;
        let madeInChinaList = list.filter((item) => {
            return item.title.indexOf("国产高清") > -1;
        });
        return madeInChinaList
    }

    /**
     * 批量下载图片
     */
    static async batchDownloadImg() {
            const list = await this.asyncGetMadeInChina();
            console.log(list)
            for (let item of list) {
                try {
                    await this.loadResource(item.title, item.href);

                } catch (error) {

                }
            }
            process.exit(0);
        }
        /**
         * 下载图片
         * @param {*img url} url 
         * @param {*存放目录} dir 
         * @param {*存的图片名} filename 
         */
    static downloadImg(url, dir, filename) {
        return new Promise((resolve, reject) => {
            request.head(url, (err, res, body) => {
                request(url)
                    .pipe(fs.createWriteStream(dir + '/' + filename)
                        .on('end', () => {
                            resolve()
                            console.log("end")
                        }))
            })
        })
    }

    /**
     * 下载一个页面的资源
     * @param {*存放目录} dir 
     * @param {*uri} uri 
     */
    static async loadResource(dir, uri) {
            console.log("开始下载" + dir);
            return new Promise((resolve, reject) => {
                request(uri, options, (err, rep, body) => {
                    if (!err) {
                        //创建目录
                        mkdirp(dir, (err) => {
                            err && console.log(err);
                        });
                        let $ = cheerio.load(body);
                        $("#read_tpc img").each((index, item) => {
                            console.log("第" + [index] + "张图片:" + $(item).attr("src"));
                            this.downloadImg($(item).attr("src"), dir, index + '.jpg')
                        })
                        resolve();
                        console.log("下载完成......")
                    } else {
                        console.log(err.code);
                    }
                })
            })
        }
        /**
         * 获取最新合集list
         */
    static getList() {
        return new Promise((resolve, reject) => {
            request(this.getUrl(), options, (err, rep, body) => {
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
                    reject(err)
                    console.log(err)
                }
            })
        })
    }
}
Crawler.batchDownloadImg();