# Data Structure Animation

Animation for data structure, or the graduation project.

[Live Demo](https://dagnaf.github.io/data-structure-animation) powered by gh-pages. (may be outated, see `branches >> master`)

## Build
```
# devtools
# npm install -g webpack webpack-dev-server bower
# or, npm install && export PATH=$PWD/node_modules/.bin:$PATH
```
```
# install
clone path/to/git/address
cd path/to/repo/dir
npm install
```
```
# examples, go to http://localhost:8080/webpack-dev-server/
node example/init.js
cd example
bower install
npm run start
```
```
# dist, check analysis.json before use
npm run build
```

## Usage
```
<script type="text/javascript" src="path/to/react.js"></script>
<script type="text/javascript" src="path/to/d3.js"></script>
<script type="text/javascript" src="path/to/dsa.js" data-dsa="dsa-name" data-target="container-id"></script>
```

## Todos

- [ ] FIXMEs
- [ ] data structure
  - [X] stack
    - [X] self
    - [X] eval expression
  - [X] queue
    - [X] self
    - [X] Yanghui
  - [ ] matrix
    - [ ] triangular matrix
    - [ ] sparse matrix
  - [ ] tree
    - [X] red-black tree
    - [ ] Huffman tree
  - [ ] graph
    - [ ] depth/breath first traverse
    - [ ] single source shortest path (Dijkstra)
    - [ ] minimum spanning tree (Prim)
    - [ ] topological sort
    - [ ] strongly connected components (Tarjan)
  - [ ] hash
    - [ ] open ports
    - [ ] link ports
- [ ] algorithm
  - [ ] sort
    - [ ] merge sort
    - [ ] quick sort
  - [ ] search
    - [ ] linear search
    - [ ] binary search
- [ ] tests (.c & .js)
- [ ] webpack code splitting
- [ ] webpage contents

## Inspiration

[Loupe](https://latentflip.github.io/loupe)

[Visualgo](http://visualgo.net)

[Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

[Algorithm Wiki](http://will.thimbleby.net/algorithms/doku.php)
