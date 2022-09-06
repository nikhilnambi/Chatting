const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var ignoreCase = require('ignore-case');
const nodemailer=require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const cluster = require('cluster');

const numCPUs = require('os').cpus().length;



var imgModel= require('./models/imageSchema');
var chatData=require('./models/chatData');
var muteData = require('./models/muteUser');


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

if(cluster.isMaster){
  console.log( `Master ${process.pid} is running`);

  for(let i=0;i<numCPUs;i++){
    cluster.fork();
  }

  cluster.on('exist',(worker,code,signal)=>{
    console.log( `worker ${worker.process.pid} dead`);
  });
}
else{








app.use(cors());
app.use(bodyParser.json());



dotenv.config();

const SignupData = require('./models/signupdata');
const userdata = require('./models/signupdata');
const UserOtpVerification=require('./models/UserOtpVerification');
const groupData = require('./models/groupData');
const blockData = require('./models/blockData');


const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected to mongodb');
})

const storage = multer.diskStorage({
  destination:(req,file,callBack)=>{
    callBack(null,'uploads/images')
  },
  filename: (req,file,callBack)=>{
    callBack(null,+Date.now()+path.extname(file.originalname));
  }
})

var upload = multer({storage:storage})


app.use(express.static('uploads/images'));


app.post("/file/:username/:image",verifyToken,upload.single('file'), function(req,res) {
 
  const file = req.file;
  
  chatData.updateMany({$and:[{"from":req.params.username},{"toImage":req.params.image}]},{$set:{"toImage":req.file.filename}}).
      then((data)=>{
       if(data){
         console.log(data);
       }else{
          console.log('null');
       }
      })
   chatData.updateMany({$and:[{"to":req.params.username},{"fromImage":req.params.image}]},{$set:{"fromImage":req.file.filename}}).
          then((data)=>{
          if(data){
            console.log(data);
            }
          else{
           console.log("null");
          }
     })
  

  userdata.findOneAndUpdate({"username":req.params.username},{$set:{"image":req.file.filename}})
  .then((data)=>{
    
    if(data){
      res.json(data.image);
    }
    else{
       console.log('no data')
    }
  
  });
});

  app.post('/removedp/',verifyToken,(req,res)=>{
    chatData.updateMany({$and:[{"from":req.body.username},{"toImage":req.body.image}]},{$set:{"toImage":"1661805287883.webp"}}).
    then((data)=>{
     if(data){
       console.log(data);
     }else{
      console.log("null");
     }
    })
       chatData.updateMany({$and:[{"to":req.body.username},{"fromImage":req.body.image}]},{$set:{"fromImage":"1661805287883.webp"}}).
       then((data)=>{
        if(data){
          console.log(data);
          }
        else{
         console.log("null");
        }
   })
 
    

   userdata.findOneAndUpdate({"username":req.body.username},{$set:{"image":"1661805287883.webp"}})
    .then((data)=>{
      
      if(data){
        res.send(data.image);
                }else{
                  console.log("no data")
                }
            })
  
        })
              
            

  app.get('/getimage/:data',(req,res)=>{
    userdata.findOne({"username":req.params.data})
  .then((data)=>{
    if(data){
      const result = data.image;
      res.json(result);
    }
   
  })
  })

  


function verifyToken(req,res,next){
        
     if(!req.headers.authorization){

       return res.status(401).send('Unauthorized request')

     }
     
     let token= req.headers.authorization.split(' ')[1]
    
     if(token === 'null'){
      return res.status(401).json({
        message:'Session Expired ! Unauthorized Request'
      })
     }
      try{

     let payload = jwt.verify(token, 'secretKey')


     if(!payload){
      return res.status(401).json({
        message:'Session Expired ! Unauthorized Request'
      })
     }
     req.userId = payload.subject
     next();
     }
     catch(err){
      return res.status(401).json({
        message:'Session Expired ! Unauthorized Request'
      })
     }
}

