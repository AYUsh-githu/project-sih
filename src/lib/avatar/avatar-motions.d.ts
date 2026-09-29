export type TaskCategoryKey =
  | 'presence'
  | 'listen'
  | 'input'
  | 'send'
  | 'thinking'
  | 'speak'
  | 'calm'
  | 'inspect'
  | 'success'
  | 'failure'
  | 'decline'
  | 'concern'
  | 'crisis'
  | 'sleep'
  | 'ambient';

export interface MotionVariant {
  action: string;
  label: string;
  when: string;
}

export interface TaskCategoryInfo {
  id: string;
  name: string;
  description: string;
  variants: MotionVariant[];
}

export interface MotionOptions {
  liveIdle?: boolean;
  playful?: boolean;
  onMotionChange?: (action: string) => void;
}

export interface MotionHandle {
  setLiveIdle: (active: boolean) => void;
  play: (action: string) => void;
  playRandom: (categoryId?: string) => any;
  TASK_CATEGORIES?: Record<string, TaskCategoryInfo>;
  EXTRA_ACTIONS?: Record<string, Function>;
}

export function installAvatarMotions(
  avatarEl: HTMLElement,
  options?: MotionOptions
): MotionHandle;

export const TASK_CATEGORIES: Record<string, TaskCategoryInfo>;
export const EXTRA_ACTIONS: Record<string, Function>;
