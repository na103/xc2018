// From row name to [internal Y coordinate (G), screen Y coordinate]
var rowInfo = {

 // "row.A.io2": [188, 60], // My invention, I/O above CLB
 "row.A.local.0": [173, 2],
 "CLK.AA.O": [170, 22],
 "row.A.long.2": [169, 26],
 "row.A.local.1": [167, 30],
 "row.A.local.2": [166, 34],
 "row.A.local.3": [164, 38],
 "row.A.local.4": [163, 42],
 "row.A.long.3": [161, 48],
 "row.A.local.5": [160, 52], // Also I/O lines, would be io1
 "row.A.io2": [159, 56], // My invention, I/O above CLB
 "row.A.io3": [158, 60], // My invention, row near top of CLB
 "row.A.io4": [157, 64], // My invention, I/O above CLB
 "row.A.io5": [156, 68], // My invention, I/O aligned with top of CLB
 "row.A.io6": [155, 72], // My invention, I/O just below top of CLB
 "row.A.b": [154, 80], // My invention, input b to CLB
 "row.A.c": [153, 86], // My invention, input c to CLB
 "row.A.k": [152, 92], // My invention, input k to CLB
 "row.A.y": [151, 96], // My invention, input d to CLB

 "row.I.local.0": [17, 604],
 "row.I.io1": [16, 608], // My invention
 "row.I.io2": [15, 612], // My invention
 "row.I.io3": [14, 616], // My invention
 "row.I.io4": [13, 620], // My invention
 "row.I.long.1": [12, 624],
 "row.I.local.1": [10, 630],
 "row.I.local.2": [9, 634],
 "row.I.local.3": [7, 638],
 "row.I.local.4": [6, 642],
 "row.I.long.2": [4, 646],
 "row.I.clk": [3, 652], // My invention
 "row.I.local.5": [0, 672],
}

// From column name to [internal X coordinate, screen X coordinate]
var colInfo = {
 "col.A.local.0": [0, 2],
 "col.A.long.2": [3, 22],
 "col.A.local.1": [5, 26],
 "col.A.local.2": [6, 30],
 "col.A.local.3": [8, 34],
 "col.A.local.4": [9, 38],
 "col.A.long.3": [11, 44],
 "col.A.long.4": [12, 48],
 "col.A.clk": [13, 52], // My invention
 "col.A.local.5": [14, 56],
 "col.A.io1": [15, 62], // My invention, three I/O verticals feeding to matrices
 "col.A.io2": [16, 66], // My invention
 "col.A.io3": [17, 70], // My invention
 "col.A.x": [18, 74], // My invention, x input to CLB
 "col.A.clbl1": [19, 78], // My invention, one column left of center of CLB.
 "col.A.clb": [21, 88], // My invention, through center of CLB.
 "col.A.clbr1": [22, 94], // My invention, one column right of center of CLB.
 "col.A.clbr2": [23, 98], // My invention, two columns right of center of CLB.
 "col.A.clbr3": [24, 102], // My invention, three columns right of center of CLB.

// Note: clbw1-3 are wrapped around clbr1-3 from the neighboring tile.
// E.g. AB.clbl3 is above AA
// This makes assigning iobs to columns easier.
 "col.I.clbw1": [162, 598],
 "col.I.clbw2": [163, 602],
 "col.I.clbw3": [164, 606],
 "col.I.io1": [165, 610], // My invention, the column used just for I/O pins
 "col.I.io2": [166, 614], // My invention, the column used just for I/O pins
 "col.I.local.0": [167, 618],
 "col.I.io3": [168, 622], // My invention, the column used just for I/O pins
 "col.I.long.1": [169, 626],
 "col.I.long.2": [170, 630],
 "col.I.local.1": [172, 636],
 "col.I.local.2": [173, 640],
 "col.I.local.3": [175, 644],
 "col.I.local.4": [176, 648],
 "col.I.long.3": [178, 652],
 "col.I.local.5": [181, 672],
 "col.I.clb": [999, 999], // My invention
}

const rowFromG = {}; // Look up the row name from the G coordinate
const colFromG = {}; // Look up the column name from the G coordinate

