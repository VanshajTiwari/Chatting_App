const Express=require("express");
const path=require("path");
const App=Express();
const cookieParser=require('cookie-parser');
const userRouter=require("./Routes/userRoute");
const chatRouter=require("./Routes/ChatRoute");
const viewRouter=require('./Routes/viewRoute');
const {Server}=require('socket.io');
//SET VIEW ENGINE
App.use(cookieParser());
App.use(Express.json());
App.use(Express.urlencoded({extended:true}));
App.use("/",Express.static(path.join(__dirname,"public")));
App.set("view-engine","ejs");
App.set("views",path.join(__dirname,"views"));

//App.use(bodyParser({extended:true}));
const io=new Server(App.listen("7575",()=>{console.log("http://127.0.0.1:7575")}));



App.use("/",viewRouter);
App.use("/users",userRouter);
App.use("/users",chatRouter);
App.all("*",(req,res)=>{
    res.status(404).render("404page.ejs");
});
let rooms=[];
io.on("connection",(socket)=>{
    console.log("connected Users");
    const roomsSocket=socket.rooms;
    roomsSocket.forEach(ele=>{rooms.push(ele)});
    socket.emit('show-rooms',{rooms});
    socket.on("send-rooms",({id})=>{
                    socket.join(id)
                    
    });
    console.log(rooms);
    socket.on("disconnect",()=>{console.log("disconnected")});
    socket.on('send-message',({message,senderId})=>{
        socket.except(senderId).emit('receive-message',{message});
    });
});

      
 
module.exports={App};