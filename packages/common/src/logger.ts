import { createLogger, format, transports } from "winston";
import { format as dateFormat, parseISO } from "date-fns";
import path from "path";

const colorizer = format.colorize({
  all: true,
  colors: {
    info: "cyan",
    log: "magenta",
    error: "red",
    warn: "yellow",
    debug: "green",
    verbose: "blue",
    silly: "white",
    default: "purple",
    http: "indigo",
    help: "orange",
  },
}).colorize;

const { splat, combine, errors, timestamp, printf, align } = format;

const customFormat = printf(
  (info) =>
    `${colorizer(info.level, "[" + formatTimestamp(info.timestamp as string) + "] - " + info.level)}: ${info.message} ${info.stack ? ", error: " + info.stack : ""} ${info.payload ? ", payload: " + JSON.stringify(info.payload, null, 2) : ""}`,
);

const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS",
    }),

    errors({ stack: true }),
    align(),
    splat(),
    customFormat,
  ),
  defaultMeta: { service: "template" },
  transports: [
    //
    // - Write to all logs and below to `server.log`.
    //
    // - Write all logs error to `error.log`.
    //
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join("logs", "server.log"),
    }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console());
}

export default logger;

function formatTimestamp(timestamp: string): string {
  const date = parseISO(timestamp);
  console.log("Formatted date:", date);
  return dateFormat(date, "yyyy-MM-dd HH:mm:ss.SSS a");
}

// Example usage of the logger
//
// const payload = {
//   name: "John Doe",
//   age: 30,
//   email: "cA5Q8@example.com",
// };
//
// logger.info("Info message", { payload });
// logger.error("Error message", new Error("This is an error"));
// logger.warn("Warning message");
// logger.info("Testing the colorization");
// logger.info("Hello there. How are you?");
//
// logger.info("Logger initialized", { payload });
