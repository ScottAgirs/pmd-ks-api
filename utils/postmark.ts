import "dotenv/config";

var postmark = require("postmark");

if (!process.env.POSTMARK_KEY) {
  throw new Error("POSTMARK_KEY is missing from environment.");
}

var emailClient = new postmark.ServerClient(process.env.POSTMARK_KEY);

export { emailClient };
