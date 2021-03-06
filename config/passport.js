var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({id: id}, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {

        User.findOne({email: email}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: 'Incorrect email'});
            }

            if (user.password !== password) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, {
                email: user.email,
                createdAt: user.createdAt,
                id: user.id
            }, {
                message: 'Logged in successfully'
            });
        });
    }
));
