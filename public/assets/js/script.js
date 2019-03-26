$(document).ready(function() {
    
    $(".complete").on("click", function() {
      
  
      var task_id = $(this).attr("data-id");
      console.log("You just clicked this id" + task_id);
      $.ajax({
        method: "PUT",
        url: "/tasks/" + task_id
      }).then(function(data) {
        // reload page to display devoured burger in proper column
        location.reload();
      });
  
    });
  });