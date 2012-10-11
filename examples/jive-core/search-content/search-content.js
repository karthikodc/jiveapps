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
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var modifiedDate="";
            var likeCount="";
            var type="";
            
            $.each(rows, function(index, row) {
               
               if(row.type=="discussion")
               {
                     url=row.resources.html.ref;
                     subject=row.subject;
                      contentSummary=row.contentSummary;
                      author=row.author.username;
                      modifiedDate=row.modificationDate;
                     likeCount=row.likeCount;
                     type=row.type;
                     html +="<div>";
                     html +="<ul><li>"+author+" "+subject+" "+type+"</li><ul>"
                     html +="</div>"
                  
               }
            });
            $.each(rows, function(index, row) {
               if(row.type=="document")
               {
                  url=row.resources.html.ref;
                     subject=row.subject;
                      contentSummary=row.contentSummary;
                      author=row.author.username;
                      modifiedDate=row.modificationDate;
                     likeCount=row.likeCount;
                     type=row.type;
                     html +="<div>";
                     html +="<ul><li>"+author+" "+subject+" "+type+"</li><ul>"
                     html +="</div>"
               }
            });
            $.each(rows, function(index, row) {
               if(row.type=="update")
               {
                  url=row.resources.html.ref;
                     subject=row.subject;
                      contentSummary=row.contentSummary;
                      author=row.author.username;
                      modifiedDate=row.modificationDate;
                     likeCount=row.likeCount;
                     type=row.type;
                     html +="<div>";
                     html +="<ul><li>"+author+" "+subject+" "+type+"</li><ul>"
                     html +="</div>"
               }
            });
            .each(rows, function(index, row) {
               if(row.type=="post")
               {
                  url=row.resources.html.ref;
                     subject=row.subject;
                      contentSummary=row.contentSummary;
                      author=row.author.username;
                      modifiedDate=row.modificationDate;
                     likeCount=row.likeCount;
                     type=row.type;
                     html +="<div>";
                     html +="<ul><li>"+author+" "+subject+" "+type+"</li><ul>"
                     html +="</div>"
               }
            });
            
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
