import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";
// import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({ client });
