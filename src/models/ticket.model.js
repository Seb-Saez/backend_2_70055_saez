import { type } from "express/lib/response";
import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema({
    purchase_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    user:{
        type: String,
        required: true
    }
});


const Ticket = mongoose.model('Tickets', ticketSchema);

export default Ticket;