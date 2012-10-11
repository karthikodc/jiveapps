// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}

// Perform a search and display the results
function search() {
    
    $("search-results").html("");
    gadgets.window.adjustHeight();
   /* var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });*/
    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
        
        
    };
function getISOStrict(date) {

    if (Date.prototype.toISOString) {
        return date.toISOString().replace(/Z$/, "+0000");
    }

    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    }

    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() );
       // + 'T' + pad( date.getUTCHours() )
       // + ':' + pad( date.getUTCMinutes() )
      //  + ':' + pad( date.getUTCSeconds() )
       // + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
   //     + '+0000';
}
   
   /* if (types.length > 0) {
        params.type = types;
    }*/
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
          
            var html = "";
            var rows = response.data;
            $.each(rows, function(index, row) {
               var date = new Date(row.modificationDate);
               var newdate=function getISOStrict(date);
                html += "<tr colspan='3'>";
                html += "<td>" + row.type + "</td>";
                html += "<td><a href="+ row.resources.html.ref +">" + row.subject + "</a></td>";
                
               html += "</tr>";
               html += "<tr><td colspan='3'>";
               html += "<table>";
               html += "<tr >";
               html += "<td>Author:</td> <td><img src=" + row.author.avatarURL + " width='25px' height='25px' border='0'/></td><td><a href=https://apps.onprem.jivesoftware.com/people/"+row.author.username+">" + row.author.name + "</td>";
                html += "<td>Likes:</td><td>" + row.likeCount + "</td>";
                html += "<td>Modification Date:</td><td>" + newdate + "</td>";
               html += "</tr>";
               html += "</table>";
                html += "</td></tr>";
            });
            console.log("Rows: "+html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
