import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

function getUri() {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error("MONGO_URL is not set");
  return uri;
}

function getClient() {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(getUri());
  }
  return global._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = getClient();
  await client.connect();
  return client.db();
}
