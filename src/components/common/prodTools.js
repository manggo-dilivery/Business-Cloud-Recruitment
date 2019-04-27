let prodTools = {};

let storage = window.localStorage;

let prods = JSON.parse(storage.getItem('prods')||'{}');
//增加或者追加
prodTools.addOrUpdate = function (p) {
    if(prods[p.id]){
        prods[p.id] += p.num;
    }else{
        prods[p.id] = p.num;
    }
    console.log(p);
    this.save(prods);
};

//删除4
prodTools.delete = function (id) {
    delete prods[id];
    this.save(prods);
};
//获取
prodTools.getProds = function () {
    return JSON.parse(storage.getItem('prods')||'{}');
};

//获取总数
prodTools.getAllCount = function () {
    let sum = 0;
    for(let index in prods){
        sum += prods[index];
    }
    return sum;
};
//存储
prodTools.save = function (prods) {
    storage.setItem('prods',JSON.stringify(prods))
};

export default prodTools