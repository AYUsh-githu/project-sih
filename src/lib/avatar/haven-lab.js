export const GROUPS = [
  {
    id: 'presence',
    title: 'Presence',
    scenes: [
      {
        action: 'present',
        label: 'Arrive',
        when: 'Session opens, or the victim returns to Talk / Home.',
      },
      {
        action: 'wake',
        label: 'Wake',
        when: 'They tap Haven after a long idle, or start speaking again.',
      },
      {
        action: 'sleep',
        label: 'Rest',
        when: 'No activity for a while, or they leave Talk. Keep this gentle.',
      },
      {
        action: 'idle',
        label: 'Idle',
        when: 'Default face while they read, journal, or sit with the page.',
      },
      {
        action: 'peek',
        label: 'Glance',
        when: 'Soft ambient life. Do not loop this during a crisis.',
      },
      {
        action: 'bored',
        label: 'Wait nearby',
        when: 'They are on Home or Resources and not talking.',
      },
    ],
  },
  {
    id: 'talk',
    title: 'Talk and listen',
    scenes: [
      {
        action: 'listen',
        label: 'Listening',
        when: 'Victim is speaking, dictating, or typing a longer message.',
      },
      {
        action: 'input',
        label: 'They are typing',
        when: 'Text box is focused and characters are arriving.',
      },
      {
        action: 'send',
        label: 'Heard you',
        when: 'Message submitted, or a short yes / acknowledgement.',
      },
      {
        action: 'thinking',
        label: 'Thinking',
        when: 'Model is scoring, translating, or composing a reply.',
      },
      {
        action: 'waiting',
        label: 'Still working',
        when: 'Longer wait: evidence bundle, case lookup, or NHAA context.',
      },
      {
        action: 'speak',
        label: 'Haven is speaking',
        when: 'Speech-to-speech playback or streaming a spoken reply.',
      },
      {
        action: 'calm',
        label: 'Settle',
        when: 'After distress, grounding, or “stay with me” guidance.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support tasks',
    scenes: [
      {
        action: 'inspect',
        label: 'Reviewing',
        when: 'Check-in, questionnaire, or case timeline is being read.',
      },
      {
        action: 'success',
        label: 'Done',
        when: 'Journal saved, counselling booked, check-in finished.',
      },
      {
        action: 'failure',
        label: 'Could not complete',
        when: 'A victim task failed (booking, upload) but the person is safe.',
      },
      {
        action: 'decline',
        label: 'Cannot do that',
        when: 'Policy block: share with authority, close a case, or skip consent.',
      },
      {
        action: 'tilt',
        label: 'Offer a next step',
        when: 'Haven suggests resources, peer support, or a counsellor.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety signals',
    scenes: [
      {
        action: 'concern',
        label: 'Concern',
        when: 'Rising distress, C2/C3, or a follow-up question is needed.',
      },
      {
        action: 'warning',
        label: 'Needs a person',
        when: 'C1 priority review: route to a counsellor, not an alarm face.',
      },
      {
        action: 'crisis',
        label: 'Immediate danger',
        when: 'C0 / A0. Stay present. Pair with urgent-help UI, not playfulness.',
      },
      {
        action: 'angry',
        label: 'Blocked for safety',
        when: 'Only if content or a request is refused for protection policy.',
      },
    ],
  },
  {
    id: 'system',
    title: 'System',
    scenes: [
      {
        action: 'error',
        label: 'Connection problem',
        when: 'API, speech, or NHAA connector is down. Be honest, then retry.',
      },
      {
        action: 'surprise',
        label: 'New information',
        when: 'Unexpected case update or a counsellor joining. Use sparingly.',
      },
      {
        action: 'hop',
        label: 'Hop',
        when: 'Demo only. Too lively for a distressed victim session.',
      },
      {
        action: 'wiggle',
        label: 'Wiggle',
        when: 'Demo only. Keep off the victim path.',
      },
    ],
  },
];

export const JOURNEYS = [
  {
    id: 'check-in',
    label: 'Daily check-in',
    steps: [
      ['present', 900],
      ['listen', 1400],
      ['input', 1200],
      ['send', 900],
      ['thinking', 2200],
      ['speak', 1800],
      ['success', 1200],
      ['idle', 400],
    ],
  },
  {
    id: 'distress',
    label: 'Rising distress',
    steps: [
      ['listen', 1600],
      ['concern', 2000],
      ['calm', 1800],
      ['tilt', 1000],
      ['idle', 400],
    ],
  },
  {
    id: 'urgent',
    label: 'Immediate danger path',
    steps: [
      ['listen', 1000],
      ['crisis', 2800],
      ['idle', 400],
    ],
  },
];