function initNames() {
  // Generate formulaic row and column names (B through H)
  for (var i = 1; i < 8; i++) {
    var cstart = 27 + 20 * (i-1);
    var name = "ABCDEFGHI"[i];

    // Note: clbw1-3 are wrapped around clbr1-3 from the neighboring tile.
    // E.g. AB.clbl3 is above AA
    // This makes assigning iobs to columns easier.
    colInfo['col.' + name + '.clbw1'] = [cstart - 5, 94 + 72 * (i-1)]; // My invention, one column right of center of CLB.
    colInfo['col.' + name + '.clbw2'] = [cstart - 4, 98 + 72 * (i-1)]; // My invention, two columns right of center of CLB.
    colInfo['col.' + name + '.clbw3'] = [cstart - 3, 102 + 72 * (i-1)]; // My invention, three columns right of center of CLB.
    colInfo['col.' + name + '.local.1'] = [cstart, 108 + 72 * (i-1)];
    colInfo['col.' + name + '.local.2'] = [cstart + 1, 112 + 72 * (i-1)];
    colInfo['col.' + name + '.local.3'] = [cstart + 3, 116 + 72 * (i-1)];
    colInfo['col.' + name + '.local.4'] = [cstart + 4, 120 + 72 * (i-1)];
    colInfo['col.' + name + '.local.5'] = [cstart + 6, 126 + 72 * (i-1)];
    colInfo['col.' + name + '.local.6'] = [cstart + 7, 130 + 72 * (i-1)]; // y connection
    colInfo['col.' + name + '.long.1'] = [cstart + 8, 134 + 72 * (i-1)];
    colInfo['col.' + name + '.long.2'] = [cstart + 9, 138 + 72 * (i-1)];
    colInfo['col.' + name + '.clk'] = [cstart + 10, 142 + 72 * (i-1)]; // my invention
    colInfo['col.' + name + '.x'] = [cstart + 11, 146 + 72 * (i-1)]; // my invention
    colInfo['col.' + name + '.clbl2'] = [cstart + 12, 150 + 72 * (i-1)]; // My invention, two columns left of center of CLB.
    colInfo['col.' + name + '.clbl1'] = [cstart + 13, 154 + 72 * (i-1)]; // My invention, one column left of center of CLB.
    // col.X.clb is my name for the column running through the middle of the CLB
    colInfo['col.' + name + '.clb'] = [cstart + 14, 160 + 72 * (i-1)];
    colInfo['col.' + name + '.clbr1'] = [cstart + 15, 166 + 72 * (i-1)]; // My invention, one column right of center of CLB.
    colInfo['col.' + name + '.clbr2'] = [cstart + 16, 170 + 72 * (i-1)]; // My invention, two columns right of center of CLB.
    colInfo['col.' + name + '.clbr3'] = [cstart + 17, 174 + 72 * (i-1)]; // My invention, three columns right of center of CLB.

    // Interpreting die file: row.B.local.1 = die file Y 28 = G 145, i.e. sum=173
    var rstart = 25 + 19 * (7 - i);
    // row.X.io1 is my name for the I/O row below the CLB
    rowInfo['row.' + name + '.io1'] = [rstart + 11, 100 + 72 * (i-1)];
    rowInfo['row.' + name + '.io2'] = [rstart + 10, 104 + 72 * (i-1)];
    rowInfo['row.' + name + '.io3'] = [rstart + 9, 108 + 72 * (i-1)];
    rowInfo['row.' + name + '.local.0'] = [rstart + 7, 112 + 72 * (i-1)];
    rowInfo['row.' + name + '.local.1'] = [rstart + 6, 114 + 72 * (i-1)];
    rowInfo['row.' + name + '.local.3'] = [rstart + 5, 118 + 72 * (i-1)];
    rowInfo['row.' + name + '.local.4'] = [rstart + 3, 122 + 72 * (i-1)];
    rowInfo['row.' + name + '.local.5'] = [rstart + 2, 126 + 72 * (i-1)];
    rowInfo['row.' + name + '.long.1'] = [rstart, 132 + 72 * (i-1)];
    // row.X.io6 is my name for the row near the top of the clb
    // row.X.b is my name for the row through input b
    // row.X.c is my name for the row running through the middle of the CLB, through input c, output y
    // row.X.k is my name for the row through input k
    // row.X.y is my name for the row through input y
    rowInfo['row.' + name + '.io4'] = [rstart - 1, 136 + 72 * (i-1)];
    rowInfo['row.' + name + '.io5'] = [rstart - 2, 140 + 72 * (i-1)];
    rowInfo['row.' + name + '.io6'] = [rstart - 3, 144 + 72 * (i-1)];
    rowInfo['row.' + name + '.b'] = [rstart - 4, 152 + 72 * (i-1)];
    rowInfo['row.' + name + '.c'] = [rstart - 5, 158 + 72 * (i-1)];
    rowInfo['row.' + name + '.k'] = [rstart - 6, 164 + 72 * (i-1)];
    rowInfo['row.' + name + '.y'] = [rstart - 7, 168 + 72 * (i-1)];
  }

  // The e.g. DE.B entries
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 8; row++) {
      const fullname = "ABCDEFGH"[row] + "ABCDEFGH"[col];
      rowInfo[fullname + '.B'] = rowInfo['row.' + "ABCDEFGH"[row] + ".b"];
      rowInfo[fullname + '.C'] = rowInfo['row.' + "ABCDEFGH"[row] + ".c"];
      rowInfo[fullname + '.K'] = rowInfo['row.' + "ABCDEFGH"[row] + ".k"];
      rowInfo[fullname + '.X'] = rowInfo['row.' + "ABCDEFGH"[row] + ".b"];
      colInfo[fullname + '.D'] = colInfo['col.' + "ABCDEFGH"[row] + ".clb"];
      colInfo[fullname + '.A'] = colInfo['col.' + "ABCDEFGH"[row] + ".clbr1"];
      // colInfo[fullname + '.A'] = colInfo['col.' + "ABCDEFGH"[col] + ".clb"];
    }
  }

  // Make reverse table
  Object.entries(rowInfo).forEach(([key, val]) => rowFromG[val[0]] = key);
  Object.entries(colInfo).forEach(([key, val]) => colFromG[val[0]] = key);
}

   const pads = [
    ["P9", "AA", "topleft", "PAD1"],
    ["P8", "AB", "topright", "PAD2"],
    ["P7", "AB", "topleft", "PAD3"],
    ["P6", "AC", "topright", "PAD4"],
    ["P5", "AC", "topleft", "PAD5"],
    ["P4", "AD", "topright", "PAD6"],
    ["P3", "AD", "topleft", "PAD7"],
    ["P2", "AE", "topright", "PAD8"],
    ["P68", "AE", "topleft", "PAD9"],
    ["P67", "AF", "topright", "PAD10"],
    ["P66", "AF", "topleft", "PAD11"],
    ["P65", "AG", "topright", "PAD12"],
    ["P64", "AG", "topleft", "PAD13"],
    ["P63", "AH", "topright", "PAD14"],
    ["P62", "AH", "topleft", "PAD15"],
    ["P61", "AI", "topright", "PAD16"],

    ["P59", "BI", "rightlower", "PAD17"],
    ["P58", "BI", "rightupper", "PAD18"],
    ["P57", "CI", "rightlower", "PAD19"],
    ["P56", "CI", "rightupper", "PAD20"],
    ["P55", "DI", "rightlower", "PAD21"],
    ["P54", "DI", "rightupper", "PAD22"],
    ["P53", "EI", "rightlower", "PAD23"],
    ["P51", "FI", "rightlower", "PAD24"],
    ["P50", "FI", "rightupper", "PAD25"],
    ["P49", "GI", "rightlower", "PAD26"],
    ["P48", "GI", "rightupper", "PAD27"],
    ["P47", "HI", "rightlower", "PAD28"],
    ["P46", "HI", "rightupper", "PAD29"],

    ["P43", "II", "bottomright", "PAD30"],
    ["P42", "IH", "bottomleft", "PAD31"],
    ["P41", "IH", "bottomright", "PAD32"],
    ["P40", "IG", "bottomleft", "PAD33"],
    ["P39", "IG", "bottomright", "PAD34"],
    ["P38", "IF", "bottomleft", "PAD35"],
    ["P37", "IF", "bottomright", "PAD36"],
    ["P36", "IE", "bottomleft", "PAD37"],
    ["P34", "IE", "bottomright", "PAD38"],
    ["P33", "ID", "bottomleft", "PAD39"],
    ["P32", "ID", "bottomright", "PAD40"],
    ["P31", "IC", "bottomleft", "PAD41"],
    ["P30", "IC", "bottomright", "PAD42"],
    ["P29", "IB", "bottomleft", "PAD43"],
    ["P28", "IB", "bottomright", "PAD44"],
    ["P27", "IA", "bottomleft", "PAD45"],

    ["P24", "HA", "leftupper", "PAD46"],
    ["P23", "HA", "leftlower", "PAD47"],
    ["P22", "GA", "leftupper", "PAD48"],
    ["P21", "GA", "leftlower", "PAD49"],
    ["P20", "FA", "leftupper", "PAD50"],
    ["P19", "FA", "leftlower", "PAD51"],
    ["P17", "EA", "leftlower", "PAD52"],
    ["P16", "DA", "leftupper", "PAD53"],
    ["P15", "DA", "leftlower", "PAD54"],
    ["P14", "CA", "leftupper", "PAD55"],
    ["P13", "CA", "leftlower", "PAD56"],
    ["P12", "BA", "leftupper", "PAD57"],
    ["P11", "BA", "leftlower", "PAD58"],
    ];



  // Bit position starts for the tiles A through I. Note there is I/O before A and buffers between C-D and F-G.
  var xTileStarts = [3, 21, 39, 59, 77, 95, 115, 133, 151];

  /**
   * Take a bit index and return the tile A-I, along with starting bitstream index.
   */
  function findTileX(x) {
    for (var i = 8; i >= 0; i--) {
      if (x >= xTileStarts[i]) {
        if (x < xTileStarts[i] + 18) {
          return ["ABCDEFGHI"[i], xTileStarts[i], i];
        } else {
          return ["buf", xTileStarts[i] + 18, -1];
        }
      }
    }
    return ["io", 0, -2];
  }

  var yTileStarts = [1, 9, 17, 26, 34, 42, 51, 59, 67];

  /**
   * Take a bit index and return the tile A-I, along with starting bitstream index.
   */
  function findTileY(y) {
    for (var i = 8; i >= 0; i--) {
      if (y >= yTileStarts[i]) {
        if (y < yTileStarts[i] + 8) {
          return ["ABCDEFGHI"[i], yTileStarts[i], i];
        } else {
          return ["buf", yTileStarts[i] + 8, -1];
        }
      }
    }
    return ["io", 0, -2];
  }
  

  class XXXClb {
    constructor(x, y, screenPt, gPt, bitPt) {
      this.x = x;
      this.y = y;
      this.name = "ABCDEFGH"[y] + "ABCDEFGH"[x];
      this.gPt = gPt;
      this.bitPt = bitPt;
      this.configString = '';
    }

    draw(ctx) {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      // Screen coordinate center of the CLB
      let xCenter = colInfo['col.' + this.name[1] + '.clb'][1];
      let yCenter = rowInfo['row.' + this.name[0] + '.c'][1];
      var x0 = xCenter - 10;
      var y0 = yCenter - 18;
      ctx.rect(x0, y0, 20, 32);
      ctx.moveTo(x0 + 16, y0 - 2);
      ctx.lineTo(x0 + 16, y0);

      ctx.moveTo(x0 - 2, y0 + 12);
      ctx.lineTo(x0, y0 + 12);
      ctx.moveTo(x0 - 2, y0 + 18);
      ctx.lineTo(x0, y0 + 18);
      ctx.moveTo(x0 - 2, y0 + 24);
      ctx.lineTo(x0, y0 + 24);

      ctx.moveTo(x0 + 10, y0 + 33);
      ctx.lineTo(x0 + 10, y0 + 35);

      ctx.moveTo(x0 + 21, y0 + 18);
      ctx.lineTo(x0 + 23, y0 + 18);
      ctx.moveTo(x0 + 21, y0 + 28);
      ctx.lineTo(x0 + 23, y0 + 28);

      ctx.stroke();
      ctx.font = "10px arial";
      ctx.fillStyle = "green";
      fillText(ctx, this.name, x0 + 1, y0 + 8);

      // this.drawNetwork(ctx);
    }

    // Returns screen position for e.g. 'local.1'
    colPos(s) {
      const name = 'col.' + this.name[1] + '.' + s;
      try {
        return colInfo[name][1];
      } catch {
        throw "bad name " + name;
      }
    }

    // Returns screen position for e.g. 'local.1'
    rowPos(s) {
      const name = 'row.' + this.name[0] + '.' + s;
      try {
        return rowInfo[name][1];
      } catch {
        throw "bad name " + name;
      }
    }

    // Draw the PIPs and network lines.
    drawNetwork(ctx) {
      let xCenter = this.colPos('clb');
      let yCenter = this.rowPos('c');
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(this.colPos('long.2'), this.rowPos('c'));
      ctx.lineTo(xCenter - 20, this.rowPos('c'));
      ctx.lineTo(xCenter - 20, this.rowPos('c'));
      ctx.stroke();
      let cols;

      if (this.name[1] == 'A') {
        cols = [];
      } else {
        cols = ["local.2", "local.4", "long.1"];
      }
      cols.forEach(s => ctx.fillRect(this.colPos(s) - 1, this.rowPos('io2') - 1, 2, 2));

      if (this.name[1] == 'A') {
        cols = ["long.2", "local.1", "local.2", "local.3", "local.4", "long.3", "long.4", "clk", "io3", "x"];
      } else {
        cols = ["local.1", "local.2", "local.3", "local.4", "local.5", "local.6", "long.1", "long.2", "clk", "x"];
      }
      cols.forEach(s => ctx.fillRect(this.colPos(s) - 1, this.rowPos('b') - 1, 2, 2));

      if (this.name[1] == 'A') {
        cols = ["long.2", "local.1", "local.2", "local.3", "local.4", "long.3", "long.4", "x"];
      } else {
        cols = ["local.1", "local.2", "local.3", "local.4", "local.5", "long.1", "long.2", "x"];
      }
      cols.forEach(s => ctx.fillRect(this.colPos(s) - 1, this.rowPos('c') - 1, 2, 2));

      if (this.name[1] == 'A') {
        cols = ["long.4", "clk"];
      } else {
        cols = ["long.2", "clk"];
      }
      cols.forEach(s => ctx.fillRect(this.colPos(s) - 1, this.rowPos('k') - 1, 2, 2));

      if (this.name[1] == 'A') {
        cols = [];
      } else {
        cols = ["local.1", "local.3", "local.5", "long.2"];
      }
      cols.forEach(s => ctx.fillRect(this.colPos(s) - 1, this.rowPos('y') - 1, 2, 2));

      // Segments above: D inputs
      let rows;
      if (this.name[0] == 'A') {
        rows = [];
      } else {
        rows = ["io3", "local.1", "local.3", "local.4", "local.5", "long.1"];
      }
      rows.forEach(s => ctx.fillRect(this.colPos("clb") - 1, this.rowPos(s) - 1, 2, 2));

      // A inputs
      if (this.name[0] == 'A') {
        rows = ["long.2", "local.1", "local.2", "local.3", "local.4", "long.3", "local.5"];
        rows.forEach(s => ctx.fillRect(this.colPos("clb") - 1, this.rowPos(s) - 1, 2, 2));
      } else {
        rows = ["local.1", "local.3", "local.4", "local.5", "long.1", "io4"];
        rows.forEach(s => ctx.fillRect(this.colPos("clbr1") - 1, this.rowPos(s) - 1, 2, 2));
      }

    }
  }

  class Pip {
    constructor(name, bitPt) {
      this.name = name;
      var parts = name.split(':');
      if (colInfo[parts[0]] == undefined || rowInfo[parts[1]] == undefined) {
        alert('undefined name ' + name);
      }
      this.screenPt = [colInfo[parts[0]][1], rowInfo[parts[1]][1]];
      if (this.screenPt[0] == 999 || this.screenPt[1] == 999) {
        alert('Undefined coord ' + name);
      }
      this.bitPt = bitPt;
      if (bitPt[0] >= 160 || bitPt[1] >= 71) {
        alert('Out of bounds bitstream index: ' + bitPt[0] + ',' + bitPt[1]);
      }
      this.state = 0;

    }

    draw(ctx) {
      if (this.bitPt[0] < 0 || this.state < 0) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
      } else if (this.state == 0) {
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "white";
      } else if (this.state == 1) {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
      } else {
        // Shouldn't happen
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
      }
      ctx.translate(-0.5,- .5); // Prevent antialiasing
      ctx.fillRect(this.screenPt[0] - 1, this.screenPt[1] - 1, 2, 2);
      ctx.translate(0.5, .5); // Prevent antialiasing
      ctx.beginPath();
      ctx.rect(this.screenPt[0] - 1, this.screenPt[1] - 1, 2, 2);
      ctx.stroke();
    }
  }

  class Tile {
    constructor(x, y) {
      this.x = x; // Index 0-8
      this.y = y;
      this.name = "ABCDEFGHI"[y] + "ABCDEFGHI"[x];
      this.screenPt = [x * 72 + 78, y * 72 + 68];
      this.gPt = [x * 19, y * 20];
      this.bitPt = [xTileStarts[x], yTileStarts[y]];
      this.pips = [];
      this.pins = [];
      if (x < 8 && y < 8) {
        this.clb = new Clb(x, y, [x * 72 + 78, y * 72 + 68], [x * 19, y * 20], this.bitPt);
      } else {
        this.clb = null;
      }
      this.type = tileType(x, y);

      var row = "ABCDEFGHI"[y];
      var col = "ABCDEFGHI"[x];

      // For a repeated tile, the pip location is relative to the origin for tile BB. The x and y will need to shift based on the row/column.
      // (The pip location could be given relative to the start of tile BB, but it's not.)
      // This shift is not constant because of the buffers.
      // For non-repeated tiles, the pip does not need to be adjusted.
      // 
      var xoffset = xTileStarts[x] - xTileStarts[1]; // xoffset == 0 for tile B
      var yoffset = yTileStarts[y] - yTileStarts[1]; // xoffset == 0 for tile B
    }

    draw(ctx) {
      if (this.clb) {
        this.clb.draw(ctx);
      }
      this.pips.forEach(pip => pip.draw(ctx));
      this.pins.forEach(pin => pin.draw(ctx));
    }
  }

  /**
   * A switch matrix.
   * Name is e.g. HA.8.1
   * Coordinates: screenPt is the upper left corner of the box. gPt is the coordinate of pin 8.
   */
  class Switch {
  constructor(name) {
    this.name = name;
    this.tilename = name[0] + name[1];
    this.num = parseInt(name[5], 10);
    this.pins = {}; // Dictionary holding names of pins
    this.lines = {};
    this.state = null;
    this.wires = [];

      // The switch pair's upper left wires are local.1
      var row = rowInfo['row.' + this.tilename[0] + '.local.1'];
      var col = colInfo['col.' + this.tilename[1] + '.local.1'];
      if (this.tilename[0] == "I") {
        // The bottom switches are mirror-imaged, inconveniently.
        if (this.num == 1) {
          this.gPt = [col[0] + 3, row[0] + 1];
          this.screenPt = [col[1] - 2, row[1] + 6];
        } else {
          this.gPt = [col[0], row[0] - 2];
          this.screenPt = [col[1] - 2 + 8, row[1] + 6 - 8];
        }
      } else {
        if (this.num == 1) {
          this.gPt =[col[0], row[0] + 1]
          this.screenPt = [col[1] - 2, row[1] - 2];
        } else {
          this.gPt = [col[0] + 3, row[0] - 2];
          this.screenPt = [col[1] - 2 + 8, row[1] - 2 + 8];
        }
      }
    }

  /**
   * Processes an entry from the configuration.
   */
  add(pin1, pin2, bit) {
    this.pins[pin1] = 1;
    this.pins[pin2] = 1;
    const key = pin1 * 10 + pin2;
    this.lines[key] = bit;
  }


    /**
     * Returns (x, y) screen coordinate for the pin.
     */
    pinCoord(pin) {
        return [this.screenPt[0] + [2, 6, 9, 9, 6, 2, 0, 0][pin],
                this.screenPt[1] + [0, 0, 2, 6, 9, 9, 6, 2][pin]];
    }
   /**
    * Draws the internal wire between pin1 and pin2.
    */
   drawWires(ctx) {
     ctx.beginPath();
     const self = this;
     ctx.strokeStyle = 'blue';
     this.wires.forEach(function([pin1, pin2]) {
       var coord1 = self.pinCoord(pin1);
       var coord2 = self.pinCoord(pin2);
       ctx.moveTo(coord1[0], coord1[1]);
       ctx.lineTo(coord2[0], coord2[1]);
     });
     ctx.stroke();
   }

   render(ctx) {
     ctx.strokeStyle = "red";
     ctx.beginPath();
     var x0 = this.screenPt[0];
     var y0 = this.screenPt[1];
     ctx.rect(x0, y0, 8, 8);
     /*
     // Draw the pins
     for (var i = 0; i < 8; i++) {
       if (this.skip(i)) continue;
       var coord = this.pinCoord(i);
       ctx.moveTo(coord[0], coord[1]);
       ctx.lineTo(coord[0] + [0, 0, 2, 2, 0, 0, -2, -2][i], coord[1] + [-2, -2, 0, 0, 2, 2, 0, 0][i]);
     }
     */
     ctx.stroke();
     this.drawWires(ctx);
   }
 
   // Helper to remove pins from switches along edges.
   /*
   skip(pin) {
     return ((this.tile.type == TILE.top && (pin == 0 || pin == 1)) || (this.tile.type == TILE.bottom && (pin == 4 || pin == 5)) ||
         (this.tile.type == TILE.left && (pin == 6 || pin == 7)) || (this.tile.type == TILE.right && (pin == 2 || pin == 3)));
   }
   */

    isInside(x, y) {
      return x >= this.screenPt[0] && x < this.screenPt[0] + 8 && y >= this.screenPt[1] && y < this.screenPt[1] + 8;
    }

    info() {
      return "Switch " + this.name + " " + this.state + " " + this.wires;
    }

 }

  /**
   * Returns switch matrix point info: G coordinate and screen coordinate.
   * Name = e.g. HB.8.1.4
   * Returns e.g. ["28G29", 123, 234]
   */
  function getSwitchCoords(name) {
    const m = name.match(/([A-I][A-I])\.8\.(\d)\.(\d)$/);
    if (m == undefined) {
      throw "Bad name " + name;
    }
    const tilename = m[1];
    let switchNum = parseInt(m[2], 10);
    const pinNum = parseInt(m[3], 10);
    // The switch pair's upper left wires are local.1
    var row = rowInfo['row.' + tilename[0] + '.local.1'];
    var col = colInfo['col.' + tilename[1] + '.local.1'];
    let gPt; // G coordinate of the switch
    let screenPt // screen coordinate of the switch
    if (tilename[0] == "I") {
      // The bottom switches are mirror-imaged, inconveniently. So the Y values are swapped.
      if (switchNum == 1) {
        gPt =[col[0], row[0] - 2]
        screenPt = [col[1] - 2, row[1] - 2 + 8];
      } else {
        gPt = [col[0] + 3, row[0] + 1];
        screenPt = [col[1] - 2 + 8, row[1] - 2];
      }
    } else {
      if (switchNum == 1) {
        gPt =[col[0], row[0] + 1]
        screenPt = [col[1] - 2, row[1] - 2];
      } else {
        gPt = [col[0] + 3, row[0] - 2];
        screenPt = [col[1] - 2 + 8, row[1] - 2 + 8];
      }
    }
    // Calculate pin coords from the switch coords.
    const pinGpt = (gPt[0] + [0, 1, 2, 2, 1, 0, -1, -1][pinNum]) + "G" +
        (gPt[1] + [0, 0, -1, -2, -3, -3, -2, -1][pinNum]);

    return [pinGpt, screenPt[0] + [2, 6, 9, 9, 6, 2, 0, 0][pinNum],
            screenPt[1] + [0, 0, 2, 6, 9, 9, 6, 2][pinNum]];
  }

  /**
   * The RBT file is organized:
   * HH ... AH
   * .       .
   * HA ... AA
   * stored as rbtstream[line][char] of '0' and '1'.
   *
   * The die is organized:
   * AA ... AH
   * .       .
   * HA ... HH
   * This function flips the rbtstream to match the die, stored as bitstream[x][y].
   * bitstream also holds ints (not chars) and is inverted with respect to the bitstream, so 1 is active.
   * I'm using the term "bitstream" to describe the bitstream with the die's layout and "rbtstream" to describe the bitstream
   * with the .RBT file's layout.
   */
  function makeDiestream(rbtstream) {
    var bitstream = new Array(160);
    for (var x = 0; x < 160; x++) {
      bitstream[x] = new Array(71);
      for (var y = 0; y < 71; y++) {
        bitstream[x][y] = rbtstream[159 - x][70 - y] == '1' ? 0 : 1;
        
      }
    }
    return bitstream;
  }

