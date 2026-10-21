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
export default class RegisterController extends BaseController {
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

    const info = await transporter.sendMail({
      from: "me",
      to: "szefwszechswiata@gmail.com",
      subject: "michau-michau",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
  };

  addUser = async () => {
    const query = {
      text: "INSERT INTO users(email, password) VALUES($1, $2)",
      values: [this.email, this.hashPassword],
    };
    const dbResponse = await pool.query(query);

    this.res.json(dbResponse);
  };
}
