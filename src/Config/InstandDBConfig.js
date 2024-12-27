import { i, init } from "@instantdb/react";


const APP_ID = "fb00d179-df08-4f37-8491-4c4c214e5aea";

const schema = i.schema({
  entities: {
    users: i.entity({
      name:i.string(),
      number:i.number(),
      password:i.string(),
      createdAt: i.number(), 
    }),

    chats: i.entity({ 
      sender: i.string(),
      receiver: i.string(),
      message: i.string(),
      done: i.boolean(), 
      createdAt: i.number(), 
    }),
  },
});

const db = init({ appId: APP_ID, schema });

export default db;