/**
 * An I/O block.
 * Each I/O block is associated with its neighboring tile.
 * Some complications: I/O blocks are different on the top, bottom, left, and right.
 * There are typically two I/O blocks per tile, so the bits are different for these two. They are also drawn differently.
 * Tile AA has 3 I/O blocks. Tile EA has 1 I/O block; one is omitted.
 * 
 */
class Iob {
  constructor(pin, tile, style, pad) {
    this.name = pin;
    this.tilename = tile;
    this.style = style;
    this.pips = [];

    this.generateIobPips(pin, tile, style, pad);
  }

  /**
   * Draw the specified pip.
   * The name row and column are substituted into the pip.
   * Returns G coordinate, screen X coordinate, screen Y
   */
  static processIoPip(pip, name, pad) {
    let parts = pip.split(':');
    let pipname;
    if (parts[0].includes('?') && parts[1].includes('?')) {
      throw "Bad name " + pip;
    }
    if (parts[0].includes('?')) {
      // parts[0] = parts[0].replace('col.?', 'col.' + name[1]);
      parts[0] = parts[0].replace('?', name[1]);
      pipname = parts[1] + ':' + pad;
    } else if (parts[1].includes('?')) {
      // parts[1] = parts[1].replace('row.?', 'row.' + name[0]);
      parts[1] = parts[1].replace('?', name[0]);
      pipname = parts[0] + ':' + pad;
    } else {
      console.log('No variable in pip name', pip);
    }
    let col = colInfo[parts[0]];
    let row = rowInfo[parts[1]];
    if (col == undefined) {
      console.log('Bad Iob', name, pip, 'col', parts[0], "->", col, ";", parts[1], "->", row);
      return [];
    }
    if (row == undefined) {
      console.log('Bad Iob', name, pip, 'col', parts[0], "->", col, ";", parts[1], "->", row);
      return [];
    }
    if (parts.length == 4) {
      // Hardcoded name
      pipname = parts[2] + ":" + parts[3];
    }
    let gCoord = col[0] + "G" + row[0];
    console.log(pipname, gCoord);
    IobDecoders.gToIob[gCoord] = pipname;
    return [gCoord, col[1], row[1], pipname];
  }

