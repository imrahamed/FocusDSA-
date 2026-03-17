import { Topic } from "./types";

import { topic01 } from "./topic01";
import { topic02 } from "./topic02";
import { topic03 } from "./topic03";
import { topic04 } from "./topic04";
import { topic05 } from "./topic05";
import { topic06 } from "./topic06";
import { topic07 } from "./topic07";
import { topic08 } from "./topic08";
import { topic09 } from "./topic09";
import { topic10 } from "./topic10";
import { topic11 } from "./topic11";
import { topic12 } from "./topic12";
import { topic13 } from "./topic13";
import { topic14 } from "./topic14";
import { topic15 } from "./topic15";
import { topic16 } from "./topic16";
import { topic17 } from "./topic17";
import { topic18 } from "./topic18";
export const TOPICS: Topic[] = [
  topic01,
  topic02,
  topic03,
  topic04,
  topic05,
  topic06,
  topic07,
  topic08,
  topic09,
  topic10,
  topic11,
  topic12,
  topic13,
  topic14,
  topic15,
  topic16,
  topic17,
  topic18,
];

export const getTopicById = (id: string) => TOPICS.find((t) => t.id === id);
export const getTopicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
