/*jslint browser: true, devel: true, unparam: true, indent: 2 */

function insertInInput(ele, table, row, column) {
  "use strict";
  if (ele !== undefined) {
    if (document.getElementById(table) !== undefined) {
      document.getElementById(table).value = ele.id;
    }
    if (document.getElementById(row) !== undefined) {
      document.getElementById(row).value = ele.parentNode.parentNode.parentNode.id;
    }
    if (document.getElementById(column) !== undefined) {
      document.getElementById(column).value = ele.parentNode.parentNode.parentNode.id;
    }
  }
}

function createCell(cell, text, style) {
  "use strict";
  cell.innerHTML = text;
  cell.id = text;
  cell.onclick = function () {
    var ele = this;
    insertInInput(ele, 'atable', 'arow', 'acolumn');
  };
}

function addrow(id) {
  "use strict";
  var tbl = document.getElementById(id),
    row = tbl.insertRow(tbl.rows.length),
    grandparent = '',
    i,
    tdtbl;

  if (tbl.parentNode.id.indexOf("td-") === 0) {
    grandparent = tbl.parentNode.id.replace('td-', '') + '-';
  }
  for (i = 0; i < tbl.rows[0].cells.length; i += 1) {
    tdtbl = tbl.rows.length - 1;
    createCell(row.insertCell(i), 'td-' + grandparent + i + '-' + tdtbl, 'row');
  }
}

function addcolumn(id) {
  "use strict";
  var tbl = document.getElementById(id),
    grandparent = '',
    i,
    tdtbl;

  if (tbl.parentNode.id.indexOf("td-") === 0) {
    grandparent = tbl.parentNode.id.replace('td-', '') + '-';
  }
  for (i = 0; i < tbl.rows.length; i += 1) {
    tdtbl = tbl.rows[i].cells.length;
    createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), 'td-' + grandparent + tdtbl + '-' + i, 'col');
  }
}

function addtable(id) {
  "use strict";
  var tbl = document.getElementById(id),
    grandparent = tbl.id.replace('td-', '');
  if (tbl.id.indexOf("td-") === 0) {
    document.getElementById(id).innerHTML = '<table id="tctrl-' + grandparent + '"></table';
    document.getElementById(id).onclick = function () {
      return false;
    };
    addrow('tctrl-' + grandparent);
    addcolumn('tctrl-' + grandparent);
  } else {
    document.getElementById(id).innerHTML = '<table id="tctrl-"></table';
    addrow('tctrl-');
    addcolumn('tctrl-');
  }
}

function filtertctrl(str) {
  "use strict";
  return str + 'tctrl-'.replace('tctrl-', '');
}

function getinfo(id) {
  "use strict";
  var ele = document.getElementById(id);
  alert("Name: " + ele.nodeName + "\nTop: " + ele.offsetTop + "\nLeft: " + ele.offsetLeft + "\nHeight: " + ele.offsetHeight + "\nWidth: " + ele.offsetWidth + "\n");
}

function buildtablefromcsv(csvid, seperator) {
  "use strict";
  var lines,
    cells,
    csv,
    i,
    j,
    returnstring,
    tablename;

  csv = document.getElementById(csvid).innerHTML;
  lines = csv.split("\n");
  returnstring = '0';
  for (i = 0; i < lines.length; i += 1) {
    if (lines[i] === '') {
      returnstring = '';
    } else {
      cells = lines[i].split(seperator);
      if (cells[0] === 'tablectrl') {
        tablename = cells[2];
        if (cells[2] === undefined) {
          tablename = cells[1].split("td-");
          tablename = "tctrl-" + tablename[1];
        }
        returnstring = '<table id="' + tablename + '">' + "\n" + returnstring + '</table>' + "\n";
        document.getElementById(cells[1]).innerHTML = returnstring;
      } else {
        returnstring += '<tr>';
        for (j = 0; j < cells.length; j += 1) {
          returnstring += '<td id="' + cells[j] + '">' + cells[j] + '</td>';
        }
        returnstring += '</tr>' + "\n";
      }
    }
  }
}
