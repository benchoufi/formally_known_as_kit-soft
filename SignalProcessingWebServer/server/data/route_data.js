var Data = require('./data.model'),
    fs = require('fs'),
    godata = [];

module.exports = function(app) {

    /** @brief send all data of one user for the data html page
     @param objet user : user in res.body
     @return return all data of one user*/
    app.get('/api/Data',function(req, res){
        Data.find({idUser: req.session.user._id},function(err, data) {
            (err ? res.send(err) : res.json(data));
        });
    });

    /** @brief receive image of sever c
     @param no param
     @return return images (content)*/
    app.get('/api/receive',function(req, res){
        setTimeout(function() {
            var content;
            content = fs.readFileSync("/tmp/imageTemp.txt", "UTF-8");
            godata.push(content);
            res.status(200).send(godata)
            }, 3000);

    });

    /** @brief save data in bdd
     @param objet data : data in req.body(images)
     @return return nothing*/
    app.post('/api/sendData',function(req, res){
        Data.create(req.body, function(err) {
            (err ? res.send(err) : res.status(200).send())
        });
    });

    /** @brief write images request by user in image.txt
     @param string id : id of images in urk
     @return return nothing */
    app.get('/api/:id/sendImages',function(req,res){
        Data.findById(req.params.id,function(err, datum) {
            var images = datum.images,
                file = fs.createWriteStream("server/public/images.txt");

                file.write(images[0]);
            file.close();
            Data.remove({_id: req.params.id}, function(err) {
                (err ? res.send(err) : res.status(200).send());
            });
        });
    });

    /** @brief download the images in the browser client of user
     @param no params
     @return return nothing */
    app.get('/images',function(req, res){
        res.download("server/public/images.txt", "images.txt", function(err){
            if(err){
                console.log(err)
            }
        });
    });

    /** @brief delete images request by an user
     @param no params
     @return return nothing */
    app.delete('/api/data/:id', function(req, res) {
            Data.remove({_id: req.params.id}, function(err) {
                (err ? res.send(err) : res.status(200).send());
        })
    });
};

