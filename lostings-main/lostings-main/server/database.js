const mongoose = require("mongoose");

const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then((data)=>{
    console.log(`Mongodb connected with server:${data.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
}



module.exports = connect;