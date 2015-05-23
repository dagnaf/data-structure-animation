function MinHeap(cf) {
  this.array = [];
  this.cf = cf;
  this.map = [];
}

MinHeap.prototype.p = function (x) {
  return x == 0 ? 0 : Math.floor((x-1)/2);
}

MinHeap.prototype.l = function (x) {
  return x*2+1;
}

MinHeap.prototype.r = function (x) {
  return x*2+2;
}

MinHeap.prototype.ex = function (i,j) {
  var tmp = this.array[i];
  this.array[i] = this.array[j];
  this.array[j] = tmp;
  this.map[this.array[i].k] = i;
  this.map[this.array[j].k] = j;
}

MinHeap.prototype.swim = function(x) {
  while (x != 0 && this.cf(this.array[x].v, this.array[this.p(x)].v) < 0) {
    this.ex(x,this.p(x));
    x = this.p(x);
  }
};

MinHeap.prototype.sink = function(x) {
  var y = -1;
  while (x !== y) {
    y = x;
    if (this.array[this.l(x)] !== undefined) {
      if (this.cf(this.array[this.l(x)].v, this.array[x].v) < 0) {
        y = this.l(x);
      }
    }
    if (this.array[this.r(x)] !== undefined) {
      if (this.cf(this.array[this.r(x)].v, this.array[y].v) < 0) {
        y = this.r(x);
      }
    }
    if (y != x) {
      this.ex(x,y);
      x = y;
      y = -1;
    }
  }
};

MinHeap.prototype.insert = function (v, id) {
  this.array.push({v:v, k:id});
  this.map[id] = this.array.length-1;
  this.swim(this.array.length-1);
}

MinHeap.prototype.pop = function () {
  if (this.array.length === 0) {
    return;
  }
  var a = this.array[0];
  this.ex(0, this.array.length-1);
  this.array.pop();
  this.map[a.k] = undefined;
  this.sink(0);
  return a.v;
}

MinHeap.prototype.update = function(v, id) {
  if (id < 0 || id >= this.array.length) {
    return;
  }
  var i = this.map[id];
  var rc = this.cf(this.array[i].v, v);
  this.array[i].v = v;
  if (rc < 0) {
    this.sink(i);
  } else if (rc > 0) {
    this.swim(i);
  }
};

MinHeap.prototype.forceUpdate = function(id) {
  var i = this.map[id];
  this.sink(i);
  this.swim(i);
};

module.exports = MinHeap;
