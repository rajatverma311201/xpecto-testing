const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport=require("passport")

passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:process.env.CALLBACKURL,
        scope:["profile","email"],
    },
    function(accessToken,refreshToken,profile,callback){
        callback(null,profile);
    }
    )
)

//we are using cookie session so we need serlize session and dselize session

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});