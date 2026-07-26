'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { VizArray, VizPointer } from '@/src/types/visualization';

interface ArrayRendererProps {
  arrays: VizArray[];
  pointers?: VizPointer[];
}

const colorMap = {
  default: 'bg-slate-800 border-slate-700 text-slate-300',
  red: 'bg-red-500/20 border-red-500/50 text-red-300',
  blue: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
  green: 'bg-green-500/20 border-green-500/50 text-green-300',
  yellow: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
  purple: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
  cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
};

const pointerBadgeMap = {
  default: 'text-slate-400 bg-slate-900 border-slate-700',
  red: 'text-red-400 bg-red-950 border-red-800/50',
  blue: 'text-blue-400 bg-blue-950 border-blue-800/50',
  green: 'text-green-400 bg-green-950 border-green-800/50',
  yellow: 'text-yellow-400 bg-yellow-950 border-yellow-800/50',
  purple: 'text-purple-400 bg-purple-950 border-purple-800/50',
  cyan: 'text-cyan-400 bg-cyan-950 border-cyan-800/50',
};

const pointerLineMap = {
  default: 'bg-slate-600',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  cyan: 'bg-cyan-500',
};

export function ArrayRenderer({ arrays, pointers = [] }: ArrayRendererProps) {
  return (
    <div className="flex flex-col gap-16 w-full items-center justify-center py-12 overflow-x-auto min-h-[300px]">
      {arrays.map((arr) => (
        <div key={arr.id} className="flex flex-col gap-4 items-center">
          {arr.label && (
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              {arr.label}
            </h3>
          )}
          <div className="flex gap-2 relative">
            {arr.elements.map((el, index) => {
              const elPointers = pointers.filter(p => p.targetId === el.id);
              const colorClass = colorMap[el.color || 'default'];
              const isHighlighted = el.highlighted;
              
              return (
                <div key={el.id} className="flex flex-col items-center gap-2 relative">
                  
                  {/* Top Pointers */}
                  <div className="h-10 flex flex-col-reverse items-center justify-end absolute -top-12">
                    <AnimatePresence>
                      {elPointers.filter(p => p.position === 'top').map(p => (
                        <motion.div
                          key={p.id}
                          layoutId={`pointer-${p.id}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col items-center"
                        >
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap shadow-xl ${pointerBadgeMap[p.color]}`}>
                            {p.label}
                          </span>
                          <div className={`w-0.5 h-3 ${pointerLineMap[p.color]}`} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Array Box */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHighlighted ? 1.05 : 1,
                      boxShadow: isHighlighted ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 text-lg font-bold shadow-lg transition-colors duration-500 ${colorClass}`}
                  >
                    {el.value}
                  </motion.div>
                  
                  {/* Index */}
                  <span className="text-xs font-semibold text-slate-600 mt-1">{index}</span>

                  {/* Bottom Pointers */}
                  <div className="h-10 flex flex-col items-center justify-start absolute -bottom-14">
                    <AnimatePresence>
                      {elPointers.filter(p => p.position === 'bottom').map(p => (
                        <motion.div
                          key={p.id}
                          layoutId={`pointer-${p.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex flex-col items-center"
                        >
                          <div className={`w-0.5 h-3 ${pointerLineMap[p.color]}`} />
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap shadow-xl ${pointerBadgeMap[p.color]}`}>
                            {p.label}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
