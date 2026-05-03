import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import path from "path";
import dayjs from "dayjs";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logDir = path.resolve(process.cwd(), "logs");

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = dayjs();
    const date = startTime.format("YYYY-MM-DD");
    const filePath = path.join(this.logDir, `${date}.txt`);
    const traceId = `${startTime.valueOf()}-${Math.random().toString(16).slice(2)}`;

    const requestLog = [
      `<----- request start`,
      `traceId: ${traceId}`,
      `${startTime.format("YYYY-MM-DD HH:mm:ss")} - ${req.method} ${req.originalUrl ?? req.url}`,
      `req headers: ${JSON.stringify(req.headers)}`,
      `req params: ${JSON.stringify(req.params)}`,
      `req query: ${JSON.stringify(req.query)}`,
      `req body: ${JSON.stringify(req.body)}`,
      `<----- request end`,
    ].join("\n");

    fs.mkdir(this.logDir, { recursive: true })
      .then(() => fs.appendFile(filePath, `${requestLog}\n`, "utf8"))
      .catch((error) => console.error("写入请求日志失败：", error));

    res.on("finish", () => {
      const endTime = dayjs();
      const responseLog = [
        `<----- response start`,
        `traceId: ${traceId}`,
        `res status: ${res.statusCode}`,
        `duration: ${endTime.diff(startTime, "ms")}ms`,
        `<----- response end`,
        "",
      ].join("\n");

      fs.mkdir(this.logDir, { recursive: true })
        .then(() => fs.appendFile(filePath, `${responseLog}\n`, "utf8"))
        .catch((error) => console.error("写入响应日志失败：", error));
    });

    next();
  }
}
