//创建binarySearchTree类

function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  var root = null;

  //插入一个新键的第一部分
  this.insert = function(key) {
     var newNode = new Node(key);//1创建用来表示新节点的Node类实例
     if(root === null) {//2验证这个插入操作是否为一种特殊情况
       root = newNode;
     }else {
       insertNode(root, newNode);//3将节点加在非根节点的其他位置。需要一个私有副主函数
     }
  }
  //辅助函数--找到新节点应该插入的正确位置
  var insertNode = function(node, newNode){
    if(newNode.key < node.key){//4如果新节点的键小于当前节点的键
      if(node.left === null) {//5检查当前节点的左侧子节点
        node.left = newNode;//6
      }else {//如果 有 左侧子节点
        insertNode(node.left, newNode)//7需要通过 递归调用 继续找到树的下一层
      }
    }else {//如果节点的键比当前节点的键大
      if(node.right === null){//同时当前节点没有右侧子节点
        node.right = newNode//插入新的节点
      } else {//如果有右侧子节点,递归调用insertNode方法
        insertNode(node.right, newNode);
      }
    }
  }
  //中序遍历
  this.inOrderTraverse = function(callback){
    inOrderTraverseNode(root, callback);
  }

  var inOrderTraverseNode = function(node, callback){console.log('node外: '+node);
    if(node !== null){console.log('if内: '+node);
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }
  //先序遍历
  
}

var tree = new BinarySearchTree();


tree.insert(11);tree.insert(7);tree.insert(15);tree.insert(5);tree.insert(3);tree.insert(9);tree.insert(8);tree.insert(10);tree.insert(13);tree.insert(12);tree.insert(14);tree.insert(20);tree.insert(18);tree.insert(25);

function printNode(value){ //{6}
console.log(value);
}
tree.inOrderTraverse(printNode); //{7}