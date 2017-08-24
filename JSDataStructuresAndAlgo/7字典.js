function Dictionary() {
  var items = {}
  this.has = function(key) {
    return key in items;
  }

  this.set = function(key, value) {
    items[key] = value
  }

  this.remove = function(key) {
    if(this.has(key)){
      delete items[key]
      return true;
    }
    return false;
  }

  this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
  }
  //以数组的形式返回字典中所有values实例的值
  this.values = function(){
    var values =  [];
    for(var k in items){
      if(this.has(k)){
        values.push(items[k])
      }
    }
    return values;
  }

  this.getItems = function() {
    return items;
  }

  this.keys =function() {
    var keys = []
    for(var i in items){
      keys.push(i)
    }
    return keys;
  }
}

///7.2创建一个散列表

function HashTable() {
  var table = [];

  //先实现散列函数,私有方法
  var loseloseHashCode = function(key) {
    var hash = 0;
    for(var i = 0;i<key.length;i++){
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  this.put = function(key, value) {
    var position = loseloseHashCode(key);
    table[position] = value;
  }

  this.get = function(key) {
    return table[loseloseHashCode(key)]
  }

  this.remove = function(key) {
    table[loseloseHashCode(key)] = undefined;
  }
}
var ht = new HashTable();
ht.put('abc','1abc')

//更好的散列函数
var djb2HashCode = function (key) {
    var hash = 5381; // 一个较大的素数基准值
    for (var i = 0; i < key.length; i++) {
        hash = hash * 33 + key.charCodeAt(i); // 基准值乘以33再加ASCII码值
    }
    return hash % 1013; //除以1013取余
};