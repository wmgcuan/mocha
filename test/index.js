var addNum=require('../src/index')

describe('测试index.js', function() {
  describe('测试addNum函数', function() {
    it('两数相加结果为两个数字的和', function() {
       if(addNum(1,2)!==3){
         throw new Error("两数相加结果不为两个数字的和")；
       }
    });
  });
});
