/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function triangulate(tcx) {
  tcx.initTriangulation();
  tcx.createAdvancingFront();
  sweepPoints(tcx);
  finalizationPolygon(tcx);
}
function sweepPoints(tcx) {
  var len = tcx.pointCount();
  for (var i = 1; i < len; i += 1) {
    var point = tcx.getPoint(i);
    var node = pointEvent(tcx, point);
    var edges = point._p2t_edge_list;
    for (var j = 0; edges && j < edges.length; ++j) {
      edgeEventByEdge(tcx, edges[j], node);
    }
  }
}
function finalizationPolygon(tcx) {
  var t = tcx.front().head().next.triangle;
  var p = tcx.front().head().next.point;
  while (!t.getConstrainedEdgeCW(p)) {
    t = t.neighborCCW(p);
  }
  tcx.meshClean(t);
}
function pointEvent(tcx, point) {
  var node = tcx.locateNode(point);
  var new_node = newFrontTriangle(tcx, point, node);
  if (point.x <= node.point.x + EPSILON) {
    fill(tcx, node);
  }
  fillAdvancingFront(tcx, new_node);
  return new_node;
}
function edgeEventByEdge(tcx, edge, node) {
  tcx.edge_event.constrained_edge = edge;
  tcx.edge_event.right = edge.p.x > edge.q.x;
  if (isEdgeSideOfTriangle(node.triangle, edge.p, edge.q)) {
    return;
  }
  fillEdgeEvent(tcx, edge, node);
  edgeEventByPoints(tcx, edge.p, edge.q, node.triangle, edge.q);
}
function edgeEventByPoints(tcx, ep, eq, triangle, point) {
  if (isEdgeSideOfTriangle(triangle, ep, eq)) {
    return;
  }
  var p1 = triangle.pointCCW(point);
  var o1 = orient2d(eq, p1, ep);
  if (o1 === Orientation.COLLINEAR) {
    throw new PointError("poly2tri EdgeEvent: Collinear not supported!", [
      eq,
      p1,
      ep,
    ]);
  }
  var p2 = triangle.pointCW(point);
  var o2 = orient2d(eq, p2, ep);
  if (o2 === Orientation.COLLINEAR) {
    throw new PointError("poly2tri EdgeEvent: Collinear not supported!", [
      eq,
      p2,
      ep,
    ]);
  }
  if (o1 === o2) {
    if (o1 === Orientation.CW) {
      triangle = triangle.neighborCCW(point);
    } else {
      triangle = triangle.neighborCW(point);
    }
    edgeEventByPoints(tcx, ep, eq, triangle, point);
  } else {
    flipEdgeEvent(tcx, ep, eq, triangle, point);
  }
}
function isEdgeSideOfTriangle(triangle, ep, eq) {
  var index = triangle.edgeIndex(ep, eq);
  if (index !== -1) {
    triangle.markConstrainedEdgeByIndex(index);
    var t = triangle.getNeighbor(index);
    if (t) {
      t.markConstrainedEdgeByPoints(ep, eq);
    }
    return true;
  }
  return false;
}
function newFrontTriangle(tcx, point, node) {
  var triangle = new Triangle(point, node.point, node.next.point);
  triangle.markNeighbor(node.triangle);
  tcx.addToMap(triangle);
  var new_node = new Node(point);
  new_node.next = node.next;
  new_node.prev = node;
  node.next.prev = new_node;
  node.next = new_node;
  if (!legalize(tcx, triangle)) {
    tcx.mapTriangleToNodes(triangle);
  }
  return new_node;
}
function fill(tcx, node) {
  var triangle = new Triangle(node.prev.point, node.point, node.next.point);
  triangle.markNeighbor(node.prev.triangle);
  triangle.markNeighbor(node.triangle);
  tcx.addToMap(triangle);
  node.prev.next = node.next;
  node.next.prev = node.prev;
  if (!legalize(tcx, triangle)) {
    tcx.mapTriangleToNodes(triangle);
  }
}
function fillAdvancingFront(tcx, n) {
  var node = n.next;
  while (node.next) {
    angle = holeAngle(node);
    if (angle > PI_div2 || angle < -PI_div2) {
      break;
    }
    fill(tcx, node);
    node = node.next;
  }
  node = n.prev;
  while (node.prev) {
    angle = holeAngle(node);
    if (angle > PI_div2 || angle < -PI_div2) {
      break;
    }
    fill(tcx, node);
    node = node.prev;
  }
  if (n.next && n.next.next) {
    angle = basinAngle(n);
    if (angle < PI_3div4) {
      fillBasin(tcx, n);
    }
  }
}
function basinAngle(node) {
  var ax = node.point.x - node.next.next.point.x;
  var ay = node.point.y - node.next.next.point.y;
  return Math.atan2(ay, ax);
}
function holeAngle(node) {
  var ax = node.next.point.x - node.point.x;
  var ay = node.next.point.y - node.point.y;
  var bx = node.prev.point.x - node.point.x;
  var by = node.prev.point.y - node.point.y;
  return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
}
function legalize(tcx, t) {
  for (var i = 0; i < 3; i += 1) {
    if (t.delaunay_edge[i]) {
      continue;
    }
    var ot = t.getNeighbor(i);
    if (ot) {
      var p = t.getPoint(i);
      var op = ot.oppositePoint(t, p);
      var oi = ot.index(op);
      if (ot.constrained_edge[oi] || ot.delaunay_edge[oi]) {
        t.constrained_edge[i] = ot.constrained_edge[oi];
        continue;
      }
      var inside = inCircle(p, t.pointCCW(p), t.pointCW(p), op);
      if (inside) {
        t.delaunay_edge[i] = true;
        ot.delaunay_edge[oi] = true;
        rotateTrianglePair(t, p, ot, op);
        var not_legalized = !legalize(tcx, t);
        if (not_legalized) {
          tcx.mapTriangleToNodes(t);
        }
        not_legalized = !legalize(tcx, ot);
        if (not_legalized) {
          tcx.mapTriangleToNodes(ot);
        }
        t.delaunay_edge[i] = false;
        ot.delaunay_edge[oi] = false;
        return true;
      }
    }
  }
  return false;
}
function inCircle(pa, pb, pc, pd) {
  var adx = pa.x - pd.x;
  var ady = pa.y - pd.y;
  var bdx = pb.x - pd.x;
  var bdy = pb.y - pd.y;
  var adxbdy = adx * bdy;
  var bdxady = bdx * ady;
  var oabd = adxbdy - bdxady;
  if (oabd <= 0) {
    return false;
  }
  var cdx = pc.x - pd.x;
  var cdy = pc.y - pd.y;
  var cdxady = cdx * ady;
  var adxcdy = adx * cdy;
  var ocad = cdxady - adxcdy;
  if (ocad <= 0) {
    return false;
  }
  var bdxcdy = bdx * cdy;
  var cdxbdy = cdx * bdy;
  var alift = adx * adx + ady * ady;
  var blift = bdx * bdx + bdy * bdy;
  var clift = cdx * cdx + cdy * cdy;
  var det = alift * (bdxcdy - cdxbdy) + blift * ocad + clift * oabd;
  return det > 0;
}
function rotateTrianglePair(t, p, ot, op) {
  n1 = t.neighborCCW(p);
  n2 = t.neighborCW(p);
  n3 = ot.neighborCCW(op);
  n4 = ot.neighborCW(op);
  ce1 = t.getConstrainedEdgeCCW(p);
  ce2 = t.getConstrainedEdgeCW(p);
  ce3 = ot.getConstrainedEdgeCCW(op);
  ce4 = ot.getConstrainedEdgeCW(op);
  de1 = t.getDelaunayEdgeCCW(p);
  de2 = t.getDelaunayEdgeCW(p);
  de3 = ot.getDelaunayEdgeCCW(op);
  de4 = ot.getDelaunayEdgeCW(op);
  t.legalize(p, op);
  ot.legalize(op, p);
  ot.setDelaunayEdgeCCW(p, de1);
  t.setDelaunayEdgeCW(p, de2);
  t.setDelaunayEdgeCCW(op, de3);
  ot.setDelaunayEdgeCW(op, de4);
  ot.setConstrainedEdgeCCW(p, ce1);
  t.setConstrainedEdgeCW(p, ce2);
  t.setConstrainedEdgeCCW(op, ce3);
  ot.setConstrainedEdgeCW(op, ce4);
  t.clearNeigbors();
  ot.clearNeigbors();
  if (n1) {
    ot.markNeighbor(n1);
  }
  if (n2) {
    t.markNeighbor(n2);
  }
  if (n3) {
    t.markNeighbor(n3);
  }
  if (n4) {
    ot.markNeighbor(n4);
  }
  t.markNeighbor(ot);
}
function fillBasin(tcx, node) {
  if (
    orient2d(node.point, node.next.point, node.next.next.point) ===
    Orientation.CCW
  ) {
    tcx.basin.left_node = node.next.next;
  } else {
    tcx.basin.left_node = node.next;
  }
  tcx.basin.bottom_node = tcx.basin.left_node;
  while (
    tcx.basin.bottom_node.next &&
    tcx.basin.bottom_node.point.y >= tcx.basin.bottom_node.next.point.y
  ) {
    tcx.basin.bottom_node = tcx.basin.bottom_node.next;
  }
  if (tcx.basin.bottom_node === tcx.basin.left_node) {
    return;
  }
  tcx.basin.right_node = tcx.basin.bottom_node;
  while (
    tcx.basin.right_node.next &&
    tcx.basin.right_node.point.y < tcx.basin.right_node.next.point.y
  ) {
    tcx.basin.right_node = tcx.basin.right_node.next;
  }
  if (tcx.basin.right_node === tcx.basin.bottom_node) {
    return;
  }
  tcx.basin.width = tcx.basin.right_node.point.x - tcx.basin.left_node.point.x;
  tcx.basin.left_highest =
    tcx.basin.left_node.point.y > tcx.basin.right_node.point.y;
  fillBasinReq(tcx, tcx.basin.bottom_node);
}
function fillBasinReq(tcx, node) {
  if (isShallow(tcx, node)) {
    return;
  }
  fill(tcx, node);
  if (node.prev === tcx.basin.left_node && node.next === tcx.basin.right_node) {
    return;
  } else if (node.prev === tcx.basin.left_node) {
    o = orient2d(node.point, node.next.point, node.next.next.point);
    if (o === Orientation.CW) {
      return;
    }
    node = node.next;
  } else if (node.next === tcx.basin.right_node) {
    o = orient2d(node.point, node.prev.point, node.prev.prev.point);
    if (o === Orientation.CCW) {
      return;
    }
    node = node.prev;
  } else {
    if (node.prev.point.y < node.next.point.y) {
      node = node.prev;
    } else {
      node = node.next;
    }
  }
  fillBasinReq(tcx, node);
}
function isShallow(tcx, node) {
  if (tcx.basin.left_highest) {
    height = tcx.basin.left_node.point.y - node.point.y;
  } else {
    height = tcx.basin.right_node.point.y - node.point.y;
  }
  if (tcx.basin.width > height) {
    return true;
  }
  return false;
}
function fillEdgeEvent(tcx, edge, node) {
  if (tcx.edge_event.right) {
    fillRightAboveEdgeEvent(tcx, edge, node);
  } else {
    fillLeftAboveEdgeEvent(tcx, edge, node);
  }
}
function fillRightAboveEdgeEvent(tcx, edge, node) {
  while (node.next.point.x < edge.p.x) {
    if (orient2d(edge.q, node.next.point, edge.p) === Orientation.CCW) {
      fillRightBelowEdgeEvent(tcx, edge, node);
    } else {
      node = node.next;
    }
  }
}
function fillRightBelowEdgeEvent(tcx, edge, node) {
  if (node.point.x < edge.p.x) {
    if (
      orient2d(node.point, node.next.point, node.next.next.point) ===
      Orientation.CCW
    ) {
      fillRightConcaveEdgeEvent(tcx, edge, node);
    } else {
      fillRightConvexEdgeEvent(tcx, edge, node);
      fillRightBelowEdgeEvent(tcx, edge, node);
    }
  }
}
function fillRightConcaveEdgeEvent(tcx, edge, node) {
  fill(tcx, node.next);
  if (node.next.point !== edge.p) {
    if (orient2d(edge.q, node.next.point, edge.p) === Orientation.CCW) {
      if (
        orient2d(node.point, node.next.point, node.next.next.point) ===
        Orientation.CCW
      ) {
        fillRightConcaveEdgeEvent(tcx, edge, node);
      }
    }
  }
}
function fillRightConvexEdgeEvent(tcx, edge, node) {
  if (
    orient2d(
      node.next.point,
      node.next.next.point,
      node.next.next.next.point,
    ) === Orientation.CCW
  ) {
    fillRightConcaveEdgeEvent(tcx, edge, node.next);
  } else {
    if (orient2d(edge.q, node.next.next.point, edge.p) === Orientation.CCW) {
      fillRightConvexEdgeEvent(tcx, edge, node.next);
    }
  }
}
function fillLeftAboveEdgeEvent(tcx, edge, node) {
  while (node.prev.point.x > edge.p.x) {
    if (orient2d(edge.q, node.prev.point, edge.p) === Orientation.CW) {
      fillLeftBelowEdgeEvent(tcx, edge, node);
    } else {
      node = node.prev;
    }
  }
}
function fillLeftBelowEdgeEvent(tcx, edge, node) {
  if (node.point.x > edge.p.x) {
    if (
      orient2d(node.point, node.prev.point, node.prev.prev.point) ===
      Orientation.CW
    ) {
      fillLeftConcaveEdgeEvent(tcx, edge, node);
    } else {
      fillLeftConvexEdgeEvent(tcx, edge, node);
      fillLeftBelowEdgeEvent(tcx, edge, node);
    }
  }
}
function fillLeftConvexEdgeEvent(tcx, edge, node) {
  if (
    orient2d(
      node.prev.point,
      node.prev.prev.point,
      node.prev.prev.prev.point,
    ) === Orientation.CW
  ) {
    fillLeftConcaveEdgeEvent(tcx, edge, node.prev);
  } else {
    if (orient2d(edge.q, node.prev.prev.point, edge.p) === Orientation.CW) {
      fillLeftConvexEdgeEvent(tcx, edge, node.prev);
    }
  }
}
function fillLeftConcaveEdgeEvent(tcx, edge, node) {
  fill(tcx, node.prev);
  if (node.prev.point !== edge.p) {
    if (orient2d(edge.q, node.prev.point, edge.p) === Orientation.CW) {
      if (
        orient2d(node.point, node.prev.point, node.prev.prev.point) ===
        Orientation.CW
      ) {
        fillLeftConcaveEdgeEvent(tcx, edge, node);
      }
    }
  }
}
function flipEdgeEvent(tcx, ep, eq, t, p) {
  var ot = t.neighborAcross(p);
  if (!ot) {
    throw new Error(
      "poly2tri [BUG:FIXME] FLIP failed due to missing triangle!",
    );
  }
  var op = ot.oppositePoint(t, p);
  if (t.getConstrainedEdgeAcross(p)) {
    var index = t.index(p);
    throw new PointError("poly2tri Intersecting Constraints", [
      p,
      op,
      t.getPoint((index + 1) % 3),
      t.getPoint((index + 2) % 3),
    ]);
  }
  if (inScanArea(p, t.pointCCW(p), t.pointCW(p), op)) {
    rotateTrianglePair(t, p, ot, op);
    tcx.mapTriangleToNodes(t);
    tcx.mapTriangleToNodes(ot);
    if (p === eq && op === ep) {
      if (
        eq === tcx.edge_event.constrained_edge.q &&
        ep === tcx.edge_event.constrained_edge.p
      ) {
        t.markConstrainedEdgeByPoints(ep, eq);
        ot.markConstrainedEdgeByPoints(ep, eq);
        legalize(tcx, t);
        legalize(tcx, ot);
      }
    } else {
      var o = orient2d(eq, op, ep);
      t = nextFlipTriangle(tcx, o, t, ot, p, op);
      flipEdgeEvent(tcx, ep, eq, t, p);
    }
  } else {
    var newP = nextFlipPoint(ep, eq, ot, op);
    flipScanEdgeEvent(tcx, ep, eq, t, ot, newP);
    edgeEventByPoints(tcx, ep, eq, t, p);
  }
}
function nextFlipTriangle(tcx, o, t, ot, p, op) {
  if (o === Orientation.CCW) {
    edge_index = ot.edgeIndex(p, op);
    ot.delaunay_edge[edge_index] = true;
    legalize(tcx, ot);
    ot.clearDelunayEdges();
    return t;
  }
  edge_index = t.edgeIndex(p, op);
  t.delaunay_edge[edge_index] = true;
  legalize(tcx, t);
  t.clearDelunayEdges();
  return ot;
}
function nextFlipPoint(ep, eq, ot, op) {
  var o2d = orient2d(eq, op, ep);
  if (o2d === Orientation.CW) {
    return ot.pointCCW(op);
  } else if (o2d === Orientation.CCW) {
    return ot.pointCW(op);
  } else {
    throw new PointError(
      "poly2tri [Unsupported] nextFlipPoint: opposing point on constrained edge!",
      [eq, op, ep],
    );
  }
}
function flipScanEdgeEvent(tcx, ep, eq, flip_triangle, t, p) {
  var ot = t.neighborAcross(p);
  if (!ot) {
    throw new Error("poly2tri [BUG:FIXME] FLIP failed due to missing triangle");
  }
  var op = ot.oppositePoint(t, p);
  if (
    inScanArea(eq, flip_triangle.pointCCW(eq), flip_triangle.pointCW(eq), op)
  ) {
    flipEdgeEvent(tcx, eq, op, ot, op);
  } else {
    var newP = nextFlipPoint(ep, eq, ot, op);
    flipScanEdgeEvent(tcx, ep, eq, flip_triangle, ot, newP);
  }
}
function orient2d(pa, pb, pc) {
  var detleft = (pa.x - pc.x) * (pb.y - pc.y);
  var detright = (pa.y - pc.y) * (pb.x - pc.x);
  var val = detleft - detright;
  if (val > -EPSILON && val < EPSILON) {
    return Orientation.COLLINEAR;
  } else if (val > 0) {
    return Orientation.CCW;
  } else {
    return Orientation.CW;
  }
}
function inScanArea(pa, pb, pc, pd) {
  var oadb = (pa.x - pb.x) * (pd.y - pb.y) - (pd.x - pb.x) * (pa.y - pb.y);
  if (oadb >= -EPSILON) {
    return false;
  }
  var oadc = (pa.x - pc.x) * (pd.y - pc.y) - (pd.x - pc.x) * (pa.y - pc.y);
  if (oadc <= EPSILON) {
    return false;
  }
  return true;
}
function toStringBase(p) {
  return "(" + p.x + ";" + p.y + ")";
}
function toString(p) {
  var s = p.toString();
  return s === "[object Object]" ? toStringBase(p) : s;
}
function compare(a, b) {
  if (a.y === b.y) {
    return a.x - b.x;
  } else {
    return a.y - b.y;
  }
}
function equals(a, b) {
  return a.x === b.x && a.y === b.y;
}
function Voronoi() {
  this.vertices = null;
  this.edges = null;
  this.cells = null;
  this.toRecycle = null;
  this.beachsectionJunkyard = [];
  this.circleEventJunkyard = [];
  this.vertexJunkyard = [];
  this.edgeJunkyard = [];
  this.cellJunkyard = [];
}
function _contains(p, polygon) {
  var isInside = false;
  var minX = polygon[0].x;
  var maxX = polygon[0].x;
  var minY = polygon[0].y;
  var maxY = polygon[0].y;
  for (var n = 1; n < polygon.length; n += 1) {
    var q = polygon[n];
    minX = Math.min(q.x, minX);
    maxX = Math.max(q.x, maxX);
    minY = Math.min(q.y, minY);
    maxY = Math.max(q.y, maxY);
  }
  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }
  var i = 0;
  var j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {
    if (polygon[j].y - polygon[i].y == 0) {
    } else {
      if (
        polygon[i].y > p.y != polygon[j].y > p.y &&
        p.x <
          ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
            (polygon[j].y - polygon[i].y) +
            polygon[i].x
      ) {
        isInside = !isInside;
      }
    }
  }
  return isInside;
}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun) {
    "use strict";
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function") {
      throw new TypeError();
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i += 1) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    if (this === null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
if (typeof Object.assign != "function") {
  (function () {
    Object.assign = function (target) {
      "use strict";
      if (target === undefined || target === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index += 1) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}
origami = this;
origami.scriptTitle = "Origami";
origami.writeln = function (args) {
  if (origami.devMode) {
    return $.writeln(args);
  }
};
AVLayer.prototype.findEffectByName = function (_name) {
  var eff = this.property("ADBE Effect Parade");
  for (var e = 1; e <= eff.numProperties; e += 1) {
    if (eff.property(e).name == _name) {
      return eff.property(e);
    }
  }
  return null;
};
CompItem.prototype.findLayerByName = function (_name) {
  for (var l = 1; l <= this.layers.length; l += 1) {
    if (this.layers[l].name == _name) {
      return this.layers[l];
    } else {
      return null;
    }
  }
};
Property.prototype.removeAllKeys = function () {
  for (var k = this.numKeys; k > 0; k--) {
    this.removeKey(k);
  }
};
Array.prototype.isThere = function (el) {
  for (var i = 0; i < this.length; i += 1) {
    if (this[i] == el) {
      return i;
    }
  }
  return false;
};
Array.prototype.indexOf = function (elem) {
  for (var i = 0; i < this.length; i += 1) {
    if (this[i] == elem) {
      return i;
    }
  }
  return -1;
};
Array.prototype.getRandomArrayElements = function (count, randomNum) {
  count = count || this.length - 1;
  if (count == 0) {
    count = 1;
  }
  if (randomNum) {
    count = Math.ceil(Math.random() * this.length) + 1;
  }
  var shuffled = this.slice(0);
  var i = this.length;
  var min = i - count;
  while (i-- > min) {
    index = Math.floor(i * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};
Array.prototype.addToAll = function (el) {
  var tmp = [];
  for (var i = 0; i < this.length; i += 1) {
    tmp.push(this[i] + el);
  }
  return tmp;
};
Array.prototype.map = function (fun) {
  "use strict";
  if (this === void 0 || this === null) {
    throw new TypeError();
  }
  var t = Object(this);
  var len = t.length >>> 0;
  if (typeof fun !== "function") {
    throw new TypeError();
  }
  var res = new Array(len);
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (var i = 0; i < len; i += 1) {
    if (i in t) {
      res[i] = fun.call(thisArg, t[i], i, t);
    }
  }
  return res;
};
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function (searchElement) {
    "use strict";
    if (this == null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    n = len;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      } else {
        if (n != 0 && n != inf && n != -inf) {
          n = n > 0 || -1 * Math.floor(Math.abs(n));
        }
      }
    }
    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
Object.prototype.nsSetBG = function (colorArray) {
  if (typeof colorArray != "undefined" && colorArray.length >= 3) {
    this.graphics.backgroundColor = this.graphics.newBrush(
      this.graphics.BrushType.SOLID_COLOR,
      colorArray,
    );
  }
  return this;
};
Object.prototype.nsSetFG = function (colorArray) {
  if (typeof colorArray != "undefined" && colorArray.length >= 3) {
    this.graphics.foregroundColor = this.graphics.newPen(
      this.graphics.PenType.SOLID_COLOR,
      colorArray,
      1,
    );
  }
  return this;
};
Group.prototype.nsSetIcon = function (iconFile) {
  if (iconFile) {
    this.icon = this.add("image", undefined, iconFile);
  }
  return this;
};
Object.prototype.nsSetTip = function (hlpTip) {
  if (hlpTip) {
    if (this.icon) {
      this.icon.helpTip = hlpTip;
    } else {
      this.helpTip = hlpTip;
    }
  }
  return this;
};
if (typeof generateRandomNumber != "undefined") {
  Math.random = function () {
    return generateRandomNumber();
  };
}
var global = {};
origami.devMode = false;
origami.version = "1.4.0";
origami.AEversion = app.version.split("x")[0].split(".");
origami.AEversion = Number(origami.AEversion[0] + "." + origami.AEversion[1]);
origami.AllSlices = [];
origami.AllSlicesNames = [];
origami.preFlight = function () {
  function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    return securitySetting == 1;
  }
  function isAE() {
    return BridgeTalk.appName == "aftereffects";
  }
  var strErrScriptAccess = localize({
    de: 'Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
    en: 'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
    es: 'Este script necesita poder escribir archivos.\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
    fr: 'Ce script n\xe9cessite les droits d\'\xe9criture de fichiers.\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
  });
  if (isAE() && !isSecurityPrefSet()) {
    alert(strErrScriptAccess);
    app.executeCommand(2359);
    if (!isSecurityPrefSet()) {
      return;
    }
  }
};
origami.preFlight();
origami.readExternalFile = function (_path) {
  try {
    var f = new File(_path);
    f.open("r");
    var externalFile = "";
    while (!f.eof) {
      externalFile += f.readln() + "\n";
    }
    return externalFile;
  } catch (err) {
    return null;
  }
};
origami.readAndEval = function (_path) {
  var content = origami.readExternalFile(_path);
  if (content) {
    eval(content);
  }
};
origami.add_slices_funcs = function () {
  var all_slices_loaded = origami.sliceAlgorithms.reflect.properties.filter(
    function (el) {
      return String(el).startsWith("slice");
    },
  );
  all_slices_loaded.sort(function (a, b) {
    if (
      origami.sliceAlgorithms[a].pack_priority ===
      origami.sliceAlgorithms[b].pack_priority
    ) {
      a_val = parseInt(String(a).slice(5));
      b_val = parseInt(String(b).slice(5));
      return a_val > b_val;
    }
    return (
      origami.sliceAlgorithms[a].pack_priority >
      origami.sliceAlgorithms[b].pack_priority
    );
  });
  all_slices_loaded.forEach(function (el) {
    if (
      origami.AllSlicesNames.indexOf(origami.sliceAlgorithms[el].name) === -1
    ) {
      origami.AllSlices.push(origami.sliceAlgorithms[el]);
      origami.AllSlicesNames.push(origami.sliceAlgorithms[el].name);
    }
  });
};
origami.getSliceByType = function (sliceType) {
  return origami.AllSlices[sliceType];
};
if ($.os.toLowerCase().split(" ")[0] == "macintosh") {
  origami.path_f =
    Folder.appPackage.path + "/Plug-ins/(Origami_packages)/basicSlice.jsxbin";
  origami.path_f_dev =
    new File($.fileName).parent.fsName +
    "/(Origami_packages)/basicSlice.jsxbin";
  origami.presetString = Folder.userData.fullName + "/Origami/preset.ffx";
  origami.prefix = "open ";
} else {
  origami.path_f =
    Folder.appPackage.fsName +
    "\\Plug-ins\\(Origami_packages)\\basicSlice.jsxbin";
  origami.path_f_dev = "(Origami_packages)\\basicSlice.jsxbin";
  origami.presetString = Folder.userData.fsName + "\\Origami\\preset.ffx";
  origami.prefix = "explorer ";
}
origami.folder = new Folder(new File(origami.presetString).path);
origami.folder.create();
origami.devFile = new File(origami.path_f_dev);
origami.userFile = new File(origami.path_f);
origami.package_folder = null;
if (origami.devFile.exists) {
  origami.readAndEval(origami.path_f_dev);
  origami.package_folder = new Folder(origami.devFile.parent);
  origami.add_slices_funcs();
} else if (origami.userFile.exists) {
  origami.readAndEval(origami.path_f);
  origami.package_folder = new Folder(origami.userFile.parent);
  origami.add_slices_funcs();
} else {
  alert("Origami packages file is absent\nPlease reinstall Origami");
}
var packs = origami.package_folder.getFiles("*.jsxbin");
var hasPacks = false;
for (var i = 0; i < packs.length; i += 1) {
  var end = packs[i].fsName.substr(packs[i].fsName.length - 17, 17);
  if (!(end === "basicSlice.jsxbin")) {
    hasPacks = true;
    origami.readAndEval(packs[i].fsName);
  }
}
if (hasPacks) {
  origami.add_slices_funcs();
}
var Node = function (p, t) {
  this.point = p;
  this.triangle = t || null;
  this.next = null;
  this.prev = null;
  this.value = p.x;
};
var AdvancingFront = function (head, tail) {
  this.head_ = head;
  this.tail_ = tail;
  this.search_node_ = head;
};
AdvancingFront.prototype.head = function () {
  return this.head_;
};
AdvancingFront.prototype.setHead = function (node) {
  this.head_ = node;
};
AdvancingFront.prototype.tail = function () {
  return this.tail_;
};
AdvancingFront.prototype.setTail = function (node) {
  this.tail_ = node;
};
AdvancingFront.prototype.search = function () {
  return this.search_node_;
};
AdvancingFront.prototype.setSearch = function (node) {
  this.search_node_ = node;
};
AdvancingFront.prototype.findSearchNode = function () {
  return this.search_node_;
};
AdvancingFront.prototype.locateNode = function (x) {
  var node = this.search_node_;
  if (x < node.value) {
    while ((node = node.prev)) {
      if (x >= node.value) {
        this.search_node_ = node;
        return node;
      }
    }
  } else {
    while ((node = node.next)) {
      if (x < node.value) {
        this.search_node_ = node.prev;
        return node.prev;
      }
    }
  }
  return null;
};
AdvancingFront.prototype.locatePoint = function (point) {
  var px = point.x;
  var node = this.findSearchNode(px);
  var nx = node.point.x;
  if (px === nx) {
    if (point !== node.point) {
      if (point === node.prev.point) {
        node = node.prev;
      } else if (point === node.next.point) {
        node = node.next;
      } else {
        throw new Error("poly2tri Invalid AdvancingFront.locatePoint() call");
      }
    }
  } else if (px < nx) {
    while ((node = node.prev)) {
      if (point === node.point) {
        break;
      }
    }
  } else {
    while ((node = node.next)) {
      if (point === node.point) {
        break;
      }
    }
  }
  if (node) {
    this.search_node_ = node;
  }
  return node;
};
("use strict");
var Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this._p2t_edge_list = null;
};
Point.prototype.toString = function () {
  return toStringBase(this);
};
Point.prototype.clone = function () {
  return new Point(this.x, this.y);
};
Point.prototype.set_zero = function () {
  this.x = 0;
  this.y = 0;
  return this;
};
Point.prototype.set = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
  return this;
};
Point.prototype.negate = function () {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};
Point.prototype.add = function (n) {
  this.x += n.x;
  this.y += n.y;
  return this;
};
Point.prototype.sub = function (n) {
  this.x -= n.x;
  this.y -= n.y;
  return this;
};
Point.prototype.mul = function (s) {
  this.x *= s;
  this.y *= s;
  return this;
};
Point.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Point.prototype.normalize = function () {
  var len = this.length();
  this.x /= len;
  this.y /= len;
  return len;
};
Point.prototype.equals = function (p) {
  return this.x === p.x && this.y === p.y;
};
Point.negate = function (p) {
  return new Point(-p.x, -p.y);
};
Point.add = function (a, b) {
  return new Point(a.x + b.x, a.y + b.y);
};
Point.sub = function (a, b) {
  return new Point(a.x - b.x, a.y - b.y);
};
Point.mul = function (s, p) {
  return new Point(s * p.x, s * p.y);
};
Point.cross = function (a, b) {
  if (typeof a === "number") {
    if (typeof b === "number") {
      return a * b;
    } else {
      return new Point(-a * b.y, a * b.x);
    }
  } else {
    if (typeof b === "number") {
      return new Point(b * a.y, -b * a.x);
    } else {
      return a.x * b.y - a.y * b.x;
    }
  }
};
Point.toString = toString;
Point.compare = compare;
Point.cmp = compare;
Point.equals = equals;
Point.dot = function (a, b) {
  return a.x * b.x + a.y * b.y;
};
("use strict");
var PointError = function (message, points) {
  this.name = "PointError";
  this.points = points = points || [];
  this.message = message || "Invalid Points!";
  for (var i = 0; i < points.length; i += 1) {
    this.message += " " + toString(points[i]);
  }
};
PointError.prototype = new Error();
PointError.prototype.constructor = PointError;
var global =
  typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
      ? window
      : {};
("use strict");
("use strict");
var PI_3div4 = (3 * Math.PI) / 4;
var PI_div2 = Math.PI / 2;
("use strict");
var kAlpha = 0.3;
var Edge = function (p1, p2) {
  this.p = p1;
  this.q = p2;
  if (p1.y > p2.y) {
    this.q = p1;
    this.p = p2;
  } else {
    if (p1.y === p2.y) {
      if (p1.x > p2.x) {
        this.q = p1;
        this.p = p2;
      } else {
        if (p1.x === p2.x) {
          throw new PointError(
            "poly2tri Invalid Edge constructor: repeated points!",
            [p1],
          );
        }
      }
    }
  }
  if (!this.q._p2t_edge_list) {
    this.q._p2t_edge_list = [];
  }
  this.q._p2t_edge_list.push(this);
};
var Basin = function () {
  this.left_node = null;
  this.bottom_node = null;
  this.right_node = null;
  this.width = 0;
  this.left_highest = false;
};
Basin.prototype.clear = function () {
  this.left_node = null;
  this.bottom_node = null;
  this.right_node = null;
  this.width = 0;
  this.left_highest = false;
};
var EdgeEvent = function () {
  this.constrained_edge = null;
  this.right = false;
};
var SweepContext = function (contour, options) {
  options = options || {};
  this.triangles_ = [];
  this.map_ = [];
  this.points_ = options.cloneArrays ? contour.slice(0) : contour;
  this.edge_list = [];
  this.pmin_ = this.pmax_ = null;
  this.front_ = null;
  this.head_ = null;
  this.tail_ = null;
  this.af_head_ = null;
  this.af_middle_ = null;
  this.af_tail_ = null;
  this.basin = new Basin();
  this.edge_event = new EdgeEvent();
  this.initEdges(this.points_);
};
SweepContext.prototype.addHole = function (polyline) {
  this.initEdges(polyline);
  var len = polyline.length;
  for (var i = 0; i < len; i += 1) {
    this.points_.push(polyline[i]);
  }
  return this;
};
SweepContext.prototype.AddHole = SweepContext.prototype.addHole;
SweepContext.prototype.addPoint = function (point) {
  this.points_.push(point);
  return this;
};
SweepContext.prototype.AddPoint = SweepContext.prototype.addPoint;
SweepContext.prototype.addPoints = function (points) {
  this.points_ = this.points_.concat(points);
  return this;
};
var sweep = this;
SweepContext.prototype.triangulate = function () {
  sweep.triangulate(this);
  return this;
};
SweepContext.prototype.getBoundingBox = function () {
  return { max: this.pmax_, min: this.pmin_ };
};
SweepContext.prototype.getTriangles = function () {
  return this.triangles_;
};
SweepContext.prototype.GetTriangles = SweepContext.prototype.getTriangles;
SweepContext.prototype.front = function () {
  return this.front_;
};
SweepContext.prototype.pointCount = function () {
  return this.points_.length;
};
SweepContext.prototype.head = function () {
  return this.head_;
};
SweepContext.prototype.setHead = function (p1) {
  this.head_ = p1;
};
SweepContext.prototype.tail = function () {
  return this.tail_;
};
SweepContext.prototype.setTail = function (p1) {
  this.tail_ = p1;
};
SweepContext.prototype.getMap = function () {
  return this.map_;
};
SweepContext.prototype.initTriangulation = function () {
  var xmax = this.points_[0].x;
  var xmin = this.points_[0].x;
  var ymax = this.points_[0].y;
  var ymin = this.points_[0].y;
  var len = this.points_.length;
  for (var i = 1; i < len; i += 1) {
    var p = this.points_[i];
    p.x > xmax && (xmax = p.x);
    p.x < xmin && (xmin = p.x);
    p.y > ymax && (ymax = p.y);
    p.y < ymin && (ymin = p.y);
  }
  this.pmin_ = new Point(xmin, ymin);
  this.pmax_ = new Point(xmax, ymax);
  var dx = kAlpha * (xmax - xmin);
  var dy = kAlpha * (ymax - ymin);
  this.head_ = new Point(xmax + dx, ymin - dy);
  this.tail_ = new Point(xmin - dx, ymin - dy);
  this.points_.sort(Point.compare);
};
SweepContext.prototype.initEdges = function (polyline) {
  var len = polyline.length;
  for (var i = 0; i < len; i += 1) {
    this.edge_list.push(new Edge(polyline[i], polyline[(i + 1) % len]));
  }
};
SweepContext.prototype.getPoint = function (index) {
  return this.points_[index];
};
SweepContext.prototype.addToMap = function (triangle) {
  this.map_.push(triangle);
};
SweepContext.prototype.locateNode = function (point) {
  return this.front_.locateNode(point.x);
};
SweepContext.prototype.createAdvancingFront = function () {
  var triangle = new Triangle(this.points_[0], this.tail_, this.head_);
  this.map_.push(triangle);
  head = new Node(triangle.getPoint(1), triangle);
  middle = new Node(triangle.getPoint(0), triangle);
  tail = new Node(triangle.getPoint(2));
  this.front_ = new AdvancingFront(head, tail);
  head.next = middle;
  middle.next = tail;
  middle.prev = head;
  tail.prev = middle;
};
SweepContext.prototype.removeNode = function (node) {};
SweepContext.prototype.mapTriangleToNodes = function (t) {
  for (var i = 0; i < 3; i += 1) {
    if (!t.getNeighbor(i)) {
      var n = this.front_.locatePoint(t.pointCW(t.getPoint(i)));
      if (n) {
        n.triangle = t;
      }
    }
  }
};
SweepContext.prototype.removeFromMap = function (triangle) {
  var map = this.map_;
  var len = map.length;
  for (var i = 0; i < len; i += 1) {
    if (map[i] === triangle) {
      map.splice(i, 1);
      break;
    }
  }
};
SweepContext.prototype.meshClean = function (triangle) {
  var triangles = [triangle];
  while ((t = triangles.pop())) {
    if (!t.isInterior()) {
      t.setInterior(true);
      this.triangles_.push(t);
      for (var i = 0; i < 3; i += 1) {
        if (!t.constrained_edge[i]) {
          triangles.push(t.getNeighbor(i));
        }
      }
    }
  }
};
("use strict");
var Triangle = function (a, b, c) {
  this.points_ = [a, b, c];
  this.neighbors_ = [null, null, null];
  this.interior_ = false;
  this.constrained_edge = [false, false, false];
  this.delaunay_edge = [false, false, false];
};
var p2s = toString;
Triangle.prototype.toString = function () {
  return (
    "[" +
    p2s(this.points_[0]) +
    p2s(this.points_[1]) +
    p2s(this.points_[2]) +
    "]"
  );
};
Triangle.prototype.getPoint = function (index) {
  return this.points_[index];
};
Triangle.prototype.GetPoint = Triangle.prototype.getPoint;
Triangle.prototype.getPoints = function () {
  return this.points_;
};
Triangle.prototype.getNeighbor = function (index) {
  return this.neighbors_[index];
};
Triangle.prototype.containsPoint = function (point) {
  var points = this.points_;
  return point === points[0] || point === points[1] || point === points[2];
};
Triangle.prototype.containsEdge = function (edge) {
  return this.containsPoint(edge.p) && this.containsPoint(edge.q);
};
Triangle.prototype.containsPoints = function (p1, p2) {
  return this.containsPoint(p1) && this.containsPoint(p2);
};
Triangle.prototype.isInterior = function () {
  return this.interior_;
};
Triangle.prototype.setInterior = function (interior) {
  this.interior_ = interior;
  return this;
};
Triangle.prototype.markNeighborPointers = function (p1, p2, t) {
  var points = this.points_;
  if (
    (p1 === points[2] && p2 === points[1]) ||
    (p1 === points[1] && p2 === points[2])
  ) {
    this.neighbors_[0] = t;
  } else if (
    (p1 === points[0] && p2 === points[2]) ||
    (p1 === points[2] && p2 === points[0])
  ) {
    this.neighbors_[1] = t;
  } else if (
    (p1 === points[0] && p2 === points[1]) ||
    (p1 === points[1] && p2 === points[0])
  ) {
    this.neighbors_[2] = t;
  } else {
    throw new Error("poly2tri Invalid Triangle.markNeighborPointers() call");
  }
};
Triangle.prototype.markNeighbor = function (t) {
  var points = this.points_;
  if (t.containsPoints(points[1], points[2])) {
    this.neighbors_[0] = t;
    t.markNeighborPointers(points[1], points[2], this);
  } else if (t.containsPoints(points[0], points[2])) {
    this.neighbors_[1] = t;
    t.markNeighborPointers(points[0], points[2], this);
  } else {
    if (t.containsPoints(points[0], points[1])) {
      this.neighbors_[2] = t;
      t.markNeighborPointers(points[0], points[1], this);
    }
  }
};
Triangle.prototype.clearNeigbors = function () {
  this.neighbors_[0] = null;
  this.neighbors_[1] = null;
  this.neighbors_[2] = null;
};
Triangle.prototype.clearDelunayEdges = function () {
  this.delaunay_edge[0] = false;
  this.delaunay_edge[1] = false;
  this.delaunay_edge[2] = false;
};
Triangle.prototype.pointCW = function (p) {
  var points = this.points_;
  if (p === points[0]) {
    return points[2];
  } else if (p === points[1]) {
    return points[0];
  } else if (p === points[2]) {
    return points[1];
  } else {
    return null;
  }
};
Triangle.prototype.pointCCW = function (p) {
  var points = this.points_;
  if (p === points[0]) {
    return points[1];
  } else if (p === points[1]) {
    return points[2];
  } else if (p === points[2]) {
    return points[0];
  } else {
    return null;
  }
};
Triangle.prototype.neighborCW = function (p) {
  if (p === this.points_[0]) {
    return this.neighbors_[1];
  } else if (p === this.points_[1]) {
    return this.neighbors_[2];
  } else {
    return this.neighbors_[0];
  }
};
Triangle.prototype.neighborCCW = function (p) {
  if (p === this.points_[0]) {
    return this.neighbors_[2];
  } else if (p === this.points_[1]) {
    return this.neighbors_[0];
  } else {
    return this.neighbors_[1];
  }
};
Triangle.prototype.getConstrainedEdgeCW = function (p) {
  if (p === this.points_[0]) {
    return this.constrained_edge[1];
  } else if (p === this.points_[1]) {
    return this.constrained_edge[2];
  } else {
    return this.constrained_edge[0];
  }
};
Triangle.prototype.getConstrainedEdgeCCW = function (p) {
  if (p === this.points_[0]) {
    return this.constrained_edge[2];
  } else if (p === this.points_[1]) {
    return this.constrained_edge[0];
  } else {
    return this.constrained_edge[1];
  }
};
Triangle.prototype.getConstrainedEdgeAcross = function (p) {
  if (p === this.points_[0]) {
    return this.constrained_edge[0];
  } else if (p === this.points_[1]) {
    return this.constrained_edge[1];
  } else {
    return this.constrained_edge[2];
  }
};
Triangle.prototype.setConstrainedEdgeCW = function (p, ce) {
  if (p === this.points_[0]) {
    this.constrained_edge[1] = ce;
  } else if (p === this.points_[1]) {
    this.constrained_edge[2] = ce;
  } else {
    this.constrained_edge[0] = ce;
  }
};
Triangle.prototype.setConstrainedEdgeCCW = function (p, ce) {
  if (p === this.points_[0]) {
    this.constrained_edge[2] = ce;
  } else if (p === this.points_[1]) {
    this.constrained_edge[0] = ce;
  } else {
    this.constrained_edge[1] = ce;
  }
};
Triangle.prototype.getDelaunayEdgeCW = function (p) {
  if (p === this.points_[0]) {
    return this.delaunay_edge[1];
  } else if (p === this.points_[1]) {
    return this.delaunay_edge[2];
  } else {
    return this.delaunay_edge[0];
  }
};
Triangle.prototype.getDelaunayEdgeCCW = function (p) {
  if (p === this.points_[0]) {
    return this.delaunay_edge[2];
  } else if (p === this.points_[1]) {
    return this.delaunay_edge[0];
  } else {
    return this.delaunay_edge[1];
  }
};
Triangle.prototype.setDelaunayEdgeCW = function (p, e) {
  if (p === this.points_[0]) {
    this.delaunay_edge[1] = e;
  } else if (p === this.points_[1]) {
    this.delaunay_edge[2] = e;
  } else {
    this.delaunay_edge[0] = e;
  }
};
Triangle.prototype.setDelaunayEdgeCCW = function (p, e) {
  if (p === this.points_[0]) {
    this.delaunay_edge[2] = e;
  } else if (p === this.points_[1]) {
    this.delaunay_edge[0] = e;
  } else {
    this.delaunay_edge[1] = e;
  }
};
Triangle.prototype.neighborAcross = function (p) {
  if (p === this.points_[0]) {
    return this.neighbors_[0];
  } else if (p === this.points_[1]) {
    return this.neighbors_[1];
  } else {
    return this.neighbors_[2];
  }
};
Triangle.prototype.oppositePoint = function (t, p) {
  var cw = t.pointCW(p);
  return this.pointCW(cw);
};
Triangle.prototype.legalize = function (opoint, npoint) {
  var points = this.points_;
  if (opoint === points[0]) {
    points[1] = points[0];
    points[0] = points[2];
    points[2] = npoint;
  } else if (opoint === points[1]) {
    points[2] = points[1];
    points[1] = points[0];
    points[0] = npoint;
  } else if (opoint === points[2]) {
    points[0] = points[2];
    points[2] = points[1];
    points[1] = npoint;
  } else {
    throw new Error("poly2tri Invalid Triangle.legalize() call");
  }
};
Triangle.prototype.index = function (p) {
  var points = this.points_;
  if (p === points[0]) {
    return 0;
  } else if (p === points[1]) {
    return 1;
  } else if (p === points[2]) {
    return 2;
  } else {
    throw new Error("poly2tri Invalid Triangle.index() call");
  }
};
Triangle.prototype.edgeIndex = function (p1, p2) {
  var points = this.points_;
  if (p1 === points[0]) {
    if (p2 === points[1]) {
      return 2;
    } else {
      if (p2 === points[2]) {
        return 1;
      }
    }
  } else if (p1 === points[1]) {
    if (p2 === points[2]) {
      return 0;
    } else {
      if (p2 === points[0]) {
        return 2;
      }
    }
  } else {
    if (p1 === points[2]) {
      if (p2 === points[0]) {
        return 1;
      } else {
        if (p2 === points[1]) {
          return 0;
        }
      }
    }
  }
  return -1;
};
Triangle.prototype.markConstrainedEdgeByIndex = function (index) {
  this.constrained_edge[index] = true;
};
Triangle.prototype.markConstrainedEdgeByEdge = function (edge) {
  this.markConstrainedEdgeByPoints(edge.p, edge.q);
};
Triangle.prototype.markConstrainedEdgeByPoints = function (p, q) {
  var points = this.points_;
  if (
    (q === points[0] && p === points[1]) ||
    (q === points[1] && p === points[0])
  ) {
    this.constrained_edge[2] = true;
  } else if (
    (q === points[0] && p === points[2]) ||
    (q === points[2] && p === points[0])
  ) {
    this.constrained_edge[1] = true;
  } else {
    if (
      (q === points[1] && p === points[2]) ||
      (q === points[2] && p === points[1])
    ) {
      this.constrained_edge[0] = true;
    }
  }
};
("use strict");
var EPSILON = 1e-12;
var Orientation = { CCW: -1, COLLINEAR: 0, CW: 1 };
("use strict");
var poly2tri = this;
poly2tri.Node = Node;
poly2tri.AdvancingFront = AdvancingFront;
poly2tri.Point = Point;
poly2tri.PointError = PointError;
poly2tri.Basin = Basin;
poly2tri.triangulate = triangulate;
poly2tri.sweepPoints = sweepPoints;
poly2tri.finalizationPolygon = finalizationPolygon;
poly2tri.edgeEventByEdge = edgeEventByEdge;
poly2tri.edgeEventByPoints = edgeEventByPoints;
poly2tri.isEdgeSideOfTriangle = isEdgeSideOfTriangle;
poly2tri.newFrontTriangle = newFrontTriangle;
poly2tri.fill = fill;
poly2tri.fillAdvancingFront = fillAdvancingFront;
poly2tri.basinAngle = basinAngle;
poly2tri.holeAngle = holeAngle;
poly2tri.legalize = legalize;
poly2tri.inCircle = inCircle;
poly2tri.rotateTrianglePair = rotateTrianglePair;
poly2tri.fillBasin = fillBasin;
poly2tri.fillRightAboveEdgeEvent = fillRightAboveEdgeEvent;
poly2tri.fillRightBelowEdgeEvent = fillRightBelowEdgeEvent;
poly2tri.fillRightConcaveEdgeEvent = fillRightConcaveEdgeEvent;
poly2tri.fillRightConvexEdgeEvent = fillRightConvexEdgeEvent;
poly2tri.fillLeftAboveEdgeEvent = fillLeftAboveEdgeEvent;
poly2tri.fillLeftBelowEdgeEvent = fillLeftBelowEdgeEvent;
poly2tri.fillLeftConcaveEdgeEvent = fillLeftConcaveEdgeEvent;
poly2tri.fillLeftConvexEdgeEvent = fillLeftConvexEdgeEvent;
poly2tri.flipEdgeEvent = flipEdgeEvent;
poly2tri.nextFlipPoint = nextFlipPoint;
poly2tri.nextFlipTriangle = nextFlipTriangle;
poly2tri.flipScanEdgeEvent = flipScanEdgeEvent;
poly2tri.Edge = Edge;
poly2tri.EdgeEvent = EdgeEvent;
poly2tri.SweepContext = SweepContext;
poly2tri.Triangle = Triangle;
poly2tri.orient2d = orient2d;
poly2tri.inScanArea = inScanArea;
poly2tri.toStringBase = toStringBase;
poly2tri.toString = toString;
poly2tri.compare = compare;
poly2tri.equals = equals;
poly2tri.global = global;
poly2tri.PI_3div4 = PI_3div4;
poly2tri.PI_div2 = PI_div2;
poly2tri.kAlpha = kAlpha;
poly2tri.sweep = sweep;
poly2tri.p2s = p2s;
poly2tri.EPSILON = EPSILON;
poly2tri.Orientation = Orientation;
function a(vars) {
  function licUI() {
    var e = new Window(
      "dialog",
      strTrialWelcomeHeader + " - " + strVersion + " " + strScriptVersion,
      void 0,
      { resizeable: true },
    );
    if (null != e) {
      var t =
        "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\tinfoGrp: Group { \t\t\t\t\talignment: [\'fill\',\'top\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\torientation: \'column\', \t\t\t\t\t\thdrGrp: Group {\t\t\t\t\t\t\ttxt: StaticText {}, \t\t\t\t\t\t\tpaste: StaticText {}, \t\t\t\t\t\t}\t\t\t\t\t\ttrial: StaticText {}, \t\t\t\t\t} \t\t\t\t\tlicGrp: Group { \t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'],                             buyGrp: Group {                             alignment: [\'left\',\'fill\'],                             alignChildren: [\'left\',\'fill\'],                             orientation: \'column\',                             spacing:1,                                  retrieveReg: Button {text:\'" +
        strRetrieveLic.replace(/%t/, strLicense) +
        "\', name:\'retrieve\',preferredSize:[130,25]}                                   buyLic: Button {text:\'" +
        strBuyLic.replace(/%t/, strLicense) +
        "\', name:\'buy\',preferredSize:[130,25]}                                   }\t\t\t\t\t\tcancelBtn: Button {text:\'" +
        strCancel +
        "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
        strOK +
        "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
      e.grp = e.add(t);
      var i = ScriptUI.newFont(
        "dialog || palette",
        ScriptUI.FontStyle.BOLD,
        12,
      );
      var n = ScriptUI.newFont(
        "dialog || palette",
        ScriptUI.FontStyle.REGULAR,
        9,
      );
      return (
        (e.grp.licGrp.txt.preferredSize = [600, 30]),
        (e.grp.infoGrp.hdrGrp.txt.text = strEnterLicenseCode),
        (e.grp.infoGrp.hdrGrp.txt.graphics.font = i),
        (e.grp.infoGrp.hdrGrp.paste.text = ""),
        (e.grp.infoGrp.hdrGrp.paste.graphics.font = n),
        (e.grp.infoGrp.trial.text =
          betaMode || !offerTrial ? "" : strTrialInstructMsg),
        isServerConfigured(licenseValidity) &&
          (isServerRunning(licenseValidity)
            ? (e.grp.infoGrp.hdrGrp.txt.text = strServerInstructMsg)
            : (e.grp.infoGrp.hdrGrp.txt.text =
                strEnterLicenseCode + " " + strServerNotRunning),
          (e.grp.infoGrp.trial.text = strTrialInstructMsg)),
        (e.grp.licGrp.txt.text = betaMode || !offerTrial ? "" : "trial"),
        isServerConfigured(licenseValidity) &&
          isServerRunning(licenseValidity) &&
          (e.grp.licGrp.txt.text = "@REMOTE"),
        (e.grp.okGrp.buyGrp.retrieveReg.visible =
          e.grp.okGrp.buyGrp.buyLic.visible =
            !betaMode),
        (e.grp.okGrp.buyGrp.buyLic.onClick = function () {
          openURL(strTrialUrl);
          e.close(false);
        }),
        (e.grp.okGrp.buyGrp.retrieveReg.onClick = function () {
          retrieveLicenseUI(strLicense);
          e.close(false);
        }),
        (e.grp.okGrp.cancelBtn.onClick = function () {
          e.close(false);
        }),
        (e.grp.okGrp.okBtn.onClick = function () {
          license = e.grp.licGrp.txt.text
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
          e.close(true);
        }),
        e.layout.layout(true),
        e.layout.resize(),
        (e.onResizing = e.onResize =
          function () {
            this.layout.resize();
          }),
        e
      );
    }
  }
  function retrieveLicenseUI(e) {
    var t = new Window("dialog", strRetrieveLic.replace(/%t/, e), void 0, {
      resizeable: true,
    });
    if (null != t) {
      var i =
        "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'],                     hdrGrp: Group {                         orientation: \'column\',                         alignment: [\'fill\',\'fill\'],                         alignChildren: [\'fill\',\'fill\'],                                 hdr: StaticText {text:\'" +
        strLicenseDownloadOptions.replace(
          /%t/,
          e.toLowerCase() + "de" == locale ? "n" : "s",
        ) +
        "\', alignment: [\'fill\',\'top\'], properties:{multiline:true} },                                },                     buttonsGrp: Group {                         alignment: [\'fill\',\'bottom\'],                         alignChildren: [\'fill\',\'fill\'],                             myDownloadsBtn: Button {text:\'" +
        strMyDownloads +
        "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']},                             downloadManagerBtn: Button {text:\'" +
        strDownloadManager +
        "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']},                         }, \t\t\t\t}";
      t.grp = t.add(i);
      t.grp.buttonsGrp.myDownloadsBtn.onClick = function () {
        openURL(retrieveUrl);
        t.close(false);
      };
      t.grp.buttonsGrp.downloadManagerBtn.onClick = function () {
        openURL(managerAppUrl);
        t.close(false);
      };
      t.layout.layout(true);
      t.layout.resize();
      t.onResizing = t.onResize = function () {
        this.layout.resize();
      };
      t.show();
    }
  }
  function checkBeta(e, t) {
    return new Date() < t || new Date() > e;
  }
  function helpUI() {
    var e = new Window(
      "dialog",
      strScriptName + " - " + strVersion + " " + strScriptVersion,
      void 0,
      { resizeable: true },
    );
    if (null != e) {
      for (
        var t =
            -1 != $.os.indexOf("Windows") &&
            12 <= parseFloat(app.version) &&
            parseFloat(app.version) < 14
              ? ["left", "top"]
              : ["fill", "fill"],
          i =
            "group { \t\torientation: \'column\', \t\talignment: [\'" +
            t[0] +
            "\',\'" +
            t[1] +
            "\'], \t\talignChildren: [\'fill\',\'fill\'],                    infoGrp: Group {                    alignment: [\'fill\',\'top\'],                    alignChildren: [\'fill\',\'top\'], \t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]},                       hdr: StaticText {properties:{multiline:true}},                       removeLic: Button {text:\'" +
            strDeactivate +
            "\', preferredSize:[40,30]} \t\t\t\t} \t\t\t\thelpGrp: Group {                    alignment: [\'" +
            t[0] +
            "\',\'" +
            t[1] +
            "\'],                    alignChildren: [\'fill\',\'fill\'],                     txt: EditText {properties:{multiline:true, readonly:true}}, \t\t\t\t}                 prefsGrp: Group {                       alignment: [\'fill\',\'bottom\'],                        alignChildren: [\'left\',\'center\'],                        orientation: \'row\',                        checkNow: Button {text:\'" +
            strCheckNow +
            "\', preferredSize:[150,25]}                        doUpdateCheck: Checkbox {text:\'" +
            strVersionCheck +
            "\', preferredSize:[-1,25]}                        }\t\t\tokGrp: Group {                 alignment: [\'fill\',\'bottom\'],                 alignChildren: [\'fill\',\'center\'],                 supportBtn: Button {text:\'" +
            strGetSupport +
            "\', preferredSize:[150,30], alignment: [\'left\',\'center\']}                 ",
          n = 0;
        n < Math.min(maxUIButtons, vars.helpButtons.length);
        n++
      ) {
        if (vars.helpButtons[n].hasOwnProperty("name")) {
          i +=
            "btn" + n + ": " + vars.helpButtons[n].hasOwnProperty("type") &&
            validateButtonType(vars.helpButtons[n].type)
              ? vars.helpButtons[n].type
              : "Button" +
                " {id: \'" +
                n +
                "\', alignment: [\'left\',\'center\']}";
        }
      }
      i +=
        "\t\t\t\t\tokBtn: Button {text:\'" +
        strOK +
        "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t} \t\t}";
      e.grp = e.add(i);
      e.grp.helpGrp.txt.preferredSize = [800, 500];
      var r = "\xa9" + (new Date().getYear() + 1900).toString();
      e.grp.infoGrp.txt.text =
        strScriptName +
        " - " +
        strVersion +
        " " +
        strScriptVersion +
        "\n" +
        r +
        " " +
        vars.scriptAuthor +
        "\n\n";
      e.grp.infoGrp.hdr.text = getRegistration();
      e.grp.helpGrp.txt.text = vars.helpText;
      haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
        (doUpdateCheck = !(
          "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
        ));
      e.grp.prefsGrp.doUpdateCheck.value = doUpdateCheck;
      e.grp.prefsGrp.doUpdateCheck.onClick = function () {
        setUpdateCheck(this.value);
      };
      e.grp.prefsGrp.checkNow.onClick = function () {
        ScriptUI.environment.keyboardState.altKey
          ? alert("aescripts licensing framework version\n" + licensingVersion)
          : doUpdateCheckNow();
      };
      for (
        var n = 0;
        n < Math.min(maxUIButtons, vars.helpButtons.length);
        n += 1
      ) {
        vars.helpButtons[n].hasOwnProperty("name") &&
          ((e.grp.okGrp["btn" + n].text = vars.helpButtons[n].name),
          vars.helpButtons[n].hasOwnProperty("url")
            ? (e.grp.okGrp["btn" + n].onClick = function () {
                openURL(vars.helpButtons[this.id].url);
              })
            : vars.helpButtons[n].hasOwnProperty("onClickFunction") &&
              (e.grp.okGrp["btn" + n].onClick =
                vars.helpButtons[n].onClickFunction),
          vars.helpButtons[n].hasOwnProperty("btnValue") &&
            (e.grp.okGrp["btn" + n].value = vars.helpButtons[n].btnValue));
      }
      e.grp.infoGrp.removeLic.visible = !isResultTrial(licenseValidity.result);
      e.grp.infoGrp.removeLic.onClick = function () {
        removeLic() &&
          ((e.grp.infoGrp.hdr.text = getRegistration()),
          (this.visible = false));
      };
      e.grp.okGrp.supportBtn.onClick = function () {
        ScriptUI.environment.keyboardState.shiftKey &&
        ScriptUI.environment.keyboardState.altKey
          ? alert(
              "aescripts + aeplugins\nFramework version: " +
                licensingVersion +
                "\n" +
                strScriptName +
                " - " +
                strVersion +
                " " +
                strScriptVersion,
            )
          : (openSupportTicket({}), e.close());
      };
      e.grp.okGrp.okBtn.onClick = function () {
        e.close();
      };
      -1 != $.os.indexOf("Windows") &&
        12 <= parseFloat(app.version) &&
        parseFloat(app.version) < 14 &&
        (e.maximumSize = [840, 670]);
      e.layout.layout(true);
      e.layout.resize();
      e.onResizing = e.onResize = function () {
        this.layout.resize();
      };
      e.show();
    }
  }
  function validateButtonType(e) {
    return "Button" === e || "Checkbox" === e;
  }
  function openSupportTicket(e) {
    i = n = "";
    t = "&subject=";
    null != e &&
      void 0 !== e &&
      (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
      e.hasOwnProperty("message") && (i = File.encode(e.message)),
      e.hasOwnProperty("diagnostic") &&
        (n = File.encode(e.diagnostic + "\n--\n")));
    var r =
      true === isAescriptsSupportUrl
        ? strSKU + t + "&message="
        : t.replace(/\&/, "?") + "&body=";
    var a =
      "" != r
        ? i +
          "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
          n +
          getDiagnosticData(true)
        : "";
    supportUrl.toString().match(/@/) &&
      !supportUrl.toString().match(/^mailto:/) &&
      (supportUrl = "mailto:" + supportUrl);
    openURL(supportUrl + r + a);
  }
  function getDiagnosticData(e) {
    var t = $.os.toString();
    var i =
      BridgeTalk.getDisplayName(BridgeTalk.appName) +
      " (" +
      app.version +
      ") - " +
      $.locale.toString();
    var n =
      strScriptName.replace(/&/, "and") +
      " - " +
      strVersion +
      " " +
      strScriptVersion;
    var r = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
    return e
      ? File.encode(n) +
          "%0D%0A" +
          File.encode(t) +
          "%0D%0A" +
          File.encode(i) +
          "%0D%0A" +
          File.encode(r)
      : n + "\n" + t + "\n" + i + "\n" + r;
  }
  function setUpdateCheck(e) {
    saveSettings(prefsSectionName, prefsDoUpdateCheck, (doUpdateCheck = e));
  }
  function doUpdateCheckNow() {
    checkForNewVersion((doUpdateCheck = true));
  }
  function newVersionUI(t) {
    var i = new Window("dialog", strNewVersionAvailableHdr, void 0, {
      resizeable: true,
    });
    if (null != i) {
      var e =
        "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t   hdrGrp: Group { \t\t\t\t   alignment: [\'fill\',\'fill\'], \t\t\t\t   alignChildren: [\'fill\',\'fill\'], \t\t\t\t   orientation: \'column\',                         hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
      t.hasOwnProperty("header") &&
        (e +=
          "   infoGrp: Panel {                            alignment: [\'fill\',\'fill\'],                            alignChildren: [\'fill\',\'fill\'],                            orientation: \'column\',                               info: StaticText {properties:{multiline:true}},                               } ");
      e +=
        "} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
        strSkipVersion +
        "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']}                            remindMeLaterBtn: Button {text:\'" +
        strRemindMeLater +
        "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \t\t\t\t\t\tdownloadBtn: Button {text:\'" +
        strDownload +
        "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
      i.grp = i.add(e);
      var n = ScriptUI.newFont(
        "dialog || palette",
        ScriptUI.FontStyle.BOLD,
        12,
      );
      ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
      ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
      i.grp.hdrGrp.hdr.graphics.font = n;
      i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
        /%v/,
        t.version + "\n" + strCurrentVersion.replace(/%v/, strScriptVersion),
      );
      t.hasOwnProperty("header") &&
        (i.grp.hdrGrp.infoGrp.info.text = t.header + "\n\n" + t.detail);
      i.grp.okGrp.skipVersionBtn.onClick = function () {
        saveSettings(
          prefsSectionName,
          prefsLastVersionChecked,
          strScriptVersion,
        );
        saveSettings(
          prefsSectionName,
          prefsLastTimeVersionChecked,
          new Date().toString(),
        );
        saveSettings(
          prefsSectionName,
          prefsNextTimeVersionCheckedSkipVersion,
          t.version,
        );
        saveSettings(
          prefsSectionName,
          prefsLastServerVersionChecked,
          t.version,
        );
        i.close(false);
      };
      i.grp.okGrp.remindMeLaterBtn.onClick = function () {
        try {
          var e = new Date();
          e = dateAddDays(remindMeLaterDays);
          saveSettings(
            prefsSectionName,
            prefsLastVersionChecked,
            strScriptVersion,
          );
          saveSettings(
            prefsSectionName,
            prefsLastTimeVersionChecked,
            new Date().toString(),
          );
          saveSettings(
            prefsSectionName,
            prefsNextTimeVersionChecked,
            e.toString(),
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            t.version,
          );
          i.close(false);
        } catch (e) {
          alert(e.toString());
        }
      };
      i.grp.okGrp.downloadBtn.onClick = function () {
        retrieveLicenseUI(strDownload);
        i.close(true);
      };
      i.layout.layout(true);
      i.layout.resize();
      i.onResizing = i.onResize = function () {
        this.layout.resize();
      };
      t.hasOwnProperty("header") &&
        ((i.grp.hdrGrp.infoGrp.size.height = Math.min(
          i.grp.hdrGrp.infoGrp.size.height,
          300,
        )),
        i.layout.layout(true),
        i.layout.resize());
      i.show();
    }
  }
  function dateAddDays(e) {
    var t = new Date().getTime() + 86400000 * e;
    return new Date(t);
  }
  function checkForNewVersion(e) {
    if ((null == e && (e = false), doUpdateCheck)) {
      haveSettings(prefsSectionName, prefsLastVersionChecked) &&
        (i = getSettings(prefsSectionName, prefsLastVersionChecked));
      haveSettings(prefsSectionName, prefsLastServerVersionChecked) &&
        (n = getSettings(prefsSectionName, prefsLastServerVersionChecked));
      haveSettings(prefsSectionName, prefsLastTimeVersionChecked) &&
        (r = new Date(
          getSettings(prefsSectionName, prefsLastTimeVersionChecked),
        ));
      haveSettings(prefsSectionName, prefsNextTimeVersionCheckedSkipVersion) &&
        (s = getSettings(
          prefsSectionName,
          prefsNextTimeVersionCheckedSkipVersion,
        ));
      haveSettings(prefsSectionName, prefsNextTimeVersionChecked) &&
        (a = new Date(
          getSettings(prefsSectionName, prefsNextTimeVersionChecked),
        ));
      haveSettings(prefsSectionName, prefsVersionCheckInit) &&
        (t = getSettings(prefsSectionName, prefsVersionCheckInit));
      var o = new Date();
      if (e || null == t || null == a || !(o < a)) {
        var l = versionCheck(strSKU, true, e);
        if (null != l) {
          var c =
            null != l && l.hasOwnProperty("version")
              ? l.version
              : strScriptVersion;
          if ((e || null == n || n != c) && (e || null == s || s != n)) {
            saveSettings(prefsSectionName, prefsVersionCheckInit, 1);
            try {
              var f = new Date();
              f = dateAddDays(updateCheckInterval);
              saveSettings(
                prefsSectionName,
                prefsLastVersionChecked,
                strScriptVersion,
              );
              saveSettings(
                prefsSectionName,
                prefsLastTimeVersionChecked,
                new Date().toString(),
              );
              saveSettings(
                prefsSectionName,
                prefsNextTimeVersionChecked,
                f.toString(),
              );
            } catch (e) {
              alert(e.toString());
            }
            var d = compareVersions(c, strScriptVersion);
            0 < d && (null == i || null == r || null == a || e || a <= o)
              ? newVersionUI(l)
              : d <= 0 && e && alert(strUpToDate);
          }
        } else {
          saveSettings(
            prefsSectionName,
            prefsDoUpdateCheck,
            (doUpdateCheck = false),
          );
        }
      }
    }
  }
  function versionCheck(e, t, i) {
    var n = extComms(
      "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
        e +
        t
        ? "&latest=1"
        : "" + parseFloat(app.version) < 12
          ? "&clip_length=200"
          : "&clip_length=300",
      null,
    );
    if (null == n || "" == n || !validateJSON(n)) {
      return (i && alert(strUpdateCheckError), null);
    }
    try {
      if (null == (n = JSONify(n, "parse"))) {
        return null;
      }
    } catch (e) {
      return null;
    }
    return "ok" != n.status
      ? null
      : t
        ? {
            date: n.latest.release_date,
            detail: n.latest.detail,
            header: strVersionRev
              .replace(/%a/, n.version)
              .replace(/%b/, "")
              .replace(/%c/, n.latest.release_date),
            version: n.version,
          }
        : { version: n.version };
  }
  function extComms(e) {
    try {
      if (-1 != $.os.indexOf("Mac")) {
        var t = system.callSystem('curl -s 2 "' + e + '"');
      } else {
        var i =
          ((n = new File(
            Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
          )).open("w"),
          n.write(
            'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
          ),
          n.close(),
          n.exists ? n : null);
        if (null == i) {
          return null;
        }
        t = system.callSystem(
          'cscript //nologo "' + i.fsName + '" "' + e + '"',
        );
      }
      return t;
    } catch (e) {
      return (alert("extComms error\n" + e.toString()), null);
    }
  }
  function socketConnect(e, t) {
    var i = new Socket();
    if (
      ((i.encoding = "binary"), (i.timeout = 2), i.open(e + ":80", "UTF-8"))
    ) {
      i.write(
        "GET /" + t + " HTTP/1.1\nHost: " + e + "\n\nConnection: close\n\n",
      );
      var n = i.read(2000);
      return (i.close(), null != n ? (n = n.toString()) : null);
    }
    return null;
  }
  function formatHistory(e, t) {
    var i = e.data;
    var n = [];
    for (var r in i) {
      if (i.hasOwnProperty(r)) {
        for (var a = i[r].history, s = a.length - 1; 0 <= s; s--) {
          var o = a[s];
          var l = "";
          var c = o.detail;
          s == a.length - 1 && (l = " (" + strNewestVersionAvailable + ")");
          var f = strVersionRev
            .replace(/%0/, o.version_number)
            .replace(/%1/, l)
            .replace(/%2/, o.release_date)
            .replace(/%3/, c);
          (!options.summaryOnlyNewChanges ||
            compareVersions(t, o.version_number) < 0) &&
            n.push(f);
        }
      }
    }
    return n.join("\n\n");
  }
  function getVerifCode(e) {
    return "1";
    "trial" == e.toLowerCase() && (e = "");
    var i =
      -1 != $.os.indexOf("Mac") &&
      (Folder("/Volumes/Private").exists || Folder("/Volumes/private").exists)
        ? Folder.userData.fsName
        : Folder.temp.fsName +
          "/" +
          Math.round(Math.random() * 42132 * new Date().getTime());
    if (-1 != $.os.indexOf("Win")) {
      t = wx;
      i += ".exe";
    } else {
      if (systemCall("arch").toLowerCase().match(/ppc/)) {
        return (alert(strPpcNotSupported), false);
      }
      t = mx;
    }
    var n = createFile(File(i), t, "BINARY");
    if (!n.exists) {
      return ((licenseData = { result: -108 }), licenseData);
    }
    n.hidden = true;
    -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + n.fsName + '"');
    var r = systemCall(
      '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
    );
    return (n.remove(), parseResult(r));
  }
  function parseResult(t) {
    try {
      i = parseVerifCode(t.toString());
    } catch (e) {
      (i = { result: -101 }).e = e.toString() + "\nresult:\n\n" + t.toString();
    }
    return i;
  }
  function parseVerifCode(e) {
    for (var t = e.match(/[^\r\n]+/g), i = {}, n = 0; n < t.length; n++) {
      var r = t[n].split(":");
      if (2 <= r.length) {
        var a = r[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        var s = trimQuotes(r[1]);
        "LS" == a && "UP" == s && (a = "LSS");
        isNaN(s) || (s = parseFloat(s));
        i[a] = s;
      }
    }
    return (
      void 0 === i.result && ((i.result = -102), (i.e = e)),
      checkTrialDetails(i),
      checkBetaDetails(i),
      (isTimeLimited = checkTimeLimited(i)),
      i
    );
  }
  function checkTimeLimited(e) {
    var t = retProp("rt$", e);
    var i = retProp("nd$", e);
    if ("" == t || "" == i) {
      return false;
    }
    switch (e.result) {
      case -20:
        e.e = t;
        break;
      case -21:
        e.e = i;
    }
  }
  function checkFloatingLicense(e) {
    retProp("pe$", e) != bD("RkxU") || isServerRunning(e) || (e.result = -109);
  }
  function checkTrialDetails(e) {
    if (-7 !== e.result) {
    } else if (0 == trialLengthDays) {
      e.result = -106;
    } else {
      var t = retProp("^d", e);
      if (void 0 === t) {
        return void (e.result = -103);
      }
      var i = trialLengthDays - t;
      0 < i
        ? ((e.result = 100), (e.tdl = i), (e.license = bD("VFJJQUw=")))
        : ((e.result = -100), (e.tdl = 0));
    }
  }
  function checkBetaDetails(e) {
    var t = e.result;
    var i = retProp("pe$", e).match(/^B/);
    betaMode && (isResultTrial(t) || -106 == t || -7 == t)
      ? (e.result = -107)
      : !betaMode && i && (e.result = -105);
  }
  function isResultValidLicense(e) {
    return true;
  }
  function isResultTrial(e) {
    return false;
  }
  function isServerConfigured(e) {
    try {
      return retProp("^L", e).match(/^O/);
    } catch (e) {}
  }
  function isServerRunning(e) {
    try {
      return retProp("SS$", e).match(/^U/);
    } catch (e) {}
  }
  function trimQuotes(e) {
    return (
      "\'" == (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
        "\'" == e[e.length - 1] &&
        (e = e.substring(1, e.length - 1)),
      e
    );
  }
  function sanitizeProductName(e) {
    return e.toString().replace(/[^a-z0-9]/gi, "");
  }
  function checkErrorCode(e) {
    return licErrors[locale].hasOwnProperty(e.toString()) ? e : "unknown";
  }
  function string_encode3(e) {
    for (var t = 0, i = 0; i < e.length; i++) {
      t += e.charCodeAt(i);
    }
    return t;
  }
  function getVerifCode3(e) {
    var t = e.split("*");
    if (4 == t.length) {
      var i = t[3].replace(/^[0-9]+/, "");
      var n = t[3].match(/^[0-9]+/, "");
      var r = n[0].substr(0, 2);
      var a = n[0].substr(n[0].length - 2);
      var s = r[0] + t[0] + r[1] + t[1] + a[0] + t[2] + a[1] + i;
      var o = n[0].substring(2, n[0].length - 2);
      return string_encode3(s) * privateNum == o ? "1" : "0";
    }
    return (e != bE("bad") && alert(strNewLicenseFormat), "0");
  }
  function string_encode(e) {
    return (
      e.length * e.charCodeAt(0) +
      e.charCodeAt(Math.floor(0.1 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.2 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.3 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.4 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.5 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.7 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.8 * (e.length - 1))) +
      e.charCodeAt(Math.floor(0.9 * (e.length - 1))) +
      e.charCodeAt(e.length - 1)
    );
  }
  function check_v1_License(e) {
    var t = e.split("**");
    return (
      !(
        !e.replace(/^ +|| +$/g, "").match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) ||
        3 != t.length
      ) || (alert(strOldLicenseFormat), false)
    );
  }
  function check_v2_License(e) {
    var t = e.split("*");
    return (
      e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
      4 == t.length
    );
  }
  function check_timed_License(e) {
    var t = e.split("*");
    return (
      e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[A-Z0-9#]+[A-Za-z]{3}[0-9]+$/) &&
      4 == t.length
    );
  }
  function checkCode(e, t, i) {
    if (
      ((t = null == t ? "" : t.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
      (myLicense = false),
      e && ((regUI = licUI()), (myRegPrompt = regUI.show()), !myRegPrompt))
    ) {
      return false;
    }
    var n = false;
    "@remote" == (t = null == license ? t : license).toLowerCase() &&
      ((t = strHeader + t), (n = true));
    var r = t.split("*");
    var a = t.match(/#/);
    var s = a && check_timed_License(t);
    var o = check_v2_License(t);
    if (!((offerTrial && "trial" == t.toLowerCase()) || n || o || s)) {
      if (t.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
        var l = confirm(strTempCode);
        return (
          isSecurityPrefSet() && l && openURL(exchangeUrl + "?serial=" + t),
          myLicense
        );
      }
      return (
        alert(
          strInvalidCode + "\n" + betaMode
            ? strNewLicenseFormat.replace(
                new RegExp(bD("U1VM"), "g"),
                bD("QlRB"),
              )
            : strNewLicenseFormat + "\n\n" + strContactSupport,
        ),
        saveSettings(prefsSectionName, prefsName, bE("bad")),
        saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
        saveSettings(prefsSectionName, prefsLicVersion, licensingVersion),
        checkCode(true),
        myLicense
      );
    }
    if (("trial" != t.toLowerCase() || n) && !n) {
      if (null != r[0] && r[0] != strHeader) {
        return (
          alert(strWrongProduct + "\n" + strContactSupport),
          checkCode(e),
          false
        );
      }
      var c = r[3].match(/[A-Z]{3}[0-9]+$/);
      if (null != c) {
        if (c[0].match(bD("QlRB")) && !betaMode) {
          return (
            alert(strBetaCodeAlert),
            saveSettings(prefsSectionName, prefsName, bE("bad")),
            checkCode(true),
            false
          );
        }
        myLicense = true;
      }
    }
    if (
      !isResultValidLicense(
        (licenseValidity = 2 == licV ? getVerifCode(t) : getVerifCode3(t)),
      )
    ) {
      e || (e = true);
      var f = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
      return (
        alert(
          licErrors[locale][checkErrorCode(licenseValidity.result)].title +
            "\n" +
            licErrors[locale][checkErrorCode(licenseValidity.result)].detail +
            f,
        ),
        -9 == licenseValidity.result &&
          prompt(strDeactivate + "?") &&
          getVerifCode("-"),
        checkCode(e),
        myLicense
      );
    }
    if (
      ((isValidTrial =
        !a &&
        offerTrial &&
        "trial" == t.toLowerCase() &&
        isResultTrial(licenseValidity.result)),
      e && !isValidTrial)
    ) {
      var d = parseInt(retProp("^n", licenseValidity), 10);
      t.match(/@remote/i) ||
        alert(
          strRegSuccess.replace("%u", d) + (1 < d) && "de" != locale
            ? "s"
            : "" + betaMode
              ? ""
              : "\n" + strRegSuccess1,
        );
    }
    return ((myLicense = true), myLicense);
  }
  function checkForLegacyLic() {
    var e = haveSettings(prefsSectionName, prefsName)
      ? bD(getSettings(prefsSectionName, prefsName))
      : "";
    return check_v2_License(e) ? e : "";
  }
  function trial_expired() {
    var e = confirm(strExpiredAlert);
    isSecurityPrefSet() && e
      ? openURL(strTrialUrl)
      : e && isAE() && alert(strErrScriptAccess);
  }
  function bD(e) {
    var o = "";
    var l = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    for (
      var c =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      l < e.length;
    ) {
      t =
        (c.indexOf(e.charAt(l++)) << 2) | ((r = c.indexOf(e.charAt(l++))) >> 4);
      i = ((15 & r) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
      n = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
      o += String.fromCharCode(t);
      64 != a && (o += String.fromCharCode(i));
      64 != s && (o += String.fromCharCode(n));
    }
    return o;
  }
  function bE(e) {
    for (
      t,
        i,
        n,
        r,
        a,
        s,
        o,
        l = "",
        c = 0,
        f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      c < e.length;
    ) {
      r = (t = e.charCodeAt(c++)) >> 2;
      a = ((3 & t) << 4) | ((i = e.charCodeAt(c++)) >> 4);
      s = ((15 & i) << 2) | ((n = e.charCodeAt(c++)) >> 6);
      o = 63 & n;
      isNaN(i) ? (s = o = 64) : isNaN(n) && (o = 64);
      l = l + f.charAt(r) + f.charAt(a) + f.charAt(s) + f.charAt(o);
    }
    return l;
  }
  function isSecurityPrefSet() {
    var e =
      parseFloat(app.version) < 12
        ? "Main Pref Section"
        : "Main Pref Section v2";
    return (
      1 ==
      app.preferences.getPrefAsLong(e, "Pref_SCRIPTING_FILE_NETWORK_SECURITY")
    );
  }
  function openURL(e) {
    if (
      ((e = e.toString()).match(/@/) ||
        e.match(/^https?:\/\//) ||
        (e = "http://" + e.replace(/^(http)?s?:?\/?\/?/, "")),
      isAE() || isPS())
    ) {
      Folder.commonFiles.parent.fsName;
      -1 != $.os.indexOf("Windows")
        ? systemCall('cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"')
        : systemCall('open "' + e + '"');
    } else {
      createFile(
        File(Folder.temp.fsName + "/openUrl.url"),
        "[InternetShortcut]\rURL=" + e + "\r",
        "UTF-8",
        true,
      ).execute();
    }
  }
  function parseRegistration(e) {
    if (0 == retProp("^r", licenseValidity)) {
      if (
        ((a = retProp("^f", licenseValidity)),
        (s = retProp("^la", licenseValidity)),
        (o = retProp("^n", licenseValidity)),
        (l = retProp("pe$", licenseValidity)),
        isTimeLimited &&
          (parseDateString(retProp("rt$", licenseValidity)),
          (f = parseDateString(retProp("nd$", licenseValidity)))),
        0 < e)
      ) {
        return a + "\'" + s + "\'" + retProp("^s", licenseValidity) + l + o;
      }
      n = a + s.toString().match(/^@/) ? "" : " " + s + " ";
      r = l;
    } else {
      n = "";
    }
    var d = strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
    switch (r) {
      case bD("U1VM"):
        t = " - " + strLicense + " " + d;
        break;
      case bD("QlRB"):
        t = " - " + strBTA + " " + d;
        break;
      case bD("RURV"):
        t = " - " + strEDU + " " + d;
        break;
      case bD("RkxU"):
        t = " - " + strFLT + " " + d;
        break;
      default:
        c = retProp("^t", licenseValidity);
        isTimeLimited ||
          (t = c < 1 ? strTrialExpired : strTrialTxt.replace(/%E/, c));
    }
    return (
      (i = "" != n ? strRegistration + n + t : t),
      isTimeLimited && (i += "\nLicense ends: " + f),
      i
    );
  }
  function parseDateString(e) {
    var t = e.toString().split("-");
    return new Date(
      parseInt(t[0]),
      parseInt(t[1] - 1),
      parseInt(t[2]),
    ).toDateString();
  }
  function retProp(e, t) {
    for (var i in t) {
      if (t.hasOwnProperty(i) && i.toString().match(new RegExp(e))) {
        return t[i];
      }
    }
    return "";
  }
  function isAE() {
    return BridgeTalk.appName.match(new RegExp(bD("YWZ0ZXJlZmZlY3Rz")));
  }
  function isPS() {
    return BridgeTalk.appName.match(new RegExp(bD("cGhvdG9zaG9w")));
  }
  function readFile(e) {
    if (null != e && null != e && e.exists && e.open("r")) {
      var t = e.read();
      return (e.close(), t);
    }
    return null;
  }
  function createFile(e, t, i, n, r) {
    return (
      ((null == e || null == e || e.exists) && !n) ||
        (e.exists && e.remove(),
        ((e =
          -1 != $.os.indexOf("Win")
            ? new File(e.fsName)
            : new File(e.absoluteURI)).encoding = i),
        e.open("w"),
        e.write(t),
        e.close(),
        (null != r && r) || (e.hidden = true),
        -1 != $.os.indexOf("Mac") &&
          systemCall(bD("Y2htb2QgK3gg") + e.absoluteURI)),
      e
    );
  }
  function systemCall(e) {
    if (isAE()) {
      return system.callSystem(e);
    }
    if (isPS()) {
      var t =
        -1 != $.os.indexOf("Win")
          ? Folder.temp.fsName
          : Folder.temp.absoluteURI +
            "/" +
            Math.round(Math.random() * 71827 * new Date().getTime());
      return (app.system(e + " > " + t), readFile(File(t)));
    }
    return "";
  }
  function parseSettings(e, t) {
    for (var i in t) {
      if (t.hasOwnProperty(i)) {
        if ("object" == typeof t[i]) {
          return parseSettings(e, t[i]);
        }
        if (i === e) {
          return t[i];
        }
      }
    }
  }
  function readJSON(e) {
    if (null == e || null == e) {
      return false;
    }
    e instanceof File || File(e);
    var t = readFile(e);
    return JSONify(t, "parse");
  }
  function writeJSON(e, t) {
    if (null == e || null == e || null == t || null == t) {
      return false;
    }
    t instanceof File || File(t);
    return (
      createFile(t, JSONify(e, "stringify", "\t"), "UTF-8", true, true),
      t.exists
    );
  }
  function getSettings(e, t, i) {
    if (isAE() && "settings" != i) {
      return app.settings.getSetting(e, t);
    }
    var n = File(prefsLocation + prefsPrefix + File.encode(e));
    var r = readFile(n);
    var a = JSONify(r, "parse");
    if (a instanceof Array) {
      for (var s in ((a = fixSettingsFile(a)), n.remove(), a)) {
        saveSettings(e, s, a[s]);
      }
    }
    return a[t];
  }
  function haveSettings(e, t, i) {
    if (isAE() && "settings" != i) {
      return app.settings.haveSetting(e, t);
    }
    var n = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
    if (null != n) {
      var r = JSONify(n.toString(), "parse");
      return (r instanceof Array && (r = fixSettingsFile(r)), t in r);
    }
    return false;
  }
  function fixSettingsFile(e) {
    for (var t = {}, i = 0; i < e.length - 1; i++) {
      t[e[i]] = e[i + 1];
      i++;
    }
    return t;
  }
  function saveSettings(e, t, i, n) {
    if (isAE() && "settings" != n) {
      app.settings.saveSetting(e, t, i);
      app.preferences.saveToDisk();
    } else {
      var r = {};
      var a = File(prefsLocation + prefsPrefix + File.encode(e));
      if (a.exists) {
        var s = readFile(a);
        null != s && (r = JSONify(s.toString(), "parse"));
      }
      r instanceof Array && (r = fixSettingsFile(r));
      r[t] = i;
      createFile(
        File(prefsLocation + prefsPrefix + File.encode(e)),
        JSONify(r, "stringify", "\t"),
        "UTF-8",
        true,
      );
    }
  }
  function saveVersionsToPrefs() {
    saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
    saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
  }
  function isVT() {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      isResultValidLicense(licenseValidity) &&
        isResultTrial(licenseValidity.result)
    );
  }
  function getRegistration(e) {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      parseRegistration(e)
    );
  }
  function removeLic() {
    (void 0 !== licenseValidity && licenseValidity.hasOwnProperty("result")) ||
      (licenseValidity = getVerifCode(""));
    var e =
      isServerConfigured(licenseValidity) && isServerRunning(licenseValidity)
        ? strHeader + "@REMOTE"
        : "";
    return (
      (licenseValidity = getVerifCode("-" + e)),
      (theLicense = false),
      alert(strScriptName + ": " + strLicenseRemoved),
      isServerConfigured(licenseValidity) ||
        (saveSettings(prefsSectionName, prefsName, bE("bad")),
        saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
        saveSettings(prefsSectionName, prefsLicVersion, licensingVersion)),
      !theLicense
    );
  }
  function mainFunc(e) {
    if (
      !isAE() ||
      isSecurityPrefSet() ||
      (alert(strErrScriptAccess),
      parseFloat(app.version) < 16.1
        ? app.executeCommand(2359)
        : app.executeCommand(3131),
      isSecurityPrefSet())
    ) {
      if (betaMode && checkBeta(betaExpirationDate, betaStartDate)) {
        "l" == e && alert(strBetaExpiredAlert);
      } else {
        if ("l" == e || "c" == e || "r" == e) {
          var n = false;
          if (("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)) {
            if ("r" == e) {
              i = !removeLic();
            } else {
              if ("-22" == (licenseValidity = getVerifCode("")).result) {
                var r = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
                alert(
                  licErrors[locale][checkErrorCode(licenseValidity.result)]
                    .title +
                    "\n" +
                    licErrors[locale][checkErrorCode(licenseValidity.result)]
                      .detail +
                    r,
                );
                getVerifCode("-");
                n = true;
                t =
                  isServerConfigured(licenseValidity) &&
                  isServerRunning(licenseValidity)
                    ? "@REMOTE"
                    : "trial";
              }
              if (
                isResultValidLicense(licenseValidity) &&
                !isResultTrial(licenseValidity.result)
              ) {
                return true;
              }
              "" == (t = checkForLegacyLic()) &&
                ((n = true),
                (t =
                  isServerConfigured(licenseValidity) &&
                  isServerRunning(licenseValidity)
                    ? "@REMOTE"
                    : "trial"));
              i = checkCode(n, t, privateNum);
            }
          } else {
            haveSettings(prefsSectionName, prefsName)
              ? ((t = getSettings(prefsSectionName, prefsName)),
                (n = !(
                  "c" == e ||
                  !(
                    ("bad" == t || "bad" == bD(t) || offerTrial) &&
                    "trial" == bD(t)
                  )
                )))
              : "c" == e
                ? (saveSettings(
                    prefsSectionName,
                    prefsName,
                    bE((t = !isTimeLimited && offerTrial ? "trial" : "")),
                  ),
                  saveSettings(
                    prefsSectionName,
                    prefsVersionName,
                    strScriptVersion,
                  ),
                  saveSettings(
                    prefsSectionName,
                    prefsLicVersion,
                    licensingVersion,
                  ),
                  (n = false))
                : (n = true);
            i = checkCode(n, t, privateNum);
          }
          return i;
        }
      }
    }
  }
  var licensingVersion = "3.0.42";
  null == vars.scriptName &&
    alert("scriptName variable missing in settings object");
  var strScriptName = vars.scriptName;
  null == vars.scriptVersion &&
    alert("scriptVersion variable missing in settings object");
  var strScriptVersion = vars.scriptVersion;
  null == vars.scriptURL &&
    alert("scriptURL variable missing in settings object");
  var strTrialUrl = vars.scriptURL;
  null == vars.privateNumber &&
    alert("privateNumber variable missing in settings object");
  var privateNum = vars.privateNumber;
  null == vars.productSKU &&
    alert("productSKU variable missing in settings object");
  var strSKU = vars.productSKU;
  var strSKUArray = strSKU.toString().split("-");
  if (null == strSKUArray || 2 != strSKUArray.length) {
    return (
      alert(
        "Product SKU incorrectly entered in settings. Should looks like this: XXXX-SUL",
      ),
      false
    );
  }
  null == vars.helpText && (vars.helpText = "");
  null == vars.helpButtons && (vars.helpButtons = []);
  var isTimeLimited =
    vars.hasOwnProperty("isTimeLimited") && vars.isTimeLimited;
  var strHeader = strSKUArray[0];
  var betaSupportEmail = vars.hasOwnProperty("betaSupportEmail")
    ? vars.betaSupportEmail
    : "";
  var offerTrial = !vars.hasOwnProperty("offerTrial") || vars.offerTrial;
  var trialLengthDays = vars.hasOwnProperty("trialLengthDaysX")
    ? vars.trialLengthDaysX
    : Math.round(Math.sqrt(parseInt(bD("NTU3Ng==").substr(0, 2))));
  var betaMode = !!vars.hasOwnProperty("offerBeta") && vars.offerBeta;
  if (betaMode) {
    null == vars.betaStartDate &&
      alert("betaStartDate variable missing in settings object");
    var betaStartDate = vars.betaStartDate;
    null == vars.betaExpirationDate &&
      alert("betaExpirationDate variable missing in settings object");
    var betaExpirationDate = vars.betaExpirationDate;
  }
  var supportEmail =
    vars.hasOwnProperty("externalSupportURL") && "" != vars.externalSupportURL
      ? vars.externalSupportURL
      : "http://aescripts.com/contact";
  betaMode && "" != betaSupportEmail && (supportEmail = betaSupportEmail);
  var aescriptsSupportUrl = "https://aescripts.com/contact";
  var supportUrl =
    vars.hasOwnProperty("externalSupportURL") && "" != vars.externalSupportURL
      ? vars.externalSupportURL
      : aescriptsSupportUrl;
  var isAescriptsSupportUrl = supportUrl === aescriptsSupportUrl;
  isAescriptsSupportUrl &&
    (supportUrl = supportUrl.replace(/\/*/, "") + "/?direct=1&sku=");
  var aescriptsRetrieveUrl =
    "https://aescripts.com/downloadable/customer/products";
  var retrieveUrl =
    vars.hasOwnProperty("retrieveLicenseURL") && "" != vars.retrieveLicenseURL
      ? vars.retrieveLicenseURL
      : aescriptsRetrieveUrl;
  var exchangeUrl = "https://license.aescripts.com/exchange";
  var useLegacyPrefsHeader =
    !!vars.hasOwnProperty("useLegacyPrefsHeader") && vars.useLegacyPrefsHeader;
  var managerAppUrl =
    "https://aescripts.com/learn/aescripts-aeplugins-manager-app/";
  var remindMeLaterDays = 7;
  var doUpdateCheck =
    !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
  var updateCheckInterval = 5;
  var maxUIButtons = 3;
  var licV = 2;
  var wx = __BLOB__BLOB_000001__;
  var mx = __BLOB__BLOB_000002__;
  function JSONify(string, mode, prettyJSON) {
    if (typeof JSON !== "object") {
      JSON = {};
    }
    (function () {
      function f(n) {
        return n < 10 ? "0" + n : n;
      }
      function this_value() {
        return this.valueOf();
      }
      function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
          ? '"' +
              string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                  ? c
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
          : '"' + string + '"';
      }
      function str(key, holder) {
        var mind = gap;
        var value = holder[key];
        if (
          value &&
          typeof value === "object" &&
          typeof value.toJSON === "function"
        ) {
          value = value.toJSON(key);
        }
        if (typeof rep === "function") {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            return quote(value);
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
            return String(value);
          case "object":
            if (!value) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
              length = value.length;
              for (var i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || "null";
              }
              v =
                partial.length === 0
                  ? "[]"
                  : gap
                    ? "[\n" +
                      gap +
                      partial.join(",\n" + gap) +
                      "\n" +
                      mind +
                      "]"
                    : "[" + partial.join(",") + "]";
              gap = mind;
              return v;
            }
            if (rep && typeof rep === "object") {
              length = rep.length;
              for (var i = 0; i < length; i += 1) {
                if (typeof rep[i] === "string") {
                  k = rep[i];
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + gap ? ": " : ":" + v);
                  }
                }
              }
            } else {
              for (var k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + gap ? ": " : ":" + v);
                  }
                }
              }
            }
            v =
              partial.length === 0
                ? "{}"
                : gap
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                  : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
      }
      ("use strict");
      var rx_one = /^[\],:{}\s]*$/;
      var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
      var rx_three =
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
      var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
      var rx_escapable =
        /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var rx_dangerous =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                f(this.getUTCMonth() + 1) +
                "-" +
                f(this.getUTCDate()) +
                "T" +
                f(this.getUTCHours()) +
                ":" +
                f(this.getUTCMinutes()) +
                ":" +
                f(this.getUTCSeconds()) +
                "Z"
            : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
      }
      if (typeof JSON.stringify !== "function") {
        meta = {
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\",
        };
        JSON.stringify = function (value, replacer, space) {
          gap = "";
          indent = "";
          if (typeof space === "number") {
            for (var i = 0; i < space; i += 1) {
              indent += " ";
            }
          } else {
            if (typeof space === "string") {
              indent = space;
            }
          }
          rep = replacer;
          if (
            replacer &&
            typeof replacer !== "function" &&
            (typeof replacer !== "object" ||
              typeof replacer.length !== "number")
          ) {
            throw new Error("JSON.stringify");
          }
          return str("", { "": value });
        };
      }
    })();
    var jsonParse = (function () {
      function v(h, j, e) {
        return j ? u[j] : String.fromCharCode(parseInt(e, 16));
      }
      var r = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
      var k =
        '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
      k = '(?:"' + k + '*")';
      var s = new RegExp(
        "(?:false|true|null|[\\{\\}\\[\\]]|" + r + "|" + k + ")",
        "g",
      );
      var t = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
      var u = {
        '"': '"',
        "/": "/",
        "\\": "\\",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t",
      };
      var w = new String("");
      var x = Object.hasOwnProperty;
      return function (h, j) {
        h = h.match(s);
        var c = h[0];
        var l = false;
        if ("{" === c) {
          e = {};
        } else if ("[" === c) {
          e = [];
        } else {
          e = [];
          l = true;
        }
        for (b, d = [e], m = 1 - l, y = h.length; m < y; ++m) {
          c = h[m];
          switch (c.charCodeAt(0)) {
            default:
              a = d[0];
              a[b || a.length] = c;
              b = void 0;
              break;
            case 34:
              c = c.substring(1, c.length - 1);
              if (c.indexOf("\\") !== -1) {
                c = c.replace(t, v);
              }
              a = d[0];
              if (!b) {
                if (a instanceof Array) {
                  b = a.length;
                } else {
                  b = c || w;
                  break;
                }
              }
              a[b] = c;
              b = void 0;
              break;
            case 91:
              a = d[0];
              d.unshift((a[b || a.length] = []));
              b = void 0;
              break;
            case 93:
              d.shift();
              break;
            case 102:
              a = d[0];
              a[b || a.length] = false;
              b = void 0;
              break;
            case 110:
              a = d[0];
              a[b || a.length] = null;
              b = void 0;
              break;
            case 116:
              a = d[0];
              a[b || a.length] = true;
              b = void 0;
              break;
            case 123:
              a = d[0];
              d.unshift((a[b || a.length] = {}));
              b = void 0;
              break;
            case 125:
              d.shift();
              break;
          }
        }
        if (l) {
          if (d.length !== 1) {
            throw new Error();
          }
          e = e[0];
        } else {
          if (d.length) {
            throw new Error();
          }
        }
        if (j) {
          var p = function (n, o) {
            var f = n[o];
            if (f && typeof f === "object") {
              var i = null;
              for (var g in f) {
                if (x.call(f, g) && f !== n) {
                  var q = p(f, g);
                  if (q !== void 0) {
                    f[g] = q;
                  } else {
                    i || (i = []);
                    i.push(g);
                  }
                }
              }
              if (i) {
                for (g = i.length; --g >= 0; ) {
                  delete f[i[g]];
                }
              }
            }
            return j.call(n, o, f);
          };
          e = p({ "": e }, "");
        }
        return e;
      };
    })();
    try {
      switch (mode) {
        case "parse":
          if (
            /^[\],:{}\s]*$/.test(
              string
                .replace(/\\["\\\/bfnrtu]/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]",
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
            )
          ) {
            return jsonParse(string);
          } else {
            alert("JSON validation error\n" + string.substring(0, 1000));
          }
          break;
        case "stringify":
          return JSON.stringify(string, undefined, prettyJSON);
          break;
      }
    } catch (e) {
      alert(e.toString());
    }
  }
  $.locale = isAE() ? app.isoLanguage : $.locale;
  var locale = $.locale.split("_")[0];
  ("fr" == locale && "de" == locale && "es" == locale) || (locale = "en");
  var strTempCode = localize({
    de:
      "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um" +
      strScriptName +
      " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach zu:\n\n" +
      exchangeUrl +
      "\n\nWillst Du jetzt dorthin gehen?",
    en:
      "You entered a temporary serial number that needs to be exchanged for a permanent license.\n\nOnce you obtain your permanent license you can use it to register " +
      strScriptName +
      ".  It is quick and easy to exchange it, simply go to:\n\n" +
      exchangeUrl +
      "\n\nWould you like to go there now?",
    es:
      "Ha introducido un n\xfamero de serie provisional que necesita ser sustituido por una licencia permanente.\n\nUna vez obtenga una licencia permamente puede usarla para registrar " +
      strScriptName +
      ". Reemplazarla es r\xe1pido y sencillo, simplemente vaya a:\n\n" +
      exchangeUrl +
      "\n\n\xbfQuiere ir all\xed ahora?",
    fr:
      "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nUne fois votre licence permanente acquise, vous pouvez l\'utiliser pour vous enregistrer " +
      strScriptName +
      ".  Le changement est rapide et facile,  allez simplement \xe0:\n\n" +
      exchangeUrl +
      "\n\nVoulez-vous y aller maintenant?",
  });
  var strExpiredAlert = localize({
    de:
      "Die Testversion ist leider abgelaufen.\nDu kannst unter " +
      strTrialUrl +
      " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
    en:
      "Sorry, this trial version has expired. \nYou can purchase a license at " +
      strTrialUrl +
      "\n\nWould you like to go there now?",
    es:
      "Lo siento, esta versi\xf3n de prueba ha expirado.\nPuede obtener una licencia en" +
      strTrialUrl +
      "\n\n\xbfQuiere ir all\xed ahora?",
    fr:
      "D\xe9sol\xe9, la p\xe9riode d\'essai a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
      strTrialUrl +
      "\n\nVoulez-vous ouvrir cette page maintenant ?",
  });
  var strBetaExpiredAlert = localize({
    de: "Die Betaversion ist leider abgelaufen",
    en: "Sorry, this beta version has expired",
    es: "Lo siento est\xe1 versi\xf3n beta ha expirado",
    fr: "D\xe9sol\xe9, la p\xe9riode beta a expir\xe9",
  });
  var strBetaCodeAlert = localize({
    de:
      "Beta Lizenzcode erkannt f\xfcr " +
      strScriptName +
      "\nBeta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
    en:
      "Beta license code detected for " +
      strScriptName +
      "\nBeta license codes can only be used on beta versions, please obtain a normal license to use this version.",
    es:
      "Licencia beta detectada para " +
      strScriptName +
      "\nLas licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
    fr:
      "Licence beta d\xe9tect\xe9e pour " +
      strScriptName +
      "\nLes codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
  });
  var strBetaLicReq = localize({
    de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
    en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
    es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
    fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta de test.",
  });
  var strUsers = localize({
    de: "f\xfcr %u Nutzer",
    en: "for %u user",
    es: "para %u usuario",
    fr: "pour %u utilisateur",
  });
  var strRegSuccess = localize({
    de: "Registrierung erfolgreich " + strUsers,
    en: "Registration successful " + strUsers,
    es: "Registro completado " + strUsers,
    fr: "Enregistrement r\xe9ussi " + strUsers,
  });
  var strRegSuccess1 = localize({
    de: "Danke f\xfcr den Kauf von " + strScriptName,
    en: "Thank you for purchasing " + strScriptName,
    es: "Gracias por comprar " + strScriptName,
    fr: "Merci d\'avoir achet\xe9 " + strScriptName,
  });
  var strInvalidCode = localize({
    de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
    en: "Sorry, the license code is not valid",
    es: "Lo siento, la licencia no es v\xe1lida",
    fr: "D\xe9sol\xe9, ce num\xe9ro de licence n\'est pas valide.",
  });
  var strFirewall = localize({
    de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
    en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
    es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
    fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
  });
  var strContactSupport = localize({
    de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + supportEmail,
    en: "If you require assistance please contact " + supportEmail,
    es: "Si necesita ayuda, por favor contacte " + supportEmail,
    fr: "Si vous avez besoin d\'aide, merci de contacter " + supportEmail,
  });
  var strCorruptedCode = localize({
    de:
      "Entschuldigung, irgendetwas ist mit dem " +
      strScriptName +
      " Lizenzcode passiert. Bitte gebe ihn erneut ein.\n\n" +
      strContactSupport,
    en:
      "Sorry, something must have happened to the " +
      strScriptName +
      " license code.  Please re-enter it at the prompt.\n" +
      strContactSupport,
    es:
      "Lo siento, algo ha ocurrido con la licencia de " +
      strScriptName +
      ". Por favor, vuelva a introducirla en la casilla.\n" +
      strContactSupport,
    fr:
      "D\xe9sol\xe9, il y a eu un probl\xe8me avec le num\xe9ro de licence pour " +
      strScriptName +
      ". Merci de bien vouloir le saisir \xe0 nouveau.n\n" +
      strContactSupport,
  });
  var strTrialThanks = localize({
    de: "Danke, dass Du " + strScriptName + " ausprobierst!",
    en: "Thanks for trying " + strScriptName + "!",
    es: "\xa1Gracias por probar " + strScriptName + "!",
    fr: "Merci d\'avoir essay\xe9 " + strScriptName + "!",
  });
  var strTrialTxt = localize({
    de: "Testversion - noch %E Tage g\xfcltig",
    en: "Trial version - %E days left",
    es: "Versi\xf3n de prueba - faltan %E d\xedas",
    fr: "Version d\'\xe9valuation - %E jour(s) restant",
  });
  var strTrialTxt2 = localize({
    de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
    en: "%E launches left in the trial",
    es: "%E usos restantes de la versi\xf3n de prueba",
    fr: "Il vous reste %E essais",
  });
  var strTrialWelcomeHeader = localize({
    de: "Willkommen bei " + strScriptName,
    en: "Welcome to " + strScriptName,
    es: "Bienvenido a " + strScriptName,
    fr: "Bienvenue sur " + strScriptName,
  });
  var strOK = localize({ de: "OK", en: "OK", es: "OK", fr: "OK" });
  var strCancel = localize({
    de: "Abbrechen",
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
  });
  var strGetSupport = localize({
    de: "Support zu erhalten",
    en: "Get support",
    es: "Obtener apoyo",
    fr: "Contacter le support client",
  });
  var strRetrieveLic = localize({
    de: "%t vergessen?",
    en: "Retrieve %t",
    es: "Recuperar %t",
    fr: "Retrouver votre %t",
  });
  var strBuyLic = localize({
    de: "%t Kaufen",
    en: "Buy %t",
    es: "Compra %t",
    fr: "Acheter une %t",
  });
  var strLicense = localize({
    de: "Lizenz",
    en: "License",
    es: "licencia",
    fr: "Licence",
  });
  var strDownloads = localize({
    de: "Download",
    en: "Download",
    es: "Descarga",
    fr: "T\xe9l\xe9chargement",
  });
  var strPpcNotSupported = localize({
    de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
    en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
    es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
    fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
  });
  var strAllowScriptsPrefsSection =
    parseFloat(app.version) < 16.1
      ? localize({
          de: "Allgemein",
          en: "General",
          es: "General",
          fr: "G\xe9n\xe9ral",
        })
      : localize({
          de: "Skripterstellung und Expression",
          en: "Scripting & Expressions",
          es: "Escripts y expresi\xf3nes",
          fr: "Scripts et expressions",
        });
  var strErrScriptAccess = localize({
    de:
      strScriptName +
      ' ben\xf6tigt die Erlaubnis Dateien zu schreiben\n Gehe in Voreinstellungen von After Effects in die Rubrik "' +
      strAllowScriptsPrefsSection +
      '" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
    en:
      strScriptName +
      ' requires access to write files\nGo to the "' +
      strAllowScriptsPrefsSection +
      '" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
    es:
      strScriptName +
      ' necesita poder escribir archivos\nVaya al panel "' +
      strAllowScriptsPrefsSection +
      '" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
    fr:
      strScriptName +
      " n\xe9cessite les droits d\'\xe9criture de fichiers\nAllez dans le panneau \"" +
      strAllowScriptsPrefsSection +
      '" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
  });
  var strUpdateLicenseHeader = localize({
    de: strScriptName + " Lizenz-Update ben\xf6tigt",
    en: strScriptName + " License Update Required",
    es: strScriptName + " necesita actualizar la licencia",
    fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
  });
  var strLicenseDownloadOptions = localize({
    de: 'Alle Deine %t findest Du unter "My Downloads & Licenses" in Deinem aescripts.com Benutzer-Account, oder \xfcber unsere Manager-App.',
    en: 'All your %t are in the "My Downloads & Licenses" section of your aescripts.com user account, or via our Manager App.',
    es: 'Todas sus %t est\xe1n en la secci\xf3n "My Downloads & Licenses" de su cuenta de usuario en aescripts.com, o a trav\xe9s de nuestra App Manager.',
    fr: 'Toutes vos %t se trouvent dans la section "My Downloads & Licenses" de votre compte utilisateur sur aescripts.com, ou via notre App Manager.',
  });
  var strMyDownloads = localize({
    de: "Gehen Sie zu My Downloads & Licenses",
    en: "Go to My Downloads & Licenses",
    es: "Ir a My Downloads & Licenses",
    fr: "Aller \xe0 My Downloads & Licenses",
  });
  var strDownloadManager = localize({
    de: "Laden Sie die Manager-App herunter",
    en: "Download Manager App",
    es: "Descargar App Manager",
    fr: "T\xe9l\xe9charger App Manager",
  });
  var strOldLicenseFormat = localize({
    de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
    en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
    es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
    fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
  });
  var strNewLicenseFormat = localize({
    de: "Die Lizenz sollte so aussehen:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
    en: "License should look like this:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
    es: "La licencia debe tener este aspecto:\n\nPRODUCTID*NOMBRE*APELLIDO*1111111SUL1",
    fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPRODUCTID*PRENOM*NOM*1111111SUL1",
  });
  var strRegistration = localize({
    de: "Registriert f\xfcr: ",
    en: "Registered to: ",
    es: "Registrado a: ",
    fr: "Enregistr\xe9 pour: ",
  });
  var strUnknownError = localize({
    de:
      "Es gab einen unerwarteten Fehler\nBitte \xf6ffne hier ein Support-Ticket:\n" +
      supportEmail +
      "\n\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
    en:
      "There was an unexpected error\nPlease please open a support ticket here:\n" +
      supportEmail +
      "\n\nand submit screenshot of this error message\n\n",
    es:
      "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
      supportEmail +
      "\n\ny presente una captura de pantalla con este mensaje de error\n\n",
    fr:
      "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
      supportEmail +
      "\n\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
  });
  var strWrongProduct = localize({
    de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
    en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
    es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
    fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
  });
  var strNewVersionAvailableHdr = localize({
    de: strScriptName + " Update verf\xfcgbar",
    en: strScriptName + " Update Available",
    es: strScriptName + " Actualizaci\xf3n disponible",
    fr: strScriptName + " Mise \xe0 jour disponible",
  });
  var strNewVersionAvailable = localize({
    de: "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: v%\n",
    en: "A newer version of " + strScriptName + " is available: %v\n",
    es:
      "Una versi\xf3n nueva de " + strScriptName + " est\xe1 disponible: v%\n",
    fr: "Une version plus de " + strScriptName + " est disponible: v%\n",
  });
  var strCurrentVersion = localize({
    de: "Votre version install\xe9e est: v%",
    en: "Your installed version is: %v",
    es: "Su versi\xf3n instalada es: v%",
    fr: "Votre version install\xe9e est: v%",
  });
  var strDownload = localize({
    de: "Download",
    en: "Download",
    es: "Descargar",
    fr: "T\xe9l\xe9charger",
  });
  var strVersion = localize({
    de: "Version",
    en: "version",
    es: "versi\xf3n",
    fr: "version",
  });
  var strSkipVersion = localize({
    de: "Diese Version \xdcberspringen",
    en: "Skip this Version",
    es: "Salta esta versi\xf3n",
    fr: "Ignorer cette version",
  });
  var strRemindMeLater = localize({
    de: "Erinnere mich sp\xe4ter",
    en: "Remind Me Later",
    es: "Recu\xe9rdame m\xe1s tarde",
    fr: "Rappelle-moi plus tard",
  });
  var strNewestVersionAvailable = localize({
    de: "Neueste verf\xfcgbare Version",
    en: "Newest available version",
    es: "Versi\xf3n mas nueva disponible",
    fr: "Nouvelle version disponible",
  });
  var strVersionRev = localize({
    de: "v%a%b - %c",
    en: "v%a%b - %c",
    es: "v%a%b - %c",
    fr: "v%a%b - %c",
  });
  var strDeactivate = localize({
    de: "Lizenz Deaktivieren",
    en: "Deactivate License",
    es: "Desactivar Licencia",
    fr: "D\xe9sactiver la licence",
  });
  var strVersionCheck = localize({
    de: "Automatisch nach Aktualisierungen suchen",
    en: "Check for updates automatically",
    es: "Revisar actualizaciones automaticamente",
    fr: "V\xe9rifier les mises \xe0 jour automatiquement",
  });
  var strCheckNow = localize({
    de: "Jetzt nach Update suchenn",
    en: "Check for update now",
    es: "Buscar actualizaci\xf3n ahora",
    fr: "V\xe9rifier les mise \xe0 jour maintenant",
  });
  var strUpdateCheckError = localize({
    de: "Bei der Suche nach Updates ist ein Fehler aufgetreten.\nBitte vergewissern Sie sich, dass Sie \xfcber eine g\xfcltige Internetverbindung verf\xfcgen und diese nicht durch Firewalls blockiert wird.",
    en: "There was an error when checking for updates.\nPlease verify that you have a valid internet connection and that it is not blocked by any firewalls.",
    es: "Hubo un error en la comprobaci\xf3n de actualizaciones.\nPor favor compruebe que tiene una conexi\xf3n a Internet v\xe1lida y que no est\xe9 bloqueada por un cortafuegos.",
    fr: "Une erreur s\'est produite lors de la recherche de mises \xe0 jour.\nV\xe9rifiez que votre connexion Internet est valide et qu\'elle n\'est bloqu\xe9e par aucun pare-feu.",
  });
  var strUpToDate = localize({
    de:
      "Sie sind auf dem neuesten Stand! \n" +
      strScriptName +
      " " +
      strVersion +
      " " +
      strScriptVersion +
      " ist derzeit die neueste Version verf\xfcgbar.",
    en:
      "You are up to date!\n" +
      strScriptName +
      " " +
      strVersion +
      " " +
      strScriptVersion +
      " is currently the latest version available.",
    es:
      "\xa1Est\xe1 actualizado! \n" +
      strScriptName +
      " " +
      strVersion +
      " " +
      strScriptVersion +
      " es actualmente la \xfaltima versi\xf3n disponible.",
    fr:
      "Vous \xeates \xe0 jour!\n" +
      strScriptName +
      " " +
      strVersion +
      " " +
      strScriptVersion +
      " est actuellement la derni\xe8re version disponible.",
  });
  var strInvalidLicense = localize({
    de: "Ung\xfcltige Lizenz",
    en: "Invalid license",
    es: "La licencia no es v\xe1lida",
    fr: "Licence non valide",
  });
  var strLicenseRemoved = localize({
    de: "Lizenz entfernt",
    en: "License removed",
    es: "Licencia eliminada",
    fr: "Licence supprim\xe9e",
  });
  var strLicense = localize({
    de: "Lizenz",
    en: "License",
    es: "Licencia",
    fr: "Licence",
  });
  var strBTA = localize({
    de: "Beta-Lizenz",
    en: "Beta License",
    es: "Licencia Beta",
    fr: "Licence Beta",
  });
  var strEDU = localize({
    de: "EDU-Lizenz",
    en: "Educational License",
    es: "Licencia Educacional",
    fr: "T\xe9l\xe9charger",
  });
  var strFLT = localize({
    de: "Floating-Lizenz",
    en: "Floating License",
    es: "Licencia flotante",
    fr: "Licence flottante",
  });
  var strUNKNOWN = localize({
    de: "License mit unbekanntem Typ",
    en: "License of unknown type",
    es: "Licencia de tipo desconocido",
    fr: "Licence inconnue",
  });
  var strTrialExpired = localize({
    de: "Testversion abgelaufen",
    en: "MONTER GROUP\xa9",
    es: "Termino de prueba expirado",
    fr: "\xc9valuation termin\xe9e",
  });
  var licErrors = {
    de: {
      "-1": { detail: "", title: "Ung\xfcltige Lizenz (-1)" },
      "-10": {
        detail: "Auf dem Lizenzserver sind alle Lizenzen bereits vergeben",
        title: "Keine freien Slots (-10)",
      },
      "-100": {
        detail:
          "Eine Lizenz kann \xfcber den Button \'Lizenz Kaufen\' erworben werden",
        title: "Testversion abgelaufen",
      },
      "-101": {
        detail:
          "Bitte konfigurieren oder deaktivieren Sie alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
        title: "Zugriff blockiert (-101)",
      },
      "-102": {
        detail:
          "Bitte kontaktieren Sie den Support und senden Sie einen Screenshot dieses Fehlers. " +
          supportEmail,
        title: "Kein Ergebnis (-102)",
      },
      "-103": {
        detail: "Could not find the number of trial days",
        title: "Anzahl der Test-Tage nicht festgelegt (-103)",
      },
      "-104": {
        detail: "Die Lizenz ist nicht f\xfcr dieses Produkt",
        title: "Ung\xfcltige Lizenz (-104)",
      },
      "-105": {
        detail:
          "Eine Beta-Lizenz kann f\xfcr diese Vollversion nicht verwendet werden",
        title: "Beta-Lizenz nicht verwendbar (-105)",
      },
      "-106": {
        detail:
          "Dieses Produkt beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
        title: "Bitte Lizenz installieren (-106)",
      },
      "-107": {
        detail:
          "Diese Beta beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
        title: "Bitte Lizenz installieren (-107)",
      },
      "-108": {
        detail:
          "Bitte konfigurieren oder deaktivieren Sie alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
        title: "Nicht in der Lage, auf den Home-Ordner zuzugreifen (-108)",
      },
      "-11": {
        detail: "Die Lizenz kann auf dem Lizenzserver nicht gefunden werden",
        title: "Unbekannte Lizenz (-11)",
      },
      "-12": {
        detail:
          "Die Lizenz konnte nicht deaktiviert werden, da sie dem Server unbekannt ist",
        title: "Unbekannte Lizenz (-12)",
      },
      "-13": {
        detail:
          "Die IP-Adresse dieses Rechners ist \xfcber eine Blacklist auf dem Lizenzserver gesperrt",
        title: "Klient ist auf Blacklist (-13)",
      },
      "-14": {
        detail: "Konnte keine Netzwerkkarte finden",
        title: "Keine Netzwerkkarte (-14)",
      },
      "-2": { detail: "", title: "Ung\xfcltige Lizenz (-2)" },
      "-20": {
        detail: "Lizenzlaufzeit beginnt am ",
        title: "Lizenzlaufzeit hat noch nicht begonnen (-20)",
      },
      "-21": {
        detail: "Lizenzlaufzeit endete am ",
        title: "Lizenzlaufzeit ist abgelaufen (-21)",
      },
      "-22": {
        detail:
          "Weitere Informationen zum Einrichten und Lizenzieren von Client-Computern finden Sie in den Anweisungen zum Server.",
        title:
          "Floating-Lizenzen k\xf6nnen nur mit dem Floating License Server verwendet werden (-22)",
      },
      "-3": { detail: "", title: "Lizenzdatei nicht gefunden (-3)" },
      "-4": { detail: "", title: "Lizenzdatei besch\xe4digt (-4)" },
      "-5": { detail: "", title: "Generischer Fehler (-5)" },
      "-6": { detail: "", title: "Ung\xfcltiger Produktname (-6)" },
      "-7": { detail: "", title: "Testversion (-7)" },
      "-8": { detail: "", title: "Ung\xfcltige Lizenz (-8)" },
      "-9": {
        detail:
          "Bitte stellen Sie sicher, dass der Lizenzserver ordnungsgem\xe4\xdf arbeitet",
        title: "Kann Server nicht kontaktieren (-9)",
      },
      "-99": { detail: "", title: "Unbekannter Fehler (-99)" },
      unknown: { detail: "", title: "Unbekannter Fehler (0)" },
    },
    en: {
      "-1": { detail: "", title: "Invalid license (-1)" },
      "-10": {
        detail: "There are no more free slots on the license server",
        title: "No free slots (-10)",
      },
      "-100": {
        detail:
          "You can purchase a license by clicking the button \'Buy License\'",
        title: "MONTER GROUP\xa9",
      },
      "-101": {
        detail:
          "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
        title: "Access Blocked(-101)",
      },
      "-102": {
        detail:
          "Please contact support " +
          supportEmail +
          " and send a screenshot of this error.\n\n",
        title: "No result code (-102)",
      },
      "-103": {
        detail: "Could not find the number of trial days",
        title: "No trial days found (-103)",
      },
      "-104": {
        detail: "The license is not for this product",
        title: "License mismatch (-104)",
      },
      "-105": {
        detail: "A beta license cannot be used for the full version",
        title: "Cannot use beta license (-105)",
      },
      "-106": {
        detail: "This product does not offer a trial and requires a license",
        title: "Please install a license (-106)",
      },
      "-107": {
        detail:
          "The beta version does not offer a trial and requires a license",
        title: "Please install a license (-107)",
      },
      "-108": {
        detail:
          "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
        title: "Not able to access home folder (-108)",
      },
      "-11": {
        detail: "The license cannot be found on the license server",
        title: "Unknown license (-11)",
      },
      "-12": {
        detail:
          "The license you are trying to deactivate is not found on the license server",
        title: "Unknown license (-12)",
      },
      "-13": {
        detail: "Your client IP is blacklisted on the license server",
        title: "Client blacklisted (-13)",
      },
      "-14": {
        detail: "Could not find a network adapter",
        title: "No network adapter (-14)",
      },
      "-2": { detail: "", title: "Invalid license (-2)" },
      "-20": {
        detail: "License period starts on ",
        title: "License period has not started yet (-20)",
      },
      "-21": {
        detail: "License period ended on ",
        title: "License period has ended (-21)",
      },
      "-22": {
        detail:
          "Please refer to the server instructions on how to setup and license client machines.",
        title:
          "Floating licenses can only be used with the Floating License Server (-22)",
      },
      "-3": { detail: "", title: "License file not found (-3)" },
      "-4": { detail: "", title: "License file corrupted (-4)" },
      "-5": { detail: "", title: "Generic error (-5)" },
      "-6": { detail: "", title: "Invalid product name (-6)" },
      "-7": { detail: "", title: "Trial (-7)" },
      "-8": { detail: "", title: "Invalid license (-8)" },
      "-9": {
        detail: "Please make sure the license server is running properly",
        title: "Cannot connect to server (-9)",
      },
      "-99": { detail: "", title: "Unknown error (-99)" },
      unknown: { detail: "", title: "Unknown error (0)" },
    },
    es: {
      "-1": { detail: "", title: "La licencia no es v\xe1lida (-1)" },
      "-10": {
        detail: "No hay m\xe1s espacios libres en el servidor de licencias",
        title: "No hay espacios libres (-10)",
      },
      "-100": {
        detail:
          "Puede adquirir una licencia haciendo clic en el bot\xf3n \'Comprar Licencia\'",
        title: "Esta versi\xf3n de prueba se ha expirado",
      },
      "-101": {
        detail:
          "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
        title: "Acceso bloqueado (-101)",
      },
      "-102": {
        detail:
          "Por favor, p\xf3ngase en contacto con soporte y env\xede una captura de pantalla de este error. " +
          supportEmail,
        title: "No hay c\xf3digo de resultado (-102)",
      },
      "-103": {
        detail: "No se pudo encontrar el n\xfamero de d\xedas de prueba",
        title: "No se encontraron d\xedas de prueba (-103)",
      },
      "-104": {
        detail: "La licencia no es para este producto",
        title: "La licencia no es la correcta (-104)",
      },
      "-105": {
        detail:
          "No se puede utilizar una licencia \'beta\' con esta versi\xf3n",
        title: "No se puede usar licencia beta (-105)",
      },
      "-106": {
        detail:
          "Este producto no ofrece una version de prueba y requiere una licencia",
        title: "Por favor, instale una licencia (-106)",
      },
      "-107": {
        detail:
          "La versi\xf3n beta no ofrece una versi\xf3n de prueba y requiere una licencia",
        title: "Por favor, instale una licencia (-107)",
      },
      "-108": {
        detail:
          "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
        title: "No se puede acceder a la carpeta de inicio (-108)",
      },
      "-11": {
        detail:
          "No se puede encontrar esta licencia en el servidor de licencias",
        title: "Licencia desconocida (-11)",
      },
      "-12": {
        detail:
          "La licencia que est\xe1 intentando de desactivar no se encuentra en el servidor de licencias",
        title: "Licencia desconocida (-12)",
      },
      "-13": {
        detail: "Su IP est\xe1 en la lista negra del servidor de licencias",
        title: "IP en la lista negra (-13)",
      },
      "-14": {
        detail: "No se pudo encontrar un adaptador de red",
        title: "No hay adaptador de red (-14)",
      },
      "-2": { detail: "", title: "La licencia no es v\xe1lida (-2)" },
      "-20": {
        detail: "El per\xedodo de licencia comienza en ",
        title: "El periodo de licencia no ha comenzado (-20)",
      },
      "-21": {
        detail: "El per\xedodo de licencia termin\xf3 en ",
        title: "El per\xedodo de licencia ha terminado (-21)",
      },
      "-22": {
        detail:
          "Consulte las instrucciones del servidor sobre c\xf3mo configurar y licenciar las m\xe1quinas cliente.",
        title:
          "Las licencias flotantes solo se pueden utilizar con el Servidor de licencias flotantes (-22)",
      },
      "-3": {
        detail: "",
        title: "No se encontr\xf3 el archivo de licencia (-3)",
      },
      "-4": { detail: "", title: "El archivo de licencia esta da\xf1ado (-4)" },
      "-5": { detail: "", title: "Error generico (-5)" },
      "-6": { detail: "", title: "El nombre de el producto no v\xe1lido (-6)" },
      "-7": { detail: "", title: "Versi\xf3n de prueba (-7)" },
      "-8": { detail: "", title: "La licencia no es v\xe1lida (-8)" },
      "-9": {
        detail:
          "Aseg\xfarese de que el servidor de licencias est\xe1 funcionando correctamente",
        title: "No es posible conectar con el servidor (-9)",
      },
      "-99": { detail: "", title: "Error desconocido (-99)" },
      unknown: { detail: "", title: "Error desconocido (0)" },
    },
    fr: {
      "-1": { detail: "", title: "Licence non valide (-1)" },
      "-10": {
        detail: "Il n\'y a plus de place sur le serveur de licence",
        title: "Plus de place (-10)",
      },
      "-100": {
        detail:
          "Vous pouvez acqu\xe9rir une licence en cliquant sur le bouton \'Acheter une Licence\' ci-dessous",
        title: "P\xe9riode d\'\xe9valuation expir\xe9e",
      },
      "-101": {
        detail:
          "Veuillez configurer ou d\xe9sactiver tous les firewall ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de d\xe9part. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
        title: "Acc\xe8s bloqu\xe9 (-101)",
      },
      "-102": {
        detail:
          "S\'il vous pla\xeet contacter le support et envoyer une capture d\'\xe9cran de cette erreur. " +
          supportEmail,
        title: "Pas de code de r\xe9sultat (-102)",
      },
      "-103": {
        detail:
          "Echec d\'identification du nombre de jour de p\xe9riode d\'essai disponible",
        title: "Impossible de trouver des jours d\'essai (-103)",
      },
      "-104": {
        detail: "Cette licence n\'est pas valable pour ce produit",
        title: "Mauvaise licence (-104)",
      },
      "-105": {
        detail:
          "Une licence de version Beta ne peut \xeatre utilis\xe9e pour le produit final",
        title: "Licence Beta invalide (-105)",
      },
      "-106": {
        detail:
          "Ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
        title: "Licence n\xe9cessaire (-106)",
      },
      "-107": {
        detail:
          "La version Beta de ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
        title: "Licence n\xe9cessaire (-107)",
      },
      "-108": {
        detail:
          "Veuillez configurer ou d\xe9sactiver tous les firewall ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de d\xe9part. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
        title: "Impossible d\'acc\xe9der au dossier de d\xe9part (-108)",
      },
      "-11": {
        detail: "La licence est introuvable sur le serveur",
        title: "Licence inconnue (-11)",
      },
      "-12": {
        detail:
          "La licence que vous essayez de d\xe9sactiver est introuvable sur le serveur",
        title: "Licence inconnue (-12)",
      },
      "-13": {
        detail:
          "L\'adresse ip de votre client est bannie du serveur de licence",
        title: "Client sur liste noire (-13)",
      },
      "-14": {
        detail: "Impossible de trouver une carte r\xe9seau",
        title: "Pas de carte r\xe9seau (-14)",
      },
      "-2": { detail: "", title: "Licence non valide (-2)" },
      "-20": {
        detail: "La p\xe9riode de licence commence ",
        title: "La p\xe9riode de licence n\'a pas encore commenc\xe9 (-20)",
      },
      "-21": {
        detail: "La p\xe9riode de licence s\'est termin\xe9e le ",
        title: "La p\xe9riode de licence est termin\xe9e (-21)",
      },
      "-22": {
        detail:
          "Veuillez vous reporter aux instructions du serveur pour savoir comment configurer et attribuer une licence aux ordinateurs clients.",
        title:
          "Les licences flottantes ne peuvent \xeatre utilis\xe9es qu\'avec le serveur de licences flottantes (-22)",
      },
      "-3": { detail: "", title: "Fichier de licence introuvable (-3)" },
      "-4": { detail: "", title: "Fichier de licence corrompu (-4)" },
      "-5": { detail: "", title: "Erreur g\xe9n\xe9rique (-5)" },
      "-6": { detail: "", title: "Nom de produit invalide (-6)" },
      "-7": { detail: "", title: "P\xe9riode d\'\xe9valuation (-7)" },
      "-8": { detail: "", title: "Licence non valide (-8)" },
      "-9": {
        detail: "Verifiez que le serveur de licence fonctionne correctement",
        title: "Impossible de se connecter au serveur (-9)",
      },
      "-99": { detail: "", title: "Erreur inconnue (-99)" },
      unknown: { detail: "", title: "Erreur inconnue (0)" },
    },
  };
  var prefsSectionName = vars.hasOwnProperty("legacyPrefsGroup")
    ? vars.legacyPrefsGroup
    : "aescripts";
  var prefsName = useLegacyPrefsHeader
    ? strScriptName
    : strHeader + "_Registration";
  var prefsVersionName = strHeader + "_Version";
  var prefsLicVersion = strHeader + "_LicVersion";
  var prefsVersionCheckInit = strHeader + "_VersionCheckInit";
  var prefsLastVersionChecked = strHeader + "_LastVersionChecked";
  var prefsLastServerVersionChecked = strHeader + "_LastServerVersionChecked";
  var prefsLastTimeVersionChecked = strHeader + "_LastTimeVersionChecked";
  var prefsNextTimeVersionChecked = strHeader + "_NextTimeVersionChecked";
  var prefsNextTimeVersionCheckedSkipVersion =
    strHeader + "_NextTimeVersionCheckedSkipVersion";
  var prefsDoUpdateCheck = strHeader + "_doUpdateCheck";
  haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
    (doUpdateCheck = !(
      "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
    ));
  ScriptUI.environment.keyboardState.shiftKey &&
    ScriptUI.environment.keyboardState.altKey &&
    !ScriptUI.environment.keyboardState.ctrlKey &&
    !ScriptUI.environment.keyboardState.metaKey &&
    ((doUpdateCheck = false),
    saveSettings(prefsSectionName, prefsDoUpdateCheck, false),
    alert("New version update checks disabled"));
  saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
  saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
  cmdKey = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
  var strEnterLicenseCode = localize({
    de: "Bitte gebe den Lizenzcode ein.",
    en: "Please enter the license code.",
    es: "Por favor, introduzca el c\xf3digo de licencia.",
    fr: "Veuillez entrer votre num\xe9ro de licence.",
  });
  var strPasteHelp = localize({
    de:
      "(Wenn das Einf\xfcgen mit " +
      cmdKey +
      "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen.)",
    en:
      "(If pasting the code with " + cmdKey + "+V doesn\'t work try " + 10 <=
      parseFloat(app.version)
        ? "Right-Click and Paste)"
        : "Edit->Paste)",
    es:
      "(Si pegar la licencia usando " +
        cmdKey +
        "+V no funciona, pruebe " +
        10 <=
      parseFloat(app.version)
        ? "Clic derecho y pegar)"
        : "Edici\xf3n->Pegar)",
    fr:
      "(Si vous ne parvenez pas \xe0 coller le code avec " +
        cmdKey +
        "+V essayez " +
        10 <=
      parseFloat(app.version)
        ? "Clique droit et Coller)"
        : "Edition->Coller)",
  });
  var strTrialInstructMsg = localize({
    de: 'Um die Testversion zu starten, gebe "trial" ein.',
    en: "To run in trial mode type: trial",
    es: "Para ejecutar el modo Trial, escriba: trial",
    fr: "Pour lancer la version de d\xe9monstration, tapez : trial",
  });
  var strOr = localize({ de: "oder", en: "or", es: "o", fr: "ou" });
  var strServerInstructMsg = localize({
    de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE",
    en: "Activate a license from the server with @REMOTE",
    es: "Activar una licencia del servidor con @REMOTE",
    fr: "Activer une licence du serveur avec @REMOTE",
  });
  var strServerNotRunning = localize({
    de: "Der Client ist konfiguriert, aber der Floating License Server l\xe4uft nicht oder ist nicht erreichbar.",
    en: "Client configured but floating license server is either not running or not accessible.",
    es: "Cliente configurado pero servidor de licencias flotantes o no est\xe1 ejecutado o no es accesible.",
    fr: "Client configur\xe9 mais le serveur de licence flottante est soit en cours d\'ex\xe9cution ou ne pas accessible.",
  });
  var prefHeader = "Initialization Fragments";
  var prefSection1 = (
    string_encode(
      Math.floor(parseFloat(app.version))
        .toString()
        .charAt(
          Math.max(
            0,
            Math.floor(parseFloat(app.version)).toString().length - 1,
          ),
        ) +
        strScriptName.substring(
          Math.max(0, strScriptName.length - 15),
          strScriptName.length,
        ) +
        strScriptVersion,
    ) *
    0.457 *
    privateNum
  ).toString(36);
  var prefSection2 = (
    string_encode(
      Math.floor(parseFloat(app.version))
        .toString()
        .charAt(
          Math.max(
            0,
            Math.floor(parseFloat(app.version)).toString().length - 1,
          ),
        ) +
        strScriptName.substring(
          Math.max(0, strScriptName.length - 15),
          strScriptName.length,
        ) +
        strScriptVersion,
    ) *
    (privateNum / 3.981)
  ).toString(36);
  var prefsLocation = Folder.userData.fsName + "/Aescripts/";
  var prefsPrefix = "pref_";
  isAE() || Folder(prefsLocation).exists || Folder(prefsLocation).create();
  var sanitizedName = sanitizeProductName(strScriptName);
  this.getSetting = function (e, t) {
    return getSettings((e = strHeader + "_" + e), t, "settings");
  };
  this.readJSON = function (e) {
    return readJSON(e);
  };
  this.writeJSON = function (e, t) {
    return writeJSON(e, t);
  };
  this.JSONify = function (e, t, i) {
    return JSONify(e, t, i);
  };
  this.haveSetting = function (e, t) {
    return haveSettings((e = strHeader + "_" + e), t, "settings");
  };
  this.saveSetting = function (e, t, i) {
    return saveSettings((e = strHeader + "_" + e), t, i, "settings");
  };
  function compareVersions(a, b) {
    if (a === b) {
      return 0;
    }
    var a_components = a.toString().split(".");
    var b_components = b.toString().split(".");
    if (a_components.length <= 2 && b_components.length <= 2) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
    } else {
      var len = Math.min(a_components.length, b_components.length);
      for (var i = 0; i < len; i += 1) {
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
          return 1;
        }
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
          return -1;
        }
      }
      if (a_components.length > b_components.length) {
        return 1;
      }
      if (a_components.length < b_components.length) {
        return -1;
      }
      return 0;
    }
  }
  function JSONify(string, mode, prettyJSON) {
    if (typeof JSON !== "object") {
      JSON = {};
    }
    (function () {
      function f(n) {
        return n < 10 ? "0" + n : n;
      }
      function this_value() {
        return this.valueOf();
      }
      function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
          ? '"' +
              string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                  ? c
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
          : '"' + string + '"';
      }
      function str(key, holder) {
        var mind = gap;
        var value = holder[key];
        if (
          value &&
          typeof value === "object" &&
          typeof value.toJSON === "function"
        ) {
          value = value.toJSON(key);
        }
        if (typeof rep === "function") {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            return quote(value);
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
            return String(value);
          case "object":
            if (!value) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
              length = value.length;
              for (var i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || "null";
              }
              v =
                partial.length === 0
                  ? "[]"
                  : gap
                    ? "[\n" +
                      gap +
                      partial.join(",\n" + gap) +
                      "\n" +
                      mind +
                      "]"
                    : "[" + partial.join(",") + "]";
              gap = mind;
              return v;
            }
            if (rep && typeof rep === "object") {
              length = rep.length;
              for (var i = 0; i < length; i += 1) {
                if (typeof rep[i] === "string") {
                  k = rep[i];
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + gap ? ": " : ":" + v);
                  }
                }
              }
            } else {
              for (var k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + gap ? ": " : ":" + v);
                  }
                }
              }
            }
            v =
              partial.length === 0
                ? "{}"
                : gap
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                  : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
      }
      ("use strict");
      var rx_one = /^[\],:{}\s]*$/;
      var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
      var rx_three =
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
      var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
      var rx_escapable =
        /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var rx_dangerous =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                f(this.getUTCMonth() + 1) +
                "-" +
                f(this.getUTCDate()) +
                "T" +
                f(this.getUTCHours()) +
                ":" +
                f(this.getUTCMinutes()) +
                ":" +
                f(this.getUTCSeconds()) +
                "Z"
            : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
      }
      if (typeof JSON.stringify !== "function") {
        meta = {
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\",
        };
        JSON.stringify = function (value, replacer, space) {
          gap = "";
          indent = "";
          if (typeof space === "number") {
            for (var i = 0; i < space; i += 1) {
              indent += " ";
            }
          } else {
            if (typeof space === "string") {
              indent = space;
            }
          }
          rep = replacer;
          if (
            replacer &&
            typeof replacer !== "function" &&
            (typeof replacer !== "object" ||
              typeof replacer.length !== "number")
          ) {
            throw new Error("JSON.stringify");
          }
          return str("", { "": value });
        };
      }
    })();
    var jsonParse = (function () {
      function v(h, j, e) {
        return j ? u[j] : String.fromCharCode(parseInt(e, 16));
      }
      var r = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
      var k =
        '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
      k = '(?:"' + k + '*")';
      var s = new RegExp(
        "(?:false|true|null|[\\{\\}\\[\\]]|" + r + "|" + k + ")",
        "g",
      );
      var t = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
      var u = {
        '"': '"',
        "/": "/",
        "\\": "\\",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t",
      };
      var w = new String("");
      var x = Object.hasOwnProperty;
      return function (h, j) {
        h = h.match(s);
        var c = h[0];
        var l = false;
        if ("{" === c) {
          e = {};
        } else if ("[" === c) {
          e = [];
        } else {
          e = [];
          l = true;
        }
        for (b, d = [e], m = 1 - l, y = h.length; m < y; ++m) {
          c = h[m];
          switch (c.charCodeAt(0)) {
            default:
              a = d[0];
              a[b || a.length] = c;
              b = void 0;
              break;
            case 34:
              c = c.substring(1, c.length - 1);
              if (c.indexOf("\\") !== -1) {
                c = c.replace(t, v);
              }
              a = d[0];
              if (!b) {
                if (a instanceof Array) {
                  b = a.length;
                } else {
                  b = c || w;
                  break;
                }
              }
              a[b] = c;
              b = void 0;
              break;
            case 91:
              a = d[0];
              d.unshift((a[b || a.length] = []));
              b = void 0;
              break;
            case 93:
              d.shift();
              break;
            case 102:
              a = d[0];
              a[b || a.length] = false;
              b = void 0;
              break;
            case 110:
              a = d[0];
              a[b || a.length] = null;
              b = void 0;
              break;
            case 116:
              a = d[0];
              a[b || a.length] = true;
              b = void 0;
              break;
            case 123:
              a = d[0];
              d.unshift((a[b || a.length] = {}));
              b = void 0;
              break;
            case 125:
              d.shift();
              break;
          }
        }
        if (l) {
          if (d.length !== 1) {
            throw new Error();
          }
          e = e[0];
        } else {
          if (d.length) {
            throw new Error();
          }
        }
        if (j) {
          var p = function (n, o) {
            var f = n[o];
            if (f && typeof f === "object") {
              var i = null;
              for (var g in f) {
                if (x.call(f, g) && f !== n) {
                  var q = p(f, g);
                  if (q !== void 0) {
                    f[g] = q;
                  } else {
                    i || (i = []);
                    i.push(g);
                  }
                }
              }
              if (i) {
                for (g = i.length; --g >= 0; ) {
                  delete f[i[g]];
                }
              }
            }
            return j.call(n, o, f);
          };
          e = p({ "": e }, "");
        }
        return e;
      };
    })();
    try {
      switch (mode) {
        case "parse":
          if (validateJSON(string)) {
            return jsonParse(string);
          } else {
            alert("JSON validation error\n" + string.substring(0, 1000));
            return null;
          }
          break;
        case "stringify":
          return JSON.stringify(string, undefined, prettyJSON);
          break;
      }
    } catch (e) {
      alert(e.toString());
    }
  }
  function validateJSON(string) {
    return /^[\],:{}\s]*$/.test(
      string
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]",
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
    );
  }
  this.c = function () {
    return mainFunc("l");
  };
  this.s = function () {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      isResultValidLicense(licenseValidity)
    );
  };
  this.r = function () {
    return !mainFunc("r");
  };
  this.t = function () {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      isResultTrial(licenseValidity.result)
    );
  };
  this.l = function () {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      licenseValidity.license
    );
  };
  this.ss = function () {
    return (
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode("")),
      isResultValidLicense(licenseValidity) &&
        !isResultTrial(licenseValidity.result)
    );
  };
  this.vt = function () {
    return isVT();
  };
  this.helpUI = function (e) {
    helpUI(e);
  };
  this.getRegistration = function (e) {
    return getRegistration(e);
  };
  this.openSupportTicket = function (e) {
    openSupportTicket(e);
  };
  this.openURL = function (e) {
    openURL(e);
  };
  this.doUpdateCheck = function (e) {
    setUpdateCheck(e);
  };
  this.getUpdateCheckStatus = function () {
    return doUpdateCheck;
  };
  this.doUpdateCheckNow = function () {
    return doUpdateCheckNow();
  };
  this.frameworkVersion = function () {
    return licensingVersion;
  };
}
origami.graph = function (comp) {
  this.comp = comp;
  this.vertices = [];
  this.edges = [];
  this.startVertices = [];
  this.bondsReversed = false;
  this.addStartVertex = function (vertex) {
    this.startVertices.push(vertex);
  };
  this.addVertex = function (vertex) {
    this.vertices.push(vertex);
  };
  this.addEdges = function (edgesArray) {
    this.edges = this.edges.concat(edgesArray);
  };
  this.buildFullGraph = function () {
    for (var v = 0; v < this.vertices.length; v += 1) {
      thisVert = this.vertices[v];
      allNeighbors = this.getVertexNeighbors(thisVert, false);
      this.addEdges(
        allNeighbors.map(function (o) {
          return new origami.graphEdge(thisVert, o);
        }),
      );
    }
  };
  this.buildEdges = function (randomVertices, onePoint, progress) {
    var tmpCount = 0;
    origami.writeln(this.startVertices.length);
    origami.writeln(
      "\nBegin with: ",
      this.startVertices.map(function (o) {
        return o.layer.index;
      }),
    );
    randomVertices = randomVertices || false;
    var beginWith = [];
    if (this.startVertices.length == 0) {
      this.addStartVertex(this.vertices.getRandomArrayElements(1)[0]);
    }
    beginWith = this.startVertices;
    for (var b = 0; b < beginWith.length; b += 1) {
      beginWith[b].layer.threeDLayer = true;
      beginWith[b].setLayerWeight(0);
      beginWith[b].beenHere = true;
    }
    this.cycleVertices(beginWith, randomVertices, onePoint, progress);
    this.cleanup(randomVertices, onePoint);
  };
  this.cycleVertices = function (
    cuttingEdge,
    randomVertices,
    onePoint,
    progress,
  ) {
    var nextCuttingEdge = [];
    for (var ed = 0; ed < cuttingEdge.length; ed += 1) {
      var newNeighbors = this.getVertexNeighbors(cuttingEdge[ed], onePoint);
      newNeighbors = this.filterNeighbors(
        newNeighbors,
        cuttingEdge,
        nextCuttingEdge,
      );
      if (randomVertices) {
        newNeighbors = newNeighbors.getRandomArrayElements(null, true);
      }
      for (var n = 0; n < newNeighbors.length; n += 1) {
        var tmpN = newNeighbors[n].vertex;
        nextCuttingEdge.push(tmpN);
        tmpN.beenHere = true;
        var tmpEdge = new origami.graphEdge(cuttingEdge[ed], tmpN);
        tmpEdge.addAdjacentEdge(newNeighbors[n].edge);
        tmpEdge.setParent(cuttingEdge[ed].endOf);
        this.edges.push(tmpEdge);
        if (progress) {
          progress.value = progress.value + 1;
        }
      }
    }
    origami.writeln("Found " + nextCuttingEdge.length + " new edges");
    if (nextCuttingEdge.length !== 0) {
      return this.cycleVertices(
        nextCuttingEdge,
        randomVertices,
        onePoint,
        progress,
      );
    } else {
      return null;
    }
  };
  this.cleanup = function (randomVertices, onePoint) {
    var tmp = 0;
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (!this.vertices[v].beenHere) {
        tmp++;
        var newNeighbors = this.getVertexNeighbors(this.vertices[v]);
        if (newNeighbors.length) {
          this.vertices[v].beenHere = true;
          var tmpEdge = new origami.graphEdge(
            newNeighbors[0].vertex,
            this.vertices[v],
          );
          tmpEdge.setParent(newNeighbors[0].vertex.endOf);
          tmpEdge.addAdjacentEdge(newNeighbors[0].edge);
          this.addEdges([tmpEdge]);
          this.buildEdges(randomVertices, onePoint);
        }
      }
    }
    origami.writeln(tmp, " vertices were parentless");
  };
  this.bboxes_overlaps_with_delta = function (a, b) {
    var delta = 2;
    return !(
      a[0][0] - delta > b[1][0] + delta ||
      b[0][0] - delta > a[1][0] + delta ||
      a[0][1] - delta > b[1][1] + delta ||
      b[0][1] - delta > a[1][1] + delta
    );
  };
  this.getVertexNeighbors = function (vertexToSearch, onePoint) {
    var neighborsList = [];
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (this.vertices[v].layer != vertexToSearch.layer && !this.beenHere) {
        if (
          this.bboxes_overlaps_with_delta(
            this.vertices[v].polygon.boundingBox,
            vertexToSearch.polygon.boundingBox,
          )
        ) {
          var newEdge = this.vertices[v].polygon.findCommonEdge(
            vertexToSearch.polygon,
            onePoint,
          );
          if (newEdge) {
            neighborsList.push({ edge: newEdge, vertex: this.vertices[v] });
          }
        }
      }
    }
    return neighborsList;
  };
  this.filterNeighbors = function (nArray, cuttingEdge, nextCuttingEdge) {
    var neighborsList = [];
    for (var n = 0; n < nArray.length; n += 1) {
      if (
        !cuttingEdge.isThere(nArray[n].vertex) &&
        !nextCuttingEdge.isThere(nArray[n].vertex) &&
        !nArray[n].vertex.beenHere
      ) {
        neighborsList.push(nArray[n]);
      }
    }
    return neighborsList;
  };
  this.resetParentingAndProps = function () {
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (!(this.vertices[v].layer instanceof LightLayer)) {
        this.vertices[v].layer.threeDLayer = false;
      }
    }
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (!(this.vertices[v].layer instanceof LightLayer)) {
        this.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z")
          .setValue(0);
      }
    }
    for (var v = 0; v < this.vertices.length; v += 1) {
      this.vertices[v].layer.parent = null;
      try {
        this.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = "";
        this.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Opacity").expression = "";
        this.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Scale").expression = "";
        if (this.vertices[v].layer.threeDLayer === true) {
          this.vertices[v].layer
            .property("ADBE Transform Group")
            .property("ADBE Rotate X").expression = "";
          this.vertices[v].layer.threeDLayer = false;
        }
      } catch (err) {
        null;
      }
    }
  };
  this.setParentingAndProps = function () {
    for (var ed = 0; ed < this.edges.length; ed += 1) {
      this.edges[ed].setLayerWeight();
      parentVertex = this.edges[ed].getHead();
      childVertex = this.edges[ed].getTail();
      if (childVertex.startVertex === false) {
        childVertex.setStartVertex();
        childEdge = this.edges[ed].adjacentEdge;
        newAnchor = childEdge.centerPoint;
        delta =
          childVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Position").value - newAnchor;
        childVertex.layer
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point")
          .setValue(
            childVertex.layer
              .property("ADBE Transform Group")
              .property("ADBE Anchor Point").value -
              (delta * 100) /
                childVertex.layer
                  .property("ADBE Transform Group")
                  .property("ADBE Scale").value[0],
          );
        childVertex.layer
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(newAnchor);
        try {
          childVertex.layer.parent = parentVertex.layer;
        } catch (err) {
          origami.writeln("!CIRCULAR REFERENCE FOUND!");
          childVertex.layer.label = 1;
          parentVertex.layer.label = 1;
          origami.writeln(
            childVertex.layer.name,
            " and ",
            parentVertex.layer.name,
          );
        }
      }
    }
    for (var ed = 0; ed < this.edges.length; ed += 1) {
      parentVertex = this.edges[ed].getHead();
      childVertex = this.edges[ed].getTail();
      childEdge = this.edges[ed].adjacentEdge;
      childVertex.layer.threeDLayer = true;
      childVertex.layer
        .property("ADBE Transform Group")
        .property("ADBE Orientation")
        .setValue([
          0,
          0,
          childEdge.getAngle() +
            childVertex.layer
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z").value,
        ]);
      childVertex.layer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z")
        .setValue(-1 * childEdge.getAngle());
      childVertex.layer
        .property("ADBE Transform Group")
        .property("ADBE Rotate X").expression = origami.expressions.rotX;
      childVertex.layer
        .property("ADBE Transform Group")
        .property("ADBE Opacity").expression = origami.expressions.opacity;
      if (!parentVertex.layer.parent && parentVertex.startVertex === false) {
        parentVertex.setStartVertex();
        newAnchor = childEdge.centerPoint;
        parentVertex.layer.threeDLayer = true;
        delta =
          parentVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Position").value - newAnchor;
        parentVertex.layer
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point")
          .setValue(
            parentVertex.layer
              .property("ADBE Transform Group")
              .property("ADBE Anchor Point").value -
              (delta * 100) /
                parentVertex.layer
                  .property("ADBE Transform Group")
                  .property("ADBE Scale").value[0],
          );
        parentVertex.layer
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(newAnchor);
        if (
          parentVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Rotate X").canSetExpression
        ) {
          parentVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Rotate X").expression = origami.expressions.rotX;
        }
        if (
          parentVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Opacity").canSetExpression
        ) {
          parentVertex.layer
            .property("ADBE Transform Group")
            .property("ADBE Opacity").expression = origami.expressions.opacity;
        }
      }
    }
  };
  this.reverseParenting = function () {
    var weights = this.vertices.map(function (o) {
      return o.getLayerWeight();
    });
    var maxWeight = Math.max.apply(Math, weights);
    for (var v = 0; v < this.vertices.length; v += 1) {
      this.vertices[v].setLayerWeight(
        maxWeight - this.vertices[v].getLayerWeight(),
      );
    }
    this.bondsReversed = !this.bondsReversed;
  };
  this.parentStartVertices = function (_control, update) {
    if (!update) {
      _control
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue(
          this.startVertices[0].layer
            .property("ADBE Transform Group")
            .property("ADBE Position").value,
        );
    }
    for (var s = 0; s < this.startVertices.length; s += 1) {
      this.startVertices[s].layer.parent = _control;
    }
  };
  this.postAction = function () {
    for (var v = 0; v < this.vertices.length; v += 1) {
      try {
        this.vertices[v].layer
          .property("Material Options")
          .property("Casts Shadows")
          .setValue(true);
        this.vertices[v].layer
          .property("Material Options")
          .property("Accepts Lights")
          .setValue(false);
      } catch (err) {
        null;
      }
    }
    var weights = this.vertices.map(function (o) {
      return o.getLayerWeight();
    });
    var maxWeight = Math.max.apply(Math, weights);
    for (var v = 0; v < this.vertices.length; v += 1) {
      this.vertices[v].appendLayerWeight(
        maxWeight - this.vertices[v].getLayerWeight(),
      );
    }
  };
  this.showEdgesInfo = function () {
    for (var ed = 0; ed < this.edges.length; ed += 1) {
      this.edges[ed].showInfo();
    }
  };
};
origami.graphVertex = function (layer, polygon) {
  this.layer = layer;
  this.polygon = polygon;
  this.startVertex = false;
  this.beenHere = false;
  this.endOf = null;
  this.setStartVertex = function () {
    this.startVertex = true;
  };
  this.setLayerWeight = function (newWeight) {
    newWeight = newWeight + parseFloat(Math.random().toFixed(1));
    this.layer.name = this.layer.name.split("\t")[0];
    this.layer.name += "_\t" + String(newWeight);
  };
  this.appendLayerWeight = function (newWeight) {
    newWeight = newWeight + parseFloat(Math.random().toFixed(1));
    this.layer.name = this.layer.name + "\t" + String(newWeight);
  };
  this.getLayerWeight = function () {
    if (this.layer.name.lastIndexOf("\t") != -1) {
      return parseInt(
        this.layer.name.substr(this.layer.name.lastIndexOf("_\t") + 2),
      );
    }
    return 0;
  };
  this.addChild = function (childLayer, polygon, commonEdge) {
    this.children.push(new origami.graphVertex(childLayer, polygon));
    this.edges.push(commonEdge);
  };
  this.addChildren = function (childrenArray, edgesArray) {
    this.children = this.children.concat(childrenArray);
    this.commonEdges = this.commonEdges.concat(edgesArray);
  };
  this.hasChildren = function () {
    if (this.children.length != 0) {
      return true;
    } else {
      return false;
    }
  };
};
origami.graphEdge = function (vertex1, vertex2) {
  this.v1 = vertex1;
  this.v2 = vertex2;
  this.v2.endOf = this;
  this.weight = 0;
  this.parent = null;
  this.setLayerWeight = function () {
    this.v2.setLayerWeight(this.weight);
  };
  this.setParent = function (parentEdge) {
    if (parentEdge) {
      this.parent = parentEdge;
      this.weight = parentEdge.weight + 1;
    } else {
      this.weight++;
    }
  };
  this.setWeight = function (newWeight) {
    this.weight = newWeight;
  };
  this.addAdjacentEdge = function (edge) {
    this.adjacentEdge = edge;
  };
  this.getHead = function () {
    return this.v1;
  };
  this.getTail = function () {
    return this.v2;
  };
  this.compare = function (anotherEdge) {
    if (
      this.v1 == anotherEdge.v1 ||
      this.v1 == anotherEdge.v2 ||
      this.v2 == anotherEdge.v1 ||
      this.v2 == anotherEdge.v2
    ) {
      return true;
    } else {
      return false;
    }
  };
  this.showInfo = function () {
    origami.writeln(this.v1.layer.name, " ---> ", this.v2.layer.name);
  };
};
origami.polygon = function (vertices, layer, transformsArr) {
  this.initEdges = function (thisObj) {
    thisObj.edges = [];
    for (var v = 0; v < thisObj.vertices.length; v += 1) {
      if (v != this.vertices.length - 1) {
        thisObj.edges.push(
          new origami.polyEdge(thisObj.vertices[v], thisObj.vertices[v + 1]),
        );
      } else {
        thisObj.edges.push(
          new origami.polyEdge(thisObj.vertices[v], thisObj.vertices[0]),
        );
      }
    }
  };
  this.reverse = function (thisObj) {
    thisObj.vertices = thisObj.vertices.reverse();
    thisObj.initEdges(thisObj);
  };
  this.checkClockwise = function (thisObj) {
    var sum = 0;
    var edgs = thisObj.edges;
    for (var e = 0; e < edgs.length; e += 1) {
      var A = [edgs[e].b.x - edgs[e].a.x, edgs[e].b.y - edgs[e].a.y];
      var B = [
        edgs[(e + 1) % edgs.length].b.x - edgs[(e + 1) % edgs.length].a.x,
        edgs[(e + 1) % edgs.length].b.y - edgs[(e + 1) % edgs.length].a.y,
      ];
      sum += A[0] * B[1] - A[1] * B[0];
    }
    if (sum < 0) {
      thisObj.reverse(thisObj);
    }
  };
  this.unTransform = function (transformsArr) {
    if (transformsArr !== null) {
      this.vertices = origami.untransformVerts(
        this.vertices,
        this.transformsArr,
      );
    }
    var tr = this.layer.property("ADBE Transform Group");
    var pos = tr.property("ADBE Position").value;
    var ap = tr.property("ADBE Anchor Point").value;
    var sc = tr.property("ADBE Scale").value / 100;
    var rot = (tr.property("ADBE Rotate Z").value * Math.PI) / 180;
    var getTrueValues = function (layer, position, anchor, scale, rotation) {
      if (layer.parent !== null) {
        var l = layer.parent.property("ADBE Transform Group");
        return getTrueValues(
          layer.parent,
          position +
            l.property("ADBE Position").value +
            l.property("ADBE Anchor Point").value,
          l.property("ADBE Anchor Point").value - anchor,
          [
            scale[0] * l.property("ADBE Scale").value[0],
            scale[1] * l.property("ADBE Scale").value[1],
          ] / 100,
          rotation + (l.property("ADBE Rotate Z").value * Math.PI) / 180,
        );
      } else {
        var obj = { ap: anchor, pos: position, rot: rotation, sc: scale };
        return obj;
      }
    };
    if (this.layer.parent != null) {
      var newValues = getTrueValues(this.layer, pos, ap, sc, rot);
      pos = newValues.pos;
      ap = newValues.ap;
      sc = newValues.sc;
      rot = newValues.rot;
    }
    this.vertices = this.vertices.map(function (p) {
      return p - [ap[0], ap[1]];
    });
    this.vertices = this.vertices.map(function (p) {
      return [p[0] * sc[0], p[1] * sc[1]];
    });
    this.vertices = this.vertices.map(function (p) {
      return [
        p[0] * Math.cos(rot) - p[1] * Math.sin(rot),
        p[0] * Math.sin(rot) + p[1] * Math.cos(rot),
      ];
    });
    this.vertices = this.vertices.map(function (p) {
      return p + [pos[0], pos[1]];
    });
  };
  this.getBack = function () {
    this.vertices = this.verticesBeforeUntransform;
    this.initEdges(this);
    this.checkClockwise(this);
    this.boundingBox = this.getBoundingBox();
  };
  this.getBoundingBox = function () {
    var minX = Infinity;
    var maxX = 0;
    var minY = Infinity;
    var maxY = 0;
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (this.vertices[v].x < minX) {
        minX = this.vertices[v].x;
      }
      if (this.vertices[v].y < minY) {
        minY = this.vertices[v].y;
      }
    }
    for (var v = 0; v < this.vertices.length; v += 1) {
      if (this.vertices[v].x > maxX) {
        maxX = this.vertices[v].x;
      }
      if (this.vertices[v].y > maxY) {
        maxY = this.vertices[v].y;
      }
    }
    return [
      [minX, minY],
      [maxX, maxY],
    ];
  };
  this.getCenter = function () {
    bBox = this.getBoundingBox();
    return [(bBox[0][0] + bBox[1][0]) / 2, (bBox[0][1] + bBox[1][1]) / 2];
  };
  this.layer = layer || null;
  this.vertices = vertices;
  this.verticesBeforeUntransform = vertices.map(function (o) {
    return new origami.point(o);
  });
  this.transformsArr = transformsArr || null;
  if (this.layer != null) {
    this.unTransform(this.transformsArr);
  }
  this.vertices = this.vertices.map(function (o) {
    return new origami.point(o);
  });
  this.initEdges(this);
  this.checkClockwise(this);
  this.boundingBox = this.getBoundingBox();
  this.getVertices = function (asArray) {
    if (asArray === true) {
      return this.vertices.map(function (v) {
        return [v.x, v.y];
      });
    } else {
      return this.vertices;
    }
  };
  this.mergeWith = function (anotherPoly) {
    if (this.findCommonEdge(anotherPoly)) {
      var v1 = this.vertices;
      var v2 = anotherPoly.vertices;
      var adjacentEdge = this.findCommonEdge(anotherPoly);
      var tmp = [];
      var p1Start = v1.isThere(adjacentEdge.a);
      var direction = 1;
      if (v1[(p1Start + 1) % v1.length] == adjacentEdge.b) {
        direction = -1;
      }
      for (var v = 0; v < v1.length; v += 1) {
        var vertex = v1[(p1Start + v * direction + v1.length) % v1.length];
        tmp.push(vertex);
      }
      var p2start = v2.isThere(adjacentEdge.b);
      direction = 1;
      if (v2[(p2start + 1) % v2.length] == adjacentEdge.a) {
        direction = -1;
      }
      for (var vv = 0; vv < v2.length; vv += 1) {
        var vertex = v2[(p2start + vv * direction + v2.length) % v2.length];
        if (tmp.isThere(vertex) == false) {
          tmp.push(vertex);
        }
      }
      this.vertices = tmp;
    }
  };
  this.findCommonEdge = function (anotherPoly, onePoint) {
    for (var p1 = 0; p1 < this.edges.length; p1 += 1) {
      if (this.edges[p1].getLength() > 1) {
        for (var p2 = 0; p2 < anotherPoly.edges.length; p2 += 1) {
          if (anotherPoly.edges[p2].getLength() > 1) {
            var comparedEdge = this.edges[p1].compare(anotherPoly.edges[p2]);
            if (comparedEdge === true) {
              return anotherPoly.edges[p2];
            } else {
              if (comparedEdge) {
                return comparedEdge;
              }
            }
          }
        }
      }
    }
    return null;
  };
  this.genRandomPoints = function (N) {
    this.newPointInPolygon = function () {
      var bBox = this.boundingBox;
      var newX = Math.random() * (bBox[1][0] - bBox[0][0]) + bBox[0][0];
      var newY = Math.random() * (bBox[1][1] - bBox[0][1]) + bBox[0][1];
      var newPoint = new origami.point([newX, newY]);
      while (this.contains(newPoint) == 0) {
        newX = Math.random() * (bBox[1][0] - bBox[0][0]) + bBox[0][0];
        newY = Math.random() * (bBox[1][1] - bBox[0][1]) + bBox[0][1];
        newPoint = new origami.point([newX, newY]);
      }
      return newPoint;
    };
    N = Math.abs(Number(N));
    if (N) {
      var pointsArray = [];
      while (pointsArray.length < N) {
        pointsArray.push(this.newPointInPolygon());
      }
      return pointsArray;
    } else {
      return [];
    }
  };
  this.contains = function (_point) {
    var c = 0;
    for (
      i = 0, j = this.vertices.length - 1;
      i < this.vertices.length;
      j = i++
    ) {
      if (
        this.vertices[i].y > _point.y != this.vertices[j].y > _point.y &&
        _point.x <
          ((this.vertices[j].x - this.vertices[i].x) *
            (_point.y - this.vertices[i].y)) /
            (this.vertices[j].y - this.vertices[i].y) +
            this.vertices[i].x
      ) {
        c = !c;
      }
    }
    origami.writeln(
      "Point:" +
        _point.x +
        " " +
        _point.y +
        ", with Polygon" +
        this.vertices.toString() +
        " answer: " +
        c,
    );
    return c == 1;
  };
  this.showEdgesInfo = function () {
    for (var e = 0; e < this.edges.length; e += 1) {
      this.edges[e].showInfo();
    }
  };
  this.getVertsAsArray = function () {
    return this.vertices.map(function (o) {
      return [o.x, o.y];
    });
  };
};
origami.polyEdge = function (p1, p2) {
  function getCommonPart(A, B, C, D) {
    return null;
  }
  this.a = p1;
  this.b = p2;
  this.getAngle = function () {
    return this.angle;
  };
  this.calculateCoeffs = function () {
    this.A = this.a.y - this.b.y;
    this.B = this.b.x - this.a.x;
    this.C = this.a.x * this.b.y - this.b.x * this.a.y;
    if (this.B) {
      this.angle = (180 * Math.atan(-this.A / this.B)) / Math.PI;
    } else {
      this.angle = 90;
    }
    if (Math.random() > 0.5) {
      this.angle = (this.angle + 180) % 360;
    }
    this.centerPoint = [(this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2];
  };
  this.getLength = function () {
    return Math.sqrt(
      Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2),
    );
  };
  this.normalize = function () {
    var delta = this.a - this.b;
    return new origami.point([
      delta.x / this.getLength(),
      delta.y / this.getLength(),
    ]);
  };
  this.pointOnEdge = function (point) {
    if (
      ((point.x >= this.a.x && point.x <= this.b.x) ||
        (point.x >= this.b.x && point.x <= this.a.x)) &&
      ((point.y >= this.a.y && point.y <= this.b.y) ||
        (point.y >= this.b.y && point.y <= this.a.y))
    ) {
      return true;
    } else {
      return false;
    }
  };
  this.pointInsideEdge = function (point) {
    if (
      ((point.x > this.a.x && point.x < this.b.x) ||
        (point.x > this.b.x && point.x < this.a.x)) &&
      ((point.y > this.a.y && point.y < this.b.y) ||
        (point.y > this.b.y && point.y < this.a.y))
    ) {
      return true;
    }
    return false;
  };
  this.getIntersection = function (anotherEdge) {
    var an = anotherEdge;
    newY =
      ((an.A * this.C) / this.A - an.C) / (an.B - (this.B * an.A) / this.A);
    newX = (-1 * (this.B * newY + this.C)) / this.A;
    if (
      ((newX <= this.a.x && newX > this.b.x) ||
        (newX >= this.a.x && newX < this.b.x)) &&
      ((newX <= an.a.x && newX > an.b.x) || (newX >= an.a.x && newX < an.b.x))
    ) {
      return new origami.point([newX, newY]);
    } else {
      return null;
    }
  };
  this.GetLineIntersection = function (anotherEdge) {
    var dax = this.a.x - anotherEdge.a.x;
    var dbx = this.b.x - anotherEdge.b.x;
    var day = this.a.y - anotherEdge.a.y;
    var dby = this.b.y - anotherEdge.b.y;
    var Den = dax * dby - day * dbx;
    if (Den === 0) {
      return null;
    }
    var A = this.a.x * anotherEdge.a.y - this.a.y * anotherEdge.a.x;
    var B = this.b.x * anotherEdge.b.y - this.b.y * anotherEdge.b.x;
    var I = new origami.point([0, 0]);
    I.x = (A * dbx - dax * B) / Den;
    I.y = (A * dby - day * B) / Den;
    return I;
  };
  this.getCommonPart = function (anotherEdge) {};
  this.compare = function (anotherEdge) {
    function getCommon(ab, cd) {
      if (ab.pointOnEdge(cd.a)) {
        if (ab.pointOnEdge(cd.b)) {
          return new origami.polyEdge(cd.a, cd.b);
        } else if (cd.pointInsideEdge(ab.a)) {
          return new origami.polyEdge(cd.a, ab.a);
        } else {
          if (cd.pointInsideEdge(ab.b)) {
            return new origami.polyEdge(cd.a, ab.b);
          }
        }
      } else if (ab.pointOnEdge(cd.b)) {
        if (ab.pointOnEdge(cd.a)) {
          return new origami.polyEdge(cd.b, cd.a);
        } else if (cd.pointInsideEdge(ab.a)) {
          return new origami.polyEdge(cd.b, ab.a);
        } else {
          if (cd.pointInsideEdge(ab.b)) {
            return new origami.polyEdge(cd.b, ab.b);
          }
        }
      } else if (cd.pointOnEdge(ab.a)) {
        if (cd.pointOnEdge(ab.b)) {
          return new origami.polyEdge(ab.a, ab.b);
        } else if (ab.pointInsideEdge(cd.a)) {
          return new origami.polyEdge(ab.a, cd.a);
        } else {
          if (ab.pointInsideEdge(cd.b)) {
            return new origami.polyEdge(ab.a, cd.b);
          }
        }
      } else {
        if (cd.pointOnEdge(ab.b)) {
          if (cd.pointOnEdge(ab.a)) {
            return new origami.polyEdge(ab.a, ab.b);
          } else if (ab.pointInsideEdge(cd.a)) {
            return new origami.polyEdge(ab.b, cd.a);
          } else {
            if (ab.pointInsideEdge(cd.b)) {
              return new origami.polyEdge(ab.b, cd.b);
            }
          }
        }
      }
      return false;
    }
    if (this.a == anotherEdge.a && this.b == anotherEdge.b) {
      return true;
    } else {
      if (this.a == anotherEdge.b && this.b == anotherEdge.a) {
        return true;
      }
    }
    A1 = this.A;
    A2 = anotherEdge.A;
    B1 = this.B;
    B2 = anotherEdge.B;
    if (A1 == 0 && A2 == 0) {
      return getCommon(this, anotherEdge);
    } else if (B1 == 0 && B2 == 0) {
      return getCommon(this, anotherEdge);
    } else {
      if ((A1 != 0 && B1 != 0) || (A2 != 0 && B2 != 0)) {
        if (
          A2 != 0 &&
          B2 != 0 &&
          parseInt((100 * A1) / A2) / 100 == parseInt((100 * B1) / B2) / 100
        ) {
          return getCommon(this, anotherEdge);
        }
      }
    }
    return false;
  };
  this.getInfo = function () {
    return (
      "p1: [" +
      this.a.x +
      "," +
      this.a.y +
      "]\np2: [" +
      this.b.x +
      "," +
      this.b.y +
      "]"
    );
  };
  this.calculateCoeffs();
};
origami.point = function (coordArray) {
  this.x = Math.round(coordArray[0] * 100) / 100;
  this.y = Math.round(coordArray[1] * 100) / 100;
  this.z = Math.round(coordArray[2] * 100) / 100 || undefined;
  this["+"] = function (operand) {
    return new origami.point([this.x + operand.x, this.y + operand.y]);
  };
  this["-"] = function (operand) {
    return new origami.point([this.x - operand.x, this.y - operand.y]);
  };
  this["*"] = function (operand) {
    return new origami.point([this.x * operand, this.y * operand]);
  };
  this["=="] = function (operand) {
    if (this.x == operand.x && this.y == operand.y && this.z == operand.z) {
      return true;
    } else {
      return false;
    }
  };
  this.toArray = function () {
    if (this.z !== undefined) {
      return [this.x, this.y, this.z];
    } else {
      return [this.x, this.y];
    }
  };
  this.toString = function () {
    if (this.z !== undefined) {
      return String(this.x) + "," + String(this.y) + "," + String(this.z);
    } else {
      return String(this.x) + "; " + String(this.y);
    }
  };
};
origami.colorGenerator = function (_color, _range, _static) {
  this.cArray = [];
  this._color = _color || "NILL";
  this._static = _static || false;
  this._range = _range || 50;
  this._range = 1 - (100 - this._range) / 100;
  this.generateNew = function (wut) {
    if (this._static == false) {
      if (this._color == "NILL") {
        var tmpColor = new origami.color(
          255 *
            [
              (1 - this._range) / 2 + Math.random() * this._range,
              (1 - this._range) / 2 + Math.random() * this._range,
              (1 - this._range) / 2 + Math.random() * this._range,
              1,
            ],
        );
        if (!this.cArray.isThere(tmpColor)) {
          this.cArray.push(tmpColor);
          return tmpColor.value;
        }
      } else {
        var hsl = this.getHSL(this._color[0], this._color[1], this._color[2]);
        var rgb = this.getRGB(
          hsl[0],
          hsl[1],
          (1 - this._range) / 2 + Math.random() * this._range,
        );
        return rgb / 255;
      }
    } else {
      return this._color / 255;
    }
  };
  this.getHSL = function (r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + g < b ? 6 : 0;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h, s, l];
  };
  this.getRGB = function (h, s, l) {
    if (s == 0) {
      r = g = b = l;
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 0.16666666666666666) {
          return p + (q - p) * 6 * t;
        }
        if (t < 0.5) {
          return q;
        }
        if (t < 0.6666666666666666) {
          return p + (q - p) * (0.6666666666666666 - t) * 6;
        }
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 0.3333333333333333);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 0.3333333333333333);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255];
  };
};
origami.color = function (colorValue) {
  var hexRe = /[a-f0-9]{6}/;
  if (colorValue instanceof Array) {
    this.R = colorValue[0];
    this.G = colorValue[1];
    this.B = colorValue[2];
    if (colorValue.length == 4) {
      this.A = colorValue[3];
    } else {
      this.A = 255;
    }
  } else if (colorValue instanceof String && hexRe.test(colorValue)) {
    this.R = parseInt(colorValue.substr(0, 2), 16);
    this.G = parseInt(colorValue.substr(2, 2), 16);
    this.B = parseInt(colorValue.substr(4, 2), 16);
    this.A = 255;
    this.hexValue = colorValue;
  } else {
    this.R = 255;
    this.G = 255;
    this.B = 255;
    this.A = 255;
  }
  this.normalize = function () {
    return [this.R, this.G, this.B, this.A] / 255;
  };
  this.getHex = function () {
    function toHex(n) {
      n = parseInt(n, 10);
      if (isNaN(n)) {
        return "00";
      }
      n = Math.max(0, Math.min(n, 255));
      return (
        "0123456789ABCDEF".charAt((n - (n % 16)) / 16) +
        "0123456789ABCDEF".charAt(n % 16)
      );
    }
    return toHex(this.R) + toHex(this.G) + toHex(this.B);
  };
  this.value = this.normalize([this.R, this.G, this.B, this.A]);
  this["=="] = function (operand) {
    return this.value == operand.value;
  };
};
var origami = this;
var poly2tri = this;
origami.untransformVerts = function (vertices, transformsArr) {
  for (var t = transformsArr.length - 1; t >= 0; t--) {
    var s = transformsArr[t].property("ADBE Vector Scale").value / 100;
    var r =
      (transformsArr[t].property("ADBE Vector Rotation").value * Math.PI) / 180;
    vertices = vertices.map(function (o) {
      return o - transformsArr[t].property("ADBE Vector Anchor").value;
    });
    vertices = vertices.map(function (p) {
      return [p[0] * s[0], p[1] * s[1]];
    });
    vertices = vertices.map(function (p) {
      return [
        p[0] * Math.cos(r) - p[1] * Math.sin(r),
        p[0] * Math.sin(r) + p[1] * Math.cos(r),
      ];
    });
    vertices = vertices.map(function (o) {
      return o + transformsArr[t].property("ADBE Vector Position").value;
    });
  }
  return vertices;
};
origami.masksToLayers = function (layer, remove) {
  var masks = layer.property("ADBE Mask Parade");
  app.beginUndoGroup("tst mask");
  for (var m = masks.numProperties; m > 0; m--) {
    var newLayer = layer.duplicate();
    newLayer.name = newLayer.name + "_mask_" + String(m);
    var newMasks = newLayer.property("ADBE Mask Parade");
    for (var j = newMasks.numProperties; j > 0; j--) {
      if (j != m) {
        newMasks.property(j).remove();
      } else {
        newMasks.property(j).property("ADBE Mask Offset").setValue(1);
      }
    }
  }
  if (remove) {
    layer.remove();
  }
  app.endUndoGroup();
};
origami.clipPolygons = function (thisPoly, anotherPoly, hole) {
  var P = [];
  var Q = [];
  var pointsInsideAnother = 0;
  var pointsInsideThis = 0;
  for (var v = 0; v < thisPoly.vertices.length; v += 1) {
    if (anotherPoly.contains(thisPoly.vertices[v])) {
      pointsInsideAnother++;
    }
  }
  for (var v = 0; v < anotherPoly.vertices.length; v += 1) {
    if (thisPoly.contains(anotherPoly.vertices[v])) {
      pointsInsideThis++;
    }
  }
  if (pointsInsideAnother == thisPoly.vertices.length) {
    origami.writeln(pointsInsideAnother);
    origami.writeln("\t\nINSIDE f1!!\n");
    return thisPoly;
  } else if (pointsInsideThis == anotherPoly.vertices.length) {
    origami.writeln("\t\nINSIDE f2\n");
    return anotherPoly;
  } else {
    var inout = false;
    if (anotherPoly.contains(thisPoly.edges[0].a) == 1) {
      inout = true;
    }
    origami.writeln(
      "\nP 1st point: ",
      thisPoly.edges[0].a.toString(),
      " Inside: ",
      inout,
    );
    for (var aE = 0; aE < thisPoly.edges.length; aE += 1) {
      for (var bE = 0; bE < anotherPoly.edges.length; bE += 1) {
        var getInt = thisPoly.edges[aE].getIntersection(anotherPoly.edges[bE]);
        if (getInt) {
          P.push({ coord: getInt.toArray(), out: inout });
          inout = !inout;
        }
      }
      P.push({ coord: thisPoly.edges[aE].b.toArray(), out: null });
    }
    origami.writeln(
      "\nP: ",
      P.map(function (o) {
        return "\ntype " + o.out + " coord: " + o.coord[0] + "; " + o.coord[1];
      }),
    );
    inout = false;
    if (thisPoly.contains(anotherPoly.edges[0].a) == 1) {
      inout = true;
    }
    origami.writeln(
      "\nQ 1st point: ",
      anotherPoly.edges[0].a.toString(),
      " Inside: ",
      inout,
    );
    for (var bE = 0; bE < anotherPoly.edges.length; bE += 1) {
      for (var aE = 0; aE < thisPoly.edges.length; aE += 1) {
        var getInt = anotherPoly.edges[bE].getIntersection(thisPoly.edges[aE]);
        if (getInt) {
          Q.push({ coord: getInt.toArray(), out: inout });
          inout = !inout;
        }
      }
      Q.push({ coord: anotherPoly.edges[bE].b.toArray(), out: null });
    }
    origami.writeln(
      "Q: ",
      Q.map(function (o) {
        return "\ntype " + o.out + " coord: " + o.coord[0] + "; " + o.coord[1];
      }),
    );
    var numFalse = 0;
    var numTrue = 0;
    var QnumFalse = 0;
    var QnumTrue = 0;
    for (var p = 0; p < P.length; p += 1) {
      if (P[p].out == true) {
        numTrue++;
      }
      if (P[p].out == false) {
        numFalse++;
      }
    }
    for (var q = 0; q < Q.length; q += 1) {
      if (Q[q].out == true) {
        QnumTrue++;
      }
      if (Q[q].out == false) {
        QnumFalse++;
      }
    }
    origami.writeln("checking numFalse and numTrue");
    if (numTrue > 0 && numFalse > 0) {
      origami.writeln("checked, fine");
      var newPolyVertices = [];
      var mrkr = false;
      var prevOut = [];
      var getPolyFromPandQ = function (p, q) {
        var vertPushed = 0;
        var finalPoint = null;
        var mrkr = false;
        while (P[p].out === true && (mrkr === true) === false) {
          if (P[p].out === false) {
            mrkr = true;
          }
          if (mrkr == true) {
            newPolyVertices.push(P[p].coord);
            vertPushed++;
          }
          p = (p + 1) % P.length;
          if (P[p].out === true && mrkr === true) {
            finalPoint = P[p].coord;
            break;
          }
        }
        var mrkr = false;
        while (Q[q].out === true && (mrkr === true) === false) {
          if (Q[q].out === false) {
            mrkr = true;
          }
          if (mrkr == true && Q[q].out !== false) {
            newPolyVertices.push(Q[q].coord);
            vertPushed++;
          }
          q = (q + 1) % Q.length;
        }
        newPolyVertices.push(finalPoint);
        vertPushed++;
        origami.writeln(newPolyVertices.toString());
        return { p: p, pushed: vertPushed, q: q };
      };
      var polygons_count = numFalse / 2;
      var ind_p = 0;
      var ind_q = 0;
      while (polygons_count > 0) {
        var ANSWER = getPolyFromPandQ(ind_p, ind_q);
        ind_p = ANSWER.p;
        ind_q = ANSWER.q;
        polygons_count--;
        origami.writeln(numFalse, numTrue, QnumFalse, QnumTrue);
        origami.writeln(ANSWER.pushed + " " + ANSWER.p + " " + ANSWER.q);
      }
      if (newPolyVertices.length > 0) {
        return new origami.polygon(newPolyVertices);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};
origami.getSliceVertices = function (layer, mask) {
  function getAllPathsObjects(_group, _transformsArr) {
    var transformName = "ADBE Vector Transform Group";
    var pathName = "ADBE Vector Shape";
    var arr = [];
    if (_transformsArr == undefined) {
      var _transformsArr = [];
    }
    if (_group.property(transformName) !== null) {
      localTrArr = _transformsArr.concat([_group.property(transformName)]);
    } else {
      localTrArr = _transformsArr;
    }
    for (var i = 1; i <= _group.numProperties; i += 1) {
      curProp = _group.property(i);
      if (curProp instanceof PropertyGroup) {
        arr = arr.concat(getAllPathsObjects(curProp, localTrArr));
      } else {
        if (curProp.matchName == pathName) {
          var obj = { prop: curProp, transformsArr: localTrArr };
          arr.push(obj);
        }
      }
    }
    return arr;
  }
  if (layer.property("ADBE Mask Parade").numProperties > 0) {
    var transforms = [];
    if (layer instanceof ShapeLayer) {
      var path = getAllPathsObjects(
        layer.property("ADBE Root Vectors Group"),
      )[0];
      if (path) {
        transforms = path.transformsArr;
      } else {
        var paramPath = origami.getAllParamObjects(
          layer.property("ADBE Root Vectors Group"),
        );
        if (paramPath.length > 0) {
          transforms = paramPath[0].transformsArr;
        }
      }
    }
    tmp = layer
      .property("ADBE Mask Parade")
      .property("ADBE Mask Atom")
      .property("ADBE Mask Shape").value.vertices;
    if (layer.property("ADBE Mask Parade").numProperties > 1) {
      var holesArray = [];
      for (
        var h = 2;
        h <= layer.property("ADBE Mask Parade").numProperties;
        h += 1
      ) {
        holesArray.push(
          new origami.polygon(
            layer
              .property("ADBE Mask Parade")
              .property(h)
              .property("ADBE Mask Shape").value.vertices,
            layer,
          ),
        );
      }
      return [new origami.polygon(tmp, layer, transforms), holesArray];
    }
    return new origami.polygon(tmp, layer, transforms);
  } else if (layer instanceof ShapeLayer) {
    var path = getAllPathsObjects(layer.property("ADBE Root Vectors Group"))[0];
    if (path) {
      vert = path.prop.value.vertices;
      var newPoly = new origami.polygon(vert, layer, path.transformsArr);
      return newPoly;
    } else {
      var paramPath = origami.getAllParamObjects(
        layer.property("ADBE Root Vectors Group"),
      );
      if (paramPath.length > 0) {
        var vert = origami.convertParamShape(paramPath[0].prop);
        var newPoly = new origami.polygon(
          vert,
          layer,
          paramPath[0].transformsArr,
        );
        return newPoly;
      }
    }
    return null;
  } else {
    return null;
  }
};
origami.meshGen = function (
  pointCount,
  sliceType,
  createMask,
  explode,
  remove,
  offset,
  preview,
  colorType,
  colorRange,
  postCompose,
) {
  var activeComp = app.project.activeItem;
  if (activeComp && activeComp instanceof CompItem) {
    var sel = activeComp.selectedLayers;
    if (sel.length > 0) {
      var poly = origami.getSliceVertices(sel[0]);
      if (poly == null) {
        if (sel[0] instanceof AVLayer && origami.AEversion >= 13.2) {
          poly = origami.getLayerBound(sel[0]);
        } else {
          alert("Select a shape layer or a layer with a mask");
        }
      }
      if (poly !== null) {
        if (poly instanceof Array) {
          poly = poly[0];
        }
        if (poly.vertices.length > 2) {
          if (createMask) {
            poly.getBack();
          }
          if (createMask === false && sel[0].threeDLayer === true) {
            poly.getBack();
          }
          var polygons = origami.getSliceByType(sliceType);
          polygons = polygons.slicer(poly, pointCount);
          if (createMask === true && sel[0] instanceof ShapeLayer) {
            polygons = polygons.map(function (o) {
              return origami.untransformVerts(o, poly.transformsArr);
            });
          }
          origami.makeSlices(
            activeComp,
            polygons,
            sel[0],
            explode,
            offset,
            remove,
            createMask,
            preview,
            colorType,
            colorRange,
            postCompose,
          );
        }
      }
    }
  }
};
origami.makeSlices = function (
  _comp,
  polygons,
  selLayer,
  explode,
  offset,
  remove,
  createMask,
  preview,
  colorType,
  colorRange,
  postCompose,
) {
  function centerShapeAnchor(_layer, vertices) {
    var tmpPoly = new origami.polygon(vertices);
    var newAnchor = tmpPoly.getBoundingBox();
    newAnchor =
      [newAnchor[1][0] + newAnchor[0][0], newAnchor[1][1] + newAnchor[0][1]] /
      2;
    var delta =
      _layer.property("ADBE Transform Group").property("ADBE Position").value -
      newAnchor;
    _layer
      .property("ADBE Transform Group")
      .property("ADBE Anchor Point")
      .setValue(
        _layer.property("ADBE Transform Group").property("ADBE Anchor Point")
          .value - delta,
      );
    _layer
      .property("ADBE Transform Group")
      .property("ADBE Position")
      .setValue(newAnchor);
  }
  var createdLayers = [];
  var getFirstFill = function (_group) {
    var fillName = "ADBE Vector Graphic - Fill";
    if (_group.property(fillName) != null) {
      return (
        _group.property(fillName).property("ADBE Vector Fill Color").value * 255
      );
    }
    for (var i = 1; i <= _group.numProperties; i += 1) {
      var curProp = _group.property(i);
      if (curProp instanceof PropertyGroup) {
        return getFirstFill(curProp);
      }
    }
    return null;
  };
  var colorGetter = function (_comp, layer) {
    this.comp = _comp;
    this.layer = _layer || null;
    this.init = function () {
      this.adj = this.comp.layers.addSolid(
        [1, 1, 0],
        "tst",
        _comp.width,
        _comp.height,
        _comp.pixelAspect,
        _comp.duration,
      );
      this.adj.adjustmentLayer = true;
      this.col = this.adj
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
    };
    this.generateNew = function (coordinate) {
      this.adj.moveToBeginning();
      this.col.property("ADBE Color Control-0001").expression =
        'bgLayer = thisComp.layer("' +
        this.layer.name +
        '"' +
        "\nbgLayer.sampleImage([" +
        coordinate[0] +
        ", " +
        coordinate[1] +
        "], [5,5], true, time)";
      $.sleep(750);
      return this.col
        .property("ADBE Color Control-0001")
        .valueAtTime(this.comp.time, false);
    };
    this.remove = function () {
      this.adj.remove();
    };
    this.init();
  };
  if (createMask == false) {
    var col = 255 * [Math.random(), Math.random(), Math.random(), 1];
    if (selLayer instanceof ShapeLayer) {
      col = getFirstFill(selLayer.property("ADBE Root Vectors Group"));
      if (col == null) {
        col = [Math.random(), Math.random(), Math.random(), 1] * 255;
      }
    }
  }
  if (colorType == 0) {
    colorGen = new origami.colorGenerator(col, 0, true);
  } else if (colorType == 1) {
    colorGen = new origami.colorGenerator("NILL", colorRange);
  } else if (colorType == 2) {
    colorGen = new origami.colorGenerator(col, colorRange);
  } else {
    colorGen = new colorGetter(_comp, selLayer);
  }
  if (createMask) {
    if (selLayer instanceof ShapeLayer) {
      var p = selLayer
        .property("ADBE Transform Group")
        .property("ADBE Position").value;
    }
    if (explode) {
      m = selLayer.property("ADBE Mask Parade");
      for (var i = m.numProperties; i > 0; i--) {
        m.property(i).remove();
      }
      for (var t = 0; t < polygons.length; t += 1) {
        dLayer = selLayer.duplicate();
        dLayer.name = dLayer.name + "_fragment" + t;
        dLayer.comment = origami.names.layerComment;
        origami.drawMask(polygons[t], dLayer, offset);
        createdLayers.push(dLayer);
        if (selLayer.comment == origami.names.layerComment) {
          dLayer.name = selLayer.name;
        }
      }
      if (
        selLayer.threeDLayer === true &&
        selLayer.comment == origami.names.layerComment
      ) {
        for (var l = 1; l <= _comp.layers.length; l += 1) {
          if (_comp.layers[l].parent == selLayer) {
            _comp.layers[l].parent = dLayer;
          }
        }
      }
    } else {
      dLayer = selLayer.duplicate();
      createdLayers.push(dLayer);
      m = dLayer.property("ADBE Mask Parade");
      for (var i = m.numProperties; i > 0; i--) {
        m.property(i).remove();
      }
      for (var t = 0; t < polygons.length; t += 1) {
        origami.drawMask(polygons[t], dLayer, offset);
      }
      selLayer.selected = false;
      dLayer.property("ADBE Mask Parade").property("ADBE Mask Atom").selected =
        true;
    }
  } else {
    if (explode) {
      for (var t = 0; t < polygons.length; t += 1) {
        if (polygons[t] != null) {
          shapeLayer = _comp.layers.addShape();
          shapeLayer.name = selLayer.name + "_fragment" + t;
          shapeLayer.comment = origami.names.layerComment;
          shapeLayer
            .property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue([0, 0]);
          shapeLayer.moveAfter(selLayer);
          origami.writeln("===Draw Shape=== ");
          origami.writeln(polygons[t]);
          tmpPoly = new origami.polygon(polygons[t]);
          center = tmpPoly.getCenter();
          origami.drawShape(
            polygons[t],
            shapeLayer,
            offset,
            colorGen.generateNew(),
            col,
          );
          centerShapeAnchor(shapeLayer, polygons[t]);
          createdLayers.push(shapeLayer);
          if (selLayer.parent) {
            shapeLayer.parent = selLayer.parent;
          }
          if (selLayer.threeDLayer === true) {
            shapeLayer.threeDLayer = true;
            if (selLayer.comment == origami.names.layerComment) {
              shapeLayer.name = selLayer.name;
              shapeLayer
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .setValue(
                  selLayer
                    .property("ADBE Transform Group")
                    .property("ADBE Position").value,
                );
              shapeLayer
                .property("ADBE Transform Group")
                .property("ADBE Anchor Point")
                .setValue(
                  selLayer
                    .property("ADBE Transform Group")
                    .property("ADBE Anchor Point").value,
                );
              if (shapeLayer.threeDLayer === true) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Orientation")
                  .setValue(
                    selLayer
                      .property("ADBE Transform Group")
                      .property("ADBE Orientation").value,
                  );
              }
              shapeLayer
                .property("ADBE Transform Group")
                .property("ADBE Rotate Z")
                .setValue(
                  selLayer
                    .property("ADBE Transform Group")
                    .property("ADBE Rotate Z").value,
                );
              if (
                selLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Rotate X").expression != ""
              ) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Rotate X").expression = this.expressions.rotX;
              }
              if (
                selLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Opacity").expression != ""
              ) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Opacity").expression =
                  this.expressions.opacity;
              }
              if (
                selLayer.property("ADBE Transform Group").property("ADBE Scale")
                  .expression != ""
              ) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Scale").expression = this.expressions.scale;
              }
              if (
                selLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Position").expression != ""
              ) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Position").expression =
                  this.expressions.position;
              }
              if (
                selLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Rotate Z").expression != ""
              ) {
                shapeLayer
                  .property("ADBE Transform Group")
                  .property("ADBE Rotate Z").expression = this.expressions.rotZ;
              }
            }
          }
        }
      }
      if (
        selLayer.threeDLayer === true &&
        selLayer.comment == origami.names.layerComment
      ) {
        for (var l = 1; l <= _comp.layers.length; l += 1) {
          if (_comp.layers[l].parent == selLayer) {
            _comp.layers[l].parent = shapeLayer;
          }
        }
      }
      if (colorType == 3) {
        colorGen.remove();
      }
    } else {
      if (preview) {
        var previewLayer = _comp.findLayerByName(
          origami.names.previewLayer.name,
        );
        if (previewLayer !== null) {
          shapeLayer = previewLayer;
          shapeLayer.locked = false;
          shapeLayer.comment = origami.names.layerComment;
          for (
            var i = shapeLayer.property(
              "ADBE Root Vectors Group",
            ).numProperties;
            i > 0;
            i--
          ) {
            shapeLayer.property("ADBE Root Vectors Group").property(i).remove();
          }
        } else {
          shapeLayer = _comp.layers.addShape();
          shapeLayer.name = origami.names.previewLayer.name;
        }
        shapeLayer.locked = true;
      } else {
        shapeLayer = _comp.layers.addShape();
        shapeLayer.name = selLayer.name + "_fragments";
        shapeLayer.comment = origami.names.layerComment;
        createdLayers.push(shapeLayer);
      }
      shapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([0, 0]);
      for (var t = 0; t < polygons.length; t += 1) {
        if (preview === true) {
          origami.drawShape(
            polygons[t],
            shapeLayer,
            true,
            [1, 0, 0, 1],
            col,
            false,
          );
        } else {
          origami.drawShape(
            polygons[t],
            shapeLayer,
            offset,
            colorGen.generateNew(),
            col,
            false,
          );
        }
      }
      centerShapeAnchor(shapeLayer, polygons[0]);
      if (colorType == 3) {
        colorGen.remove();
      }
    }
  }
  if (postCompose) {
    createdLayers = createdLayers.map(function (o) {
      return o.index;
    });
    _comp.layers
      .precompose(createdLayers, selLayer.name + "_fragments", true)
      .openInViewer();
    _comp.layer(selLayer.name + "_fragments").moveToBeginning();
  }
  selLayer.enabled = false;
  if (
    remove ||
    (selLayer.threeDLayer === true &&
      selLayer.comment == origami.names.layerComment)
  ) {
    selLayer.remove();
  }
};
origami.recolor = function (_comp, colorType, colorRange) {
  var comp = _comp || null;
  if (comp == null) {
    var tmp = app.project.activeItem;
    if (tmp instanceof CompItem) {
      comp = tmp;
    }
  }
  for (var l = 1; l <= comp.layers.length; l += 1) {
    if (
      comp.layers[l].comment == origami.names.layerComment &&
      comp.layers[l].selected === true
    ) {
      var mainShapeGroup = comp.layers[l].property("ADBE Root Vectors Group");
      for (var g = 1; g <= mainShapeGroup.numProperties; g += 1) {
        try {
          originalColor = mainShapeGroup
            .property(g)
            .property("Contents")
            .property(origami.names.originalColor)
            .property("ADBE Vector Fill Color");
          currentColor = mainShapeGroup
            .property(g)
            .property("Contents")
            .property(origami.names.currentColor)
            .property("ADBE Vector Fill Color");
          strokeColor = mainShapeGroup
            .property(g)
            .property("Contents")
            .property(origami.names.strokeColor)
            .property("ADBE Vector Stroke Color");
          if (colorType == 0) {
            colorGen = new origami.colorGenerator(originalColor.value, 0, true);
          } else if (colorType == 1) {
            colorGen = new origami.colorGenerator("NILL", colorRange);
          } else {
            colorGen = new origami.colorGenerator(
              originalColor.value,
              colorRange,
            );
          }
          col = colorGen.generateNew();
          currentColor.setValue(col);
          if (strokeColor !== null) {
            strokeColor.setValue(col);
          }
        } catch (err) {
          null;
        }
      }
    }
  }
};
origami.drawShape = function (
  trVertices,
  masterLayer,
  stroke,
  color,
  originalColor,
  strokeOnly,
) {
  if (trVertices.length > 0) {
    var vertices = trVertices;
    if (
      vertices[vertices.length - 1][0] == vertices[0][0] &&
      vertices[vertices.length - 1][1] == vertices[0][1]
    ) {
      vertices = vertices.slice(1, vertices.length);
    }
    var triangle = new Shape();
    triangle.vertices = vertices;
    triangle.closed = true;
    var contents = masterLayer.property("ADBE Root Vectors Group");
    var g = contents.addProperty("ADBE Vector Group");
    var p = g.addProperty("ADBE Vectors Group");
    g.name = "Polygon";
    var t1 = p.addProperty("ADBE Vector Shape - Group");
    t1.property("ADBE Vector Shape").setValue(triangle);
    var trim = p.addProperty("ADBE Vector Filter - Trim");
    trim.property("ADBE Vector Trim End").expression =
      origami.expressions.trimPath;
    if (strokeOnly === true) {
      origami.setStroke(p, 1, color);
    } else {
      if (color !== null) {
        origami.setFill(p, color, origami.names.currentColor, false);
      }
      if (stroke !== null) {
        origami.setStroke(p, 1, color);
      }
      if (originalColor !== null) {
        origami.setFill(p, originalColor, origami.names.originalColor, true);
      }
    }
    return null;
  }
};
origami.drawMask = function (mVertices, masterLayer, offset) {
  var vertices = mVertices;
  if (vertices.length > 2) {
    if (
      vertices[vertices.length - 1][0] == vertices[0][0] &&
      vertices[vertices.length - 1][1] == vertices[0][1]
    ) {
      vertices = vertices.slice(1, vertices.length);
    }
    var offset = offset || 1;
    var triangle = new Shape();
    triangle.vertices = vertices;
    triangle.closed = true;
    var mask = masterLayer.property("ADBE Mask Parade");
    var g = mask.addProperty("ADBE Mask Atom");
    g.property("ADBE Mask Shape").setValue(triangle);
    g.property("ADBE Mask Offset").setValue(offset);
    return null;
  }
};
origami.setStroke = function (group, thick, color) {
  var strokeGroup = group.addProperty("ADBE Vector Graphic - Stroke");
  strokeGroup.name = origami.names.strokeColor;
  strokeGroup.property("ADBE Vector Stroke Width").setValue(thick);
  strokeGroup.property("ADBE Vector Stroke Color").setValue(color);
};
origami.setFill = function (group, color, _name, hide) {
  name = _name || null;
  var colGroup = group.addProperty("ADBE Vector Graphic - Fill");
  colGroup.property("ADBE Vector Fill Color").setValue(color);
  if (name !== null) {
    colGroup.name = name;
    if (hide === true) {
      colGroup.enabled = false;
    }
  }
};
origami.names = {
  algorithm: { name: "Unwrap algorithm", tip: "" },
  algorithms: {
    name: ["Greedy", "Random"],
    tip: "Greedy \u2013 will take every polygin neighbor.\nRandom \u2013 will build a random tree for cool animation.",
  },
  animateTab: { name: "Animate", tip: "" },
  animationEffects: {
    name: "Effects",
    tip: "Choose which properties to animate",
  },
  animationMethod: {
    name: "Animation",
    tip: "Choose algorithm for building mesh tree:\n\tWave will take all the neighbors on each step\n\tTree will build a nicely looking tree",
  },
  colorSettings: {
    name: "SHAPES COLOR",
    tip: "Choose created Shape Layers fill color type\nAnd set color variations",
  },
  controlLayer: "!control",
  controlName: "Origami Control",
  createMeshBttn: {
    name: "CREATE A MESH",
    tip: "Slice selected layer into selected fragments type",
  },
  createPanel: { name: "Make", tip: "" },
  currentColor: "Origami Fill",
  delayControl: "delay",
  directionColumn: {
    name: "Direction",
    tip: "Animate mesh appearance (IN)\nor disappearance (OUT)",
  },
  fixedRadioBttn: { name: "Fixed color", tip: "" },
  layerComment: "origami",
  mainModePanel: { name: "Set mesh type", tip: "" },
  maskTab: { name: "Tools", tip: "" },
  masksCreate: {
    name: "Masks",
    tip: "Creates masks and places them on selected layer copies",
  },
  methodGreedy: { name: "Wave", tip: "Takes all neighbors on each step" },
  methodRandom: {
    name: "Tree",
    tip: "Creates a tree branches style animation",
  },
  modeAdvanced: {
    name: "ADVANCED",
    tip: "Slice and Animate separately with lots of options",
  },
  modeBasic: {
    name: "BASIC",
    tip: "One-click slice and unwrap\nFor fast transitions",
  },
  modeSettings: {
    name: "",
    tip: "Tweak settings and Recolor your mesh fragments",
  },
  numPoints: {
    name: "Number of points",
    tip: "Set the number of points to add to source layer.\nMore point - more layers. ",
  },
  offsetOne: {
    name: "Offset 1px",
    tip: "Expands created masks 1px or creates a 1px wide stroke for shapes\nto prevent holes between objects",
  },
  opacityControl: "Opacity Control",
  originalColor: "Original Color",
  polyNull: "Polygon Null",
  positionControl: "Position Control",
  positionNull: "Position Control",
  postCompose: {
    name: "Precompose fragments",
    tip: "Precomposes fragments after creating mesh",
  },
  postExplode: {
    name: "Fragments to Layers",
    tip: "Puts each fragment on a new layer\n\nWill create one layer with all fragments if unchecked\nWARNING: Won\'t be suitable for animation!",
  },
  postRemove: {
    name: "Remove original layer",
    tip: "Removes the source layer after splitting it into polygons.",
  },
  previewLayer: "FLUX_PREVIEW",
  recolorBttn: {
    name: "RECOLOR",
    tip: "Recolor selected Shape Layers\nwith new fill type settings",
  },
  scaleControl: "Scale Control",
  separator: "or",
  setGroup: { name: "Slice Settings", tip: "" },
  shapesCreate: { name: "Shapes", tip: "Creates individual shape layers" },
  sliceAlgorithm: { name: "Slice algorithm", tip: "" },
  slicerTab: { name: "Slice", tip: "" },
  slicesSelect: {
    methods: origami.AllSlicesNames,
    name: "Mesh",
    tip: "Choose mesh fragments type\nPlay with different cutting algorithms.\nWe like all of them.",
  },
  stepOne: {
    name: "STEP1.CREATE A MESH",
    tip: "Create mesh (Shapes or Masks)",
  },
  stepTwo: { name: "STEP2.ANIMATE", tip: "Animate mesh" },
  strokeColor: "Origami Stroke",
  trimPathControl: "Trim Path control",
  updateBttn: { name: "UPDATE", tip: "Update created animation" },
  watToWat: {
    name: ["Masks", "Shapes"],
    tip: "Create layer copies with masks\nor Shape Layers",
  },
  xRotControl: "X rotation control",
  zRotControl: "Z rotation control",
};
origami.tips = {
  algorithms:
    "Greedy \u2013 will parent all neighbors\nRandom \u2013 will randomly move around polygons",
  mergePolys: "Merge two polygons",
  onePointChckBx:
    "If checked, polygons with one common point\nwill be treated as neighbors",
  previewBttn: "Preview slicing",
  shapesToMasks:
    "Takes all paths from a shape layer\nand converts them into masks on new solid",
  shatterMapBttn: "Create shatter map based on current polygons",
  slicesSelect: "Select polygon creation algorithm",
};
origami.buildGUI = function (thisObj) {
  thisObj.iconsFiles = [];
  var fldr = new Folder(Folder.userData.fullName + "/Aescripts/origami/");
  fldr.create();
  for (var i = 0; i < thisObj.iconsBinaries.length; i += 1) {
    thisObj.iconsFiles[i] = new File(
      fldr.fullName + "/origamiIconFile_" + i + ".png",
    );
    thisObj.iconsFiles[i].encoding = "BINARY";
    thisObj.iconsFiles[i].open("w");
    thisObj.iconsFiles[i].write(thisObj.iconsBinaries[i]);
    thisObj.iconsFiles[i].close();
  }
  var setPrefs = function () {
    if (thisObj.mode == 0) {
      thisObj.pointsEdit = pointsEditBasic.text;
      thisObj.selectSliceAlgorythm = sliceSelectBasic.selection.index;
      thisObj.createMode = createModeLineBasic.children[0].value;
      thisObj.unwrapMode = unwrapModeBasic.children[0].value;
    } else {
      if (thisObj.mode == 1) {
        thisObj.pointsEdit = pointsEditAdvanced.text;
        thisObj.selectSliceAlgorythm = sliceSelectAdvanced.selection.index;
        thisObj.createMode = createModeLineAdvanced.children[0].value;
        thisObj.unwrapMode = unwrapModeAdvanced.children[0].value;
        thisObj.animationDirection = directionColumn.children[0].value;
      }
    }
    thisObj.postRemove = postRemove.value;
    thisObj.offsetOne = offsetOne.value;
    thisObj.colorRangeValue = parseInt(rangeSlider.value);
    thisObj.pointsEdit = pointsEditAdvanced.text;
    thisObj.animRotation = animRotation.value;
    thisObj.animOpacity = animOpacity.value;
    thisObj.animRotationZ = animRotationZ.value;
    thisObj.animTrimPath = animTrimPath.value;
    thisObj.animScale = animScale.value;
    thisObj.animPosition = animPosition.value;
    thisObj.postExplode = postExplode.value;
    thisObj.postCompose = postCompose.value;
    for (var c = 0; c <= 2; c += 1) {
      if (colorGroup.children[c].value === true) {
        thisObj.colorMode = c;
      }
    }
    thisObj.setPrefs();
  };
  var getPrefs = function () {
    thisObj.getPrefs();
    thisObj.createMode = thisObj.createMode === "true";
    thisObj.unwrapMode = thisObj.unwrapMode === "true";
    thisObj.postExplode = thisObj.postExplode === "true";
    thisObj.postCompose = thisObj.postCompose === "true";
    thisObj.postRemove = thisObj.postRemove === "true";
    thisObj.animRotation = thisObj.animRotation === "true";
    thisObj.animOpacity = thisObj.animOpacity === "true";
    thisObj.animScale = thisObj.animScale === "true";
    thisObj.animPosition = thisObj.animPosition === "true";
    thisObj.animRotationZ = thisObj.animRotationZ === "true";
    thisObj.animTrimPath = thisObj.animTrimPath === "true";
    thisObj.updateExpressions = thisObj.updateExpressions === "true";
    thisObj.offsetOne = thisObj.offsetOne === "true";
    thisObj.strokeOnly = thisObj.strokeOnly === "true";
    thisObj.animationDirection = thisObj.animationDirection === "true";
  };
  getPrefs();
  var setMode = function () {
    basicModeGroup.visible = false;
    advancedModeGroup.visible = false;
    settingsModeGroup.visible = false;
    modeBasicIndicator.visible = false;
    settingsIndicator.visible = false;
    modeAdvancedIndicator.visible = false;
    modeBasicText.on.visible = false;
    modeBasicText.off.visible = true;
    modeAdvancedText.on.visible = false;
    modeAdvancedText.off.visible = true;
    if (thisObj.mode == 0) {
      basicModeGroup.visible = true;
      modeBasicIndicator.visible = true;
      modeBasicText.on.visible = true;
      modeBasicText.off.visible = false;
    } else if (thisObj.mode == 1) {
      advancedModeGroup.visible = true;
      modeAdvancedIndicator.visible = true;
      modeAdvancedText.on.visible = true;
      modeAdvancedText.off.visible = false;
      setAdvancedStep();
    } else {
      settingsModeGroup.visible = true;
      settingsIndicator.visible = true;
    }
    thisObj.setPrefs();
  };
  var setAdvancedStep = function () {
    if (thisObj.advancedStep == 0) {
      advancedStepOne.visible = true;
      advancedStepTwo.visible = false;
    } else {
      advancedStepOne.visible = false;
      advancedStepTwo.visible = true;
    }
    thisObj.setPrefs();
  };
  thisObj.ptGUI =
    thisObj instanceof Panel
      ? thisObj
      : new Window(
          "palette{spacing: 0, margins: [0,5,5,10], alignChildren:[\'left\', \'top\']}",
          thisObj.scriptTitle + " v" + thisObj.version,
          undefined,
          { resizeable: true },
        );
  var upperLine = thisObj.ptGUI.add(
    "group{orientation: \'column\', margins: [0,0,0,0], spacing: 0, alighChildren: [\'left\', \'top\']}",
  );
  var modeSelectGroup = upperLine.add(
    "group{orientation: \'row\', margins: [10,0,0,0]}",
  );
  var modeBasicGroup = modeSelectGroup.add(
    "group{margins:[0,3,0,0],orientation: \'column\', spacing: 0}",
  );
  var modeBasicText = modeBasicGroup.add("group{orientation:\'stack\'}");
  modeBasicText.off = modeBasicText
    .add("statictext", undefined, thisObj.names.modeBasic.name)
    .nsSetFG([0.65, 0.65, 0.65, 1])
    .nsSetTip(thisObj.names.modeBasic.tip);
  modeBasicText.on = modeBasicText
    .add("statictext", undefined, thisObj.names.modeBasic.name)
    .nsSetFG([0.8, 0.8, 0.8, 1])
    .nsSetTip(thisObj.names.modeBasic.tip);
  var modeBasicIndicator = modeBasicGroup
    .add("group{margins: [0,5,0,0]}")
    .add("group{preferredSize:[40,2]}")
    .nsSetBG([0.8, 0.8, 0.8, 1]);
  modeBasicGroup.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.mode = 0;
      setMode();
    }
  });
  var modeAdvancedGroup = modeSelectGroup.add(
    "group{margins:[0,3,0,0],orientation: \'column\', spacing: 0}",
  );
  var modeAdvancedText = modeAdvancedGroup.add("group{orientation:\'stack\'}");
  modeAdvancedText.off = modeAdvancedText
    .add("statictext", undefined, origami.names.modeAdvanced.name)
    .nsSetFG([0.65, 0.65, 0.65, 1])
    .nsSetTip(thisObj.names.modeAdvanced.tip);
  modeAdvancedText.on = modeAdvancedText
    .add("statictext", undefined, origami.names.modeAdvanced.name)
    .nsSetFG([0.8, 0.8, 0.8, 1])
    .nsSetTip(thisObj.names.modeAdvanced.tip);
  var modeAdvancedIndicator = modeAdvancedGroup
    .add("group{margins: [0,5,0,0]}")
    .add("group{preferredSize:[75,2]}")
    .nsSetBG([0.8, 0.8, 0.8, 1]);
  modeAdvancedGroup.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.mode = 1;
      setMode();
    }
  });
  var setBttnGroup = modeSelectGroup
    .add("group{margins:[8,0,0,0]}")
    .add("group{orientation: \'column\', spacing: 0}}");
  var setBttn = setBttnGroup
    .add("group{alignChildren:[\'center\',\'center\']}")
    .nsSetIcon(thisObj.iconsBinaries[2]);
  setBttn.preferredSize = [25, 25];
  var settingsIndicator = setBttnGroup
    .add("group{margins: [0,0,0,0]}")
    .add("group{preferredSize:[25,2]}")
    .nsSetBG([0.8, 0.8, 0.8, 1])
    .nsSetTip(thisObj.names.modeSettings.tip);
  setBttn.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.mode = 2;
      setMode();
    }
  });
  var modesGroup = thisObj.ptGUI.add(
    "group{orientation: \'stack\', spacing: 0, margins: [5,3,0,0], alignChildren: [\'left\', \'top\']}",
  );
  modesGroup.preferredSize = [170, 250];
  var basicModeGroup = modesGroup.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], margins: [10,0,0,0]}",
  );
  var sliceSelectBasicGroup = basicModeGroup.add("group{orientation: \'row\'}");
  sliceSelectBasicGroup
    .add("statictext", undefined, thisObj.names.slicesSelect.name)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var sliceSelectBasic = sliceSelectBasicGroup
    .add("dropdownlist", undefined, thisObj.names.slicesSelect.methods)
    .nsSetTip(thisObj.names.slicesSelect.tip);
  sliceSelectBasic.preferredSize = [116, 30];
  sliceSelectBasic.selection = thisObj.selectSliceAlgorythm;
  var pointsEditBasicGroup = basicModeGroup.add(
    "group{orientation: \'row\', margins:[0,10,0,0]}",
  );
  pointsEditBasicGroup
    .add("statictext", undefined, thisObj.names.numPoints.name)
    .nsSetTip(thisObj.names.numPoints.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var pointsEditBasic = pointsEditBasicGroup
    .add("edittext", undefined, "20")
    .nsSetTip(thisObj.names.numPoints.tip);
  pointsEditBasic.text = thisObj.pointsEdit;
  pointsEditBasic.preferredSize = [50, 25];
  basicModeGroup
    .add("group{margins:[0,10,0,5]}")
    .add("statictext", undefined, thisObj.names.createPanel.name)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var createModeLineBasic = basicModeGroup.add("group{orientation: \'row\'}");
  createModeLineBasic
    .add("radiobutton", undefined, thisObj.names.masksCreate.name)
    .nsSetTip(thisObj.names.masksCreate.tip);
  createModeLineBasic
    .add("radiobutton", undefined, thisObj.names.shapesCreate.name)
    .nsSetTip(thisObj.names.shapesCreate.tip);
  createModeLineBasic.children[0].value = thisObj.createMode;
  createModeLineBasic.children[1].value = !thisObj.createMode;
  basicModeGroup
    .add("group{margins:[0,10,0,5]}")
    .add("statictext", undefined, "Animation")
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var unwrapModeBasic = basicModeGroup.add(
    "group{orientation: \'row\', margins:[0,5,0,0]}",
  );
  unwrapModeBasic.add("radiobutton", undefined, "Wave");
  unwrapModeBasic.add("radiobutton", undefined, "Tree");
  unwrapModeBasic.children[0].value = thisObj.unwrapMode;
  unwrapModeBasic.children[1].value = !thisObj.unwrapMode;
  var unwrapBttnGroup = basicModeGroup.add(
    "group{orientation: \'stack\', margins:[0,60,0,0]}",
  );
  unwrapBttnGroup
    .add("group{preferredSize:[155,30]}")
    .nsSetBG([0.4, 0.4, 0.4, 1]);
  var oneClickUnwrap = unwrapBttnGroup.add(
    "button",
    undefined,
    "MESH + ANIMATE",
  );
  oneClickUnwrap.preferredSize = [151, 26];
  var advancedModeGroup = modesGroup.add(
    "group{orientation:\'stack\', spacing: 0, alignChildren: [\'left\', \'top\'], margins: [0,0,0,0]}",
  );
  var advancedStepOne = advancedModeGroup.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], justify: \'left\', margins:[2,0,0,0]}",
  );
  var stepOne_1 = advancedStepOne.add(
    "panel{orientation: \'row\', alignChildren: [\'left\', \'top\'], spacing:0, margins: [0,0,0,5], size: [170,29], preferredSize: [170,29]}",
  );
  stepOne_1
    .add("group{margins:[10,5,0,0]}")
    .add("statictext", undefined, thisObj.names.stepOne.name)
    .nsSetTip(thisObj.names.stepOne.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  stepOne_1
    .add("group{margins:[13,5,5,0]}")
    .add("group{preferredSize:[20,20], alignment:[\'center\', \'center\']}")
    .nsSetIcon(thisObj.iconsBinaries[0]);
  stepOne_1.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.advancedStep = 1;
      setAdvancedStep();
    }
  });
  var overPanel = advancedStepOne.add(
    "group{orientation: \'stack\', spacing:0, margins: [0,0,0,0], alignChildren:[\'left\', \'top\']}",
  );
  var advancedStepOneInside = overPanel.add(
    "panel{orientation: \'column\', spacing:0, margins: [5,5,6,5], preferredSize: [170,200]}",
  );
  var insideGroup1 = advancedStepOneInside.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], margins: [0,0,0,0]}",
  );
  var sliceSelectAdvancedGroup = insideGroup1.add(
    "group{orientation: \'row\', margins:[5,0,0,0]}",
  );
  sliceSelectAdvancedGroup
    .add("statictext", undefined, thisObj.names.slicesSelect.name)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var sliceSelectAdvanced = sliceSelectAdvancedGroup
    .add("group{margins:[10,0,0,0]}")
    .add("dropdownlist", undefined, thisObj.names.slicesSelect.methods)
    .nsSetTip(thisObj.names.slicesSelect.tip);
  sliceSelectAdvanced.preferredSize = [100, 30];
  sliceSelectAdvanced.selection = thisObj.selectSliceAlgorythm;
  var pointsEditAdvancedGroup = insideGroup1.add(
    "group{orientation: \'row\', margins:[5,5,0,0]}",
  );
  pointsEditAdvancedGroup
    .add("statictext", undefined, thisObj.names.numPoints.name)
    .nsSetTip(thisObj.names.numPoints.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var pointsEditAdvanced = pointsEditAdvancedGroup
    .add("edittext", undefined, "20")
    .nsSetTip(thisObj.names.numPoints.tip);
  pointsEditAdvanced.text = thisObj.pointsEdit;
  pointsEditAdvanced.preferredSize = [45, 25];
  insideGroup1
    .add("group{margins:[5,10,0,0]}")
    .add("statictext", undefined, thisObj.names.createPanel.name)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var createModeLineAdvanced = insideGroup1.add(
    "group{orientation: \'row\', margins:[5,5,0,0]}",
  );
  createModeLineAdvanced
    .add("radiobutton", undefined, thisObj.names.masksCreate.name)
    .nsSetTip(thisObj.names.masksCreate.tip);
  createModeLineAdvanced
    .add("radiobutton", undefined, thisObj.names.shapesCreate.name)
    .nsSetTip(thisObj.names.shapesCreate.tip);
  createModeLineAdvanced.children[0].value = thisObj.createMode;
  createModeLineAdvanced.children[1].value = !thisObj.createMode;
  var postExplode = insideGroup1
    .add("group{margins:[5,10,0,0]}")
    .add("checkbox", undefined, thisObj.names.postExplode.name)
    .nsSetTip(thisObj.names.postExplode.tip);
  postExplode.value = thisObj.postExplode;
  var sliceBttnGroup = insideGroup1
    .add("group{alignment:[\'center\', \'center\']}")
    .add("group{orientation: \'stack\', margins: [0,10,0,0]}");
  sliceBttnGroup
    .add("group{preferredSize: [149,30]}")
    .nsSetBG([0.4, 0.4, 0.4, 1]);
  var sliceBttn = sliceBttnGroup
    .add("button", undefined, thisObj.names.createMeshBttn.name)
    .nsSetTip(thisObj.names.createMeshBttn.tip);
  sliceBttn.size = [145, 26];
  var stepTwo_1 = advancedStepOne.add(
    "panel{orientation: \'row\', alignChildren: [\'left\', \'center\'], spacing:0, margins: [0,2,0,5], size: [170,29], preferredSize: [170,29]}",
  );
  stepTwo_1
    .add("group{margins:[10,0,0,0]}")
    .add("statictext", undefined, thisObj.names.stepTwo.name)
    .nsSetTip(thisObj.names.stepTwo.tip);
  stepTwo_1
    .add("group{margins:[49,0,5,0]}")
    .add("group{preferredSize:[20,20], alignment:[\'center\', \'center\']}")
    .nsSetIcon(thisObj.iconsBinaries[1]);
  stepTwo_1.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.advancedStep = 1;
      setAdvancedStep();
    }
  });
  var hints = {
    hint1: { margins: [], reverse: false, size: [], text: "" },
    hint2: { margins: [], reverse: false, size: [], text: "" },
    hint3: {
      margins: [0, 70, 0, 0],
      reverse: false,
      size: [165, 40],
      text: "Set number of points\nto fill mesh with fragments.\nMore points = more fragments",
    },
    hint4: {
      margins: [0, 120, 0, 0],
      reverse: false,
      size: [165, 40],
      text: "Create Shape Layers\nor layer copies with Masks",
    },
    hint5: {
      margins: [0, 45, 0, 0],
      reverse: false,
      size: [165, 40],
      text: "Create lots of fragments\nor only one layer",
    },
    hint6: {
      margins: [0, 60, 0, 0],
      reverse: true,
      size: [165, 40],
      text: "Now select a Shape layer or\na layer with a mask and\nclick the button",
    },
  };
  var advancedStepTwo = advancedModeGroup.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], justify: \'left\', margins:[2,0,0,0]}",
  );
  var stepOne_2 = advancedStepTwo.add(
    "panel{orientation: \'row\', alignChildren: [\'left\', \'top\'], spacing:0, margins: [0,0,0,5], size: [170,29], preferredSize: [170,29]}",
  );
  stepOne_2
    .add("group{margins:[10,5,0,0]}")
    .add("statictext", undefined, thisObj.names.stepOne.name)
    .nsSetTip(thisObj.names.stepOne.tip);
  stepOne_2
    .add("group{margins:[13,3,5,0]}")
    .add("group{preferredSize:[20,20], alignment:[\'center\', \'center\']}")
    .nsSetIcon(thisObj.iconsBinaries[1]);
  stepOne_2.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.advancedStep = 0;
      setAdvancedStep();
    }
  });
  var stepTwo_2 = advancedStepTwo.add(
    "panel{orientation: \'row\', alignChildren: [\'left\', \'center\'], spacing:0, margins: [0,2,0,3], size: [170,29], preferredSize: [170,29]}",
  );
  stepTwo_2
    .add("group{margins:[10,0,0,0]}")
    .add("statictext", undefined, thisObj.names.stepTwo.name)
    .nsSetFG([0.8, 0.8, 0.8, 1])
    .nsSetTip(thisObj.names.stepTwo.tip);
  stepTwo_2
    .add("group{margins:[49,3,5,0]}")
    .add("group{preferredSize:[20,20], alignment:[\'center\', \'center\']}")
    .nsSetIcon(thisObj.iconsBinaries[0]);
  stepTwo_2.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      setPrefs();
      thisObj.advancedStep = 0;
      setAdvancedStep();
    }
  });
  var advancedStepTwoInside = advancedStepTwo.add(
    "panel{orientation: \'column\', spacing:0, margins: [6,5,6,5], preferredSize: [170,200]}",
  );
  var insideGroup2 = advancedStepTwoInside.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], margins: [0,0,0,0]}",
  );
  var lineOne = insideGroup2.add(
    "group{orientation:\'row\', margins:[5,0,0,0], alignChildren: [\'left\', \'top\']}",
  );
  var col1 = lineOne.add(
    "group{orientation:\'column\', margins:[0,0,0,0], spacing: 0, alignChildren: [\'left\', \'top\']}",
  );
  col1
    .add("statictext", undefined, thisObj.names.directionColumn.name)
    .nsSetTip(thisObj.names.directionColumn.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var directionColumn = col1.add(
    "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], spacing: 2, margins:[0,5,0,0]}",
  );
  directionColumn.add("radiobutton", undefined, "In");
  directionColumn.add("radiobutton", undefined, "Out");
  directionColumn.children[0].value = thisObj.animationDirection;
  directionColumn.children[1].value = !thisObj.animationDirection;
  var col2 = lineOne.add(
    "group{orientation:\'column\', margins:[19,0,0,0], spacing: 0, alignChildren: [\'left\', \'top\']}",
  );
  col2
    .add("statictext", undefined, thisObj.names.animationMethod.name)
    .nsSetTip(thisObj.names.animationMethod.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var unwrapModeAdvanced = col2.add(
    "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], spacing: 2, margins:[0,5,0,0]}",
  );
  unwrapModeAdvanced
    .add("radiobutton", undefined, thisObj.names.methodGreedy.name)
    .nsSetTip(thisObj.names.methodGreedy.tip);
  unwrapModeAdvanced
    .add("radiobutton", undefined, thisObj.names.methodRandom.name)
    .nsSetTip(thisObj.names.methodRandom.tip);
  unwrapModeAdvanced.children[0].value = thisObj.unwrapMode;
  unwrapModeAdvanced.children[1].value = !thisObj.unwrapMode;
  insideGroup2
    .add("group{margins:[5,10,0,0]}")
    .add("statictext", undefined, thisObj.names.animationEffects.name)
    .nsSetTip(thisObj.names.animationEffects.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var lineTwo = insideGroup2.add(
    "group{orientation:\'row\', margins:[5,10,0,0]}",
  );
  var effectsColOne = lineTwo.add(
    "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins:[0,0,0,0], spacing: 3}",
  );
  var animRotation = effectsColOne.add("checkbox", undefined, "Rotate X");
  var animRotationZ = effectsColOne.add("checkbox", undefined, "Rotate Z");
  var animOpacity = effectsColOne.add("checkbox", undefined, "Opacity");
  var effectsColTwo = lineTwo.add(
    "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins:[5,0,0,0], spacing: 3}",
  );
  var animScale = effectsColTwo.add("checkbox", undefined, "Scale");
  var animPosition = effectsColTwo.add("checkbox", undefined, "Position");
  var animTrimPath = effectsColTwo
    .add("checkbox", undefined, "Trim Path")
    .nsSetTip("Works only for Shape Layers");
  animRotation.value = thisObj.animRotation;
  animOpacity.value = thisObj.animOpacity;
  animScale.value = thisObj.animScale;
  animPosition.value = thisObj.animPosition;
  animRotationZ.value = thisObj.animRotationZ;
  animTrimPath.value = thisObj.animTrimPath;
  if (thisObj.kekPuk) {
    animTrimPath.enabled = false;
    animRotationZ.enabled = false;
  }
  var bttnsLine = insideGroup2.add(
    "group{orientation:\'row\', margins: [5,10,0,0], spacing: 0}",
  );
  var animateBttnGroup = bttnsLine.add(
    "group{orientation: \'stack\', margins:[0,0,0,0]}",
  );
  animateBttnGroup
    .add("group{preferredSize:[70,30]}")
    .nsSetBG([0.4, 0.4, 0.4, 1]);
  var animateBttn = animateBttnGroup.add("button", undefined, "ANIMATE");
  animateBttn.preferredSize = [66, 26];
  var updateBttnGroup = bttnsLine.add(
    "group{orientation: \'stack\', margins:[8,0,0,0]}",
  );
  updateBttnGroup
    .add("group{preferredSize:[70,30]}")
    .nsSetBG([0.4, 0.4, 0.4, 1]);
  var updateBttn = updateBttnGroup
    .add("button", undefined, thisObj.names.updateBttn.name)
    .nsSetTip(thisObj.names.updateBttn.tip);
  updateBttn.preferredSize = [66, 26];
  var settingsModeGroup = modesGroup.add(
    "group{orientation:\'column\', spacing: 0, alignChildren: [\'left\', \'top\'], margins: [0,0,0,0]}",
  );
  var setOneGroup = settingsModeGroup.add(
    "group{orientation:\'column\', margins:[5,0,0,0] alignChildren: [\'left\', \'top\'], spacing:0}",
  );
  var lowLine = setOneGroup.add("group{orientation: \'row\'}");
  var postRemove = lowLine
    .add("group{margins:[0,5,0,0]}")
    .add("checkbox", undefined, thisObj.names.postRemove.name)
    .nsSetTip(thisObj.names.postRemove.tip);
  var watSign = lowLine
    .add("group{orientation: \'row\', margins: [10,0,0,0]}")
    .add("statictext", undefined, "?");
  watSign.addEventListener("mouseup", function (k) {
    if (k.button == 0) {
      thisObj.buildWatUI(thisObj);
    }
  });
  var postCompose = setOneGroup
    .add("group{margins:[0,3,0,0]}")
    .add("checkbox", undefined, thisObj.names.postCompose.name)
    .nsSetTip(thisObj.names.postCompose.tip);
  var offsetOne = setOneGroup
    .add("group{margins:[0,10,0,0]}")
    .add("checkbox", undefined, thisObj.names.offsetOne.name)
    .nsSetTip(thisObj.names.offsetOne.tip);
  postRemove.value = thisObj.postRemove;
  postCompose.value = thisObj.postCompose;
  offsetOne.value = thisObj.offsetOne;
  settingsModeGroup
    .add("group{margins:[0,5,0,0]}")
    .add("panel{margins:[0,0,0,0], spacing:0}", [0, 0, 170, 1]);
  settingsModeGroup
    .add("group{margins:[5,10,0,0]}")
    .add("statictext", undefined, thisObj.names.colorSettings.name)
    .nsSetTip(thisObj.names.colorSettings.tip)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  var colorGroup = settingsModeGroup.add(
    "group{orientation:\'column\', margins:[5,10,0,0] alignChildren: [\'left\', \'top\'], spacing:2}",
  );
  colorGroup.add("radiobutton", undefined, "Original color");
  colorGroup.add("radiobutton", undefined, "Random color");
  colorGroup.add("radiobutton", undefined, "Shades of original color");
  for (var c = 0; c <= 2; c += 1) {
    if (thisObj.colorMode == c) {
      colorGroup.children[c].value = true;
    } else {
      colorGroup.children[c].value = false;
    }
  }
  var rangeGroup = settingsModeGroup.add(
    "group{orientation:\'column\', alignChildren:[\'center\', \'center\'], margins:[10,10,0,0], spacing:0}",
  );
  rangeEditRow = rangeGroup.add("group{orientation:\'row\'}");
  rangeEditRow.add("statictext", undefined, "Color Variation");
  var rangeEdit = rangeEditRow
    .add("group{margins:[30,0,0,0]}")
    .add("statictext", undefined, 50)
    .nsSetFG([0.8, 0.8, 0.8, 1]);
  rangeEdit.size = [30, 25];
  rangeEdit.text = String(thisObj.colorRangeValue) + "%";
  var rangeSlider = rangeGroup.add("slider{minvalue: 1, maxvalue:99}");
  rangeSlider.value = thisObj.colorRangeValue;
  rangeSlider.size = [150, 10];
  rangeSlider.onChanging = function () {
    rangeEdit.text = String(parseInt(this.value)) + "%";
  };
  var recolorBttnGroup = settingsModeGroup.add(
    "group{orientation: \'stack\', margins:[10,10,0,0]}",
  );
  recolorBttnGroup
    .add("group{preferredSize:[150,30]}")
    .nsSetBG([0.4, 0.4, 0.4, 1]);
  var recolorBttn = recolorBttnGroup
    .add("button", undefined, thisObj.names.recolorBttn.name)
    .nsSetTip(thisObj.names.recolorBttn.tip);
  recolorBttn.preferredSize = [146, 26];
  if (thisObj.kekPuk) {
    recolorBttn.enabled = false;
    rangeSlider.enabled = false;
  }
  pointsEditBasic.onChanging = pointsEditAdvanced.onChanging = function () {
    if (this.text != this.text.match(/(\d*)/)[0]) {
      this.text = this.text.match(/(\d*)/)[0];
    }
    if (thisObj.kekPuk) {
      if (Number(this.text) > 20) {
        this.text = 20;
        alert("Trial version is limited to 20 points per object");
      }
    }
  };
  oneClickUnwrap.onClick = function () {
    app.beginUndoGroup("Slice and unwrap");
    thisObj.meshGen(
      Number(pointsEditBasic.text),
      sliceSelectBasic.selection.index,
      createModeLineBasic.children[0].value,
      true,
      Boolean(postRemove.value),
      Boolean(offsetOne.value),
      false,
      thisObj.colorMode,
      false,
    );
    thisObj.unwrap(thisObj, unwrapModeBasic.children[1].value, false, false, [
      true,
      true,
      false,
      false,
    ]);
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
      thisObj.createControls(
        thisObj,
        activeComp,
        true,
        true,
        false,
        false,
        false,
        false,
      );
    }
    app.endUndoGroup();
    setPrefs();
  };
  recolorBttn.onClick = function () {
    setPrefs();
    app.beginUndoGroup("Recoloring Shapes");
    thisObj.recolor(null, thisObj.colorMode, thisObj.colorRangeValue);
    app.endUndoGroup();
  };
  sliceBttn.onClick = function () {
    app.beginUndoGroup("Creating Mesh");
    thisObj.meshGen(
      Number(pointsEditAdvanced.text),
      sliceSelectAdvanced.selection.index,
      createModeLineAdvanced.children[0].value,
      Boolean(postExplode.value),
      Boolean(postRemove.value),
      Boolean(offsetOne.value),
      false,
      thisObj.colorMode,
      thisObj.colorRangeValue,
      thisObj.postCompose,
    );
    app.endUndoGroup();
    setPrefs();
  };
  animateBttn.onClick = function () {
    app.beginUndoGroup("Animating Slices");
    thisObj.unwrap(
      thisObj,
      unwrapModeAdvanced.children[1].value,
      false,
      directionColumn.children[1].value,
      [
        animRotation.value,
        animOpacity.value,
        animScale.value,
        animPosition.value,
        animRotationZ.value,
        animTrimPath.value,
      ],
    );
    if (origami.activeGraph.vertices.length > 0) {
      var activeComp = app.project.activeItem;
      if (activeComp && activeComp instanceof CompItem) {
        thisObj.createControls(
          thisObj,
          activeComp,
          animRotation.value,
          animOpacity.value,
          animScale.value,
          animPosition.value,
          animRotationZ.value,
          animTrimPath.value,
          directionColumn.children[1].value,
          false,
          false,
        );
      }
      setPrefs();
    } else {
      alert("Create a mesh first!");
    }
    app.endUndoGroup();
  };
  updateBttn.onClick = function () {
    var tmp = app.project.activeItem;
    if (tmp && tmp instanceof CompItem) {
      var activeComp = tmp;
    }
    if (thisObj.activeGraph && thisObj.activeGraph.comp == activeComp) {
      if (origami.activeGraph.vertices.length > 0) {
        app.beginUndoGroup("Updating expressions");
        if (directionColumn.children[0].value) {
          if (thisObj.activeGraph.bondsReversed) {
            thisObj.activeGraph.reverseParenting();
          }
        } else {
          if (!thisObj.activeGraph.bondsReversed) {
            thisObj.activeGraph.reverseParenting();
          }
        }
        thisObj.applyExpressions(thisObj.activeGraph, [
          animRotation.value,
          animOpacity.value,
          animScale.value,
          animPosition.value,
          animRotationZ.value,
          animTrimPath.value,
        ]);
        thisObj.relinkMainNull(activeComp, false);
        thisObj.createControls(
          thisObj,
          activeComp,
          animRotation.value,
          animOpacity.value,
          animScale.value,
          animPosition.value,
          animRotationZ.value,
          animTrimPath.value,
          directionColumn.children[1].value,
          false,
          false,
        );
        thisObj.relinkMainNull(activeComp, true);
        app.endUndoGroup();
        setPrefs();
      }
    } else {
      thisObj.activeGraph = thisObj.buildGraph(activeComp, true);
      if (thisObj.activeGraph && thisObj.activeGraph.vertices.length > 0) {
        app.beginUndoGroup("Updating expressions");
        if (directionColumn.children[0].value) {
          if (thisObj.activeGraph.bondsReversed) {
            thisObj.activeGraph.reverseParenting();
          }
        } else {
          if (!thisObj.activeGraph.bondsReversed) {
            thisObj.activeGraph.reverseParenting();
          }
        }
        thisObj.applyExpressions(thisObj.activeGraph, [
          animRotation.value,
          animOpacity.value,
          animScale.value,
          animPosition.value,
        ]);
        thisObj.relinkMainNull(activeComp, false);
        thisObj.createControls(
          thisObj,
          activeComp,
          animRotation.value,
          animOpacity.value,
          animScale.value,
          animPosition.value,
          animRotationZ.value,
          animTrimPath.value,
          directionColumn.children[1].value,
          false,
          false,
        );
        thisObj.relinkMainNull(activeComp, true);
        app.endUndoGroup();
        setPrefs();
      } else {
        alert("Animate mesh first!");
      }
    }
  };
  setMode();
  setAdvancedStep();
  if (thisObj.ptGUI instanceof Window) {
    thisObj.ptGUI.center();
    thisObj.ptGUI.show();
  } else {
    thisObj.ptGUI.layout.layout(true);
  }
};
origami.iconsBinaries = [
  __BLOB__BLOB_000003__,
  __BLOB__BLOB_000004__,
  __BLOB__BLOB_000005__,
  __BLOB__BLOB_000006__,
];
origami.buildWatUI = function (thisObj) {
  thisObj.oriWAT = new Window(
    "palette",
    "Origami v" + thisObj.version,
    undefined,
    { resizeable: false },
  );
  thisObj.oriWAT.alignChildren = ["left", "top"];
  var logoFile = [__BLOB__BLOB_000007__];
  var fldr = new Folder(Folder.userData.fullName + "/Aescripts/origami/");
  fldr.create();
  iconFile = new File(fldr.fullName + "/origamiIconFileWat.png");
  iconFile.encoding = "BINARY";
  iconFile.open("w");
  iconFile.write(logoFile[0]);
  iconFile.close();
  origami.link1 = origami.prefix + "http://aescripts.com/origami/";
  origami.link2 = origami.prefix + "http://twitter.com/extrabitesoft/";
  var mainGroup = thisObj.oriWAT.add(
    "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], spacing: 0}",
  );
  mainGroup.add("image", undefined, iconFile);
  var howToGroup = mainGroup.add(
    "group{orientation:\'column\',alignChildren:[\'left\', \'top\'], margins:[0,10,0,0], spacing: 5}",
  );
  howToGroup.add(
    "statictext",
    undefined,
    "Origami is the mesh generaiton and animation tool for After Effects. It works with Photos, Videos, Masks and Shape Layers as a source.\n\nFor more information and tutorials, refer to the",
    { multiline: true },
  );
  howToGroup
    .add("statictext", undefined, "Product page on aescripts")
    .nsSetFG([67, 170, 207, 255] / 255)
    .addEventListener("mouseup", function (k) {
      if (k.button == 0) {
        system.callSystem(thisObj.link1);
      }
    });
  howToGroup
    .add("group{margins:[0,10,0,0]}")
    .add(
      "statictext",
      undefined,
      "For any questions or lightning fast support:",
      { multiline: true },
    );
  howToGroup
    .add("statictext", undefined, "Hit us up on Twitter")
    .nsSetFG([67, 170, 207, 255] / 255)
    .addEventListener("mouseup", function (k) {
      if (k.button == 0) {
        system.callSystem(thisObj.link2);
      }
    });
  if (thisObj.kekPuk === false) {
    howToGroup.add("statictext", undefined, "");
    howToGroup
      .add("statictext", undefined, origami.jsx_Registered, { multiline: true })
      .nsSetFG([0.4, 0.4, 0.4, 1]);
  } else {
    howToGroup
      .add(
        "statictext",
        undefined,
        "\nYOU ARE IN TRIAL MODE\n-Points number is limited to 20\n-You can\'t recolor fragments\n-Rotation Z and Trim Path are disabled",
        { multiline: true },
      )
      .nsSetFG([0.4, 0.4, 0.4, 1]);
  }
  if (thisObj.oriWAT instanceof Window) {
    thisObj.oriWAT.center();
    thisObj.oriWAT.show();
  } else {
    thisObj.oriWAT.layout.layout(true);
  }
};
origami.expressionControls = {
  control0: {
    defaultValue: 3,
    expression: "",
    keys: {},
    name: origami.names.delayControl,
    pseudoString: [
      "Slider",
      origami.names.delayControl,
      false,
      2,
      -100,
      -100,
      3,
      100,
      100,
      1,
      true,
    ],
    type: "ADBE Slider Control",
  },
  control1: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: 130 },
        2: { easing: "easein", time: 10, value: 0 },
      },
      outAnimation: {
        1: { easing: "easeout", time: 0, value: 0 },
        2: { easing: "easein", time: 10, value: 140 },
      },
    },
    name: origami.names.xRotControl,
    pseudoString: ["Angle", origami.names.xRotControl, false, 2, 0],
    type: "ADBE Angle Control",
  },
  control2: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: 0 },
        2: { easing: "easein", time: 3, value: 100 },
      },
      outAnimation: {
        1: { easing: "easeout", time: 8, value: 100 },
        2: { easing: null, time: 10, value: 0 },
      },
    },
    name: origami.names.opacityControl,
    pseudoString: [
      "Slider",
      origami.names.opacityControl,
      false,
      2,
      0,
      0,
      0,
      100,
      100,
      1,
      true,
    ],
    type: "ADBE Slider Control",
  },
  control3: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: 0 },
        2: { easing: "easein", time: 8, value: 100 },
      },
      outAnimation: {
        1: { easing: "easeout", time: 0, value: 100 },
        2: { easing: null, time: 10, value: 0 },
      },
    },
    name: origami.names.scaleControl,
    pseudoString: [
      "Slider",
      origami.names.scaleControl,
      false,
      2,
      -200,
      -200,
      100,
      200,
      200,
      1,
      true,
    ],
    type: "ADBE Slider Control",
  },
  control4: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: [200, 200] },
        2: { easing: "easein", time: 10, value: [0, 0] },
      },
      outAnimation: {
        1: { easing: "easeout", time: 0, value: [0, 0] },
        2: { easing: null, time: 10, value: [200, 200] },
      },
    },
    name: origami.names.positionControl,
    pseudoString: ["Point", origami.names.positionControl, false, 2, 0, 0],
    type: "ADBE Point Control",
  },
  control5: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: 50 },
        2: { easing: "easein", time: 10, value: 0 },
      },
      outAnimation: {
        1: { easing: "easeout", time: 0, value: 0 },
        2: { easing: "easein", time: 10, value: 50 },
      },
    },
    name: origami.names.zRotControl,
    pseudoString: ["Angle", origami.names.zRotControl, false, 2, 0],
    type: "ADBE Angle Control",
  },
  control6: {
    defaultValue: undefined,
    expression: "",
    keys: {
      inAnimation: {
        1: { easing: null, time: 0, value: 0 },
        2: { easing: "easein", time: 8, value: 100 },
      },
      outAnimation: {
        1: { easing: "easeout", time: 0, value: 100 },
        2: { easing: null, time: 10, value: 0 },
      },
    },
    name: origami.names.trimPathControl,
    pseudoString: [
      "Slider",
      origami.names.trimPathControl,
      false,
      2,
      0,
      0,
      0,
      100,
      100,
      1,
      true,
    ],
    type: "ADBE Slider Control",
  },
};
origami.createControls = function (
  thisObj,
  _comp,
  rotation,
  opacity,
  scale,
  position,
  rotZ,
  trimPath,
  out,
  leaveIt,
  update,
) {
  function setKeysNEW(effect, _controls, inout) {
    var easeIn = new KeyframeEase(0.5, 50);
    var easeOut = new KeyframeEase(0.75, 85);
    var newProp = effect;
    if (_controls.defaultValue != undefined) {
      newProp.setValue(_controls.defaultValue);
    }
    newProp.expression = _controls.expression;
    var newKeys = _controls.keys[inout];
    if (newKeys) {
      for (var key in newKeys) {
        if (!(newKeys[key] instanceof Function)) {
          var newKeyIndex = newProp.addKey(
            Number(newKeys[key].time) * _comp.frameDuration,
          );
          newProp.setValueAtKey(newKeyIndex, newKeys[key].value);
          if (newKeys[key].easing) {
            newProp.setTemporalEaseAtKey(newKeyIndex, [easeIn], [easeOut]);
            if (newKeys[key].easing == "easein") {
              newProp.setInterpolationTypeAtKey(
                newKeyIndex,
                KeyframeInterpolationType.BEZIER,
                KeyframeInterpolationType.LINEAR,
              );
            } else if (newKeys[key].easing == "easeout") {
              newProp.setInterpolationTypeAtKey(
                newKeyIndex,
                KeyframeInterpolationType.LINEAR,
                KeyframeInterpolationType.BEZIER,
              );
            } else {
              if (newKeys[key].easing == "easyease") {
                newProp.setInterpolationTypeAtKey(
                  newKeyIndex,
                  KeyframeInterpolationType.BEZIER,
                  KeyframeInterpolationType.BEZIER,
                );
              }
            }
          }
        }
      }
    }
  }
  var inout = "inAnimation";
  if (out) {
    inout = "outAnimation";
  }
  var controlLayer = _comp.layer(origami.names.controlLayer);
  if (!controlLayer) {
    controlLayer = _comp.layers.addNull();
    controlLayer.name = origami.names.controlLayer;
    controlLayer
      .property("ADBE Transform Group")
      .property("ADBE Anchor Point")
      .setValue([50, 50]);
    controlLayer.moveToBeginning();
    controlLayer.threeDLayer = true;
    controlLayer.label = 2;
  } else {
    controlLayer.moveToBeginning();
  }
  var controls = [];
  var controlsEnabled = [
    true,
    rotation,
    opacity,
    scale,
    position,
    rotZ,
    trimPath,
  ];
  for (var key in origami.expressionControls) {
    if (!(origami.expressionControls[key] instanceof Function)) {
      controls.push(origami.expressionControls[key]);
    }
  }
  var tmp = controlLayer.findEffectByName(origami.names.controlName);
  if (tmp) {
    tmp.remove();
  }
  for (var l = 1; l <= _comp.layers.length; l += 1) {
    _comp.layers[l].selected = false;
  }
  controlLayer.selected = true;
  customPreset = [];
  customPreset.push(["Effect", origami.names.controlName]);
  var effectMatchName = "OrigamiFX_";
  for (var c = 0; c < controls.length; c += 1) {
    if (controlsEnabled[c]) {
      customPreset.push(controls[c].pseudoString);
    }
  }
  var preset = origami.Generator_FFX(customPreset, effectMatchName);
  var presetString = preset.str;
  var presetString = preset.str;
  effectMatchName = preset.mn;
  var presetFile = new File(origami.presetString);
  if (presetFile.exists) {
    presetFile.remove();
  }
  if (!presetFile.exists) {
    presetFile.encoding = "binary";
    presetFile.open("w");
    presetFile.write(decodeURIComponent(presetString));
    presetFile.close();
  }
  controlLayer.applyPreset(presetFile);
  for (var c = 0; c < controls.length; c += 1) {
    if (controlsEnabled[c]) {
      effect = controlLayer
        .property("ADBE Effect Parade")
        .property(effectMatchName)
        .property(controls[c].name);
      setKeysNEW(effect, controls[c], inout);
    }
  }
  thisObj.activeGraph.parentStartVertices(controlLayer, update);
};
origami.posExpression = {};
origami.expressions = {
  opacity:
    'function getParentDepth(out){if(out === false) l = thisLayer.name.split("\t")[1];else l = thisLayer.name.split("\t")[2];if(l!=undefined) return Number(l);else return 0;}try{if(toCompVec([0, 0, 1])[2] > 0){var control = thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    ");var d = getParentDepth(false);var o = control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.opacityControl +
    '"' +
    ");t1 = time;n = 0;sign = -1;if (control.marker.numKeys > 0){n = control.marker.nearestKey(time).index; if (control.marker.key(n).time > time) n--;} if (n > 0){t = time-control.marker.key(n).time;if(n%2==1){lastKeyTime = o.key(o.numKeys).time;t1 = lastKeyTime-t;d = getParentDepth(true);sign = 1;}else{t1 = t + o.key(1).time;}}o.valueAtTime(t1 + sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ")*thisComp.frameDuration);}else 0;}catch(err){0}",
  position:
    'function getParentDepth(e){if(e===!1)var t=thisLayer.name.split("\t")[1];else var t=thisLayer.name.split("\t")[2];return void 0!=t?Number(t):0}try{var control=thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    "),d=getParentDepth(!1),r=control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.positionControl +
    '"' +
    "),sign=-1,n=0,t1=time;if(control.marker.numKeys>0){n=control.marker.nearestKey(time).index;control.marker.key(n).time>time&&n--}if(n>0){t=time-control.marker.key(n).time;if(n%2==1){lastKeyTime=r.key(r.numKeys).time;t1=lastKeyTime-t;d=getParentDepth(!0);sign=1}else t1=t+r.key(1).time}value+r.valueAtTime(t1+sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ")*thisComp.frameDuration)}catch(err){value}",
  rotX:
    'function getParentDepth(e){if(e===!1)var t=thisLayer.name.split("\t")[1];else var t=thisLayer.name.split("\t")[2];return void 0!=t?Number(t):0}try{var control=thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    "),d=getParentDepth(!1),r=control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.xRotControl +
    '"' +
    ");t1=time;n=0;sign=-1;if(control.marker.numKeys>0){n=control.marker.nearestKey(time).index;control.marker.key(n).time>time&&n--}if(n>0){t=time-control.marker.key(n).time;if(n%2==1){lastKeyTime=r.key(r.numKeys).time;t1=lastKeyTime-t;d=getParentDepth(!0);sign=1}else t1=t+r.key(1).time}r.valueAtTime(t1+sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ")*thisComp.frameDuration)}catch(err){value}",
  rotZ:
    'function getParentDepth(e){if(e===!1)var t=thisLayer.name.split("\t")[1];else var t=thisLayer.name.split("\t")[2];return void 0!=t?Number(t):0}try{var control=thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    "),d=getParentDepth(!1),r=control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.zRotControl +
    '"' +
    ");t1=time;n=0;sign=-1;if(control.marker.numKeys>0){n=control.marker.nearestKey(time).index;control.marker.key(n).time>time&&n--}if(n>0){t=time-control.marker.key(n).time;if(n%2==1){lastKeyTime=r.key(r.numKeys).time;t1=lastKeyTime-t;d=getParentDepth(!0);sign=1}else t1=t+r.key(1).time}value-r.valueAtTime(t1+sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ")*thisComp.frameDuration)}catch(err){value}",
  scale:
    'function getParentDepth(e){if(e===!1)var t=thisLayer.name.split("\t")[1];else var t=thisLayer.name.split("\t")[2];return void 0!=t?Number(t):0}try{var control=thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    "),d=getParentDepth(!1),r=control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.scaleControl +
    '"' +
    "),sign=-1,n=0,t1=time;if(control.marker.numKeys>0){n=control.marker.nearestKey(time).index;control.marker.key(n).time>time&&n--}if(n>0){t=time-control.marker.key(n).time;if(n%2==1){lastKeyTime=r.key(r.numKeys).time;t1=lastKeyTime-t;d=getParentDepth(!0);sign=1}else t1=t+r.key(1).time}r.valueAtTime(t1+sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ')*thisComp.frameDuration)*[thisLayer("ADBE Transform Group")("ADBE Scale")[0],thisLayer("ADBE Transform Group")("ADBE Scale")[1]]/100}catch(err){value}',
  trimPath:
    'function getParentDepth(e){if(e===!1)var t=thisLayer.name.split("\t")[1];else var t=thisLayer.name.split("\t")[2];return void 0!=t?Number(t):0}try{var control=thisComp.layer("' +
    origami.names.controlLayer +
    '"' +
    "),d=getParentDepth(!1),r=control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.trimPathControl +
    '"' +
    ");t1=time;n=0;sign=-1;if(control.marker.numKeys>0){n=control.marker.nearestKey(time).index;control.marker.key(n).time>time&&n--}if(n>0){t=time-control.marker.key(n).time;if(n%2==1){lastKeyTime=r.key(r.numKeys).time;t1=lastKeyTime-t;d=getParentDepth(!0);sign=1}else t1=t+r.key(1).time}r.valueAtTime(time+sign*d*control.effect(" +
    '"' +
    origami.names.controlName +
    '"' +
    ")(" +
    '"' +
    origami.names.delayControl +
    '"' +
    ")*thisComp.frameDuration)}catch(err){value}",
};
origami.Generator_FFX = function (new_arr0, myName) {
  function parTparn(ID, new_arr0) {
    var pt = "parTparn%00%00%00%04" + HexEncodeURI(new_arr0.length, 4);
    var data = "";
    for (var i = 0; i < new_arr0.length; i += 1) {
      temp = i;
      while (temp.length < 4) {
        temp = "0" + temp;
      }
      data =
        data +
        "tdmn%00%00%00(" +
        FixedLength(ID + "-" + temp, 40) +
        pard(new_arr0[i]);
    }
    return pt + data;
  }
  function tdgptdsb(ID, new_arr0, lName) {
    var td = "tdgptdsb%00%00%00%04%00%00%00%01tdsn" + lName;
    var tdEnd = "tdmn%00%00%00(ADBE%20Group%20End" + Zeros(26);
    var data = "";
    for (var i = 0; i < new_arr0.length; i += 1) {
      temp = i;
      while (temp.length < 4) {
        temp = "0" + temp;
      }
      data =
        data +
        "tdmn%00%00%00(" +
        FixedLength(ID + "-" + temp, 40) +
        tdgp(new_arr0[i]);
    }
    return td + data + tdEnd;
  }
  function tdgp(arr1) {
    var temp = "%00%00%5D%C2%A8" + Zeros(108) + "cdat";
    var lName =
      arr1[0] === "GroupEnd" ? "%00%00%00%01%00%00" : LengthName(arr1[1]);
    var tdbstdsb =
      "tdbstdsb%00%00%00%04%00%00%00%01tdsn" +
      lName +
      "tdb4%00%00%00%7C%C2%BD%C2%99%00%01%00%01%00%00%00%01%00";
    var ret = "";
    var value = "";
    if (arr1[0] == "Checkbox" || arr1[0] == "Angle" || arr1[0] == "Popup") {
      ret =
        tdbstdsb +
        ExtTimer(arr1[3]) +
        temp +
        "%00%00%00(" +
        FixedLength(toDouble(arr1[4]));
    } else if (arr1[0] == "Color") {
      for (var i = 0; i < 6; i = i + 2) {
        value = value + toDouble(parseInt(arr1[4].substr(i, 2), 16));
      }
      tdbstdsb =
        "tdbstdsb%00%00%00%04%00%00%00%01tdsn" +
        lName +
        "tdb4%00%00%00%7C%C2%BD%C2%99%00%04%00%07%00%00%00%01%00";
      ret =
        tdbstdsb +
        ExtTimer(arr1[3]) +
        temp +
        "%00%00%00%60" +
        FixedLength("@o%C3%A0" + Zeros(5) + value, 96);
    } else if (arr1[0] == "Point") {
      tdbstdsb =
        "tdbstdsb%00%00%00%04%00%00%00%01tdsn" +
        lName +
        "tdb4%00%00%00%7C%C2%BD%C2%99%00%02%00%0F%00%00%00%01%00";
      ret = tdbstdsb + ExtTimer(arr1[3]) + temp + "%00%00%00(" + Zeros(40);
    } else if (arr1[0] == "3DPoint") {
      tdbstdsb =
        "tdbstdsb%00%00%00%04%00%00%00%01tdsn" +
        lName +
        "tdb4%00%00%00%7C%C2%BD%C2%99%00%03%00%0F%00%00%00%01%00";
      ret = tdbstdsb + ExtTimer(arr1[3]) + temp + "%00%00%00H" + Zeros(72);
    } else if (arr1[0] == "Slider") {
      ret =
        tdbstdsb +
        ExtTimer(arr1[3]) +
        temp +
        "%00%00%00(" +
        FixedLength(toDouble(arr1[6])) +
        "tdum" +
        "%00%00%00%08" +
        toDouble(arr1[5]) +
        "tduM" +
        "%00%00%00%08" +
        toDouble(arr1[7]);
    } else if (arr1[0] == "Layer") {
      value = "%00";
      if (arr1[3]) {
        value = "%0E";
      }
      ret =
        tdbstdsb +
        "%00" +
        temp +
        "%00%00%00(" +
        Zeros(40) +
        "tdpi%00%00%00%04%00%00%00" +
        value;
    } else if (
      arr1[0] == "Group" ||
      arr1[0] == "GroupEnd" ||
      arr1[0] == "Button"
    ) {
      ret = tdbstdsb + "%04" + temp + "%00%00%00(" + Zeros(40);
    } else if (arr1[0] == "Effect") {
      tdbstdsb =
        "tdbstdsb%00%00%00%04%00%00%00%03tdsn" +
        lName +
        "tdb4%00%00%00%7C%C2%BD%C2%99%00%01%00%01%00%00%00%01%00";
      ret =
        tdbstdsb +
        "%04" +
        temp +
        "%00%00%00(" +
        Zeros(40) +
        "tdpi%00%00%00%04%00%00%00%0E";
    } else {
      alert("\nError \n\n id03\n", "\nError \n\n id03\n");
    }
    return "LIST" + CountLengthTo_hex(ret);
  }
  function pard(arr1) {
    var pr = "pard%00%00%00%C2%94";
    var ret = "";
    var temp = "";
    var value = "";
    if (arr1[0] == "Checkbox") {
      value = "%00";
      if (arr1[4]) {
        value = "%01";
      }
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%04" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(7) +
        value +
        value +
        Zeros(87) +
        "pdnm" +
        LengthName(arr1[5]);
    } else if (arr1[0] == "Popup") {
      value = HexEncodeURI(arr1[4], 4);
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%07" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(4) +
        value +
        value +
        Zeros(84) +
        "pdnm" +
        LengthName(arr1[5]);
    } else if (arr1[0] == "Color") {
      value = "%C3%BF";
      for (var i = 0; i < 6; i = i + 2) {
        value = value + HexEncodeURI(parseInt(arr1[4].substr(i, 2), 16));
      }
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%05" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(4) +
        value +
        value +
        Zeros(84);
    } else if (arr1[0] == "Angle") {
      value = toFraction(arr1[4]);
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%03" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(4) +
        value +
        value +
        Zeros(84);
    } else if (arr1[0] == "Point") {
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%06" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(14) +
        HexEncodeURI(arr1[4], 4) +
        HexEncodeURI(arr1[5], 4) +
        Zeros(74);
    } else if (arr1[0] == "3DPoint") {
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%12" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(28) +
        toDouble(arr1[4]) +
        toDouble(arr1[5]) +
        toDouble(arr1[6]) +
        Zeros(44);
    } else if (arr1[0] == "Slider") {
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%0a" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Timer(arr1[3]) +
        Zeros(52) +
        toFloat(arr1[4]) +
        toFloat(arr1[8]) +
        toFloat(arr1[5]) +
        toFloat(arr1[7]) +
        toFloat(arr1[6]) +
        HexEncodeURI(arr1[9], 2) +
        HexEncodeURI(arr1[10], 2) +
        Zeros(20);
    } else if (arr1[0] == "Layer") {
      value = Zeros(4);
      if (arr1[3]) {
        value = "%C3%BF%C3%BF%C3%BF%C3%BF";
      }
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(8) +
        FixedName(arr1[1]) +
        Zeros(82) +
        value +
        Zeros(16);
    } else if (arr1[0] == "Group") {
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%0d" +
        FixedName(arr1[1]) +
        Zeros(102);
    } else if (arr1[0] == "GroupEnd") {
      ret = Zeros(15) + "%0e" + Zeros(132);
    } else if (arr1[0] == "Button") {
      ret =
        Zeros(7) +
        Locked(arr1[2]) +
        Zeros(7) +
        "%0f" +
        FixedName(arr1[1]) +
        Zeros(5) +
        Zeros(97) +
        "pdnm" +
        LengthName(arr1[3]);
    } else if (arr1[0] == "Effect") {
      ret = Zeros(148);
    } else {
      alert("\nError \n\n id02\n", "\nError \n\n id02\n");
      return "";
    }
    return pr + ret;
  }
  function LengthName(arg) {
    var i = ansi2binary(arg) + "%00";
    var b = "";
    if (decodeURIComponent(i).length % 2 != 0) {
      b = "%00";
    }
    return CountLengthTo_hex(i) + b;
  }
  function FixedName(arg) {
    return FixedLength(ansi2binary(arg), 30);
  }
  function Timer(arg) {
    if (arg == 0) {
      return "%02";
    }
    return "%00";
  }
  function ExtTimer(arg) {
    if (arg == 2) {
      return "%C3%BF";
    }
    return "%04";
  }
  function Locked(arg) {
    if (arg) {
      return "%20";
    }
    return "%00";
  }
  function LengthDown(data, length_) {
    var length = parseInt(length_);
    if (isNaN(length) || length == null || length == undefined || length <= 0) {
      length = 40;
    }
    var Sdata = decodeURIComponent(data);
    if (Sdata.length >= length) {
      Sdata = Sdata.substr(0, length);
    }
    Sdata = encodeURIComponent(Sdata);
    return Sdata;
  }
  function FixedLength(data, length_) {
    var length = parseInt(length_);
    if (isNaN(length) || length == null || length == undefined || length <= 0) {
      length = 40;
    }
    var Sdata = decodeURIComponent(data);
    if (Sdata.length >= length) {
      Sdata = Sdata.substr(0, length - 1);
    }
    Sdata = encodeURIComponent(Sdata) + Zeros(length - Sdata.length);
    return Sdata;
  }
  function Zeros(amount) {
    var data = "";
    for (var i = 0; i < amount; i += 1) {
      data = data + "%00";
    }
    return data;
  }
  function CountLengthTo_hex(data, length_) {
    var length = length_;
    if (length == null || length == undefined) {
      length = 4;
    }
    var HEXStringLength = HexEncodeURI(decodeURIComponent(data).length, length);
    return HEXStringLength + data;
  }
  function crc32(str) {
    var crc = 4294967295;
    var table = new Array();
    for (var i = 0; i < 256; i += 1) {
      n = i;
      for (var j = 8; j > 0; j += -1) {
        if ((n & 1) == 1) {
          n = (n >>> 1) ^ 3988292384;
        } else {
          n = n >>> 1;
        }
      }
      table[i] = n;
    }
    for (var i = 0; i < str.length; i += 1) {
      crc = (crc >>> 8) ^ table[str.charCodeAt(i) ^ (crc & 255)];
    }
    crc = ~crc;
    crc = crc < 0 ? 4294967295 + crc + 1 : crc;
    crc = crc.toString(16);
    return crc;
  }
  function toFloat(number) {
    return toDouble(number, true);
  }
  function toDouble(v, fl) {
    var ebits = 11;
    var fbits = 52;
    if (fl) {
      ebits = 8;
      fbits = 23;
    }
    var bias = (1 << (ebits - 1)) - 1;
    if (isNaN(v)) {
      e = (1 << bias) - 1;
      f = 1;
      s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << bias) - 1;
      f = 0;
      s = v < 0 ? 1 : 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = 1 / v === -Infinity ? 1 : 0;
    } else {
      s = v < 0;
      v = Math.abs(v);
      if (v >= Math.pow(2, 1 - bias)) {
        var ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
        e = ln + bias;
        f = v * Math.pow(2, fbits - ln) - Math.pow(2, fbits);
      } else {
        e = 0;
        f = v / Math.pow(2, 1 - bias - fbits);
      }
    }
    var bits = [];
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1 : 0);
      f = Math.floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = Math.floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    var str = bits.join("");
    var bytes = "";
    while (str.length) {
      bytes = bytes + HexEncodeURI(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }
  function toFraction(number_) {
    var number = number_;
    if (number > 32767) {
      number = 32767;
    } else if (number < -32768) {
      number = 32768;
    } else {
      number = parseFloat(number.toFixed(5));
    }
    integer = parseInt(number);
    fractional = (number - integer).toFixed(14).substr(-14);
    fractional = (fractional / 1525878906).toFixed();
    if (number < 0) {
      fractional = 65535 - fractional;
      integer = 65535 + integer;
    }
    return HexEncodeURI(integer, 2) + HexEncodeURI(fractional, 2);
  }
  function HexEncodeURI(number, length_) {
    var length = length_;
    var URLdata = __BLOB__BLOB_000008__;
    if (length == null || length == undefined) {
      var length = 1;
    }
    var str = number.toString(16);
    while (str.length < length * 2) {
      str = "0" + str;
    }
    var bytes = "";
    var sstrn = "";
    var i = 0;
    while (bytes.length < length) {
      sstrn = parseInt(str.substr(i, 2), 16);
      bytes = bytes + URLdata.substr(sstrn, 1);
      i = i + 2;
    }
    return encodeURIComponent(bytes);
  }
  function CreateID(new_arr0) {
    var date = new Date();
    var day = date.getDate();
    var ss = date.getSeconds();
    var ret = LengthDown(
      encodeURIComponent(
        RandomSymbol() +
          NumberToSymbol(ss) +
          crc32(ArrayParser(new_arr0)) +
          RandomSymbol() +
          NumberToSymbol(day) +
          RandomSymbol(),
      ),
      31,
    );
    return ret;
  }
  function ArrayParser(data) {
    var x = "\x11";
    var y = "\x12";
    if (typeof data === "string") {
      str = decodeURIComponent(data);
      str = str.split(y);
      arr = new Array();
      for (var i = 0; i < str.length; i += 1) {
        arr[i] = str[i].split(x);
      }
      return arr;
    } else {
      str = data[0].join(x);
      for (var i = 1; i < data.length; i += 1) {
        str += y + data[i].join(x);
      }
      return str;
    }
  }
  function NumberToSymbol(number_) {
    var line = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var number = number_ % line.length;
    return line.substr(number, 1);
  }
  function RandomSymbol() {
    var min = 0;
    var max = 62;
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = parseInt(Math.round(rand));
    rand = NumberToSymbol(rand);
    return rand;
  }
  function ansi2binary(name_) {
    var name = name_;
    var Converter = new File(Folder.temp.fsName + "/temp.AEpr");
    Converter.encoding = "ASCI";
    Converter.open("w");
    Converter.write(name);
    Converter.open("r");
    Converter.encoding = "BINARY";
    name = encodeURI(Converter.read());
    Converter.close();
    Converter.remove();
    return name;
  }
  if (new_arr0[0][0] != "Effect") {
    alert("\nError \n\n id01\n", "\nError \n\n id01\n");
    return;
  }
  var FaFX =
    "FaFXhead%00%00%00%10%00%00%00%03%00%00%00D%00%00%00%01%01%00%00%00LIST";
  var beso =
    "bescbeso%00%00%002%00%00%00%01%00%00%00%01%00%00%00%00%00%00%02X%00%1E%00%00%00%00%00%00%01@%00%C3%B0%01@%00%C3%B0?%C3%B0%00%00%00%00%00%00?%C3%B0%00%00%00%00%00%00%00%00";
  var sspc = "sspcfnam%00%00%000" + Zeros(48) + "LIST";
  for (var i = 0; i < new_arr0.length; i += 1) {
    if (new_arr0[i][0] == "3DPoint") {
      FaFX =
        "FaFXhead%00%00%00%10%00%00%00%03%00%00%00N%00%00%00%00%01%00%00%00LIST";
      beso =
        "bescbeso%00%00%008%00%00%00%01%00%00%00%01%00%00%00%00%00%00%5D%C2%A8%00%1D%C3%B8R%00%00%00%00%07%C2%80%048%07%C2%80%048?%C3%B0%00%00%00%00%00%00?%C3%B0%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%BF%C3%BF%C3%BF";
      break;
    }
  }
  var lName = LengthName(new_arr0[0][1]);
  var tdsptdot1 =
    "LIST%00%00%00%C2%ACtdsptdot%00%00%00%04%C3%BF%C3%BF%C3%BF%C3%BFtdpl%00%00%00%04%00%00%00%02LIST%00%00%00%40tdsitdix%00%00%00%04%C3%BF%C3%BF%C3%BF%C3%BFtdmn%00%00%00(ADBE%20Effect%20Parade%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00LIST%00%00%00%40tdsitdix%00%00%00%04%00%00%00%00tdmn%00%00%00(";
  var tdsptdot2 =
    "tdsn" +
    lName +
    "LIST%00%00%00dtdsptdot%00%00%00%04%C3%BF%C3%BF%C3%BF%C3%BFtdpl%00%00%00%04%00%00%00%01LIST%00%00%00@tdsitdix%00%00%00%04%C3%BF%C3%BF%C3%BF%C3%BFtdmn%00%00%00(ADBE%20End%20of%20path%20sentinel%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00LIST";
  var ID = CreateID(new_arr0);
  ID = LengthDown(encodeURIComponent("Pseudo/" + myName + ID), 31);
  var fullMatchName = decodeURIComponent(ID);
  var ss = CountLengthTo_hex(
    sspc +
      CountLengthTo_hex(parTparn(ID, new_arr0)) +
      "LIST" +
      CountLengthTo_hex(tdgptdsb(ID, new_arr0, lName)),
  );
  return {
    mn: fullMatchName,
    str:
      "RIFX" +
      CountLengthTo_hex(
        FaFX +
          CountLengthTo_hex(
            beso + tdsptdot1 + FixedLength(ID, 40) + tdsptdot2 + ss,
          ),
      ),
  };
};
origami.GUIvariables = {
  advancedStep: { defValue: 0, lookup: [0, 1] },
  animOpacity: { defValue: "false", lookup: ["false", "true"] },
  animPosition: { defValue: "false", lookup: ["false", "true"] },
  animRotation: { defValue: "true", lookup: ["false", "true"] },
  animRotationZ: { defValue: "false", lookup: ["false", "true"] },
  animScale: { defValue: "false", lookup: ["false", "true"] },
  animationDirection: { defValue: "false", lookup: ["false", "true"] },
  colorMode: { defValue: 2, lookup: null },
  colorRangeValue: { defValue: 60, lookup: null },
  createMode: { defValue: "false", lookup: ["false", "true"] },
  mode: { defValue: 0, lookup: [0, 1, 2] },
  offsetOne: { defValue: "true", lookup: ["false", "true"] },
  pointsEdit: { defValue: 20, lookup: null },
  postCompose: { defValue: "false", lookup: ["false", "true"] },
  postExplode: { defValue: "true", lookup: ["false", "true"] },
  postRemove: { defValue: "false", lookup: ["false", "true"] },
  selectSliceAlgorythm: { defValue: 0, lookup: null },
  unwrapMode: { defValue: "false", lookup: ["false", "true"] },
};
origami.setPrefs = function () {
  for (var key in origami.GUIvariables) {
    if (!(origami.GUIvariables[key] instanceof Function)) {
      app.settings.saveSetting("origamiUI", key, origami[key]);
    }
  }
};
origami.getPrefs = function () {
  for (var key in origami.GUIvariables) {
    thisKey = origami.GUIvariables[key];
    if (!(thisKey instanceof Function)) {
      if (app.settings.haveSetting("origamiUI", key) === false) {
        origami[key] = thisKey.defValue;
      } else {
        origami[key] = app.settings.getSetting("origamiUI", key);
      }
    }
  }
};
origami.GUIvariables = {
  advancedStep: { defValue: 0, lookup: [0, 1] },
  animOpacity: { defValue: "false", lookup: ["false", "true"] },
  animPosition: { defValue: "false", lookup: ["false", "true"] },
  animRotation: { defValue: "true", lookup: ["false", "true"] },
  animRotationZ: { defValue: "false", lookup: ["false", "true"] },
  animScale: { defValue: "false", lookup: ["false", "true"] },
  animationDirection: { defValue: "false", lookup: ["false", "true"] },
  colorMode: { defValue: 2, lookup: null },
  colorRangeValue: { defValue: 60, lookup: null },
  createMode: { defValue: "false", lookup: ["false", "true"] },
  mode: { defValue: 0, lookup: [0, 1, 2] },
  offsetOne: { defValue: "true", lookup: ["false", "true"] },
  pointsEdit: { defValue: 20, lookup: null },
  postCompose: { defValue: "false", lookup: ["false", "true"] },
  postExplode: { defValue: "true", lookup: ["false", "true"] },
  postRemove: { defValue: "false", lookup: ["false", "true"] },
  selectSliceAlgorythm: { defValue: 0, lookup: null },
  unwrapMode: { defValue: "false", lookup: ["false", "true"] },
};
Voronoi.prototype.reset = function () {
  if (!this.beachline) {
    this.beachline = new this.RBTree();
  }
  if (this.beachline.root) {
    var beachsection = this.beachline.getFirst(this.beachline.root);
    while (beachsection) {
      this.beachsectionJunkyard.push(beachsection);
      beachsection = beachsection.rbNext;
    }
  }
  this.beachline.root = null;
  if (!this.circleEvents) {
    this.circleEvents = new this.RBTree();
  }
  this.circleEvents.root = this.firstCircleEvent = null;
  this.vertices = [];
  this.edges = [];
  this.cells = [];
};
Voronoi.prototype.sqrt = Math.sqrt;
Voronoi.prototype.abs = Math.abs;
Voronoi.prototype["\u03b5"] = Voronoi["\u03b5"] = 1e-9;
Voronoi.prototype.inv = Voronoi.inv = 1 / Voronoi["\u03b5"];
Voronoi.prototype.equalWithEpsilon = function (a, b) {
  return this.abs(a - b) < 1e-9;
};
Voronoi.prototype.greaterThanWithEpsilon = function (a, b) {
  return a - b > 1e-9;
};
Voronoi.prototype.greaterThanOrEqualWithEpsilon = function (a, b) {
  return b - a < 1e-9;
};
Voronoi.prototype.lessThanWithEpsilon = function (a, b) {
  return b - a > 1e-9;
};
Voronoi.prototype.lessThanOrEqualWithEpsilon = function (a, b) {
  return a - b < 1e-9;
};
Voronoi.prototype.RBTree = function () {
  this.root = null;
};
Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function (
  node,
  successor,
) {
  if (node) {
    successor.rbPrevious = node;
    successor.rbNext = node.rbNext;
    if (node.rbNext) {
      node.rbNext.rbPrevious = successor;
    }
    node.rbNext = successor;
    if (node.rbRight) {
      node = node.rbRight;
      while (node.rbLeft) {
        node = node.rbLeft;
      }
      node.rbLeft = successor;
    } else {
      node.rbRight = successor;
    }
    parent = node;
  } else if (this.root) {
    node = this.getFirst(this.root);
    successor.rbPrevious = null;
    successor.rbNext = node;
    node.rbPrevious = successor;
    node.rbLeft = successor;
    parent = node;
  } else {
    successor.rbPrevious = successor.rbNext = null;
    this.root = successor;
    parent = null;
  }
  successor.rbLeft = successor.rbRight = null;
  successor.rbParent = parent;
  successor.rbRed = true;
  node = successor;
  while (parent && parent.rbRed) {
    grandpa = parent.rbParent;
    if (parent === grandpa.rbLeft) {
      uncle = grandpa.rbRight;
      if (uncle && uncle.rbRed) {
        parent.rbRed = uncle.rbRed = false;
        grandpa.rbRed = true;
        node = grandpa;
      } else {
        if (node === parent.rbRight) {
          this.rbRotateLeft(parent);
          node = parent;
          parent = node.rbParent;
        }
        parent.rbRed = false;
        grandpa.rbRed = true;
        this.rbRotateRight(grandpa);
      }
    } else {
      uncle = grandpa.rbLeft;
      if (uncle && uncle.rbRed) {
        parent.rbRed = uncle.rbRed = false;
        grandpa.rbRed = true;
        node = grandpa;
      } else {
        if (node === parent.rbLeft) {
          this.rbRotateRight(parent);
          node = parent;
          parent = node.rbParent;
        }
        parent.rbRed = false;
        grandpa.rbRed = true;
        this.rbRotateLeft(grandpa);
      }
    }
    parent = node.rbParent;
  }
  this.root.rbRed = false;
};
Voronoi.prototype.RBTree.prototype.rbRemoveNode = function (node) {
  if (node.rbNext) {
    node.rbNext.rbPrevious = node.rbPrevious;
  }
  if (node.rbPrevious) {
    node.rbPrevious.rbNext = node.rbNext;
  }
  node.rbNext = node.rbPrevious = null;
  var parent = node.rbParent;
  var left = node.rbLeft;
  var right = node.rbRight;
  if (!left) {
    next = right;
  } else if (!right) {
    next = left;
  } else {
    next = this.getFirst(right);
  }
  if (parent) {
    if (parent.rbLeft === node) {
      parent.rbLeft = next;
    } else {
      parent.rbRight = next;
    }
  } else {
    this.root = next;
  }
  if (left && right) {
    isRed = next.rbRed;
    next.rbRed = node.rbRed;
    next.rbLeft = left;
    left.rbParent = next;
    if (next !== right) {
      parent = next.rbParent;
      next.rbParent = node.rbParent;
      node = next.rbRight;
      parent.rbLeft = node;
      next.rbRight = right;
      right.rbParent = next;
    } else {
      next.rbParent = parent;
      parent = next;
      node = next.rbRight;
    }
  } else {
    isRed = node.rbRed;
    node = next;
  }
  if (node) {
    node.rbParent = parent;
  }
  if (isRed) {
    return;
  }
  if (node && node.rbRed) {
    node.rbRed = false;
    return;
  }
  do {
    if (node === this.root) {
      break;
    }
    if (node === parent.rbLeft) {
      sibling = parent.rbRight;
      if (sibling.rbRed) {
        sibling.rbRed = false;
        parent.rbRed = true;
        this.rbRotateLeft(parent);
        sibling = parent.rbRight;
      }
      if (
        (sibling.rbLeft && sibling.rbLeft.rbRed) ||
        (sibling.rbRight && sibling.rbRight.rbRed)
      ) {
        if (!sibling.rbRight || !sibling.rbRight.rbRed) {
          sibling.rbLeft.rbRed = false;
          sibling.rbRed = true;
          this.rbRotateRight(sibling);
          sibling = parent.rbRight;
        }
        sibling.rbRed = parent.rbRed;
        parent.rbRed = sibling.rbRight.rbRed = false;
        this.rbRotateLeft(parent);
        node = this.root;
        break;
      }
    } else {
      sibling = parent.rbLeft;
      if (sibling.rbRed) {
        sibling.rbRed = false;
        parent.rbRed = true;
        this.rbRotateRight(parent);
        sibling = parent.rbLeft;
      }
      if (
        (sibling.rbLeft && sibling.rbLeft.rbRed) ||
        (sibling.rbRight && sibling.rbRight.rbRed)
      ) {
        if (!sibling.rbLeft || !sibling.rbLeft.rbRed) {
          sibling.rbRight.rbRed = false;
          sibling.rbRed = true;
          this.rbRotateLeft(sibling);
          sibling = parent.rbLeft;
        }
        sibling.rbRed = parent.rbRed;
        parent.rbRed = sibling.rbLeft.rbRed = false;
        this.rbRotateRight(parent);
        node = this.root;
        break;
      }
    }
    sibling.rbRed = true;
    node = parent;
    parent = parent.rbParent;
  } while (!node.rbRed);
  if (node) {
    node.rbRed = false;
  }
};
Voronoi.prototype.RBTree.prototype.rbRotateLeft = function (node) {
  var p = node;
  var q = node.rbRight;
  var parent = p.rbParent;
  if (parent) {
    if (parent.rbLeft === p) {
      parent.rbLeft = q;
    } else {
      parent.rbRight = q;
    }
  } else {
    this.root = q;
  }
  q.rbParent = parent;
  p.rbParent = q;
  p.rbRight = q.rbLeft;
  if (p.rbRight) {
    p.rbRight.rbParent = p;
  }
  q.rbLeft = p;
};
Voronoi.prototype.RBTree.prototype.rbRotateRight = function (node) {
  var p = node;
  var q = node.rbLeft;
  var parent = p.rbParent;
  if (parent) {
    if (parent.rbLeft === p) {
      parent.rbLeft = q;
    } else {
      parent.rbRight = q;
    }
  } else {
    this.root = q;
  }
  q.rbParent = parent;
  p.rbParent = q;
  p.rbLeft = q.rbRight;
  if (p.rbLeft) {
    p.rbLeft.rbParent = p;
  }
  q.rbRight = p;
};
Voronoi.prototype.RBTree.prototype.getFirst = function (node) {
  while (node.rbLeft) {
    node = node.rbLeft;
  }
  return node;
};
Voronoi.prototype.RBTree.prototype.getLast = function (node) {
  while (node.rbRight) {
    node = node.rbRight;
  }
  return node;
};
Voronoi.prototype.Diagram = function (site) {
  this.site = site;
};
Voronoi.prototype.Cell = function (site) {
  this.site = site;
  this.halfedges = [];
  this.closeMe = false;
};
Voronoi.prototype.Cell.prototype.init = function (site) {
  this.site = site;
  this.halfedges = [];
  this.closeMe = false;
  return this;
};
Voronoi.prototype.createCell = function (site) {
  var cell = this.cellJunkyard.pop();
  if (cell) {
    return cell.init(site);
  }
  return new this.Cell(site);
};
Voronoi.prototype.Cell.prototype.prepareHalfedges = function () {
  var halfedges = this.halfedges;
  var iHalfedge = halfedges.length;
  while (iHalfedge--) {
    edge = halfedges[iHalfedge].edge;
    if (!edge.vb || !edge.va) {
      halfedges.splice(iHalfedge, 1);
    }
  }
  halfedges.sort(function (a, b) {
    return b.angle - a.angle;
  });
  return halfedges.length;
};
Voronoi.prototype.Cell.prototype.getNeighborIds = function () {
  var neighbors = [];
  var iHalfedge = this.halfedges.length;
  while (iHalfedge--) {
    edge = this.halfedges[iHalfedge].edge;
    if (edge.lSite !== null && edge.lSite.voronoiId != this.site.voronoiId) {
      neighbors.push(edge.lSite.voronoiId);
    } else {
      if (edge.rSite !== null && edge.rSite.voronoiId != this.site.voronoiId) {
        neighbors.push(edge.rSite.voronoiId);
      }
    }
  }
  return neighbors;
};
Voronoi.prototype.Cell.prototype.getBbox = function () {
  var halfedges = this.halfedges;
  var iHalfedge = halfedges.length;
  var xmin = Infinity;
  var ymin = Infinity;
  var xmax = -Infinity;
  var ymax = -Infinity;
  while (iHalfedge--) {
    v = halfedges[iHalfedge].getStartpoint();
    vx = v.x;
    vy = v.y;
    if (vx < xmin) {
      xmin = vx;
    }
    if (vy < ymin) {
      ymin = vy;
    }
    if (vx > xmax) {
      xmax = vx;
    }
    if (vy > ymax) {
      ymax = vy;
    }
  }
  return { height: ymax - ymin, width: xmax - xmin, x: xmin, y: ymin };
};
Voronoi.prototype.Cell.prototype.pointIntersection = function (x, y) {
  var halfedges = this.halfedges;
  var iHalfedge = halfedges.length;
  while (iHalfedge--) {
    halfedge = halfedges[iHalfedge];
    p0 = halfedge.getStartpoint();
    p1 = halfedge.getEndpoint();
    r = (y - p0.y) * (p1.x - p0.x) - (x - p0.x) * (p1.y - p0.y);
    if (!r) {
      return 0;
    }
    if (r > 0) {
      return -1;
    }
  }
  return 1;
};
Voronoi.prototype.Vertex = function (x, y) {
  this.x = x;
  this.y = y;
};
Voronoi.prototype.Edge = function (lSite, rSite) {
  this.lSite = lSite;
  this.rSite = rSite;
  this.va = this.vb = null;
};
Voronoi.prototype.Halfedge = function (edge, lSite, rSite) {
  this.site = lSite;
  this.edge = edge;
  if (rSite) {
    this.angle = Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x);
  } else {
    var va = edge.va;
    var vb = edge.vb;
    this.angle =
      edge.lSite === lSite
        ? Math.atan2(vb.x - va.x, va.y - vb.y)
        : Math.atan2(va.x - vb.x, vb.y - va.y);
  }
};
Voronoi.prototype.createHalfedge = function (edge, lSite, rSite) {
  return new this.Halfedge(edge, lSite, rSite);
};
Voronoi.prototype.Halfedge.prototype.getStartpoint = function () {
  return this.edge.lSite === this.site ? this.edge.va : this.edge.vb;
};
Voronoi.prototype.Halfedge.prototype.getEndpoint = function () {
  return this.edge.lSite === this.site ? this.edge.vb : this.edge.va;
};
Voronoi.prototype.createVertex = function (x, y) {
  var v = this.vertexJunkyard.pop();
  if (!v) {
    v = new this.Vertex(x, y);
  } else {
    v.x = x;
    v.y = y;
  }
  this.vertices.push(v);
  return v;
};
Voronoi.prototype.createEdge = function (lSite, rSite, va, vb) {
  var edge = this.edgeJunkyard.pop();
  if (!edge) {
    edge = new this.Edge(lSite, rSite);
  } else {
    edge.lSite = lSite;
    edge.rSite = rSite;
    edge.va = edge.vb = null;
  }
  this.edges.push(edge);
  if (va) {
    this.setEdgeStartpoint(edge, lSite, rSite, va);
  }
  if (vb) {
    this.setEdgeEndpoint(edge, lSite, rSite, vb);
  }
  this.cells[lSite.voronoiId].halfedges.push(
    this.createHalfedge(edge, lSite, rSite),
  );
  this.cells[rSite.voronoiId].halfedges.push(
    this.createHalfedge(edge, rSite, lSite),
  );
  return edge;
};
Voronoi.prototype.createBorderEdge = function (lSite, va, vb) {
  var edge = this.edgeJunkyard.pop();
  if (!edge) {
    edge = new this.Edge(lSite, null);
  } else {
    edge.lSite = lSite;
    edge.rSite = null;
  }
  edge.va = va;
  edge.vb = vb;
  this.edges.push(edge);
  return edge;
};
Voronoi.prototype.setEdgeStartpoint = function (edge, lSite, rSite, vertex) {
  if (!edge.va && !edge.vb) {
    edge.va = vertex;
    edge.lSite = lSite;
    edge.rSite = rSite;
  } else if (edge.lSite === rSite) {
    edge.vb = vertex;
  } else {
    edge.va = vertex;
  }
};
Voronoi.prototype.setEdgeEndpoint = function (edge, lSite, rSite, vertex) {
  this.setEdgeStartpoint(edge, rSite, lSite, vertex);
};
Voronoi.prototype.Beachsection = function () {};
Voronoi.prototype.createBeachsection = function (site) {
  var beachsection = this.beachsectionJunkyard.pop();
  if (!beachsection) {
    beachsection = new this.Beachsection();
  }
  beachsection.site = site;
  return beachsection;
};
Voronoi.prototype.leftBreakPoint = function (arc, directrix) {
  var site = arc.site;
  var rfocx = site.x;
  var rfocy = site.y;
  var pby2 = rfocy - directrix;
  if (!pby2) {
    return rfocx;
  }
  var lArc = arc.rbPrevious;
  if (!lArc) {
    return -Infinity;
  }
  site = lArc.site;
  var lfocx = site.x;
  var lfocy = site.y;
  var plby2 = lfocy - directrix;
  if (!plby2) {
    return lfocx;
  }
  var hl = lfocx - rfocx;
  var aby2 = 1 / pby2 - 1 / plby2;
  var b = hl / plby2;
  if (aby2) {
    return (
      (-b +
        this.sqrt(
          b * b -
            2 *
              aby2 *
              ((hl * hl) / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2),
        )) /
        aby2 +
      rfocx
    );
  }
  return (rfocx + lfocx) / 2;
};
Voronoi.prototype.rightBreakPoint = function (arc, directrix) {
  var rArc = arc.rbNext;
  if (rArc) {
    return this.leftBreakPoint(rArc, directrix);
  }
  var site = arc.site;
  return site.y === directrix ? site.x : Infinity;
};
Voronoi.prototype.detachBeachsection = function (beachsection) {
  this.detachCircleEvent(beachsection);
  this.beachline.rbRemoveNode(beachsection);
  this.beachsectionJunkyard.push(beachsection);
};
Voronoi.prototype.removeBeachsection = function (beachsection) {
  var circle = beachsection.circleEvent;
  var x = circle.x;
  var y = circle.ycenter;
  var vertex = this.createVertex(x, y);
  var previous = beachsection.rbPrevious;
  var next = beachsection.rbNext;
  var disappearingTransitions = [beachsection];
  var abs_fn = Math.abs;
  this.detachBeachsection(beachsection);
  var lArc = previous;
  while (
    lArc.circleEvent &&
    abs_fn(x - lArc.circleEvent.x) < 1e-9 &&
    abs_fn(y - lArc.circleEvent.ycenter) < 1e-9
  ) {
    previous = lArc.rbPrevious;
    disappearingTransitions.unshift(lArc);
    this.detachBeachsection(lArc);
    lArc = previous;
  }
  disappearingTransitions.unshift(lArc);
  this.detachCircleEvent(lArc);
  var rArc = next;
  while (
    rArc.circleEvent &&
    abs_fn(x - rArc.circleEvent.x) < 1e-9 &&
    abs_fn(y - rArc.circleEvent.ycenter) < 1e-9
  ) {
    next = rArc.rbNext;
    disappearingTransitions.push(rArc);
    this.detachBeachsection(rArc);
    rArc = next;
  }
  disappearingTransitions.push(rArc);
  this.detachCircleEvent(rArc);
  var nArcs = disappearingTransitions.length;
  for (var iArc = 1; iArc < nArcs; iArc += 1) {
    rArc = disappearingTransitions[iArc];
    lArc = disappearingTransitions[iArc - 1];
    this.setEdgeStartpoint(rArc.edge, lArc.site, rArc.site, vertex);
  }
  lArc = disappearingTransitions[0];
  rArc = disappearingTransitions[nArcs - 1];
  rArc.edge = this.createEdge(lArc.site, rArc.site, undefined, vertex);
  this.attachCircleEvent(lArc);
  this.attachCircleEvent(rArc);
};
Voronoi.prototype.addBeachsection = function (site) {
  var x = site.x;
  var directrix = site.y;
  var node = this.beachline.root;
  while (node) {
    dxl = this.leftBreakPoint(node, directrix) - x;
    if (dxl > 1e-9) {
      node = node.rbLeft;
    } else {
      dxr = x - this.rightBreakPoint(node, directrix);
      if (dxr > 1e-9) {
        if (!node.rbRight) {
          lArc = node;
          break;
        }
        node = node.rbRight;
      } else {
        if (dxl > -1e-9) {
          lArc = node.rbPrevious;
          rArc = node;
        } else if (dxr > -1e-9) {
          lArc = node;
          rArc = node.rbNext;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }
  var newArc = this.createBeachsection(site);
  this.beachline.rbInsertSuccessor(lArc, newArc);
  if (!lArc && !rArc) {
    return;
  }
  if (lArc === rArc) {
    this.detachCircleEvent(lArc);
    rArc = this.createBeachsection(lArc.site);
    this.beachline.rbInsertSuccessor(newArc, rArc);
    newArc.edge = rArc.edge = this.createEdge(lArc.site, newArc.site);
    this.attachCircleEvent(lArc);
    this.attachCircleEvent(rArc);
    return;
  }
  if (lArc && !rArc) {
    newArc.edge = this.createEdge(lArc.site, newArc.site);
    return;
  }
  if (lArc !== rArc) {
    this.detachCircleEvent(lArc);
    this.detachCircleEvent(rArc);
    var lSite = lArc.site;
    var ax = lSite.x;
    var ay = lSite.y;
    var bx = site.x - ax;
    var by = site.y - ay;
    var rSite = rArc.site;
    var cx = rSite.x - ax;
    var cy = rSite.y - ay;
    var d = 2 * (bx * cy - by * cx);
    var hb = bx * bx + by * by;
    var hc = cx * cx + cy * cy;
    var vertex = this.createVertex(
      (cy * hb - by * hc) / d + ax,
      (bx * hc - cx * hb) / d + ay,
    );
    this.setEdgeStartpoint(rArc.edge, lSite, rSite, vertex);
    newArc.edge = this.createEdge(lSite, site, undefined, vertex);
    rArc.edge = this.createEdge(site, rSite, undefined, vertex);
    this.attachCircleEvent(lArc);
    this.attachCircleEvent(rArc);
    return;
  }
};
Voronoi.prototype.CircleEvent = function () {
  this.arc = null;
  this.rbLeft = null;
  this.rbNext = null;
  this.rbParent = null;
  this.rbPrevious = null;
  this.rbRed = false;
  this.rbRight = null;
  this.site = null;
  this.x = this.y = this.ycenter = 0;
};
Voronoi.prototype.attachCircleEvent = function (arc) {
  var lArc = arc.rbPrevious;
  var rArc = arc.rbNext;
  if (!lArc || !rArc) {
    return;
  }
  var lSite = lArc.site;
  var cSite = arc.site;
  var rSite = rArc.site;
  if (lSite === rSite) {
    return;
  }
  var bx = cSite.x;
  var by = cSite.y;
  var ax = lSite.x - bx;
  var ay = lSite.y - by;
  var cx = rSite.x - bx;
  var cy = rSite.y - by;
  var d = 2 * (ax * cy - ay * cx);
  if (d >= -2e-12) {
    return;
  }
  var ha = ax * ax + ay * ay;
  var hc = cx * cx + cy * cy;
  var x = (cy * ha - ay * hc) / d;
  var y = (ax * hc - cx * ha) / d;
  var ycenter = y + by;
  var circleEvent = this.circleEventJunkyard.pop();
  if (!circleEvent) {
    circleEvent = new this.CircleEvent();
  }
  circleEvent.arc = arc;
  circleEvent.site = cSite;
  circleEvent.x = x + bx;
  circleEvent.y = ycenter + this.sqrt(x * x + y * y);
  circleEvent.ycenter = ycenter;
  arc.circleEvent = circleEvent;
  var predecessor = null;
  var node = this.circleEvents.root;
  while (node) {
    if (
      circleEvent.y < node.y ||
      (circleEvent.y === node.y && circleEvent.x <= node.x)
    ) {
      if (node.rbLeft) {
        node = node.rbLeft;
      } else {
        predecessor = node.rbPrevious;
        break;
      }
    } else {
      if (node.rbRight) {
        node = node.rbRight;
      } else {
        predecessor = node;
        break;
      }
    }
  }
  this.circleEvents.rbInsertSuccessor(predecessor, circleEvent);
  if (!predecessor) {
    this.firstCircleEvent = circleEvent;
  }
};
Voronoi.prototype.detachCircleEvent = function (arc) {
  var circleEvent = arc.circleEvent;
  if (circleEvent) {
    if (!circleEvent.rbPrevious) {
      this.firstCircleEvent = circleEvent.rbNext;
    }
    this.circleEvents.rbRemoveNode(circleEvent);
    this.circleEventJunkyard.push(circleEvent);
    arc.circleEvent = null;
  }
};
Voronoi.prototype.connectEdge = function (edge, bbox) {
  var vb = edge.vb;
  if (!!vb) {
    return true;
  }
  var va = edge.va;
  var xl = bbox.xl;
  var xr = bbox.xr;
  var yt = bbox.yt;
  var yb = bbox.yb;
  var lSite = edge.lSite;
  var rSite = edge.rSite;
  var lx = lSite.x;
  var ly = lSite.y;
  var rx = rSite.x;
  var ry = rSite.y;
  var fx = (lx + rx) / 2;
  var fy = (ly + ry) / 2;
  this.cells[lSite.voronoiId].closeMe = true;
  this.cells[rSite.voronoiId].closeMe = true;
  if (ry !== ly) {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
  }
  if (fm === undefined) {
    if (fx < xl || fx >= xr) {
      return false;
    }
    if (lx > rx) {
      if (!va || va.y < yt) {
        va = this.createVertex(fx, yt);
      } else {
        if (va.y >= yb) {
          return false;
        }
      }
      vb = this.createVertex(fx, yb);
    } else {
      if (!va || va.y > yb) {
        va = this.createVertex(fx, yb);
      } else {
        if (va.y < yt) {
          return false;
        }
      }
      vb = this.createVertex(fx, yt);
    }
  } else if (fm < -1 || fm > 1) {
    if (lx > rx) {
      if (!va || va.y < yt) {
        va = this.createVertex((yt - fb) / fm, yt);
      } else {
        if (va.y >= yb) {
          return false;
        }
      }
      vb = this.createVertex((yb - fb) / fm, yb);
    } else {
      if (!va || va.y > yb) {
        va = this.createVertex((yb - fb) / fm, yb);
      } else {
        if (va.y < yt) {
          return false;
        }
      }
      vb = this.createVertex((yt - fb) / fm, yt);
    }
  } else {
    if (ly < ry) {
      if (!va || va.x < xl) {
        va = this.createVertex(xl, fm * xl + fb);
      } else {
        if (va.x >= xr) {
          return false;
        }
      }
      vb = this.createVertex(xr, fm * xr + fb);
    } else {
      if (!va || va.x > xr) {
        va = this.createVertex(xr, fm * xr + fb);
      } else {
        if (va.x < xl) {
          return false;
        }
      }
      vb = this.createVertex(xl, fm * xl + fb);
    }
  }
  edge.va = va;
  edge.vb = vb;
  return true;
};
Voronoi.prototype.clipEdge = function (edge, bbox) {
  var ax = edge.va.x;
  var ay = edge.va.y;
  var bx = edge.vb.x;
  var by = edge.vb.y;
  var t0 = 0;
  var t1 = 1;
  var dx = bx - ax;
  var dy = by - ay;
  var q = ax - bbox.xl;
  if (dx === 0 && q < 0) {
    return false;
  }
  var r = -q / dx;
  if (dx < 0) {
    if (r < t0) {
      return false;
    }
    if (r < t1) {
      t1 = r;
    }
  } else {
    if (dx > 0) {
      if (r > t1) {
        return false;
      }
      if (r > t0) {
        t0 = r;
      }
    }
  }
  q = bbox.xr - ax;
  if (dx === 0 && q < 0) {
    return false;
  }
  r = q / dx;
  if (dx < 0) {
    if (r > t1) {
      return false;
    }
    if (r > t0) {
      t0 = r;
    }
  } else {
    if (dx > 0) {
      if (r < t0) {
        return false;
      }
      if (r < t1) {
        t1 = r;
      }
    }
  }
  q = ay - bbox.yt;
  if (dy === 0 && q < 0) {
    return false;
  }
  r = -q / dy;
  if (dy < 0) {
    if (r < t0) {
      return false;
    }
    if (r < t1) {
      t1 = r;
    }
  } else {
    if (dy > 0) {
      if (r > t1) {
        return false;
      }
      if (r > t0) {
        t0 = r;
      }
    }
  }
  q = bbox.yb - ay;
  if (dy === 0 && q < 0) {
    return false;
  }
  r = q / dy;
  if (dy < 0) {
    if (r > t1) {
      return false;
    }
    if (r > t0) {
      t0 = r;
    }
  } else {
    if (dy > 0) {
      if (r < t0) {
        return false;
      }
      if (r < t1) {
        t1 = r;
      }
    }
  }
  if (t0 > 0) {
    edge.va = this.createVertex(ax + t0 * dx, ay + t0 * dy);
  }
  if (t1 < 1) {
    edge.vb = this.createVertex(ax + t1 * dx, ay + t1 * dy);
  }
  if (t0 > 0 || t1 < 1) {
    this.cells[edge.lSite.voronoiId].closeMe = true;
    this.cells[edge.rSite.voronoiId].closeMe = true;
  }
  return true;
};
Voronoi.prototype.clipEdges = function (bbox) {
  var edges = this.edges;
  var iEdge = edges.length;
  var abs_fn = Math.abs;
  while (iEdge--) {
    edge = edges[iEdge];
    if (
      !this.connectEdge(edge, bbox) ||
      !this.clipEdge(edge, bbox) ||
      (abs_fn(edge.va.x - edge.vb.x) < 1e-9 &&
        abs_fn(edge.va.y - edge.vb.y) < 1e-9)
    ) {
      edge.va = edge.vb = null;
      edges.splice(iEdge, 1);
    }
  }
};
Voronoi.prototype.closeCells = function (bbox) {
  var xl = bbox.xl;
  var xr = bbox.xr;
  var yt = bbox.yt;
  var yb = bbox.yb;
  var cells = this.cells;
  var iCell = cells.length;
  var abs_fn = Math.abs;
  while (iCell--) {
    cell = cells[iCell];
    if (!cell.prepareHalfedges()) {
      continue;
    }
    if (!cell.closeMe) {
      continue;
    }
    halfedges = cell.halfedges;
    nHalfedges = halfedges.length;
    iLeft = 0;
    while (iLeft < nHalfedges) {
      va = halfedges[iLeft].getEndpoint();
      vz = halfedges[(iLeft + 1) % nHalfedges].getStartpoint();
      if (abs_fn(va.x - vz.x) >= 1e-9 || abs_fn(va.y - vz.y) >= 1e-9) {
        switch (true) {
          case this.equalWithEpsilon(va.x, xl) &&
            this.lessThanWithEpsilon(va.y, yb):
            lastBorderSegment = this.equalWithEpsilon(vz.x, xl);
            vb = this.createVertex(xl, lastBorderSegment ? vz.y : yb);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
          case this.equalWithEpsilon(va.y, yb) &&
            this.lessThanWithEpsilon(va.x, xr):
            lastBorderSegment = this.equalWithEpsilon(vz.y, yb);
            vb = this.createVertex(lastBorderSegment ? vz.x : xr, yb);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
          case this.equalWithEpsilon(va.x, xr) &&
            this.greaterThanWithEpsilon(va.y, yt):
            lastBorderSegment = this.equalWithEpsilon(vz.x, xr);
            vb = this.createVertex(xr, lastBorderSegment ? vz.y : yt);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
          case this.equalWithEpsilon(va.y, yt) &&
            this.greaterThanWithEpsilon(va.x, xl):
            lastBorderSegment = this.equalWithEpsilon(vz.y, yt);
            vb = this.createVertex(lastBorderSegment ? vz.x : xl, yt);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
            lastBorderSegment = this.equalWithEpsilon(vz.x, xl);
            vb = this.createVertex(xl, lastBorderSegment ? vz.y : yb);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
            lastBorderSegment = this.equalWithEpsilon(vz.y, yb);
            vb = this.createVertex(lastBorderSegment ? vz.x : xr, yb);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
            va = vb;
            lastBorderSegment = this.equalWithEpsilon(vz.x, xr);
            vb = this.createVertex(xr, lastBorderSegment ? vz.y : yt);
            edge = this.createBorderEdge(cell.site, va, vb);
            iLeft++;
            halfedges.splice(
              iLeft,
              0,
              this.createHalfedge(edge, cell.site, null),
            );
            nHalfedges++;
            if (lastBorderSegment) {
              break;
            }
          default:
            throw "Voronoi.closeCells() > this makes no sense!";
        }
      }
      iLeft++;
    }
    cell.closeMe = false;
  }
};
Voronoi.prototype.quantizeSites = function (sites) {
  var epsilon = this["\u03b5"];
  var n = sites.length;
  while (n--) {
    var site = sites[n];
    site.x = Math.floor(site.x / epsilon) * epsilon;
    site.y = Math.floor(site.y / epsilon) * epsilon;
  }
};
Voronoi.prototype.recycle = function (diagram) {
  if (diagram) {
    if (diagram instanceof this.Diagram) {
      this.toRecycle = diagram;
    } else {
      throw "Voronoi.recycleDiagram() > Need a Diagram object.";
    }
  }
};
Voronoi.prototype.compute = function (sites, bbox) {
  var startTime = new Date();
  this.reset();
  if (this.toRecycle) {
    this.vertexJunkyard = this.vertexJunkyard.concat(this.toRecycle.vertices);
    this.edgeJunkyard = this.edgeJunkyard.concat(this.toRecycle.edges);
    this.cellJunkyard = this.cellJunkyard.concat(this.toRecycle.cells);
    this.toRecycle = null;
  }
  var siteEvents = sites.slice(0);
  siteEvents.sort(function (a, b) {
    var r = b.y - a.y;
    if (r) {
      return r;
    }
    return b.x - a.x;
  });
  var site = siteEvents.pop();
  var siteid = 0;
  var cells = this.cells;
  while (true) {
    circle = this.firstCircleEvent;
    if (
      site &&
      (!circle ||
        site.y < circle.y ||
        (site.y === circle.y && site.x < circle.x))
    ) {
      if (site.x !== xsitex || site.y !== xsitey) {
        cells[siteid] = this.createCell(site);
        site.voronoiId = siteid++;
        this.addBeachsection(site);
        xsitey = site.y;
        xsitex = site.x;
      }
      site = siteEvents.pop();
    } else if (circle) {
      this.removeBeachsection(circle.arc);
    } else {
      break;
    }
  }
  this.clipEdges(bbox);
  this.closeCells(bbox);
  var stopTime = new Date();
  var diagram = new this.Diagram();
  diagram.cells = this.cells;
  diagram.edges = this.edges;
  diagram.vertices = this.vertices;
  diagram.execTime = stopTime.getTime() - startTime.getTime();
  this.reset();
  return diagram;
};
if (typeof module !== "undefined") {
  module.exports = Voronoi;
}
origami.convertParamShape = {};
origami.matchNames = {
  layer: {
    effects: {
      layerControl: {
        layer: { mn: "ADBE Layer Control-0001" },
        mn: "ADBE Layer Control",
      },
      mn: "ADBE Effect Parade",
    },
    marker: { mn: "ADBE Marker" },
    text: {
      mn: "ADBE Text Properties",
      sourceText: { mn: "ADBE Text Document" },
    },
    transform: {
      anchorPoint: { mn: "ADBE Anchor Point" },
      mn: "ADBE Transform Group",
      opacity: { mn: "ADBE Opacity" },
      orientation: { mn: "ADBE Orientation" },
      position: { mn: "ADBE Position" },
      rotation: { mn: "ADBE Rotate Z" },
      scale: { mn: "ADBE Scale" },
    },
  },
  paint: {
    effect: {
      mn: "ADBE Paint",
      strokes: {
        brush: {
          mn: "ADBE Paint Atom",
          path: { mn: "ADBE Paint Shape" },
          stroke: {
            color: { mn: "ADBE Paint Color" },
            diameter: { mn: "ADBE Paint Diameter" },
            end: { mn: "ADBE Paint End" },
            mn: "ADBE Paint Properties",
          },
          transform: {
            mn: "ADBE Paint Transform",
            position: { mn: "ADBE Paint Position" },
          },
        },
        mn: "ADBE Paint Group",
      },
    },
  },
  shape: {
    contents: {
      group: {
        content: {
          ellipseGroup: {
            mn: "ADBE Vector Shape - Ellipse",
            position: { mn: "ADBE Vector Ellipse Position" },
            size: { mn: "ADBE Vector Ellipse Size" },
          },
          fill: {
            color: { mn: "ADBE Vector Fill Color" },
            mn: "ADBE Vector Graphic - Fill",
            opacity: { mn: "ADBE Vector Fill Opacity" },
          },
          mn: "ADBE Vectors Group",
          pathGroup: {
            mn: "ADBE Vector Shape - Group",
            path: { mn: "ADBE Vector Shape" },
          },
          polystarGroup: {
            innerRadius: { mn: "ADBE Vector Star Inner Radius" },
            innerRoundness: { mn: "ADBE Vector Star Inner Roundess" },
            mn: "ADBE Vector Shape - Star",
            outerRadius: { mn: "ADBE Vector Star Outer Radius" },
            outerRoundness: { mn: "ADBE Vector Star Outer Roundess" },
            points: { mn: "ADBE Vector Star Points" },
            position: { mn: "ADBE Vector Star Position" },
            rotation: { mn: "ADBE Vector Star Rotation" },
            type: { mn: "ADBE Vector Star Type" },
          },
          rectangleGroup: {
            mn: "ADBE Vector Shape - Rect",
            position: { mn: "ADBE Vector Rect Position" },
            roundness: { mn: "ADBE Vector Rect Roundness" },
            size: { mn: "ADBE Vector Rect Size" },
          },
          stroke: {
            color: { mn: "ADBE Vector Stroke Color" },
            lineCap: { mn: "ADBE Vector Stroke Line Cap" },
            lineJoin: { mn: "ADBE Vector Stroke Line Join" },
            mn: "ADBE Vector Graphic - Stroke",
            opacity: { mn: "ADBE Vector Stroke Opacity" },
            width: { mn: "ADBE Vector Stroke Width" },
          },
          trimPaths: {
            end: { mn: "ADBE Vector Trim End" },
            mn: "ADBE Vector Filter - Trim",
          },
        },
        mn: "ADBE Vector Group",
        transform: {
          mn: "ADBE Vector Transform Group",
          position: { mn: "ADBE Vector Position" },
        },
      },
      mn: "ADBE Root Vectors Group",
    },
  },
};
origami.math = {};
origami.math.turnVector2D = function (vec, angle) {
  angle = (angle / 180) * Math.PI;
  var rotatedVec = [];
  rotatedVec[0] = vec[0] * Math.cos(angle) - vec[1] * Math.sin(angle);
  rotatedVec[1] = vec[0] * Math.sin(angle) + vec[1] * Math.cos(angle);
  return rotatedVec;
};
origami.math.generatePolygon = function (numPoints, radius) {
  if (numPoints < 3) {
    throw new Error("Can\'t generate polygon with " + numPoints + " points");
  }
  if (radius <= 0) {
    throw new Error("Can\'t generate polygon with radius = " + radius);
  }
  var angleStep = 360 / numPoints;
  var vertices = [];
  for (var i = 0; i < numPoints; i += 1) {
    var vec = [0, -radius];
    vec = origami.math.turnVector2D(vec, angleStep * i);
    vertices.push(vec);
  }
  return vertices;
};
origami.getAllParamObjects = function (_group, _transformsArr) {
  var transformName = "ADBE Vector Transform Group";
  var allowedNames = [];
  allowedNames.push(
    origami.matchNames.shape.contents.group.content.rectangleGroup.mn,
  );
  allowedNames.push(
    origami.matchNames.shape.contents.group.content.ellipseGroup.mn,
  );
  allowedNames.push(
    origami.matchNames.shape.contents.group.content.polystarGroup.mn,
  );
  var arr = [];
  if (_transformsArr == undefined) {
    var _transformsArr = [];
  }
  if (_group.property(transformName) !== null) {
    localTrArr = _transformsArr.concat([_group.property(transformName)]);
  } else {
    localTrArr = _transformsArr;
  }
  for (var i = 1; i <= _group.numProperties; i += 1) {
    curProp = _group.property(i);
    if (allowedNames.indexOf(curProp.matchName) >= 0) {
      var obj = { prop: curProp, transformsArr: localTrArr };
      arr.push(obj);
    } else {
      if (curProp instanceof PropertyGroup) {
        arr = arr.concat(origami.getAllParamObjects(curProp, localTrArr));
      }
    }
  }
  return arr;
};
origami.convertParamShape = function (prop) {
  rectangle = function (prop) {
    var size = prop.property(
      origami.matchNames.shape.contents.group.content.rectangleGroup.size.mn,
    ).value;
    var pos = prop.property(
      origami.matchNames.shape.contents.group.content.rectangleGroup.position
        .mn,
    ).value;
    var roundness = prop.property(
      origami.matchNames.shape.contents.group.content.rectangleGroup.roundness
        .mn,
    ).value;
    if (!(size instanceof Array)) {
      throw new Error("Size is not an array");
    }
    var vertices = [];
    vertices[0] = [size[0], -size[1]] / 2;
    vertices[1] = [size[0], size[1]] / 2;
    vertices[2] = [-size[0], size[1]] / 2;
    vertices[3] = [-size[0], -size[1]] / 2;
    for (var i = 0; i < vertices.length; i += 1) {
      vertices[i] += pos;
    }
    if (roundness > 0) {
      var roundVertices = [];
      roundVertices[7] = vertices[0] + [-roundness, 0];
      roundVertices[0] = vertices[0] + [0, roundness];
      roundVertices[1] = vertices[1] + [0, -roundness];
      roundVertices[2] = vertices[1] + [-roundness, 0];
      roundVertices[3] = vertices[2] + [roundness, 0];
      roundVertices[4] = vertices[2] + [0, -roundness];
      roundVertices[5] = vertices[3] + [0, roundness];
      roundVertices[6] = vertices[3] + [roundness, 0];
      return roundVertices;
    } else {
      return vertices;
    }
  };
  ellipse = function (prop) {
    var size = prop.property(
      origami.matchNames.shape.contents.group.content.ellipseGroup.size.mn,
    ).value;
    var pos = prop.property(
      origami.matchNames.shape.contents.group.content.ellipseGroup.position.mn,
    ).value;
    var vertices = [];
    vertices.push([0, -size[1] / 2]);
    vertices.push([size[0] / 2, 0]);
    vertices.push([0, size[1] / 2]);
    vertices.push([-size[0] / 2, 0]);
    for (var i = 0; i < vertices.length; i += 1) {
      vertices[i] += pos;
    }
    return vertices;
  };
  polystar = function (prop) {
    paramPoly = function (prop) {
      var numPoints = prop.property(
        origami.matchNames.shape.contents.group.content.polystarGroup.points.mn,
      ).value;
      var outerRadius = prop.property(
        origami.matchNames.shape.contents.group.content.polystarGroup
          .outerRadius.mn,
      ).value;
      return origami.math.generatePolygon(numPoints, outerRadius);
    };
    star = function (prop) {
      var numPoints = prop.property(
        origami.matchNames.shape.contents.group.content.polystarGroup.points.mn,
      ).value;
      var innerRadius = prop.property(
        origami.matchNames.shape.contents.group.content.polystarGroup
          .innerRadius.mn,
      ).value;
      var outerPolygon = paramPoly(prop);
      var innerPolygon = origami.math.generatePolygon(numPoints, innerRadius);
      for (var i = 0; i < innerPolygon.length; i += 1) {
        innerPolygon[i] = origami.math.turnVector2D(
          innerPolygon[i],
          180 / numPoints,
        );
      }
      if (outerPolygon.length != innerPolygon.length) {
        throw new Error(
          "Error while converting a polystar: outer and inner polygons do not match!",
        );
      }
      var vertices = [];
      for (var i = 0; i < innerPolygon.length; i += 1) {
        vertices.push(outerPolygon[i]);
        vertices.push(innerPolygon[i]);
      }
      return vertices;
    };
    var type = prop.property(
      origami.matchNames.shape.contents.group.content.polystarGroup.type.mn,
    ).value;
    var rotation = prop.property(
      origami.matchNames.shape.contents.group.content.polystarGroup.rotation.mn,
    ).value;
    var position = prop.property(
      origami.matchNames.shape.contents.group.content.polystarGroup.position.mn,
    ).value;
    var vertices = [];
    if (type == 2) {
      vertices = paramPoly(prop);
    } else if (type == 1) {
      vertices = star(prop);
    } else {
      throw new Error("Unknown polystar type!");
    }
    for (var i = 0; i < vertices.length; i += 1) {
      vertices[i] = origami.math.turnVector2D(vertices[i], rotation);
      vertices[i] += position;
    }
    return vertices;
  };
  var vertices = [];
  switch (prop.matchName) {
    case origami.matchNames.shape.contents.group.content.rectangleGroup.mn:
      vertices = rectangle(prop);
      break;
    case origami.matchNames.shape.contents.group.content.ellipseGroup.mn:
      vertices = ellipse(prop);
      break;
    case origami.matchNames.shape.contents.group.content.polystarGroup.mn:
      vertices = polystar(prop);
      break;
    default:
      throw new Error("Unknown parametrical shape type!");
  }
  return vertices;
};
var Vertex = function (x, y) {
  if (arguments.length === 1) {
    if (Array.isArray(x)) {
      y = x[1];
      x = x[0];
    } else {
      y = x.y;
      x = x.x;
    }
  }
  this.x = x;
  this.y = y;
  this.next = null;
  this.prev = null;
  this._corresponding = null;
  this._distance = 0;
  this._isEntry = true;
  this._isIntersection = false;
  this._visited = false;
  this._isShared = false;
};
Vertex.createIntersection = function (x, y, distance) {
  var vertex = new Vertex(x, y);
  vertex._distance = distance;
  vertex._isIntersection = true;
  vertex._isEntry = false;
  return vertex;
};
Vertex.prototype.visit = function () {
  this._visited = true;
  if (this._corresponding !== null && !this._corresponding._visited) {
    this._corresponding.visit();
  }
};
Vertex.prototype.equals = function (v) {
  return this.x === v.x && this.y === v.y;
};
Vertex.prototype.setCorresponding = function (v) {
  this._corresponding = v;
};
Vertex.prototype.isInside = function (poly) {
  var oddNodes = false;
  var vertex = poly.first;
  var next = vertex.next;
  var x = this.x;
  var y = this.y;
  do {
    if (
      ((vertex.y < y && next.y >= y) || next.y < y) &&
      vertex.y >= y &&
      (vertex.x <= x || next.x <= x)
    ) {
      oddNodes ^=
        vertex.x +
          ((y - vertex.y) / (next.y - vertex.y)) * (next.x - vertex.x) <
        x;
    }
    vertex = vertex.next;
    next = vertex.next || poly.first;
  } while (!vertex.equals(poly.first));
  return oddNodes;
};
Vertex.prototype.onSegment = function (segment) {
  var x1 = segment[0].x;
  var y1 = segment[0].y;
  var x2 = segment[1].x;
  var y2 = segment[1].y;
  if (
    this.x == x1 &&
    this.x == x2 &&
    ((y1 < this.y && this.y < y2) || (y2 < this.y && this.y < y1))
  ) {
    return true;
  }
  return (
    (this.x - x1) * (y2 - y1) - (this.y - y1) * (x2 - x1) == 0 &&
    ((x1 < this.x && this.x < x2) || (x2 < this.x && this.x < x1))
  );
};
Vertex.prototype.inMiddleOfStraightLine = function () {
  var x1 = this.prev.x;
  var y1 = this.prev.y;
  var x2 = this.x;
  var y2 = this.y;
  var x3 = this.next.x;
  var y3 = this.next.y;
  return (x3 - x1) / (x2 - x1) == (y3 - y1) / (y2 - y1);
};
var Intersection = function (s1, s2, c1, c2) {
  this.x = 0;
  this.y = 0;
  this.toSource = 0;
  this.toClip = 0;
  this.d = 0;
  var d = (c2.y - c1.y) * (s2.x - s1.x) - (c2.x - c1.x) * (s2.y - s1.y);
  if (d === 0) {
    return;
  }
  this.toSource =
    ((c2.x - c1.x) * (s1.y - c1.y) - (c2.y - c1.y) * (s1.x - c1.x)) / d;
  this.toClip =
    ((s2.x - s1.x) * (s1.y - c1.y) - (s2.y - s1.y) * (s1.x - c1.x)) / d;
  if (this.valid()) {
    this.x = s1.x + this.toSource * (s2.x - s1.x);
    this.y = s1.y + this.toSource * (s2.y - s1.y);
  }
};
Intersection.prototype.valid = function () {
  return (
    0 < this.toSource && this.toSource < 1 && 0 < this.toClip && this.toClip < 1
  );
};
Array.isArray =
  Array.isArray ||
  function (o) {
    return Boolean(
      o && Object.prototype.toString.call(Object(o)) === "[object Array]",
    );
  };
var isVertexSharedWith = function (vert, pol) {
  var polVertex = pol.first;
  do {
    if (vert.x == polVertex.x && vert.y == polVertex.y) {
      return true;
    }
    polVertex = polVertex.next;
  } while (!polVertex.equals(pol.first));
  return false;
};
__buildPolyFake = function (arr) {
  if (!Array.isArray(arr)) {
    alert("NOT ARRAY");
    return arr;
  }
  var poly = {};
  poly = arr.map(function (o) {
    return { x: o[0], y: o[1] };
  });
  return poly;
};
var Polygon = function (p, arrayVertices) {
  this.first = null;
  this.vertices = 0;
  this._lastUnprocessed = null;
  this._arrayVertices =
    typeof arrayVertices === "undefined" ? Array.isArray(p[0]) : arrayVertices;
  for (var i = 0, len = p.length; i < len; i++) {
    this.addVertex(new Vertex(p[i]));
  }
  origami.writeln("POLYGON CREATED!");
  origami.writeln("FROM:");
  for (var i = 0; i < p.length; i += 1) {
    origami.writeln(p[i].x + " " + p[i].y);
  }
  origami.writeln("-----\n");
};
Polygon.prototype.addVertex = function (vertex) {
  if (this.first == null) {
    this.first = vertex;
    this.first.next = vertex;
    this.first.prev = vertex;
  } else {
    var next = this.first;
    var prev = next.prev;
    next.prev = vertex;
    vertex.next = next;
    vertex.prev = prev;
    prev.next = vertex;
  }
  this.vertices++;
};
Polygon.prototype.insertVertex = function (vertex, start, end) {
  var curr = start;
  while (!curr.equals(end) && curr._distance < vertex._distance) {
    curr = curr.next;
  }
  vertex.next = curr;
  prev = curr.prev;
  vertex.prev = prev;
  prev.next = vertex;
  curr.prev = vertex;
  this.vertices++;
};
Polygon.prototype.insertBetween = function (vertex, start, end) {
  vertex.prev = start;
  start.next = vertex;
  vertex.next = end;
  end.prev = vertex;
  this.vertices++;
  return vertex;
};
Polygon.prototype.getNext = function (v) {
  var c = v;
  while (c._isIntersection) {
    c = c.next;
  }
  return c;
};
Polygon.prototype.getFirstIntersect = function () {
  var v = this._firstIntersect || this.first;
  do {
    if (v._isIntersection && !v._visited) {
      break;
    }
    v = v.next;
  } while (!v.equals(this.first));
  this._firstIntersect = v;
  return v;
};
Polygon.prototype.hasUnprocessed = function () {
  var v = this._lastUnprocessed || this.first;
  do {
    if (v._isIntersection && !v._visited) {
      this._lastUnprocessed = v;
      return true;
    }
    v = v.next;
  } while (!v.equals(this.first));
  this._lastUnprocessed = null;
  return false;
};
Polygon.prototype.getPoints = function () {
  var points = [];
  var v = this.first;
  if (this._arrayVertices) {
    do {
      points.push([v.x, v.y]);
      v = v.next;
    } while (v !== this.first);
  } else {
    do {
      points.push({ x: v.x, y: v.y });
      v = v.next;
    } while (v !== this.first);
  }
  return points;
};
Polygon.prototype.setCorrespondingPair = function (vertex) {
  var v = this.first;
  do {
    if (v.x == vertex.x && v.y == vertex.y) {
      vertex._corresponding = v;
      v._corresponding = vertex;
    }
    v = v.next;
  } while (!v.equals(this.first));
};
var vertexPushed = function (arr, vert_arr) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i][0] == vert_arr[0] && arr[i][1] == vert_arr[1]) {
      return true;
    }
  }
  return false;
};
Polygon.prototype.clip = function (clip, sourceForwards, clipForwards) {
  var sourceVertex = this.first;
  var clipVertex = clip.first;
  origami.writeln("making cool stuf");
  origami.writeln(sourceForwards + " " + clipForwards);
  var arr_pushed = [];
  do {
    do {
      if (
        sourceVertex.onSegment([clipVertex, clipVertex.next]) &&
        !vertexPushed(arr_pushed, [sourceVertex.x, sourceVertex.y])
      ) {
        inserted = clip.insertBetween(
          new Vertex(sourceVertex.x, sourceVertex.y),
          clipVertex,
          clipVertex.next,
        );
        arr_pushed.push([sourceVertex.x, sourceVertex.y]);
        sourceVertex = sourceVertex.next;
      } else {
        sourceVertex = sourceVertex.next;
      }
    } while (!sourceVertex.equals(this.first));
    clipVertex = clipVertex.next;
  } while (!clipVertex.equals(clip.first));
  arr_pushed = [];
  do {
    do {
      if (
        clipVertex.onSegment([sourceVertex, sourceVertex.next]) &&
        !vertexPushed(arr_pushed, [clipVertex.x, clipVertex.y])
      ) {
        inserted = this.insertBetween(
          new Vertex(clipVertex.x, clipVertex.y),
          sourceVertex,
          sourceVertex.next,
        );
        arr_pushed.push([clipVertex.x, clipVertex.y]);
        clipVertex = clipVertex.next;
      } else {
        clipVertex = clipVertex.next;
      }
    } while (!clipVertex.equals(clip.first));
    sourceVertex = sourceVertex.next;
  } while (!sourceVertex.equals(this.first));
  sourceVertex = this.first;
  clipVertex = clip.first;
  do {
    sourceVertex = sourceVertex.next;
  } while (!sourceVertex.equals(this.first));
  clipVertex = clip.first;
  sourceVertex = this.first;
  if (clip.first == null) {
    origami.writeln("TUT!!!");
    return this.getPoints();
  }
  do {
    if (!sourceVertex._isIntersection) {
      do {
        if (!clipVertex._isIntersection) {
          var i = new Intersection(
            sourceVertex,
            this.getNext(sourceVertex.next),
            clipVertex,
            clip.getNext(clipVertex.next),
          );
          if (i.valid()) {
            var sourceIntersection = Vertex.createIntersection(
              i.x,
              i.y,
              i.toSource,
            );
            var clipIntersection = Vertex.createIntersection(
              i.x,
              i.y,
              i.toClip,
            );
            sourceIntersection._corresponding = clipIntersection;
            clipIntersection._corresponding = sourceIntersection;
            this.insertVertex(
              sourceIntersection,
              sourceVertex,
              this.getNext(sourceVertex.next),
            );
            clip.insertVertex(
              clipIntersection,
              clipVertex,
              clip.getNext(clipVertex.next),
            );
            origami.writeln("found intersection");
          }
        }
        clipVertex = clipVertex.next;
      } while (!clipVertex.equals(clip.first));
    }
    sourceVertex = sourceVertex.next;
  } while (!sourceVertex.equals(this.first));
  sourceVertex = this.first;
  clipVertex = clip.first;
  do {
    if (
      !sourceVertex._isIntersection &&
      isVertexSharedWith(sourceVertex, clip)
    ) {
      if (!this._firstIntersect) {
        this._firstIntersect = sourceVertex;
      }
      sourceVertex._isIntersection = true;
      sourceVertex._isShared = true;
      sourceVertex._corresponding = sourceVertex;
    }
    sourceVertex = sourceVertex.next;
  } while (!sourceVertex.equals(this.first));
  do {
    if (!clipVertex._isIntersection && isVertexSharedWith(clipVertex, this)) {
      if (!clip._firstIntersect) {
        clip._firstIntersect = clipVertex;
      }
      clipVertex._isIntersection = true;
      clipVertex._isShared = true;
      clipVertex._corresponding = clipVertex;
    }
    clipVertex = clipVertex.next;
  } while (!clipVertex.equals(clip.first));
  sourceVertex = this.first;
  clipVertex = clip.first;
  sourceInClip = _contains(sourceVertex, clip.getPoints());
  var f = this.getPoints();
  clipInSource = _contains(clipVertex, __buildPolyFake(this.getPoints()));
  origami.writeln("first source: " + this.first.x + " " + this.first.y);
  origami.writeln("first clipping: " + clip.first.x + " " + clip.first.y);
  origami.writeln(
    "Calculated SINCLIP and CISOUR " + sourceInClip + " " + clipInSource,
  );
  sourceForwards ^= sourceInClip;
  clipForwards ^= clipInSource;
  do {
    if (sourceVertex._isIntersection) {
      if (sourceVertex._isShared && sourceVertex.next._isShared) {
        sourceVertex._isIntersection = false;
      } else {
        sourceVertex._isEntry = Boolean(sourceForwards);
        sourceForwards = Boolean(!sourceForwards);
      }
      if (!sourceVertex.inMiddleOfStraightLine() && sourceVertex._isShared) {
        sourceVertex._isEntry = Boolean(sourceForwards);
        sourceForwards = Boolean(!sourceForwards);
      }
    }
    sourceVertex = sourceVertex.next;
  } while (!sourceVertex.equals(this.first));
  do {
    if (clipVertex._isIntersection) {
      if (clipVertex._isShared && clipVertex.next._isShared) {
        clipVertex._isIntersection = false;
      } else {
        clipVertex._isEntry = Boolean(clipForwards);
        clipForwards = Boolean(!clipForwards);
      }
      if (!clipVertex.inMiddleOfStraightLine() && clipVertex._isShared) {
        clipVertex._isIntersection = true;
      }
    }
    clipVertex = clipVertex.next;
  } while (!clipVertex.equals(clip.first));
  var list = [];
  while (this.hasUnprocessed()) {
    var current = this.getFirstIntersect();
    var clipped = new Polygon([], this._arrayVertices);
    clipped.addVertex(new Vertex(current.x, current.y));
    do {
      current.visit();
      if (current._isEntry) {
        do {
          current = current.next;
          clipped.addVertex(new Vertex(current.x, current.y));
        } while (!current._isIntersection);
      } else {
        do {
          current = current.prev;
          clipped.addVertex(new Vertex(current.x, current.y));
        } while (!current._isIntersection);
      }
      current = current._corresponding;
    } while (!current._visited);
    list.push(clipped.getPoints());
  }
  origami.writeln(
    "Polygonjs: sourceinClip and clipInSource" +
      sourceInClip +
      " " +
      clipInSource,
  );
  if (list.length === 0) {
    if (sourceInClip) {
      list.push(this.getPoints());
    }
    if (clipInSource) {
      list.push(clip.getPoints());
    }
    if (list.length === 0) {
      list = null;
    }
  }
  return list;
};
clip = function (polygonA, polygonB, eA, eB) {
  origami.writeln("SUKO" + eA + " " + eB);
  var source = new Polygon(polygonA);
  var clip = new Polygon(polygonB);
  var result = source.clip(clip, eA, eB);
  return result;
};
greinerHormann = this;
greinerHormann.union = function (polygonA, polygonB) {
  return clip(polygonA, polygonB, false, false);
};
greinerHormann.intersection = function (polygonA, polygonB) {
  return clip(polygonA, polygonB, true, true);
};
greinerHormann.diff = function (polygonA, polygonB) {
  return clip(polygonA, polygonB, false, true);
};
origami.mergePolygons = function (mask) {
  var activeComp = app.project.activeItem;
  if (activeComp && activeComp instanceof CompItem) {
    var sel = activeComp.selectedLayers;
    if (sel.length > 1) {
      var tmpPolys = [];
      for (var s = 0; s < 2; s += 1) {
        tmpPolys.push(this.getSliceVertices(sel[s], mask));
      }
      tmpPolys[0].mergeWith(tmpPolys[1]);
      sel[1].remove();
      if (!mask) {
        p = sel[0].property("ADBE Root Vectors Group").getFirstPath();
      } else {
        p = sel[0]
          .property("ADBE Mask Parade")
          .property("ADBE Mask Atom")
          .property("ADBE Mask Shape");
      }
      var newPoly = new Shape();
      newPoly.vertices = tmpPolys[0].vertices.map(function (o) {
        return [o.x, o.y];
      });
      newPoly.closed = true;
      p.setValue(newPoly);
    }
  }
};
origami.shapesToMasks = function (layer) {
  if (layer == undefined) {
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
      var sel = activeComp.selectedLayers;
      if (sel && sel.length > 0) {
        layer = sel[0];
      }
    }
  }
  if (layer && layer instanceof ShapeLayer) {
    var comp = layer.containingComp;
    var originalPolygons = layer
      .property("ADBE Root Vectors Group")
      .getAllPathsObjects();
    var polygons = originalPolygons.map(function (p) {
      return new this.polygon(p.prop.value.vertices, layer);
    });
    var transforms = originalPolygons.map(function (t) {
      return new this.point(
        t.transformsArr[0].property("ADBE Vector Position").value -
          t.transformsArr[0].property("ADBE Vector Anchor").value,
      );
    });
    for (var p = 0; p < polygons.length; p += 1) {
      polygons[p].vertices = polygons[p].vertices.addToAll(transforms[p]);
    }
    var maskSolid = comp.layers.addSolid(
      [1, 1, 0],
      "maskSolid",
      comp.width,
      comp.height,
      comp.pixelAspect,
      comp.duration,
    );
    maskSolid
      .property("ADBE Transform Group")
      .property("ADBE Position")
      .setValue([0, 0]);
    maskSolid
      .property("ADBE Transform Group")
      .property("ADBE Anchor Point")
      .setValue([0, 0]);
    for (var p = 0; p < polygons.length; p += 1) {
      meshGen.drawMask(
        polygons[p].vertices.map(function (o) {
          return [o.x, o.y];
        }),
        maskSolid,
        1,
      );
    }
  }
};
origami.unwrap = function (thisObj, mode, onePoint, out, animArray) {
  var activeComp = app.project.activeItem;
  if (activeComp && activeComp instanceof CompItem) {
    var sel = activeComp.selectedLayers;
    if (sel != undefined) {
      origami.activeGraph = origami.buildGraph(activeComp);
      origami.writeln(origami.activeGraph.vertices.length);
      if (origami.activeGraph.vertices.length > 0) {
        var w = new Window("palette");
        var progressGroup = w.add(
          "group{orientation:\'column\', justify: \'center\',alignment:[\'left\',\'top\']}",
        );
        var progressTxt = progressGroup.add(
          "statictext",
          undefined,
          "Looking for neighbors",
        );
        var progress = progressGroup.add(
          "progressbar",
          undefined,
          1,
          origami.activeGraph.vertices.length,
        );
        w.show();
        origami.activeGraph.resetParentingAndProps();
        origami.activeGraph = origami.buildGraph(activeComp);
        origami.activeGraph.buildEdges(Boolean(mode), onePoint, progress);
        origami.activeGraph.setParentingAndProps();
        if (out) {
          origami.activeGraph.reverseParenting();
        }
        origami.applyExpressions(origami.activeGraph, animArray);
        origami.activeGraph.postAction();
      }
    }
  }
};
origami.buildGraph = function (_comp, _update) {
  var comp = _comp || null;
  var update = _update || false;
  if (comp == null) {
    var tmp = app.project.activeItem;
    if (tmp instanceof CompItem) {
      comp = tmp;
    }
  }
  var graph = new this.graph(comp);
  for (var l = 1; l <= comp.layers.length; l += 1) {
    if (comp.layers[l].enabled == true) {
      var newPolygon = this.getSliceVertices(comp.layers[l]);
      if (newPolygon) {
        vert = new this.graphVertex(comp.layers[l], newPolygon);
        if (update === true) {
          weight = comp.layers[l].name.lastIndexOf("_\t");
          if (weight != -1) {
            weight = Number(
              comp.layers[l].name.substr(
                weight + 1,
                comp.layers[l].name.length,
              ),
            );
            vert.setLayerWeight(weight);
            if (weight == 0) {
              graph.addStartVertex(vert);
            }
          }
        }
        if (vert) {
          graph.addVertex(vert);
        }
        if (comp.layers[l].selected === true) {
          graph.addStartVertex(vert);
        }
      }
    }
  }
  return graph;
};
origami.getLayerBound = function (_layer) {
  function getSourceRect(_layer) {
    var gettySlider = _layer
      .property("ADBE Effect Parade")
      .addProperty("ADBE Point Control");
    gettySlider.property("ADBE Point Control-0001").expression =
      "thisLayer.sourceRectAtTime(time, true).width * [1,1]";
    width = gettySlider
      .property("ADBE Point Control-0001")
      .valueAtTime(_layer.containingComp.time, false)[0];
    gettySlider.property("ADBE Point Control-0001").expression =
      "thisLayer.sourceRectAtTime(time, true).height * [1,1]";
    height = gettySlider
      .property("ADBE Point Control-0001")
      .valueAtTime(_layer.containingComp.time, false)[0];
    gettySlider.remove();
    return [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ];
  }
  var maskVertices = getSourceRect(_layer);
  origami.drawMask(maskVertices, _layer, 1, true);
  return new origami.polygon(maskVertices, _layer);
};
origami.createShattermap = function (colorType) {
  var activeComp = app.project.activeItem;
  if (activeComp && activeComp instanceof CompItem) {
    var sel = activeComp.selectedLayers;
    var colorGen = new origami.colorGenerator();
    if (sel) {
      origami.activeGraph = origami.buildGraph(activeComp);
      var shapeLayer = activeComp.layers.addShape();
      shapeLayer.name = activeComp.name + "_shattermap";
      shapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([0, 0]);
      var polygons = origami.activeGraph.vertices.map(function (o) {
        return o.polygon.vertices.map(function (v) {
          return [v.x, v.y];
        });
      });
      origami.makeSlices(
        activeComp,
        polygons,
        activeComp.layers[1],
        true,
        1,
        false,
        false,
        false,
        2,
        80,
        true,
      );
    }
  }
};
origami.relinkMainNull = function (comp, connect) {
  var tmp = [];
  var controlLayer = comp.layer(origami.names.controlLayer);
  if (controlLayer) {
    if (connect === false) {
      for (var l = 1; l <= comp.layers.length; l += 1) {
        thisL = comp.layers[l];
        if (thisL.parent == controlLayer) {
          tmp.push(thisL);
          thisL.parent = null;
        }
      }
      origami.tmpConnect = tmp;
    } else {
      if (origami.tmpConnect) {
        for (var t = 0; t < origami.tmpConnect.length; t += 1) {
          origami.tmpConnect[t].parent = controlLayer;
        }
      }
    }
  }
};
origami.applyExpressions = function (graph, animArray) {
  for (var v = 0; v < graph.vertices.length; v += 1) {
    try {
      if (animArray[0]) {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Rotate X").expression = this.expressions.rotX;
      } else {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Rotate X").expression = "";
      }
      if (animArray[1]) {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Opacity").expression = this.expressions.opacity;
      } else {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Opacity").expression = "";
      }
      if (animArray[2]) {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Scale").expression = this.expressions.scale;
      } else {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Scale").expression = "";
      }
      if (animArray[3]) {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = this.expressions.position;
      } else {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = "";
      }
      if (animArray[4]) {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression = this.expressions.rotZ;
      } else {
        graph.vertices[v].layer
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression = "";
      }
    } catch (err) {
      null;
    }
  }
};
origami.masksExplode = function (layer, offset, remove) {
  if (layer == undefined) {
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
      var sel = activeComp.selectedLayers;
      if (sel.length > 0) {
        layer = sel[0];
      }
    }
  }
  if (layer && layer.property("ADBE Mask Parade").numProperties > 0) {
    var masks = layer.property("ADBE Mask Parade");
    var allMasks = [];
    for (var m = masks.numProperties; m > 0; m--) {
      allMasks.push(masks.property(m).property("ADBE Mask Shape").value);
      masks.property(m).remove();
    }
    for (var m = 0; m < allMasks.length; m += 1) {
      var newLayer = layer.duplicate();
      var newMask = newLayer
        .property("ADBE Mask Parade")
        .addProperty("ADBE Mask Atom");
      newMask.property("ADBE Mask Shape").setValue(allMasks[m]);
      newMask.property("ADBE Mask Offset").setValue(offset);
      newLayer.name = newLayer.name + "_Mask_" + String(m);
    }
    if (remove) {
      layer.remove();
    }
  }
};
var wtfnh = {
  helpButtons: [],
  offerBeta: false,
  offerTrial: true,
  privateNumber: 7242854536479338,
  productSKU: "NSO-SUL",
  scriptAuthor: "ExtraBite",
  scriptName: "Origami",
  scriptURL: "https://aescripts.com/origami/",
  scriptVersion: "1.4.0",
};
var gr44ssa = new a(wtfnh);
if (gr44ssa.t()) {
  origami.kekPuk = true;
} else {
  origami.kekPuk = false;
  origami.jsx_Registered = gr44ssa.getRegistration();
}
if (gr44ssa.c()) {
  origami.buildGUI(origami);
} else {
  alert("Such a great time to purchase Origami!");
}
