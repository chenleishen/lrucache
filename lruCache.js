class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DLList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNodeToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  removeTail() {
      const node = this.tail.prev;
      const key = node.key;
      this.removeNode(node);
      return key;
  }
}

class LRUCache {
  constructor({ size }) {
    this.size = size;
    this.cache = {};
    this.cacheSize = 0;
    this.list = new DLList();
  }

  put(key, value) {
    const newNode = new Node(key, value);
    if (this.cache[key]) {
      this.list.removeNode(this.cache[key]);
      this.cacheSize-=1;
    } else if (this.cacheSize >= this.size) {
      const key = this.list.removeTail();
      delete this.cache[key];
      this.cacheSize-=1;
    }

    this.list.addNodeToHead(newNode);
    this.cache[key] = newNode;
    this.cacheSize+=1;
  }

  get(key) {
    if (!this.cache[key]) {
      throw new Error("key does not exist");
    }

    const node = this.cache[key];
    this.list.removeNode(node);
    this.list.addNodeToHead(node);

    return this.cache[key].value;
  }

  del(key) {
    if (this.cache[key]) {
      this.list.removeNode(this.cache[key]);
      delete this.cache[key];
      this.cacheSize-=1;
    }
  }

  reset() {
    this.list = new DLList();
    this.cache = {};
    this.cacheSize = 0;
  }
}

// small test

console.log('========================================= INIT CACHE SIZE 3');
let lruCacheTest = new LRUCache({ size: 3 });
console.log('========================================= INPUT 3 CACHE 100, cache001, cache002');
lruCacheTest.put(100, { name: 'chenlei' });
lruCacheTest.put('cache001', 1001);
lruCacheTest.put('cache002', '123456789');

console.log('========================================= TEST 1 GET cache001');
console.log(lruCacheTest.get('cache001'));

console.log('========================================= TEST 2 PUT CACHE 4 1000 AND GET cache001');
lruCacheTest.put(1000, {});

try {
    lruCacheTest.get('100');
} catch (err) {
    console.log(err.message);
}

console.log('========================================= TEST 3 DEL cache001 AND GET cache001');
lruCacheTest.del('cache001');

try {
    lruCacheTest.get('cache001');
} catch (err) {
    console.log(err.message);
}

console.log('========================================= TEST 4 DEL keydne');
lruCacheTest.del('keydne');

console.log('========================================= TEST 5 RESET AND GET size');
lruCacheTest.reset();
console.log('cacheSize', lruCacheTest.cacheSize);
console.log('cache', lruCacheTest.cache);
