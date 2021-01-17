# lrucache
Implementation of least recently used (LRU) cache.

## Instruction to Run
The implementation is available in a node script. To run it, the easiest way is to install node, which comes with the node command line that allows you to run the script via command `node lruCache.js`.

Install the latest node version [here](https://nodejs.org/en/download/).

## LRUCache
The LRUCache class is available in `lruCache.js`, can be exported via `export default LRUCache`.

Available methods:
* `get(key)` - get cache value via `key`
* `put(key, value)` - 
* `del(key)` - delete a cache value based on `key` if it exist, otherwise nothing is deleted.
* `reset(key)` - removes all cache
