function LinkedList() {
  //当一个Node元素被创建时，它的next指针总是指向null
  var Node = function(element) { //1Node辅助类表示要加入列表的项
    this.element = element;
    this.next = null;//指向列表中下一个节点项的指针。
  };

  var length = 0 ;//2存储列表项的数量的length属性
  var head = null;//3存储第一个节点的引用

  ///////////////////////////////
  //移除元素
  this.removeAt = function(position){
    //检查越界值 
    if(position > -1 && position < length) {
      var current = head, //用current变量创建一个队列中第一个元素的引用（还会用它来迭代列表）
          previous,
          index = 0;
      //移除第一项
      if(position === 0){
        head = current.next;
      } else {
        while( index++ < position ){
          previous = current;
          current = current.next;
        }
        //将previous与current的下一项链接起来：跳过current，从而移除它
        previous.next = current.next;
      }
      length--;

      return current.element;
    } else {
      return null;
    }
  }


  //////////////////////////////////////////
  //向链表尾部追加元素
  this.append = function(element) {
    var node = new Node(element) ,//1把element作为值传入，创建Node项
        current;//2 一个指向列表中current项的变量

    //第一个场景：向为空的列表添加一个元素
    if(head === null) {//列表中第一个节点//3
      head = node;
      //向列表添加第一个元素。
      //要做的就是让head元素指向node元素。
      //下一个node元素(this.next?????)将会自动成为null
      //列表最后一个节点的下一个元素始终是null
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

  ///////////////////////////
  //在任意位置插入一个元素
  this.insert = function(position, element){
    //检查越界值
    if(position >= 0 && position <= length) {//1
        var node = new Node(element),
        current = head,
        previous,
        index = 0;
        if(position === 0) {
          node.next = current;//2
          head = node;
        }else {
          while( index++ < position ) {//3
            previous = current;
            current = current.next;
          }
          node.next = current;//4
          previous.next = node;//5
        }
        length++;
        return true
    } else {
      return false;//6
    }
  }

  ///toString
  this.toString = function(){
    var current = head,
        string = '';
    while(current){
      string = current.element;
      current = current.next;
    }
    return string;
  }

  ///indexOf 方法

  this.indexOf = function(element){
    var current = head,
        index = -1;
    while(current){
      if(element === current.element){
        return index;
      }
      index++;
      current = current.next;
    }
    return -1 ;
  };

  //remove
  this.remove = function(element){
    var index = this.indexOf(element);
    return this.removeAt(index);
  }

  this.isEmpty = function() {
    return length === 0;
  }

  this.size = function() {
    return length;
  }

  this.getHead = function() {
    return head;
  }
}      


//双向链表

function DoublyLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
    this.prev = null;//新增
  };
  var length = 0 ;
  var head = null ;
  var tail = null ;
  ////////////////////////////////
  ///在任意位置插入一个新元素
  this.insert = function(position, element) {
    if(position >= 0 && position <=length){//检查越界值检查
      var node = new Node(element),
          current = head,
          previous,
          index = 0;
      if ( position === 0 ){//在第一个位置添加
        if(!head) {//没有元素
          head = node;
          tail = node;
        } else {// 有元素
          node.next = current;//node.next指向原来的第一个
          current.prev = node;//原来的prev指向node
          head = node ;
        }
      } else if( positon === length){
        current = tail; //current 指向最后的元素
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
          while (index++ < position){
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;

          current.prev = node;
          node.prev = previous;
        }
        length ++;
        return true;    
    }else {
      return false
    }
  }

  //////////////////
  //从任意位置删除元素
  this.removeAt = function(position){
    if(position > -1 && position< length){
      var current = head,
          previous,
          index = 0;
      //头部，中间，尾部移除一个元素
      if(position === 0){
        head = current.next;//1
        if(length === 1) {//2如果只有一项，更新tail
          tail = null;//只要更改head和tail???????????
        } else {
          head.prev = null;//3更改第二项的指针
        }
      } else if (position == length-1){
        current = tail;//4
        tail = current.prev;
        tail.next = null;
      }else {
        while(index++ < position ){//5
          previous = current ;
          current = current.next;
        }
        //将previous和current的下一项连接起来跳过current
        previous.next = current.next;//6
        current.next.prev = previous;
      }        
      length--;
      return current.element;
    } else {
      return null;
    }
  }
}
