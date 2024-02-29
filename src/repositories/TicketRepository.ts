import { Ticket, ITicket } from "../entities/Ticket";
import { TicketStatus } from "../interfaces/TicketStatus";

export const ticketRepository = {
  async getAllTickets(): Promise<ITicket[]> {
    return await Ticket.find();
  },
  async getUserTickets(userId: string): Promise<ITicket[]> {
    return await Ticket.find({ userId });
  },
  async createTicket(data: ITicket): Promise<ITicket> {
    return await new Ticket(data).save();
  },

  async findById(id: string): Promise<ITicket | null> {
    return await Ticket.findOne({ _id: id });
  },
  async getRecentlyClosedTickets(): Promise<ITicket[]> {
    return await Ticket.find({
      status: TicketStatus.COMPLETED,
      completedDate: {
        $lte: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });
  },

  async addComment(
    content: string,
    userId: string,
    ticket: ITicket
  ): Promise<ITicket | null> {
    return await Ticket.findByIdAndUpdate(ticket._id, {
      $push: {
        comments: {
          content,
          userId,
        },
      },
    });
  },
  async processTicket(
    userId: string,
    ticket: ITicket
  ): Promise<ITicket | null> {
    return await Ticket.findByIdAndUpdate(ticket._id, {
      $set: {
        startedDate: new Date(),
        status: TicketStatus.IN_PROGRESS,
        agentId: userId,
      },
    });
  },

  async closeATicket(userId: string, ticket: ITicket): Promise<ITicket | null> {
    return await Ticket.findByIdAndUpdate(ticket._id, {
      $set: {
        completedDate: new Date(),
        status: TicketStatus.COMPLETED,
      },
    });
  },
};
