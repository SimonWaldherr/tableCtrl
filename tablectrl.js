function addtable(id)
  {
    document.getElementById(id).innerHTML = '<table id="'+id+'-table"><tr><td id="'+id+'-td-0-0">0-0</td></tr></table';
  }

function createCell(cell, text, style)
  {
    var div = document.createElement('div'),
        txt = document.createTextNode(text);
    div.appendChild(txt);
    div.setAttribute('class', style);
    div.setAttribute('className', style);
    div.id = text;
    cell.appendChild(div);
  }

function addrow(id)
  {
    var tbl = document.getElementById(id),
        row = tbl.insertRow(tbl.rows.length),
        i, tdtbl;
    for (i = 0; i < tbl.rows[0].cells.length; i++)
      {
        tdtbl = tbl.rows.length-1;
        //alert(tdtbl);
        createCell(row.insertCell(i), i+'-'+tdtbl, 'row');
        
      }
  }

function addcolumn(id)
  {
    var tbl = document.getElementById(id),
        i, tdtbl;
    for (i = 0; i < tbl.rows.length; i++)
      {
        tdtbl = tbl.rows[i].cells.length;
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), tdtbl+'-'+i, 'col');
      }
  }

function getinfo(id)
  {
    var ele = document.getElementById(id);
    alert("Name: "+ele.nodeName+"\nTop: "+ele.offsetTop+"\nLeft: "+ele.offsetLeft+"\nHeight: "+ele.offsetHeight+"\nWidth: "+ele.offsetWidth+"\n");
  }
