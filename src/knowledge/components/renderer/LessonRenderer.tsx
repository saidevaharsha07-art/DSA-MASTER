'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lesson, BaseBlock } from '../../types';
import { getBlockComponent } from './registry';

interface LessonRendererProps {
  lesson: Lesson;
}

export function LessonRenderer({ lesson }: LessonRendererProps) {
  // Sort blocks by order
  const sortedBlocks = [...lesson.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {sortedBlocks.map((block, index) => {
        const BlockComponent = getBlockComponent(block.type);
        
        // Handle animations
        const animationType = block.animations?.entrance || 'fade';
        const delay = block.animations?.delay || index * 0.05;
        
        const variants = {
          fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
          'slide-up': { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
          'slide-right': { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
          zoom: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
        };

        return (
          <motion.div
            key={block.id}
            initial={variants[animationType].initial}
            whileInView={variants[animationType].animate}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="w-full"
          >
            <BlockComponent block={block} />
          </motion.div>
        );
      })}
    </div>
  );
}
