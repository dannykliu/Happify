var token;
var tags=[];

getToken (function () {
  $("img").each(function() {
    //  console.log (this.src);

    // if (sentimentAnalysis (this.src)) {
    //
    //   this.src = img;
    //
    // }

    sentimentAnalysis (this.src, printTags);

  })
})




function getToken (callback) {
   var tokenAPI = "https://api.clarifai.com/v1/token/";

   $.post (tokenAPI, {
     client_id: "HwJ9xwDLs2aRbTKZ_qQoKQl-K0HyHqrL1333-Lsv",
     client_secret: "1s-JTh4NXrS-PYe53MZFqQIsVQ7cOpIdwO_uHdAr",
     grant_type: "client_credentials"
   })
    .done (function(data) {
      console.log(data.access_token);
      token = data.access_token;
      callback();
    })
}

function sentimentAnalysis (src,callback) {
  var tagAPI = "https://api.clarifai.com/v1/tag/?url=" + src + "&access_token=" + token;
  $.get (tagAPI,function (data) {
    //console.log(data);
    for (var i = 0; i < data.results[0].result.tag.classes.length; i ++) {
      tags.push (data.results[0].result.tag.classes[i]);
    }
    //console.log(tags);
    printTags();
    callback ();

  })
}

function printTags () {
  console.log (tags);
}
