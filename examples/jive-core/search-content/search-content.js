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
               html +="<li>";
               html += "<a href="+ row.resources.html.ref +"><span>" +row.type+" </span><div>" + row.subject + "</div></a>";
               html +="<div>" + row.contentSummary+"</div>";
               html += "<dl>";
               html +="<dt>Author:</dt><dd><span>"+ row.author.username +"</span></dd></dt>";
               html +="<dt>Date:</dt><dd><span>Date</span></dd></dt>";
               html +="<dt>Location:</dt><dd><span> 1 </span></dd></dt>";
               html +="<dt>Bookmarks:</dt><dd><span> 2 </span></dd></dt>";
               html +="<dt>Likes:</dt><dd><span> " + row.likeCount + "</span></dd></dt>";
               html +="<dt>Latest activity:</dt><dd><span>"+ row.modificationDate + "</span></dd>";
               html +="<dt>Tag</dt><dd><span> 3 </span></dd>";
               html += "</dl>";
               html +="</li>";
            });
            $("#search-results").html(html);
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
