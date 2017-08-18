function LinkedList() {
  //当一个Node元素被创建时，它的next指针总是指向null
  var Node = function(element) { //1LinkList数据结构需要一个Node辅助类
    this.element = element;
    this.next = null;
  };

  var length = 0 ;//2存储列表项的数量的length属性
  var head = null;//3存储第一个节点的引用
  //向链表尾部追加元素
  this.append = function(element) {
    var node = new Node(element) ,//1把element作为值传入，创建Node项
        current;//2 一个指向列表中current项的变量
    //第一个场景：向为空的列表添加一个元素
    if(head === null) {//列表中第一个节点3
      head = node;
      //向列表添加第一个元素。
      //要做的就是让head元素指向node元素。
      //下一个node元素将会自动成为null ???????
    } else {//第二个场景，向一个不为空的列表尾部添加元素
      current = head;//4我们只有第一个元素的引用
      //循环列表，直到找到最后一项
      while(current.next) {
        current = current.next;
      }
      //找到最后一项，将其next赋为node，建立链接
      current.next = node;//5
    }
    length++; //更新列表的长度//6
  }
}      
