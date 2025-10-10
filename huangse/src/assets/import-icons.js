// 导入所有图标资源，确保Vite打包时包含它们
import pg娱乐场 from './icon/pg娱乐场.jpg'
import pg电子 from './icon/pg电子.jpg'
import pg娱乐 from './icon/pg娱乐.gif'
import pg国际 from './icon/pg国际.gif'
import 黄瓜视频 from './icon/黄瓜视频.png'
import 免费日漫 from './icon/免费日漫.gif'
import 开元棋牌 from './icon/开元棋牌.jpg'
import 开元棋牌Gif from './icon/开元棋牌.gif'
import 太阳城 from './icon/太阳城.gif'
import 太阳城集团 from './icon/太阳城集团.gif'
import 撸撸社 from './icon/撸撸社.png'
import 凤凰国际 from './icon/凤凰国际.gif'
import 必赢国际 from './icon/必赢国际.gif'
import 免费快色 from './icon/免费快色.gif'
import 免费看黄 from './icon/免费看黄.gif'
import 免费大全 from './icon/免费大全.gif'
import icon91破解版 from './icon/91破解版.gif'
import 快播视频 from './icon/快播视频.gif'
import 澳门新葡京 from './icon/澳门新葡京.gif'
import 澳门新葡京Jpg from './icon/澳门新葡京.jpg'
import 澳门新葡京1 from './icon/澳门新葡京_1.gif'
import 海王视频 from './icon/海王视频.gif'
import icon91视频 from './icon/91视频.gif'
import 神殿娱乐 from './icon/神殿娱乐.gif'
import 免费麻豆tv from './icon/免费麻豆tv.gif'
import 永利皇宫 from './icon/永利皇宫.gif'
import 永利皇宫1 from './icon/永利皇宫_1.gif'
import 免费看片 from './icon/免费看片.gif'
import icon91免费 from './icon/91免费.gif'
import 永久免费 from './icon/永久免费.gif'
import 免费黄片 from './icon/免费黄片.jpeg'
import 免费片库 from './icon/免费片库.gif'

// 导出图标映射对象
export const iconMap = {
  'pg娱乐场.jpg': pg娱乐场,
  'pg电子.jpg': pg电子,
  'pg娱乐.gif': pg娱乐,
  'pg国际.gif': pg国际,
  '黄瓜视频.png': 黄瓜视频,
  '免费日漫.gif': 免费日漫,
  '开元棋牌.jpg': 开元棋牌,
  '开元棋牌.gif': 开元棋牌Gif,
  '太阳城.gif': 太阳城,
  '太阳城集团.gif': 太阳城集团,
  '撸撸社.png': 撸撸社,
  '凤凰国际.gif': 凤凰国际,
  '必赢国际.gif': 必赢国际,
  '免费快色.gif': 免费快色,
  '免费看黄.gif': 免费看黄,
  '免费大全.gif': 免费大全,
  '91破解版.gif': icon91破解版,
  '快播视频.gif': 快播视频,
  '澳门新葡京.gif': 澳门新葡京,
  '澳门新葡京.jpg': 澳门新葡京Jpg,
  '澳门新葡京_1.gif': 澳门新葡京1,
  '海王视频.gif': 海王视频,
  '91视频.gif': icon91视频,
  '神殿娱乐.gif': 神殿娱乐,
  '免费麻豆tv.gif': 免费麻豆tv,
  '永利皇宫.gif': 永利皇宫,
  '永利皇宫_1.gif': 永利皇宫1,
  '免费看片.gif': 免费看片,
  '91免费.gif': icon91免费,
  '永久免费.gif': 永久免费,
  '免费黄片.jpeg': 免费黄片,
  '免费片库.gif': 免费片库
}

// 根据文件名获取图标URL的函数
export function getIconUrl(filename) {
  return iconMap[filename] || ''
}
