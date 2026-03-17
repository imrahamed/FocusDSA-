import { motion } from "framer-motion";
import type { Topic } from "../../data/topicsData";
import QuizChallenge from "../QuizChallenge";

interface QuizTabProps {
  topic: Topic;
}

export default function QuizTab({ topic }: QuizTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6"
    >
      <QuizChallenge topic={topic} />
    </motion.div>
  );
}
