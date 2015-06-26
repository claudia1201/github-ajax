$(document).on("ready", function(){ 
 
  $.ajax({
    url: "https://api.github.com/users/claudia1201",
    method: "GET",
    data: {
      access_token: "8bae437d64a874e34746afc526c87c9b1de3507f"
    },
    success: function(data) { 
      console.log(data)
    	var source = $("#leftSideUser").html()
      console.log(source)
    	var templateFunction = Handlebars.compile(source)

    	var htmlString = templateFunction({
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
        company: data.company,
        location: data.location,
        email: data.email,
        created_at: moment(data.created_at).format("MMMM, DD, YYYY")
      })
              console.log(htmlString)

    	$(".userBox").append(htmlString)

     }
  })

  $.ajax({
    url: "https://api.github.com/users/claudia1201/repos",
    method: "GET",
    data: {
    access_token: "8bae437d64a874e34746afc526c87c9b1de3507f"
    },
    success: function(data) {

      _.each(data, function(data){

        $.ajax({
          url: data.url,
          method: "GET",
          data: {
          access_token: "8bae437d64a874e34746afc526c87c9b1de3507f"
          },
          success: function(repo) {

            var source = $("#rightSideUser").html()

            var templateFunction = Handlebars.compile(source)

            var htmlString = templateFunction({
              name: data.name,
              language: data.language,
              stargazers_count: repo.stargazers_count,
              network_count: repo.network_count,
              description: data.description,
              updated_at:  moment(data.updated_at).fromNow()
            })

            $(".repoBox").append(htmlString)
          }
        })
      })
    }

  })
 
})
