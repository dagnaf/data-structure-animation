# Data Structure Animation

Animation for data structure, the [graduation project](https://github.com/dagnaf/ecust-bachelor-thesis-template/tree/dsa).

[Live Demo](https://dagnaf.github.io/data-structure-animation) powered by gh-pages. (may be outated, see `branches >> master`)

## Build
```
# devtools, prerequisites
npm install -g webpack webpack-dev-server bower
# or, not npm install globally, then just install as below and
export PATH=$PWD/node_modules/.bin:$PATH
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
# build and minify (check analysis.json before use)
npm run build
# dist for gh-pages
npm run dist
```

## Usage
```
<script type="text/javascript" src="path/to/react.js"></script>
<script type="text/javascript" src="path/to/d3.js"></script>
<script type="text/javascript" src="path/to/dsa.js" data-dsa="dsa-name" data-target="container-id"></script>
<!-- or simply iframe tag -->
<iframe src="url/to/html/page(contains-above-scripts)" width="width" heigth="height" scrolling="no"></iframe>
```

## Animations for data structure

### Linear

- [X] array
  - [X] sort
    - [X] merge sort
    - [X] quick sort
  - [X] search
    - [X] linear search
    - [X] binary search
- [X] stack
  - [X] basic operations
  - [X] evaluate simple expressions
- [X] queue
  - [X] basic operations
  - [X] Yanghui's triangle
- [ ] matrix
  - [ ] triangular matrix
  - [ ] sparse matrix

### Non-linear

- [X] tree
  - [X] red-black tree
  - [X] Huffman tree
- [ ] graph
  - [ ] depth/breath first search
  - [ ] single source shortest path (Dijkstra)
  - [ ] minimum spanning tree (Prim)
  - [ ] topological sort
  - [ ] strongly connected components (Tarjan)
- [X] hash `new`
  - [X] open hashing
  - [X] closed hashing

## Todos

- [ ] FIXMEs
- [ ] data structure animation
- [ ] tests
- [X] webpack code splitting
- [ ] webpage contents

## Inspirations

[Loupe](https://latentflip.github.io/loupe)

[Visualgo](http://visualgo.net)

[Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

[Algorithm Wiki](http://will.thimbleby.net/algorithms/doku.php)