app.get('/checkauth',verifyToken,(req,res,err)=>{
    res.json(err);
    console.log(err);
})


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"verifyotpemail3@gmail.com",
    // pass:"fiuhpzbtubdnfly"
    pass:"otufslqmrsirkhpk"
  }
});

app.get('/otp/:email',async(req,error)=>{

var email=req.params.email;

try{

 const otp = `${Math.floor(1000 + Math.random() * 9000)}`;


      var mailOptions = {
        from: 'verifyotpemail3@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Your otp is <b>${otp}</b>. Enter the code in Sign-up page & Verify Your Email Address.
       This <b>code expires in 1 hr</b>.</p>`,
      };

     transporter.sendMail(mailOptions, function(res,info,error){
       try {
        console.log('Email sent:'+info.response);
      }
      catch(error){
        console.log(error);
      }

    })

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp,salt)
    console.log(otp);
    
      
      const useremailotp=   await UserOtpVerification.findOne({'email':email});

      if(useremailotp){

        console.log(useremailotp);
        console.log("updating");
        console.log(useremailotp._id);
        console.log(hashedOTP);
        try{
          UserOtpVerification.findOneAndUpdate({"email":email},
         
        {$set:{"email": email,
               "otp": hashedOTP,
              "createdAt": Date.now(),
              "expiresAt": Date.now() + 3600000
              
             }})
            
              
            .then(()=>{
             
            })
          }
          catch(error){
            console.log(error);
          }
           


      }
      else{
        console.log("creating otp for new email")
        console.log(otp)
      const newOtpVerification = await new UserOtpVerification({
        
        email: email,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      await newOtpVerification.save();

    }
    }
    catch(error){

    }


    
    });

app.post('/otpverify',async(req,res)=>{
  console.log("hi");
  const useremailotp=req.body;

  email=useremailotp.email,
  otp=useremailotp.otp
  
  console.log(otp);
  try{
    const useremailverify=   await UserOtpVerification.findOne({'email':email})
       console.log(useremailverify);
       if(useremailverify){
       console.log(useremailverify)
        const match = await bcrypt.compare(otp,useremailverify.otp);
         console.log(match);
        if(match){
          console.log('Email Verified');
           res.status(200).json({
            message:"Email Verified"});
          
        } else{
          console.log('Wrong Otp');
          res.status(400).send({
          message:"Otp mismatch,enter the otp received in email"
          });

        }
       }
       else{
        console.log("Wrong Otp");
        res.status(400).send({
         message: "Otp mismatch,enter the otp received in email"
        });
       }
  }
  catch(err){
    console.log(err);
    res.status(500).send("Internal server error occured");
  }

})

app.get('/username/:usernamecheck',function(req,res,err) {


  res.header("Access-Control-Allow-Orgin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    

    var usernamecheck = req.params.usernamecheck;

  SignupData.find().then(function(userdata) {
    
    var usernameverify;

    for(i=0;i<userdata.length;i++){
      if( userdata[i].username == usernamecheck){
         
        usernameverify = false;
        break;
      }

      else{
        usernameverify = true;
      }

    }
   
  if(usernameverify == true) {
    res.status(200).send("Username is available") ;
        
     
  }

  if(usernameverify == false) {
    res.status(400).json({
      message: "not available! username already taken"
    })
   
  }
  

})
})


app.get('/useremail/:email',function(req,res,err) {


  res.header("Access-Control-Allow-Orgin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
   
  var useremailcheck = req.params.email;

  SignupData.find().then(function(userdata) {


    var useremailverify;

    for(i=0;i<userdata.length;i++){
      if( userdata[i].email == useremailcheck){
         
        useremailverify = false;
        break;
      }

      else{
        useremailverify = true;
      }

    }
   
  if(useremailverify == true) {
    res.status(200).send("Email valid") ;
        
     
  }

  if(useremailverify == false) {
    res.status(400).json({
      message: "Email id already associated with another account"
    })
    
  }
  

})
})


app.post('/add',function(req,res){
  res.header("Access-Control-Allow-Orgin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
 
 var userinfo = req.body;
 

  var user={

  name:userinfo.name,
  email:userinfo.email,
  username:userinfo.username,
  password:userinfo.password,
  status:"offline",
  image:"1661805287883.webp"
  
  }
  



   var userdata = new SignupData(user);
  
   try{
    if( userdata.save()){
      res.status(200).send({
        message:"Welcome,"+ userinfo.name +" ! "+ "Account sucessfully created ,Login & Connect with friends"
      })
    }
    else{
      res.status(200).send({
        message:"Internal Server Error ,Try later"
      })
    }
  
   }
   catch(error){
    res.status(500).send({
      message:"Internal Server Error ,Try later"
    })
   }
})

app.post('/login',async(req,res)=>{
 
  
   const logindata = req.body;
   

  password=logindata.password,
  username=logindata.username
  

  try{
    const user=   await userdata.findOne({
        $or: [{'username':username},{'email':username}]
       })
  
       if(user){
       
        const match = await bcrypt.compare(password,user.password);
         
        if(match){

         const userinfo=
            {
              name:user.name,
              username:user.username,
              email:user.email,
              image:user.image,
              joined:user.joined.toLocaleDateString()
            }
            
          
          console.log(userinfo);
          console.log('Login Sucessfull');
          let payload = {subject:user.email}
           console.log(payload);
           let token = jwt.sign(payload,'secretKey')
           console.log(token)

          userdata.findOneAndUpdate({'email':user.email},
             {$set:{status:'online'}}
          ).then(()=>{
            
            res.status(200).send({token,userinfo})});
           }
           else{
          console.log('Login Unsuccessful! Wrong password');

          res.status(400).json({
          message:  "Login Unsucessful! Wrong password "
          });

        }
       }
       else{
        console.log("No User with this username or Email Id");
        res.status(400).json({
         message: "No User with this username or Email Id"
        });
       }
  }
  catch(err){
    console.log(err);
    res.status(500).send("Internal server error occured");
  }
})

app.get('/searchname/:name',verifyToken,async(req,res)=>{  
 var name = req.params.name;
 

     try{

    const user=   await userdata.find({'username':name.toLowerCase()}) 

  
    
       if(user && user.length>0){
       const searchresult = user.map(({name, username}) => ({name, username}));
       res.send(searchresult);

        }
       
       else{
        res.status(400).json({
          message:"No User Registered with this Username !"
        });
        console.log("no user")
       }
      }
 
      catch(err){

      }
 

})

app.post('/logout',function(req,res){
 
  var user= req.body;
   email=user.email;
  userdata.findOneAndUpdate({'email':email},

  {$set:{status:'offline'}}).then(()=>{
     res.status(200);
     console.log("logged out")

    })

})

app.get('/people',verifyToken,function(req,res){
  userdata.find().then(function(data){
    const result=data.map(({name,username,status,image})=>({name,username,status,image}))
    res.status(200).send(result);
  })
})


io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });
  
socket.on('message', (data) => {
  p=data.from;
  c=data.to;
  d=p.concat(c);
  e=c.concat(p);

  var datainfo={
    from:data.from,
    to:data.to,
    message:data.text,
    room:data.room,
    room2:data.room2,
    firsttime:"last",
    toImage:data.fromimage,
    fromImage:data.toimage,
    dateformat:new Date().toLocaleDateString(),
    time:formatAMPM(new Date),
    mute:'unmuted',
    members:data.members
    }
  
  chatData.findOne({$or: [ { "room":data.room}, { "room2": data.room } ] } )
   
    .then((chatdata)=>{
         
      if(chatdata==null){
     var chatdata = new chatData(datainfo);
     
     chatdata.save();
     io.in(data.room).emit('new ind message',{message:data.message,user:data.from})
      }


      else{
        chatData.findOne({$and:[{$or: [ { "room":data.room}, { "room2": data.room } ] },{"firsttime":"last"}]})
   
        .then((chatdata)=>{
             console.log(chatdata+"came here");
           if(chatdata!=null){
            chatData.findOneAndUpdate({$and:[{$or: [ { "room":data.room}, { "room2": data.room} ]},{"firsttime":"last"}]},
            {$set:{"firsttime": "repeat"}}).then((data)=>{
              if(data!=null){
                var chatdata = new chatData(datainfo);
              chatdata.save();
              io.in(data.room).emit('new ind message',{message:data.message,user:data.from})
              }

            })
          }
        })

      }

          })

          })

});

app.post("/file/:from/:to/:room/:room2/:fromImage/:toImage/:members",verifyToken,upload.single('file'), function(req,res) {
 
  const file = req.file;

  console.log(req.params.members);
  console.log(req.file.filename);

  var datainfo={
    from:req.params.from,
    to:req.params.to,
    room:req.params.room,
    room2:req.params.room2,
    image:req.file.filename,
    firsttime:"last",
    toImage:req.params.fromImage,
    fromImage:req.params.toImage,
    dateformat:new Date().toLocaleDateString(),
    time:formatAMPM(new Date),
    mute:'unmuted',
    members:req.params.memebers
    }
  
  chatData.findOne({$or: [ { "room":req.params.room}, { "room2": req.params.room} ] } )
   
    .then((chatdata)=>{
         
      if(chatdata==null){
     var chatdata = new chatData(datainfo);
     
     chatdata.save();
    
      }


      else{
        chatData.findOne({$and:[{$or: [ { "room":req.params.room}, { "room2":req.params.room } ] },{"firsttime":"last"}]})
   
        .then((chatdata)=>{
             console.log(chatdata+"came here");
           if(chatdata!=null){
            chatData.findOneAndUpdate({$and:[{$or: [ { "room":req.params.room}, { "room2": req.params.room} ]},{"firsttime":"last"}]},
            {$set:{"firsttime": "repeat"}}).then((data)=>{
              if(data!=null){
                var chatdata = new chatData(datainfo);
              chatdata.save();
            
              }

            })
          }
        })

      }

          })

          })


app.get('/chatHistory/:getusername',verifyToken, (req, res) => {
   from  = req.params.getusername;
   to = req.params.getusername;

 chatData.find(
      {$and:[{$or: [ { "from":from },{"to":to}]},{"firsttime":"last"},{$match:{'members':req.params.getusername}}]})
    
    .then((chatdata)=>{
      res.send(chatdata);
    });
})






app.post('/create/group',verifyToken,(req,res)=>{
  console.log(req.body);

  var group={
    gpname:req.body.gpname,
    members:req.body.members,
    creator:req.body.creator,
    image:"1662047991875.png"
  }
  try{
  groupData.findOne({'gpname':group.gpname}).then((data)=>{
    if(data){
      res.status(200).json({
          message:'Group with same name already exist'
      })
      console.log("group exist")
    }
    else{
      var groupdata = new groupData(group);
      groupdata.save();
    
      
        res.status(200).json({
          message:'Group Successfully created'
        })
        console.log("created");
    }

  })
}
catch(error){
   res.status(500).json({
    message:'Internal server error occured'
   })
}

})

app.get('/getgroup/:data',verifyToken,(req,res)=>{
   
  groupData.find( {"members":req.params.data}).
     then((groupdata)=>{
        res.send(groupdata)
     })
})

app.get('/getnongroup/:data',verifyToken,(req,res)=>{
 
  
 groupData.find( {members:{$not:{$in:[req.params.data]}}}).
    then((groupdata)=>{
      //  console.log(groupdata);
       res.send(groupdata)
    })
})

app.post('/joingroup/',verifyToken,(req,res)=>{
  
  var gpinfo= req.body;
  console.log(gpinfo);
  console.log(gpinfo.gpname)
  console.log(gpinfo.username)
  
  groupData.findOneAndUpdate({"gpname":gpinfo.gpname},
  {$push:{members:gpinfo.username}
  }).then((data)=>{
    res.send()
})
  
 
})

app.post("/leavegp/",verifyToken,(req,res)=>{
  var gpinfo= req.body;

  groupData.findOneAndUpdate({"gpname":gpinfo.room},
    {$pull:{members:gpinfo.username}
    }).then((data)=>{
      console.log(data);
  })
 
})

app.post('/checkgroup/',(req,res)=>{
  
  var group= req.body;
  groupData.findOne({$and:[{members:{$all:[group.username]}},{"gpname":group.room}]}).
  then((data)=>{
     res.send(data);
  })
})




app.get('/receive-message/:data',verifyToken,(req,res)=>{
  
  chatData.find(
    {$or: [ { "room":req.params.data }, { "room2": req.params.data } ] })
 
  .then((chatdata)=>{
      res.send(chatdata);
  });
  
  
})

app.get('/receive-gpmessage/:data',(req,res)=>{
  
  chatData.find(
     { "to":req.params.data })
 
  .then((chatdata)=>{
      res.send(chatdata);
  });
  
  
})

app.get('/checkstatus/:username',(req,res)=>{
  
  SignupData.findOne({'username':req.params.username}).
    then(function(userdata){
      const result=userdata.status;
      res.status(200).json(result);
    })


  })
  
  app.get('/checkcreator/:data',(req,res)=>{
    groupData.findOne({'room':req.params.data}).
      then(function(data){
        const result=data.creator;
        res.status(200).json(result);
      })
  
  
    })

  app.post('/block',verifyToken,(req,res)=>{
    var blockinfo = req.body;
   
    blockdata={
      from:blockinfo.from,
      to:blockinfo.to
    }
    
    var block = new blockData(blockdata);
    block.save();

  })

  app.post("/unblock",verifyToken,(req,res)=>{
  
    blockData.findOneAndDelete({$and:[{"from":req.body.from},{"to":req.body.to}]}).then((data)=>{
      res.json("success");
    })

  })
  app.post('/checkblock',(req,res)=>{
    blockData.findOne({$and:[{"from":req.body.from},{"to":req.body.to}]}).then((data)=>{
        res.send(data)
    })
 
   })
   app.post('/checkblocked',(req,res)=>{
    blockData.findOne({$and:[{"from":req.body.from},{"to":req.body.to}]}).then((data)=>{
        res.send(data)
    })
 
   })
  app.post('/mute',(req,res)=>{
    var muteinfo = req.body;
    p="last"

    chatData.findOneAndUpdate(
         {$and:[{$and: [ { "from":muteinfo.from },{"to":muteinfo.to} ] },{"firsttime":p}]},
         {$set:{mute:'muted'}
     })
      
       .then((chatdata)=>{
      })
      

  })
  app.post('/unmute',(req,res)=>{
    
    chatData.findOneAndUpdate(
      {$and:[{$and: [ { "from":req.body.from },{"to":req.body.to} ] },{"firsttime":"last"}]},
      {$set:{mute:"unmuted"}
  })
   
    .then((chatdata)=>{
       res.json('unmuted')
   })

  })
 
  app.post('/checkmute',(req,res)=>{
    proom= req.body.from.concat(req.body.to);
    troom =  req.body.to.concat(req.body.from);
    

      chatData.findOne(
        {$and:[{$or: [ { "room":proom },{"room2":proom} ] },{"firsttime":"last"}]}
      ).then((chatdata)=>{
       if(chatdata!=null){
        if(chatdata.mute=='muted'){
          res.json('muted');
        }
        else{
          res.json('unmuted')
        }
       }
       else{
        res.json("null");
       }
  })
  })
   
  

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

http.listen(process.env.PORT || 3200, () => {
    console.log('Server started on port 3200');
})
}