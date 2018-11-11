# mocha
mocha&amp;chai

测试文件需要放在test目录下，<br>
mocka运行时会执行test目录下的所有js文件（仅限于test以下这一层级，对test/subtest这一层级并不执行）

```
npm install -g mocha
npm install --save-dev mocha
```
```
"scripts": {
    "test": "mocha"
}
```

src/index.js
```
/**
 * 加法函数
 * @param {第一个数} a
 * @param {第二个数} b
 */
function addNum(a,b){
  return a+b
}
module.exports=addNum
```

test/index.js
```
var addNum=require('../src/index')

describe('测试index.js', function() {
  describe('测试addNum函数', function() {
    it('两数相加结果为两个数字的和', function() {
       if(addNum(1,2)!==3){
         throw new Error("两数相加结果不为两个数字的和")
       }
    })
  })
})
```
> 测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。<br>
> describe块称为"测试套件"（test suite）<br>
> 表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"测试index.js"），第二个参数是一个实际执行的函数。<br>
> it块称为"测试用例"（test case）<br>
> 表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"两数相加结果为两个数字的和"），第二个参数是一个实际执行的函数。

```
npm test // test根目录下所有
mocha test/index.test.js // 测试单一文件
mocha test/index.test.js test/add.test.js // 测试多文件
mocha 'test/some/*.@(js|jsx)' // 测试某个文件夹下所有的js和jsx
// 超时和高亮
mocha -t 5000 test/index.js
mocha -s 1000 index.test.js // Mocha默认会高亮显示超过75毫秒的测试用例，-s设置高亮判断的临界值
```

# 使用断言库
> 断言失败时的专业处理
```
npm install --save-dev chai
```

test/index-chai.js
```
var expect = require('chai').expect // 1
var addNum=require('../src/index')

describe('测试index.js', function() {
  describe('测试addNum函数', function() {
    it('两数相加结果为两个数字的和', function() {
       if(addNum(1,2)!==3){
         // throw new Error("两数相加结果不为两个数字的和")
         expect(addNum(1,2)).to.be.equal(3) // 2
       }
    })
  })
})
```

es6支持需装babel
> 命令需指定编译器
```
"scripts": {
  "test": "mocha --compilers js:babel-core/register"
},
```

钩子设置
```
describe('测试index.js',()=> {
  before(()=>console.info("在本区块的所有测试用例之前执行"))

  after(()=>console.info("在本区块的所有测试用例之后执行"))

  beforeEach(()=>console.info("在本区块的每个测试用例之前执行"))

  afterEach(()=>console.info("在本区块的每个测试用例之后执行"))

  describe('测试addNum函数', ()=> {
    it('两数相加结果为两个数字的和', ()=> {
      assert.equal(addNum(1,2),3)
    })
  })
})
```
