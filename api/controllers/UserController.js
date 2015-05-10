/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    getMusic: function (req, res) {

        User.findOne({id: req.session.passport.user}, function (err, user) {

            if (err) {
                res.status(500);
                return res.send(err);
            }

            if (!user) {
                res.status(404);
                return res.send('Your session user does not actually exist. Someone must have wiped the database.');
            }

            var results = user.music || [];
            res.send({results: results});
        });
    },

    addMusic: function (req, res) {
        var date = new Date();

        User.findOne({id: req.session.passport.user}, function (err, user) {

            if (err) {
                res.status(500);
                return res.send(err);
            }

            if (!user) {
                res.status(404);
                return res.send('Your session user does not actually exist. Someone must have wiped the database.');
            }

            if (!req.body.soundCloudId || !req.body.voicePath) {
                res.status(400);
                return res.send();
            }

            if (!user.music) user.music = [];
            date.setTime(Date.now());

            user.music.push({
                title: req.body.title || '?',
                comment: req.body.comment || '',
                date: date.toISOString(),
                soundCloudId: req.body.soundCloudId,
                voicePath: req.body.voicePath
            });

            user.save();
            res.send();
        });
    }

    // NOT implementing this for now
    // removeMusic: function (req, res) {}
};
