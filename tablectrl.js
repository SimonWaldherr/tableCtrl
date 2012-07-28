function addtable(id)
  {
    var tbl = document.getElementById(id),
        grandparent = tbl.id.replace('td-', '');
        if(tbl.id.indexOf("td-") == 0)
          {
            document.getElementById(id).innerHTML = '<table id="tctrl-'+grandparent+'"></table';
            document.getElementById(id).onclick = donothing;
            addrow('tctrl-'+grandparent);
            addcolumn('tctrl-'+grandparent);
          }
        else
          {
            document.getElementById(id).innerHTML = '<table id="tctrl-"></table';
            addrow('tctrl-');
            addcolumn('tctrl-');
          }
  }

function filtertctrl(str)
  {
    return str+'tctrl-'.replace('tctrl-', '');
  }

function donothing()
  {
    
  }

function createCell(cell, text, style)
  {
    cell.innerHTML = text;
    cell.id = text;
    cell.onclick = insertInInput;
  }

function insertInInput()
  {
    document.getElementById('atable').value = this.id;
    document.getElementById('arow').value = this.parentNode.parentNode.parentNode.id;
    document.getElementById('acolumn').value = this.parentNode.parentNode.parentNode.id;
  }

function addrow(id)
  {
    var tbl = document.getElementById(id),
        row = tbl.insertRow(tbl.rows.length),
        grandparent = '',
        i, tdtbl;
        if(tbl.parentNode.id.indexOf("td-") == 0)
          {
            grandparent = tbl.parentNode.id.replace('td-', '')+'-';
          }
    for (i = 0; i < tbl.rows[0].cells.length; i++)
      {
        tdtbl = tbl.rows.length-1;
        createCell(row.insertCell(i), 'td-'+grandparent+i+'-'+tdtbl, 'row');
      }
  }

function addcolumn(id)
  {
    var tbl = document.getElementById(id),
        grandparent = '',
        i, tdtbl;
        
        if(tbl.parentNode.id.indexOf("td-") == 0)
          {
            grandparent = tbl.parentNode.id.replace('td-', '')+'-';
          }
    for (i = 0; i < tbl.rows.length; i++)
      {
        tdtbl = tbl.rows[i].cells.length;
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), 'td-'+grandparent+tdtbl+'-'+i, 'col');
      }
  }

function getinfo(id)
  {
    var ele = document.getElementById(id);
    alert("Name: "+ele.nodeName+"\nTop: "+ele.offsetTop+"\nLeft: "+ele.offsetLeft+"\nHeight: "+ele.offsetHeight+"\nWidth: "+ele.offsetWidth+"\n");
  }

function buildtablefromcsv(csvid, seperator)
  {
    var lines, cells, csv, i, j, returnstring;
    csv = document.getElementById(csvid).innerHTML;
    lines = csv.split("\n");
    returnstring = '<table id="tctrl-">';
    for (i = 0; i < lines.length; i++)
      {
        returnstring += '<tr>';
        cells = lines[i].split(seperator);
        for (j = 0; j < cells.length; j++)
          {
            returnstring += '<td id="'+cells[j]+'">'+cells[j]+'</td>';
          }
        returnstring += '</tr>';
      }
    returnstring += '</table>';
    return returnstring;
  }
