import React from 'react';
import { BaseBlock } from '../../types';
import { HeadingBlockComponent, ParagraphBlockComponent, CalloutBlockComponent } from '../blocks/BasicBlocks';
import { InteractiveQuizBlockComponent, ChecklistBlockComponent, AccordionBlockComponent, CodeBlockComponent } from '../blocks/InteractiveBlocks';
import { GenericBlockComponent } from '../blocks/GenericBlock';

export const BLOCK_COMPONENTS: Record<string, React.FC<{ block: any }>> = {
  heading: HeadingBlockComponent,
  paragraph: ParagraphBlockComponent,
  callout: CalloutBlockComponent,
  warning: (props) => <CalloutBlockComponent block={{ ...props.block, content: { ...props.block.content, variant: 'warning' } }} />,
  info: (props) => <CalloutBlockComponent block={{ ...props.block, content: { ...props.block.content, variant: 'info' } }} />,
  interactive_quiz: InteractiveQuizBlockComponent,
  checklist: ChecklistBlockComponent,
  accordion: AccordionBlockComponent,
  code: CodeBlockComponent,
  // other blocks will be mapped here as they are built, falling back to GenericBlockComponent
};

export function getBlockComponent(type: string): React.FC<{ block: any }> {
  return BLOCK_COMPONENTS[type] || GenericBlockComponent;
}
