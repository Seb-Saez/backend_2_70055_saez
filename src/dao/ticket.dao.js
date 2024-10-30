import { TicketModel } from '../models/ticket.model.js';

class TicketDAO {
    async createTicket(data) {
        const ticket = new TicketModel(data);
        return await ticket.save();
    }
}

export default new TicketDAO();
