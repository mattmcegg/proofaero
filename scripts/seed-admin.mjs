import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadEnv() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    console.error("Missing .env.local with MONGO_URL");
    process.exit(1);
  }
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

loadEnv();

const uri = process.env.MONGO_URL;
if (!uri) {
  console.error("MONGO_URL not set");
  process.exit(1);
}

const username = (process.argv[2] || "admin").toLowerCase();
const password = process.argv[3] || "admin123";

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db();

  const existing = await db.collection("users").findOne({ username });
  if (existing) {
    console.log(`User "${username}" already exists.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.collection("users").insertOne({
    _id: new ObjectId(),
    username,
    passwordHash,
    role: "admin",
    name: "ProofAero Admin",
    createdAt: new Date(),
  });

  console.log(`Created admin user: ${username}`);
  console.log("Change the password after first login.");
} finally {
  await client.close();
}
