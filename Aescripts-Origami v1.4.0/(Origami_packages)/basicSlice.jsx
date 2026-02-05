/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

origami.voronoiSlice = function (poly, pointCount) {
  var bbox = poly.boundingBox;
  bbox = {
    xl: bbox[0][0] - 20,
    xr: bbox[1][0] + 20,
    yb: bbox[1][1] + 20,
    yt: bbox[0][1] - 20,
  };
  if (pointCount) {
    randPoints = poly.genRandomPoints(pointCount);
  }
  var voronoiVertices = poly.vertices.map(function (o) {
    return { x: o.x, y: o.y };
  });
  randPoints = randPoints.map(function (o) {
    return { x: o.x, y: o.y };
  });
  var polyVertices = poly.vertices.map(function (o) {
    return { x: o.x, y: o.y };
  });
  voronoiVertices = voronoiVertices.concat(randPoints);
  var voronoi = new Voronoi();
  result = voronoi.compute(voronoiVertices, bbox);
  var prePolygons = result.cells.map(function (o) {
    return o.halfedges.map(function (r) {
      return [r.getStartpoint().x, r.getStartpoint().y];
    });
  });
  var resulted = [];
  for (var p = 0; p < prePolygons.length; p += 1) {
    origami.writeln("P " + p);
    var res = greinerHormann.intersection(prePolygons[p], polyVertices);
    origami.writeln("ClippingPoly is: ");
    for (var i = 0; i < polyVertices.length; i += 1) {
      origami.writeln("## " + polyVertices[i].x + " " + polyVertices[i].y);
    }
    origami.writeln("Resulted Polygon after clipping: ");
    for (var k = 0; k < res.length; k += 1) {
      for (var i = 0; i < res[k].length; i += 1) {
        origami.writeln(">> " + res[k][i][0] + " " + res[k][i][1]);
      }
    }
    origami.writeln("Before clipping was: ");
    for (var i = 0; i < prePolygons[p].length; i += 1) {
      origami.writeln(
        "-- " + prePolygons[p][i][0] + " " + prePolygons[p][i][1],
      );
    }
    for (var k = 0; k < res.length; k += 1) {
      resulted.push(res[k]);
    }
  }
  polygons = resulted;
  return polygons;
};
origami.delauneySlice = function (poly, pointCount) {
  if (poly instanceof Array) {
    holes = poly[1];
    holes = holes.map(function (o) {
      return o.vertices;
    });
    poly = poly[0];
    vertices = poly.vertices;
  } else {
    vertices = poly.vertices;
    holes = [];
  }
  if (vertices && vertices.length > 2) {
    if (pointCount) {
      randPoints = poly.genRandomPoints(pointCount);
    }
    var contour = vertices.map(function (o) {
      return new poly2tri.Point(o.x, o.y);
    });
    var swctx = new poly2tri.SweepContext(contour);
    if (randPoints.length > 0) {
      var points = randPoints.map(function (o) {
        return new poly2tri.Point(o.x, o.y);
      });
      for (var p = 0; p < points.length; p += 1) {
        swctx.addPoint(points[p]);
      }
    }
    if (holes.length > 0) {
      var holesArray = [];
      for (var h = 0; h < holes.length; h += 1) {
        swctx.addHole(
          holes[h].map(function (o) {
            return new poly2tri.Point(o.x, o.y);
          }),
        );
      }
    }
    swctx.triangulate();
    var polygons = swctx.getTriangles();
    polygons = polygons.map(function (o) {
      return [
        [o.getPoint(0).x, o.getPoint(0).y],
        [o.getPoint(1).x, o.getPoint(1).y],
        [o.getPoint(2).x, o.getPoint(2).y],
      ];
    });
  }
  return polygons;
};
origami.trianglesOneSlice = function (poly, pointCount) {
  var polyVertices = poly.vertices.map(function (o) {
    return { x: o.x, y: o.y };
  });
  var prePolygons = [];
  var bbox = poly.boundingBox;
  bbox = [
    [bbox[0][0] - 0.1, bbox[0][1] - 0.1],
    [bbox[1][0] + 0.1, bbox[1][1] + 0.1],
  ];
  var polyLenght = bbox[1][0] - bbox[0][0];
  var polyHeight = bbox[1][1] - bbox[0][1];
  var sq = Math.ceil((polyLenght * polyHeight) / pointCount);
  var size = Math.ceil(Math.sqrt(sq));
  var lines = Math.ceil(polyHeight / size);
  var cols = Math.ceil(polyLenght / size) * 2;
  var triangleTypes = [1, 3, 4, 2];
  for (var line = 0; line < lines; line += 1) {
    for (var col = 0; col < cols; col += 1) {
      var type = triangleTypes[(col + 2 * (line % 2)) % 4];
      var shift = [Math.floor(col / 2) * size, line * size];
      var vertices = [
        bbox[0] + [0, 0] + shift,
        bbox[0] + [size, 0] + shift,
        bbox[0] + [size, size] + shift,
        bbox[0] + [0, size] + shift,
      ];
      vertices.splice(type - 1, 1);
      prePolygons.push(vertices);
    }
  }
  var polygons = [];
  for (var p = 0; p < prePolygons.length; p += 1) {
    var res = greinerHormann.intersection(prePolygons[p], polyVertices);
    if (res != null) {
      res.map(function (o) {
        polygons.push(o);
      });
    }
  }
  return polygons;
};
origami.trianglesTwoSlice = function (poly, pointCount) {
  var polyVertices = poly.vertices.map(function (o) {
    return { x: o.x, y: o.y };
  });
  var prePolygons = [];
  var bbox = poly.boundingBox;
  bbox = [
    [bbox[0][0] - 0.1, bbox[0][1] - 0.1],
    [bbox[1][0] + 0.1, bbox[1][1] + 0.1],
  ];
  var polyLenght = bbox[1][0] - bbox[0][0];
  var polyHeight = bbox[1][1] - bbox[0][1];
  var sq = Math.ceil((polyLenght * polyHeight) / pointCount);
  var size = Math.ceil(Math.sqrt(sq));
  var lines = Math.ceil(polyHeight / size);
  var cols = Math.ceil(polyLenght / size) * 2;
  var triangleTypes = [1, 3, 1, 3];
  for (var line = 0; line < lines; line += 1) {
    for (var col = 0; col < cols; col += 1) {
      var type = triangleTypes[(col + 2 * (line % 2)) % 4];
      var shift = [Math.floor(col / 2) * size, line * size];
      var vertices = [
        bbox[0] + [0, 0] + shift,
        bbox[0] + [size, 0] + shift,
        bbox[0] + [size, size] + shift,
        bbox[0] + [0, size] + shift,
      ];
      vertices.splice(type - 1, 1);
      prePolygons.push(vertices);
    }
  }
  var polygons = [];
  for (var p = 0; p < prePolygons.length; p += 1) {
    var res = greinerHormann.intersection(prePolygons[p], polyVertices);
    if (res != null) {
      res.map(function (o) {
        polygons.push(o);
      });
    }
  }
  return polygons;
};
origami.squaresSlice = function (poly, pointCount) {
  var polyVertices = poly.vertices.map(function (o) {
    return { x: o.x, y: o.y };
  });
  var prePolygons = [];
  var bbox = poly.boundingBox;
  bbox = [
    [bbox[0][0] - 0.1, bbox[0][1] - 0.1],
    [bbox[1][0] + 0.1, bbox[1][1] + 0.1],
  ];
  var polyLenght = bbox[1][0] - bbox[0][0];
  var polyHeight = bbox[1][1] - bbox[0][1];
  var sq = (polyLenght * polyHeight) / pointCount;
  var size = Math.round(Math.sqrt(sq) * 100) / 100;
  var lines = Math.ceil(polyHeight / size);
  var cols = Math.ceil(polyLenght / size);
  for (var line = 0; line < lines; line += 1) {
    for (var col = 0; col < cols; col += 1) {
      var shift = [col * size, line * size];
      var vertices = [
        bbox[0] + [0, 0] + shift,
        bbox[0] + [size, 0] + shift,
        bbox[0] + [size, size] + shift,
        bbox[0] + [0, size] + shift,
      ];
      prePolygons.push(vertices);
    }
  }
  var polygons = [];
  for (var p = 0; p < prePolygons.length; p += 1) {
    var res = greinerHormann.intersection(prePolygons[p], polyVertices);
    if (res != null) {
      res.map(function (o) {
        polygons.push(o);
      });
    }
  }
  return polygons;
};
origami.sliceAlgorithms = {
  slice0: { name: "Triangulation", slicer: origami.delauneySlice },
  slice1: { name: "Voronoi", slicer: origami.voronoiSlice },
  slice2: { name: "Regular Trianges - 1", slicer: origami.trianglesOneSlice },
  slice3: { name: "Regular Triangles - 2", slicer: origami.trianglesTwoSlice },
  slice4: { name: "Squares", slicer: origami.squaresSlice },
};
