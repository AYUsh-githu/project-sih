import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'agent-robot-avatar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          size?: string | number;
          color?: string;
          'head-roundness'?: string | number;
          'auto-sleep'?: string | number;
          ref?: any;
        },
        HTMLElement
      >;
    }
  }
}

declare module '@/lib/avatar/avatar-motions.js' {
  export function installAvatarMotions(el: HTMLElement, opts?: any): any;
  export const EXTRA_ACTIONS: string[];
}

declare module '@/lib/avatar/haven-lab.js' {
  export const HAVEN_MOTIONS: any;
}

declare module '@/lib/avatar/agent-robot-avatar/agent-robot-avatar.js';

export {};
