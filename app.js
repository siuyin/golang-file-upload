function checkUploads(files) {
  var input = document.getElementById('input');
  var uploads = "<table><tr><th>Name</th><th>Bytes</th><th>MIME Type</th><th>Last modified date</th></tr>";
  for(i=0; i<files.length ;i++){      
  file = files[i];      
    uploads += "<tr><td>"+file.name+"</td><td style=\"text-align:right\">"
                    +file.size+"</td><td>"
                    +file.type+"</td><td> "+file.lastModifiedDate+"</td></tr>";
  }
  uploads += "</table>";
  for(i=0; i<files.length; i++) {
    file = files[i];
    if(!file.name.match(new RegExp("^.*\.csv$"))) {
      input.setCustomValidity("Please select only .csv files");
    } else {
      input.setCustomValidity("");
    }

  }
  for(i=0; i<files.length; i++) {
    file = files[i];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(res) {
        if(res.errors.length > 0) {
          var msg = "ERRORS: in "+ file.name + "\n";
          for(i=0;i<res.errors.length;i++) {
            msg = msg + "row: "+ res.errors[i].row + " "+res.errors[i].message;
          }
          alert(msg);
          input.setCustomValidity("Please fix problem with selected files");
        } else {
          var obj = {filename:file.name,rows:res.data};
          console.log(obj);
          input.setCustomValidity("");
        }
      }});
  }
  document.getElementById("result").innerHTML = uploads;
}
