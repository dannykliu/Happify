var url_happy_image = "https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg"

var invoke = function () {
  $("img").each(function() {
    var self = $(this);

    sentimentAnalysis (this.src, function(tags){
        $.post('https://apiv2.indico.io/sentiment/batch?key=72a95c9f9ca2b62dc33fd2cbb29a5444',
               JSON.stringify({
                'data': tags
               })
        ).then(function(res){
            var myJson = JSON.parse(res)
            //console.log(myJson)
            for(var i = 0; i<myJson.results.length; i++){
                if(myJson.results[i] < 0.05){
                    self.attr('src', url_happy_image)
                }
            }
        })
    })
  })
}()

function dictionaryDef(tags, callback){
    var newTags = []
    for(var i = 0; i<tags.length; i++){
            $.get("https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword="
                  + tags[i] + "&apikey=sAG888RoA39qSlaHQHztW8LWODfPQ1mm")
                   .done (function(response) {
                    //console.log(response.results[0].senses[0].definition[0])
                    //console.log(typeof(response.results[0].senses[0].definition[0]))
                    newTags.push(response.results[0].senses[0].definition[0])
            }).done(function(){
                callback(newTags)
            })
        }
}

function sentimentAnalysis (src, callback) {
  var tagAPI = "https://api.clarifai.com/v1/tag/?url=" + src + "&access_token=" + "mH9JRdv5pg0cx8mw1gjUwqaMtuzM9B";
  $.get (tagAPI, function (data) {
    //console.log(data);
    var min = 10;
    var tags = []
    if(data.results[0].result.tag.classes.length < 10){
        min = data.results[0].result.tag.classes.length
    }

    for (var i = 0; i < min; i ++) {
      tags.push (data.results[0].result.tag.classes[i]);
    }

    dictionaryDef(tags, callback);
    //callback(tags)
  })
}
