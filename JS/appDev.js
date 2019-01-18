// based on this tutorial https://www.youtube.com/watch?v=DIVfDZZeGxM

$(document).ready(function(){
    
   $("#bmForm").on("submit", function(){
       
      // console.log("it works");
      var formObject = {
          
          title: $("#title").val(),
          url: $("#url").val(),
      } 
      
      console.log(formObject);
       
       
    
       //this calls the function that is defined 
       // below
       setLS(formObject);
       
       event.preventDefault();
       // use this with forms to see the console log in action
       $(this)[0].reset(); // this clears the input fields once it is submitted 
       
   }); // END OF FORM 
        
   //local storage only stores strings, but we can //parse JSON into a string, save it and then when //we want it back we can parse it back to JSON
    
    
    //this defines the function that is called above
    // the peramerters of the defined function and //the called function must be the same so they //can communicate to eachother, here the //parameter is formObject
     function setLS(formObject){
        
        
        var check = localStorage.getItem('website');
        
        if(check === null){
           var websiteList = []; 
            websiteList.push(formObject);
        
        //JSON stringify will turn a JSON object into //a string
        // JSON parse will turn the object back into //JSON
         
        // JSON interatcs with all languages, when //storing data we must convert the data to //JSON so all languages can undertand it  
            
            var x = JSON.stringify(websiteList);
            localStorage.setItem('website', x);
    }else{
        var retrieveItems = JSON.parse(localStorage.getItem('website'));
            retrieveItems.push(formObject);
            
        var x = JSON.stringify(retrieveItems);
            localStorage.setItem('website', x);
        
        //this calls the bringWebSites function
        bringWebsites();
    
        }
    

}
 
     
  // end methods here  
});
// end methods here   
    
 // DELETE ITEM FUNCTION    
function deleteItem(uRL){
     
     
     var retrieveItems = JSON.parse(localStorage.getItem('website'));
     
     for(var i= 0; i < retrieveItems.length; i++){
         // this is going to loop through the list of //delete buttons, if it's equal to the one //we clicked, do //something (delete it )
         // we are comparing a single url to the list //of url, because the for loop is going to //loop through all of them and we only need //to delete one 
         // we use array.splice to remove item
         if(retrieveItems[i].url == uRL){
             console.log("condition is true");
             retrieveItems.splice(i, 1);
         }
     }
    
    // we must stringify it to go to local storage
     var x = JSON.stringify(retrieveItems);
            localStorage.setItem('website', x);
     
    //this function updates the front end 
    bringWebsites();
 }

   
  $(window).on("load", function(){
      bringWebsites();
      
  });
    


// EDIT ITEM FUNCTION

function editItem(Title, uRL){
    
    console.log(Title, uRL); 
    
    //these must be let so it has local 
    let retrieveItems = JSON.parse(localStorage.getItem('website'));
     
     for(let i= 0; i < retrieveItems.length; i++){
        
         if(retrieveItems[i].url == uRL){
             console.log("condition is true");
            
             
             var Form = `
 <div class="form-group">
    <label >Website Name</label>
    <input type="text" class="form-control" value="${Title}" id="title2" aria-describedby="emailHelp" placeholder="Add Website Name Here">
   
  </div>
  <div class="form-group">
    <label>URL</label>
    <input type="text" class="form-control" value="${uRL}" id="url2" placeholder="Add URL Here">
  </div>
  
 
            
<div class="container text-center">
<div class="row"> 
    
    <div class="col-lg">
    <button type="button" class="btn btn-secondary btn-lg btn-block" data-dismiss="modal">Close</button>
   </div>         
 
    <div class="col-lg">
    
    <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
  
    </div>
    
</div>
  </div>


`;
             
 $("#f2").html(Form);            
           
   $("#f2").on("submit", function(e){
      
     // 
       
       
       var formObject2 = {
           
           title: $('#title2').val(),
           url: $('#url2').val()
       }
       
       console.log(formObject2);
       
       //make sure the prevent default and reset are at the bottom. 
        e.preventDefault();
       // $(this)[0].reset();
       
       //this deletes the old object
       //this deletes the old object
      retrieveItems.splice(i, 1);
       
      // this adds the new url/ title  
      retrieveItems.push(formObject2); 
    
       
       // this Jasons it up a bit
       var x = JSON.stringify(retrieveItems);
            localStorage.setItem('website', x);
        
        //this calls the bringWebSites function
      bringWebsites();
       
   });           
               
                       
         }
     }
    
    
}



 





//this defines thebringWebsites function 
// this function will update the front end portion
function bringWebsites(){
    var retrieveItems = JSON.parse(localStorage.getItem('website'));
    
    console.log(retrieveItems);
    
    $("#BM").html(" ");
    
    $.each(retrieveItems, function(index, item){
        
      var Title = item.title;  
     var uRL = item.url;
   
    // the template literal calls the functions
     var myList = `<li class="list-group-item d-flex bg-dark border border-light justify-content-between align-items-center">
   <span class="title text-light"> ${Title}</span>
   
<a href="${uRL}" target="_blank">  <span class="badge badge-primary "><i class="fas fa-link" style="font-size: 20px;"></i></span></a>


  <a href="#"  onclick="deleteItem('${uRL}')"  >  <span class="badge badge-primary" ><i class="far fa-trash-alt" style="font-size: 20px;"></i></span></a>

  <a href="#"  onclick="editItem('${Title}', '${uRL}')"  data-toggle="modal" data-target=".m2">  <span class="badge badge-primary " ><i class="far fa-edit" style="font-size: 20px;"></i></span></a>


  </li>
  `;
    
    $("#BM").append(myList);   
    });
    
    
    
}
    
    
    
    
    
    
    
    
    
    
    
