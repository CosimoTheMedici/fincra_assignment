import express from "express";
import { Validator } from "../middlewares/Validator";
import { createTicketValidator, commentValidator } from "../validators/Tickets";
import { TicketController } from "../controllers/TicketController";
import { Security } from "../middlewares/Security";
import { UserType } from "../interfaces/UserType";

const router: express.Router = express.Router();

router.get(
  "/",
  Security.isAuthUser([UserType.USER]),
  TicketController.getUserTickets
);

router.get(
  "/all/",
  Security.isAuthUser([UserType.AGENT, UserType.ADMIN]),
  TicketController.getAllTickets
);

router.get(
  "/id/:ticketId",
  Security.isAuthUser([UserType.USER, UserType.AGENT, UserType.ADMIN]),
  TicketController.getTicket
);

router.get(
  "/recently-closed/",
  Security.isAuthUser([UserType.AGENT, UserType.ADMIN]),
  TicketController.getRecentlyClosedTickets
);

router.post(
  "/process/:ticketId",
  Security.isAuthUser([UserType.AGENT]),
  TicketController.processTicket
);

router.post(
  "/close/:ticketId",
  Security.isAuthUser([UserType.AGENT, UserType.ADMIN]),
  TicketController.closeATicket
);
router.post(
  "/",
  Security.isAuthUser([UserType.USER]),
  Validator.validate(createTicketValidator),
  TicketController.createTicket
);
router.post(
  "/comment",
  Security.isAuthUser([UserType.USER, UserType.AGENT, UserType.ADMIN]),
  Validator.validate(commentValidator),
  TicketController.comment
);

export default router;
