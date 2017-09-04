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
    }else {
      if(node.right === null){
        node.right = newNode
      } else {
        insertNode(node.right, newNode);
      }
    }
  }
}