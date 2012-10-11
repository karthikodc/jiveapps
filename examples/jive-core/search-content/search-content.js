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
               html += "<div>";
               html +="<ul>";
            var rows = response.data;
            $.each(rows, function(index, row) {
               var date = new Date(row.modificationDate);
               var newdate=function getISOStrict(date)
               html +="<li>";
               html += "<a href="+ row.resources.html.ref +"><span>" +row.type+" </span><div>" + row.subject + "</div></a>";
               html +="<div>" + row.contentSummary+"</div>
               html += "<dl>";
               html +="<dt>Author:</dt><dd><span>"+ row.author.username +"</span></dd></dt>";
               html +="<dt>Date:</dt><dd><span>"+ newdate +"</span></dd></dt>";
               html +="<dt>Location:</dt><dd><span> 1 </span></dd></dt>";
               html +="<dt>Bookmarks:</dt><dd><span> 2 </span></dd></dt>";
               html +="<dt>Likes:</dt><dd><span> " + row.likeCount + "</span></dd></dt>";
               html +="<dt>Latest activity:</dt><dd><span>"+ newdate + "</span></dd>";
               html +="<dt>Tag</dt><dd><span> 3 </span></dd>";
               html +="</li>";

            });
             html +="</ul></div>";
            console.log("Rows: "+html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
