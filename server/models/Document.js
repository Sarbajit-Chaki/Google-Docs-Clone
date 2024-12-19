import mongoose, { Schema } from "mongoose";

const DocumentSchema = new Schema({
    _id: String,
    data: Object
})

export const Document = mongoose.model("Document", DocumentSchema)