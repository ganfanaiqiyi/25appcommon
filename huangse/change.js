const fs = require('fs');
const path = require('path');

const prefix = 'a';

const replaceText = '__UNI__77D0340_'

// 遍历文件夹
function traverseFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
     //            if (path.basename(filePath).includes(prefix)) {
					// console.warn(filePath)
     //                return
     //            }
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }
console.log(filePath)
                if (path.extname(filePath) === '.apk') {
					console.log(filePath)
                    // const replaceStr = file.replace('__UNI__200A901_', '');
                    const replaceStr = file.replace(replaceText, '');
                    const parts = replaceStr.split('_');

                    // const  apkName = "yese"+parts[0]+".apk"
                    // const  apkName = "zhiyang"+parts[0]+".apk"
                    // const  apkName = "dafanqie"+parts[0]+".apk"

                    const apkName = prefix + '_c1_' + parts[1] + ".apk"

                    const newFilePath = path.join(folderPath, apkName);
					console.log(apkName);
					console.log(newFilePath)
                    // 修改文件名
                    fs.rename(filePath, newFilePath, err => {
                        if (err) {
                            console.error('Error renaming file:', err);
                            return;
                        }
                        console.log('File renamed:', newFilePath);
                    });
                }

            });
        });
    });
}

// 指定文件夹路径
const folderPath = 'C:/code/25appclient/unpackage/release/apk';
// const folderPath = 'D:/muling/jay/pjb_front/unpackage/release/apk';

// 开始遍历文件夹并修改文件名
traverseFolder(folderPath);


