import { motion } from "framer-motion";
import { Clock, Lightbulb, Zap, Download } from "lucide-react";
import type { Topic } from "../../data/topicsData";
import VisualizationPlayer from "../VisualizationPlayer";

interface LearnTabProps {
  topic: Topic;
  downloadCheatSheet: () => void;
}

export default function LearnTab({ topic, downloadCheatSheet }: LearnTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 mt-6"
    >
      {/* ── ADVANCED LEARNING HEADER (Inspired by reference image) ── */}
      <div className="glass rounded-xl p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `linear-gradient(135deg, ${topic.color}, transparent)` }} />
        <h2 className="text-2xl font-display font-bold text-white mb-4 text-center relative z-10">
          {topic.title}
        </h2>

        {topic.usage && (
          <div className="mb-4 relative z-10 bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="font-bold text-lg text-amber-200 block mb-1">Use cases</span>
            <span className="text-slate-300 text-base">{topic.usage}</span>
          </div>
        )}

        {topic.dsInvolved && (
          <div className="mb-6 relative z-10 bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="font-bold text-lg text-ocean-200 block mb-1">
              Data Structures Involved
            </span>
            <span className="text-slate-300 text-base">{topic.dsInvolved}</span>
          </div>
        )}

        {topic.sampleProblems && topic.sampleProblems.length > 0 && (
          <div className="relative z-10">
            <span className="font-bold text-lg text-jade-200 block mb-2">
              Classic Problems to Solve:
            </span>
            <div className="flex flex-wrap gap-2">
              {topic.sampleProblems.map((problem, i) => (
                <span key={i} className="px-3 py-1 bg-jade-500/10 border border-jade-500/20 text-jade-300 rounded-full text-sm">
                  {problem}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── EXISTING SECTIONS ── */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🧠</span>
          <h3 className="font-display font-bold text-white">
            Layman's Explanation
          </h3>
        </div>
        <div className="bg-ocean-500/10 border border-ocean-500/20 rounded-lg p-4 mb-6 relative">
          <div className="absolute -left-1 top-4 bottom-4 w-1 bg-ocean-500 rounded-r" />
          <p className="text-ocean-100 leading-relaxed text-lg font-medium">{topic.layman}</p>
        </div>
        {topic.visualizationType && (
          <div className="mb-4">
             <h4 className="font-display font-semibold text-white mb-3 text-sm tracking-wider uppercase opacity-70">Interactive Visualization</h4>
             <VisualizationPlayer topic={topic} />
          </div>
        )}
      </div>

      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚙️</span>
          <h3 className="font-display font-bold text-white">
            Technical Deep Dive
          </h3>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4 text-lg">
          {topic.technical}
        </p>
        <div className="space-y-3">
          {topic.keyInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 text-base">
              <span className="text-ocean-400 mt-1 flex-shrink-0 text-lg">
                ▸
              </span>
              <span className="text-slate-300 leading-relaxed">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complexity Table */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-amber-400" />
          <h3 className="font-display font-bold text-white">
            Time & Space Complexity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                {["Operation", "Best", "Average", "Worst", "Space"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 pr-4 font-semibold text-sm uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topic.timeComplexities.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4 text-white font-medium">
                    {row.operation}
                  </td>
                  <td className="py-3 pr-4 text-jade-400 font-mono text-sm">
                    {row.best}
                  </td>
                  <td className="py-3 pr-4 text-amber-400 font-mono text-sm">
                    {row.avg}
                  </td>
                  <td className="py-3 pr-4 text-rose-400 font-mono text-sm">
                    {row.worst}
                  </td>
                  <td className="py-3 pr-4 text-violet-400 font-mono text-sm">
                    {row.space}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5 border border-amber-500/15">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-amber-400" />
            <h3 className="font-display font-semibold text-white text-base">
              Pro Tips
            </h3>
          </div>
          <ul className="space-y-3">
            {topic.proTips.map((tip, i) => (
              <li
                key={i}
                className="text-base text-slate-300 flex items-start gap-2"
              >
                <span className="text-amber-400 flex-shrink-0 mt-0.5">✦</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-xl p-5 border border-ocean-500/15">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-ocean-400" />
            <h3 className="font-display font-semibold text-white text-base">
              FAANG Insights
            </h3>
          </div>
          <ul className="space-y-4">
            {topic.faangQuotes.map((q, i) => (
              <li
                key={i}
                className="text-base text-slate-300 italic border-l-2 border-ocean-500/30 pl-4"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={downloadCheatSheet}
        className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-base text-slate-300 hover:text-white transition-colors border border-white/5"
      >
        <Download size={16} />
        Download Cheat Sheet (.md)
      </button>

      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔗</span>
          <h3 className="font-display font-bold text-white">Useful Links</h3>
        </div>
        {topic.usefulLinks && topic.usefulLinks.length > 0 ? (
          <ul className="space-y-3">
            {topic.usefulLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={(link as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-400 hover:text-ocean-300 underline text-base"
                >
                  {(link as any).title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 text-base">
            No links available for this topic.
          </p>
        )}
      </div>
    </motion.div>
  );
}
