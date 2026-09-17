const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");
const transporter = require("../config/mailer");
import { BaseController } from "./BaseController";
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
//TODO
export class RegisterController extends BaseController {
  private req: Request;
  private res: Response;

  private email: string = "";
  private login: string = "";
  private hashPassword: string = "";

  executeImpl = async (req: Request, res: Response) => {
    this.req = req;
    this.res = res;
    this.email = req?.body.email;
    this.login = req?.body.login;
    this.hashPassword = getEncrypedPassword(req.body.password);
  };

  sendMail = async () => {
    const query = {
      text: "SELECT mail FROM users WHERE email = $1",
      values: [this.email],
    };
    console.log("asdf");
    //if (query) return;
    //^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <"mauricio.rolfson88@ethereal.email">', // sender address
      to: "szefwszechswiata@gmail.com", // list of receivers
      subject: "michau-michau", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
  };

  addUser = async () => {
    const query = {
      text: "INSERT INTO users(login, password) VALUES($1, $2)",
      values: [this.login, this.hashPassword],
    };
    const dbResponse = await pool.query(query);

    this.res.json(dbResponse);
  };
}
