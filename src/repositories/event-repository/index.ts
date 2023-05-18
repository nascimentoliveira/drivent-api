import { prisma } from "@/config";
//import { redis } from "@/config";
//import { Event } from "@prisma/client";

//const cacheKey = "event";
//const EXPIRATION = 60*60;

async function findFirst() {
  //const data: Event = JSON.parse(await redis.get(cacheKey));
  //if (data != null) {
  //  return data;
  //}
  const freshData = await prisma.event.findFirst();
  // redis.setEx(cacheKey, EXPIRATION, JSON.stringify(freshData)); */
  return freshData;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
