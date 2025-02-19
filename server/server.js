import { Server } from "socket.io";
import mongoose from "mongoose";
import { Document } from "./models/Document.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connected")).catch((err) => console.log("+++",err))

const io = new Server(3001, {
    cors: {
        origin: `${process.env.FRONTEND_URL}`,
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log("connected");

    socket.on('get-document', async documentId => {
        const document = await findOrCreate(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
})


const findOrCreate = async (id) => {
    if(!id) return

    const document = await Document.findById(id)
    if(document) return document
    
    return await Document.create({_id: id, data: "" })
}