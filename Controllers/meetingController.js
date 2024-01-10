const meetingModel=require("./../Models/meeting");
const crypto=require('crypto');
const uuid=require('uuid');
exports.createMeeting=async(req,res)=>{
        const host=req.session.user;
        const meetingID=uuid.v1();
        const password=passwordGenerator();
        const startAt=new Date(req.body.date+" "+req.body.time).toISOString();
        // key
        const agenda=req.body.meeting_type;
        const meetingLink=`/meeting/projectIGI/${meetingID}/p/${password}`
        const meetingObj=new meetingModel({createdBy:host,host:[host],meetingID,password,startAt,agenda,meetingLink});   
        meetingObj.save();     
        res.redirect('/dashboard/meeting');
}

exports.getMeetings=async(req,res)=>{
    res.direct("/dashboard");
}

function passwordGenerator(){
    return crypto.randomBytes(4).toString('hex');
}