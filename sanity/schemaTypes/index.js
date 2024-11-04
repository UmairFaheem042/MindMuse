// import { author } from "./author";
import { author } from "@/sanity/schemaTypes/author";
import { startup } from "./startup";
import { playlist } from "./playlist";

export const schema = {
  types: [author, startup, playlist],
};
