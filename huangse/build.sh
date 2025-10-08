
cd ..
# 打包h5
cli publish --platform h5 --project pjb_front


# App打包之类 配置文件要用绝对路径Roan
cli pack --config D:/muling/jay/pjb_front/cliconfig.json

# App打包之类 配置文件要用绝对路径Roan
cli pack --config C:/project/pjb_front/cliconfig.json

#mac 打包
/Applications/HBuilderX.app/Contents/MacOS/cli pack --config /Users/neo/Desktop/companyProject/pjb_front/cliconfig.json

/Applications/HBuilderX.app/Contents/MacOS/cli pack --config /Users/neo/Desktop/go/pjb_front/cliconfig.json

# 打包h5
/Applications/HBuilderX.app/Contents/MacOS/cli  publish --platform h5 --project pjb_front
