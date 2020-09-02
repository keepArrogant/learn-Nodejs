// 要拼接路径 public/uploads/avatar
// 引入系统模块path
const path = require('path');

const finalPath = path.join('public', 'uploads', 'avatar');
// 它会根据你所在的系统来拼接路径  由于本系统是windows系统 所以拼接的路径就是：public\uploads\avatar
console.log(finalPath); //public\uploads\avatar