  /**
   * Adds entries for the pips.
   */
  generateIobPips(pin, tile, direction, pad) {
      let k = [];
      let o = [];
      let i = [];
      let t = [];
      let xoff = 0;
      let yoff = 0;
      if (direction == "topleft" && tile == 'AA') {
        this.W = 20;
        this.H = 12;
        xoff = -8;
        yoff = 4;
        k = ["col.?.io3:row.A.local.0"];
        o = [ "col.?.io3:CLK.AA.O",
              "col.?.io3:row.A.long.2",
              "col.?.io3:row.A.local.2",
              "col.?.io3:row.A.local.4",
              "col.A.long.3:row.?.local.5",
              "col.A.local.3:row.?.local.5",
              "col.A.local.1:row.?.local.5",
              "col.A.long.2:row.?.local.5"];
        i = ["col.?.x:row.A.local.1", "col.?.x:row.A.local.3", "col.?.x:row.A.long.3",
          "col.A.io2:row.?.io5", "col.A.long.4:row.?.io5",
          "col.A.local.4:row.?.io5", "col.A.local.2:row.?.io5",
          "col.A.long.2:row.?.io5" ];
        t = [ "col.?.clbl1:row.A.long.2", "col.?.clbl1:row.A.local.1", "col.?.clbl1:row.A.local.3", "col.?.clbl1:row.A.long.3"];
      } else if (direction == "topleft") {
        this.W = 20;
        this.H = 12;
        xoff = -8;
        yoff = 4;
        k = ["col.?.x:row.A.local.0"];
        o = ["col.?.x:row.A.long.2", "col.?.x:row.A.local.2",
              "col.?.x:row.A.local.4",
              "col.?.long.1:row.A.io3",
              "col.?.local.3:row.A.io3",
              "col.?.local.1:row.A.io3"];
        i = ["col.?.clbl2:row.A.local.1", "col.?.clbl2:row.A.local.3", "col.?.clbl2:row.A.long.3",
              "col.?.long.2:row.A.io4", "col.?.local.5:row.A.io4", "col.?.local.4:row.A.io4",
              "col.?.local.2:row.A.io4"];
        t = [ "col.?.clbl1:row.A.long.2", "col.?.clbl1:row.A.local.1", "col.?.clbl1:row.A.local.3", "col.?.clbl1:row.A.long.3"];
      } else if (direction == "topright" && tile == "AI") {
        this.W = 20;
        this.H = 12;
        xoff = -3;
        yoff = 4;
        k = ["col.?.clbw1:row.A.local.0"];
        o = [ "col.?.clbw1:row.A.local.1", "col.?.clbw1:row.A.local.3", "col.?.clbw1:row.A.long.3",
              "col.H.clbr3:row.?.io3", "col.I.long.1:row.?.io3", "col.I.local.1:row.?.io3", "col.I.local.3:row.?.io3", "col.I.long.3:row.?.io3",];
        i = [ "col.?.clbw2:row.A.long.2", "col.?.clbw2:row.A.local.2", "col.?.clbw2:row.A.local.4",
              "col.I.long.2:row.?.io2", "col.I.local.2:row.?.io2", "col.I.local.4:row.?.io2", "col.I.long.3:row.?.io2"];
        t = [ "col.?.clbw3:row.A.long.2", "col.?.clbw3:row.A.local.1", "col.?.clbw3:row.A.local.3", "col.?.clbw3:row.A.long.3",];
      } else if (direction == "topright") {
        this.W = 20;
        this.H = 12;
        xoff = -3;
        yoff = 4;
        k = ["col.?.clbw1:row.A.local.0"];
        o = [ "col.?.clbw1:row.A.local.1", "col.?.clbw1:row.A.local.3", "col.?.clbw1:row.A.long.3",
              "col.?.clbw3:row.A.io2", "col.?.local.2:row.A.io2", "col.?.local.4:row.A.io2", "col.?.local.5:row.A.io2",
              "col.?.long.2:row.A.io2"];
        i = [ "col.?.clbw2:row.A.long.2", "col.?.clbw2:row.A.local.2", "col.?.clbw2:row.A.local.4",
"col.?.local.1:row.A.local.5", "col.?.local.3:row.A.local.5", "col.?.long.1:row.A.local.5",];
        t = [ "col.?.clbw3:row.A.long.2", "col.?.clbw3:row.A.local.1", "col.?.clbw3:row.A.local.3", "col.?.clbw3:row.A.long.3",];
      } else if (direction == "rightlower") {
        this.W = 12;
        this.H = 26;
        xoff = -16;
        yoff = -12;
        k = [ "col.I.local.5:row.?.io1"];
        t = [ "col.I.long.3:row.?.io1", "col.I.local.4:row.?.io1",
"col.I.local.2:row.?.io1", "col.I.long.2:row.?.io1"];
        i = [ "col.I.long.3:row.?.io2", "col.I.local.3:row.?.io2", "col.I.local.1:row.?.io2",
"col.I.long.1:row.?.io2", "col.I.io1:row.?.local.3", "col.I.io1:row.?.local.5"];
        o = [ "col.I.local.4:row.?.io3", "col.I.local.2:row.?.io3", "col.I.long.2:row.?.io3",
"col.I.io2:row.?.local.1", "col.I.io2:row.?.local.4", "col.I.io2:row.?.long.1", "col.I.io2:?H.X", "col.I.io2:?H.Y"];
      } else if (direction == "rightupper") {
        this.W = 12;
        this.H = 26;
        xoff = -16;
        yoff = -12
        k = [ "col.I.local.5:row.?.io4"];
        t = [ "col.I.long.3:row.?.io4", "col.I.local.4:row.?.io4", "col.I.local.2:row.?.io4", "col.I.long.2:row.?.io4",];
        i = [ "col.I.local.4:row.?.io5", "col.I.local.2:row.?.io5", "col.I.long.2:row.?.io5", "col.I.io2:row.?.long.1", "col.I.io2:row.?.local.4", "col.I.io2:row.?.local.1",];
        o = [ "col.I.long.3:row.?.io6", "col.I.local.3:row.?.io6", "col.I.local.1:row.?.io6", "col.I.long.1:row.?.io6", "col.I.local.0:row.?.local.5", "col.I.local.0:row.?.local.3", "col.I.local.0:?H.X", "col.I.local.0:?H.Y"]
      } else if (direction == "bottomright" && tile == "II") {
        this.W = 20;
        this.H = 12;
        xoff = -4;
        yoff = -16
        k = [ "col.?.clbw1:row.I.local.5"];
        o = [ "col.?.clbw1:row.I.clk", "col.?.clbw1:row.I.local.4", "col.?.clbw1:row.I.local.2", "col.?.clbw1:row.I.long.1",
              "col.?.clbw3:row.I.io2", "col.?.long.2:row.I.io2", "col.?.local.2:row.I.io2", "col.?.local.4:row.I.io2", "col.?.long.3:row.I.io2",];
        i = [ "col.?.clbw2:row.I.long.2", "col.?.clbw2:row.I.local.3", "col.?.clbw2:row.I.local.1",
            "col.?.io1:row.I.io3:CLK.II.O:PAD30.I",
            "col.?.long.1:row.I.io3", "col.?.local.1:row.I.io3", "col.?.local.3:row.I.io3", "col.?.long.3:row.I.io3",];
        let x = [
            "col.?.long.1:row.I.io3", "col.?.local.1:row.I.io3", "col.?.local.3:row.I.io3", "col.?.long.3:row.I.io3",];
        t = [ "col.?.clbw3:row.I.long.2", "col.?.clbw3:row.I.local.4", "col.?.clbw3:row.I.local.2", "col.?.clbw3:row.I.long.1",];
      } else if (direction == "bottomright") {
        this.W = 20;
        this.H = 12;
        xoff = -4;
        yoff = -16
        k = [ "col.?.clbw1:row.I.local.5"];
        o = [ "col.?.clbw1:row.I.local.4", "col.?.clbw1:row.I.local.2", "col.?.clbw1:row.I.long.1",
            "col.?.local.2:row.I.io3", "col.?.local.4:row.I.io3", "col.?.local.5:row.I.io3", "col.?.long.2:row.I.io3",];
        o.push("col.?.clbw3:row.I.io3:" + pad + ".O:" + tile + ".X"); // Hardwire this tricky case
"",
        i = [ "col.?.clbw2:row.I.long.2", "col.?.clbw2:row.I.local.3", "col.?.clbw2:row.I.local.1", "col.?.local.1:row.I.io4", "col.?.local.3:row.I.io4", "col.?.long.1:row.I.io4",];
"",
        t = [ "col.?.clbw3:row.I.long.2", "col.?.clbw3:row.I.local.4", "col.?.clbw3:row.I.local.2", "col.?.clbw3:row.I.long.1",];
      } else if (direction == "bottomleft" && tile == "IA") {
        this.W = 20;
        this.H = 12;
        xoff = -8;
        yoff = -16
        k = [ "col.?.io3:row.I.local.5",];
        o = [ "col.?.io3:row.I.long.2", "col.?.io3:row.I.local.3", "col.?.io3:row.I.local.1",
          "col.A.long.3:row.?.io2",
          "col.A.local.3:row.?.io2", "col.A.local.1:row.?.io2", "col.A.long.2:row.?.io2",];
        i = [ "col.?.x:row.I.local.4", "col.?.x:row.I.local.2", "col.?.x:row.I.long.1", "col.A.long.4:row.?.io1", "col.A.local.4:row.?.io1", "col.A.local.2:row.?.io1", "col.A.long.2:row.?.io1",];
        i.push("col.?.clb:row.I.io2:" + tile + ".D:" + pad + ".I"); // special case
        // i.push("col.?.clb:row.I.io2"); // special case
        t = [ "col.?.clbl1:row.I.long.2", "col.?.clbl1:row.I.local.4", "col.?.clbl1:row.I.local.2", "col.?.clbl1:row.I.long.1",];
      } else if (direction == "bottomleft") {
        this.W = 20;
        this.H = 12;
        xoff = -8;
        yoff = -16
        k = [ "col.?.x:row.I.local.5",];
        o = [ "col.?.x:row.I.long.2", "col.?.x:row.I.local.3", "col.?.x:row.I.local.1", "col.?.long.1:row.I.io2", "col.?.local.3:row.I.io2", "col.?.local.1:row.I.io2",
        ];
        i = [ "col.?.clbl2:row.I.local.4", "col.?.clbl2:row.I.local.2", "col.?.clbl2:row.I.long.1",
        "col.?.long.2:row.I.io1", "col.?.local.5:row.I.io1", "col.?.local.4:row.I.io1", "col.?.local.2:row.I.io1",
        "H?.D:row.I.io2"];
        t = [ "col.?.clbl1:row.I.long.2", "col.?.clbl1:row.I.local.4", "col.?.clbl1:row.I.local.2", "col.?.clbl1:row.I.long.1",];
      } else if (direction == "leftupper") {
        this.W = 12;
        this.H = 26;
        xoff = 4;
        yoff = -12;
        k = [ "col.A.local.0:row.?.io4",];
        t = [ "col.A.long.2:row.?.io4", "col.A.local.1:row.?.io4", "col.A.local.3:row.?.io4", "col.A.long.3:row.?.io4",];
        i = [ "col.A.long.2:row.?.io5", "col.A.local.1:row.?.io5", "col.A.local.3:row.?.io5", "col.A.long.3:row.?.io5", "col.A.local.5:row.?.local.5",];
        o = [ "col.A.local.2:?H.X", "col.A.local.4:?H.X", "col.A.long.4:?H.X", "col.A.io1:row.?.long.1", "col.A.io1:row.?.local.4", "col.A.io1:row.?.local.1",];
      } else if (direction == "leftlower") { 
        this.W = 12;
        this.H = 26;
        xoff = 4;
        yoff = -12;
        k = [ "col.A.local.0:row.?.io1",];
        t = [ "col.A.long.2:row.?.io1", "col.A.local.1:row.?.io1", "col.A.local.3:row.?.io1", "col.A.long.3:row.?.io1",];
        i = [ "col.A.local.2:row.?.io2", "col.A.local.4:row.?.io2", "col.A.long.4:row.?.io2", "col.A.io3:row.?.local.4", "col.A.io3:row.?.long.1",];
        o = [ "col.A.long.2:row.?.io3", "col.A.local.1:row.?.io3", "col.A.local.3:row.?.io3", "col.A.long.3:row.?.io3", "col.A.io2:row.?.local.3",];
      } else { 
        return;
      }
      k.forEach(p => this.pips.push(Iob.processIoPip(p, tile, pad + ".K")));
      this.x0 = this.pips[this.pips.length - 1][1] + xoff;
      this.y0 = this.pips[this.pips.length - 1][2] + yoff;
      o.forEach(p => this.pips.push(Iob.processIoPip(p, tile, pad + ".O")));
      i.forEach(p => this.pips.push(Iob.processIoPip(p, tile, pad + ".I")));
      t.forEach(p => this.pips.push(Iob.processIoPip(p, tile, pad + ".T")));
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.rect(this.x0, this.y0, this.W, this.H);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    this.pips.forEach(function([gCoord, col, row, pipname]) {
      if (pipname == undefined) {
        ctx.fillStyle = "red";
      } else
      if (pipname.match(/\d\.K/)) {
        ctx.fillStyle = "yellow";
      } else if (pipname.match(/\d\.O/)) {
        ctx.fillStyle = "blue";
      } else if (pipname.match(/\d\.I/)) {
      console.log(pipname);
        ctx.fillStyle = "green";
      } else if (pipname.match(/\d\.T/)) {
        ctx.fillStyle = "pink";
      } else {
        ctx.fillStyle = "brown";
        alert(pipname);
      }
      ctx.fillRect(col - 1, row - 1, 3, 3);
    });
  }

