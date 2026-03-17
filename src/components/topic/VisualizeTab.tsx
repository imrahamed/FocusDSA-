import { motion } from "framer-motion";
import type { Topic } from "../../data/topicsData";
import VisualizationPlayer from "../VisualizationPlayer";

interface VisualizeTabProps {
  topic: Topic;
}

export default function VisualizeTab({ topic }: VisualizeTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6"
    >
      <VisualizationPlayer topic={topic} />
    </motion.div>
  );
}
