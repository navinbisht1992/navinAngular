//script/index.js
var request = require('request');
var sess;

module.exports = {
  index: function(req, res) {
  	sess=req.session;
  	console.log("sess",sess);
  	if(sess.email) {
  		
		 res.render('index');
	}
	else {
		res.redirect('/login');
	}
   
  },
  login: function(req, res) {
  	sess=req.session;
  	if(sess.email) {
      res.redirect('/');
    }
	else{
		 res.render('login', {email: '', error: ""});
	}
   
  },
  confmLogin: function(req, res) {
  	console.log("check:",req.body);
  	var data=req.body;
    var options = {
      url: 'http://127.0.0.1:2318/v1/login',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: data
    };
    
    request(options, function(err, response, body) {
        if (err) { console.log('error'.error, err)}
        else if(JSON.parse(body).length > 0) {
        	console.log(body);
        		
    			console.log("login verify response:",body);
    			body= JSON.parse(body);
    			console.log("sess-body",body);	
    			sess= req.session;
    			sess.email=body[0].emailId;
    			sess.name = body[0].firstName;
    			sess.contact = body[0].contactNo;
    			sess.id = body[0].id;
    			sess.isValidated = body[0].isValidated;
    			sess.isActive  = body[0].isActive;
    			console.log("sess2",sess);
				res.redirect('/');
		}
		else if(JSON.parse(body).length == 0){
				res.render('login', {email: req.body.loginEmail, error: "Invalid password"});
		}
        
    });
  },
  verifyEmail: function(req, res) {
  	var data=req.body;
    var options = {
      url: 'http://127.0.0.1:2318/v1/emailCheck',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: data
    };
    console.log('option:',options);
    request(options, function(err, response, body) {
        if (err) {console.log('error    '.error, err);
          res.status(400).send(err);
        } else {
        	console.log("api resp:",body);
        	res.status(200).send(body);
        }
    });
  },
  register: function(req, res) { console.log("123",req.body);
  
  	var options = {
      url: 'http://127.0.0.1:2318/v1/register',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: req.body
    };
    
    request(options, function(err, response, body) {
    	console.log('error gtgfgggg          '.error, response.statusCode	)
      if (err) { console.log('error'.error, err)}
      	else if(response.statusCode !== 200){
				res.redirect('/error');
		}
        else if(JSON.parse(body).length > 0) {
        	console.log(body);
        		
    			console.log("login verify response:",body);
    			body= JSON.parse(body);
    			console.log("sess-body",body);	
    			sess= req.session;
    			sess.email=body[0].emailId;
    			sess.name = body[0].firstName;
    			sess.contact = body[0].contactNo;
    			sess.id = body[0].id;
    			sess.isValidated = body[0].isValidated;
    			sess.isActive  = body[0].isActive;
    			console.log("sess2",sess);
				res.redirect('/');
		}
		else if(JSON.parse(body).length == 0){
				res.render('login', {email: req.body.loginEmail, error: "Invalid password"});
		}
    });
  },
  logout: function(req,res) {
	  req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.redirect('/login');
	  }
	});	
  } 
  
};