  add(str, bit) {
    console.log(str);
  }

    isInside(x, y) {
      return x >= this.x0 && x < this.x0 + this.W && y >= this.y0 && y <= this.y0 + this.H;
    }

    info() {
      return "IOB " + this.name + " " + this.tilename + " " + this.style + " " + this.pips;
    }

}

  function fillText(ctx, text, x, y) {
    ctx.fillText(text, x + 0.5, y + 0.5);
  }

  function vtext(ctx, text, x, y) {
    for (var i = 0 ; i < text.length; i++) {
      fillText(ctx, text[i], x, y + 8 * i);
    }
  }

const SCALE = 2;

  function drawLayout(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
    const HEIGHT = 680 * SCALE;
    const WIDTH = 680 * SCALE;
    ctx.canvas.height = HEIGHT;
    ctx.canvas.width = WIDTH;
    $("#container").css('height', HEIGHT + 'px');
    $("#container").css('width', WIDTH + 'px');
    $("#info").css('margin-left', WIDTH + 'px');
    $("#info3").css('margin-left', WIDTH + 'px');
    $("#info3").css('clear', 'none');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.translate(0.5, 0.5); // Prevent antialiasing
    ctx.scale(SCALE, SCALE);
    $("#img").width(WIDTH);
    $("#img").height(HEIGHT);
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
    // objects.forEach(o => o.draw(ctx));
    decoders.forEach(d => d.render(ctx));
  }

/**
 * Renders a set of pips, specified in entries. Each entry is {"nGn": 0/1}.
 */
function pipRender(ctx, entries) {
  for (const [name, bit] of Object.entries(entries)) {
    const parts = name.split('G');
    const row = rowFromG[parts[1]];
    const col = colFromG[parts[0]];
    if (row == undefined) {
      console.log('Undefined row', name, parts[1]);
      continue;
    }
    if (col == undefined) {
      console.log('Undefined col', name, parts[0]);
      continue;
    }
    const x = colInfo[col][1];
    const y = rowInfo[row][1];
    if (bit) {
      ctx.fillStyle = "gray";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(x-1, y-1, 3, 3);
  }

}


