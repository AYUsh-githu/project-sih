/**
 * Haven Companion — Trauma-Informed Agent Avatar Motions & Creative Task Engine
 * Smart India Hackathon 2026 (Problem Statement 26094, Team Esoteric)
 * Provides 2-3 randomized creative motion variants per survivor task category,
 * backed by trauma-informed somatic and cognitive behavioral justification.
 */

// Helper: safe head finish
async function finishHead(instance, token) {
  if (token !== instance._transitionToken) return false;
  if (instance._headMotion) instance._headMotion.style.transform = '';
  instance._releaseExpressionLock?.();
  return true;
}

// -------------------------------------------------------------
// 1. PRESENCE & ARRIVAL VARIANTS
// -------------------------------------------------------------

// Variant A: Warm Greeting Lift (Gentle head lift, slight courteous tilt)
export async function playPresent() {
  this.noteActivity();
  if (this._sleeping || this._state === 'sleep') await this.play('wake');
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg)' },
    { transform: 'translateY(-10px) rotate(-8deg)', offset: 0.4 },
    { transform: 'translateY(-4px) rotate(-8deg)', offset: 0.7 },
    { transform: 'translateY(0px) rotate(0deg)' },
  ], 950);
  await this._wait(980);
  await finishHead(this, token);
}

// Variant B: Warm Welcoming Greet (Courteous 8° tilt, antenna double-pulse, calm forward affirmation)
export async function playGreetWave() {
  this.noteActivity();
  if (this._sleeping || this._state === 'sleep') await this.play('wake');
  this.setAntennaFlash?.(true);
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg)' },
    { transform: 'translateY(-6px) rotate(8deg)', offset: 0.35 },
    { transform: 'translateY(3px) rotate(4deg)', offset: 0.7 },
    { transform: 'translateY(0px) rotate(0deg)' },
  ], 900);
  await this._wait(920);
  await finishHead(this, token);
}

// Variant C: Gentle Arrive (Slow uncurl from sleep, gentle breath expansion, settling)
export async function playArriveGentle() {
  this.noteActivity();
  if (this._sleeping || this._state === 'sleep') await this.play('wake');
  if (!(await this._prepareExpression({ normalizePose: true, duration: 140, pause: 60 }))) return;
  const token = this._transitionToken;
  this.setState?.('sleepy', { duration: 320, keepGazeLock: true });
  this._animateHead([
    { transform: 'scale(0.96) translateY(4px)' },
    { transform: 'scale(1.03) translateY(-4px)', offset: 0.55 },
    { transform: 'scale(1) translateY(0px)' },
  ], 1200);
  await this._wait(1220);
  if (token !== this._transitionToken) return;
  await this._returnToIdle?.(380);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 2. ACTIVE LISTENING VARIANTS
// -------------------------------------------------------------

// Variant A: Classic Attentive Tilt (-9° head cock)
export async function playListen() {
  this.noteActivity();
  this._speaking = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 120, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg) translateY(0px)' },
    { transform: 'rotate(-9deg) translateY(2px)' },
  ], 480);
  await this._wait(500);
  if (token !== this._transitionToken) return;
  this._releaseExpressionLock?.();
}

// Variant B: Attentive Micro-Nods (7° tilt with small affirmative dips)
export async function playListenAttentive() {
  this.noteActivity();
  this._speaking = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg) translateY(0px)' },
    { transform: 'rotate(7deg) translateY(2px)', offset: 0.25 },
    { transform: 'rotate(7deg) translateY(5px)', offset: 0.5 },
    { transform: 'rotate(7deg) translateY(2px)', offset: 0.72 },
    { transform: 'rotate(7deg) translateY(5px)', offset: 0.9 },
    { transform: 'rotate(7deg) translateY(2px)' },
  ], 1250);
  await this._wait(1280);
  if (token !== this._transitionToken) return;
  this._releaseExpressionLock?.();
}

// Variant C: Soothe Sway (Gentle compassionate sway -4° to +4° validating testimony)
export async function playListenSoothe() {
  this.noteActivity();
  this._speaking = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 140, pause: 50 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-5deg)', offset: 0.3 },
    { transform: 'rotate(4deg)', offset: 0.7 },
    { transform: 'rotate(0deg)' },
  ], 1500);
  await this._wait(1520);
  if (token !== this._transitionToken) return;
  this._releaseExpressionLock?.();
}

// -------------------------------------------------------------
// 3. INPUT & TYPING COMPOSITION VARIANTS
// -------------------------------------------------------------

// Variant A: Focused Slit Eye Keystroke Tracker (Fast slit eye morph, direct downward gaze)
export async function playInput() {
  this.noteActivity();
  this._speaking = false;
  this._inputWanted = true;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 20 }))) return;
  const token = this._transitionToken;
  this.setState?.('input', { duration: 160, keepGazeLock: true });
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(4px) scale(1.02, 0.98)', offset: 0.5 },
    { transform: 'translateY(2px) scale(1)' },
  ], 500);
  if (this._look) {
    this._look.x = 0;
    this._look.y = 18; // Focus directly down on input bar
  }
}

// Variant B: Inquisitive Reading Follower (8°-10° curious head-cock, antenna pulse, left-to-right scanning)
export async function playInputCurious() {
  this.noteActivity();
  this._speaking = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 20 }))) return;
  const token = this._transitionToken;
  this._inputWanted = true;
  this.setAntennaFlash?.(true);

  // 1. Enter input slit pose
  this.setState?.('input', { duration: 180, keepGazeLock: true });

  // 2. Animate head: curious inquisitive 9° head tilt and forward lean
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg) scale(1)' },
    { transform: 'translateY(6px) rotate(9deg) scale(1.03)', offset: 0.25 },
    { transform: 'translateY(4px) rotate(7deg) scale(1.02)', offset: 0.5 },
    { transform: 'translateY(8px) rotate(10deg) scale(1.03)', offset: 0.75 },
    { transform: 'translateY(5px) rotate(8deg) scale(1.02)' },
  ], 1350);

  // 3. Scan gaze downward left-to-right (reading sentence as words arrive)
  if (this._look) {
    this._look.y = 18;
    this._look.x = -18;
  }
  await this._wait(420);
  if (token !== this._transitionToken) return;

  if (this._look) this._look.x = 0;
  await this._wait(420);
  if (token !== this._transitionToken) return;

  if (this._look) this._look.x = 18;
  await this._wait(450);
  if (token !== this._transitionToken) return;

  // Re-center head smoothly
  this._animateHead([
    { transform: 'translateY(5px) rotate(8deg) scale(1.02)' },
    { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  ], 550);
  await this._wait(580);
  await finishHead(this, token);
}

// Variant C: Typewriter Stenographer Rhythm (Active rhythmic keystroke micro-dips, typewriter carriage stepping, and antenna transcription pulse)
export async function playInputCadence() {
  this.noteActivity();
  this._speaking = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 20 }))) return;
  const token = this._transitionToken;
  this._inputWanted = true;
  this.setAntennaFlash?.(true);

  // 1. Enter focused input slit pose
  this.setState?.('input', { duration: 160, keepGazeLock: true });

  // 2. Direct eye gaze straight down to input keys
  if (this._look) {
    this._look.x = -8;
    this._look.y = 20;
  }

  // 3. Staccato Typewriter Keystroke Cadence (rapid micro-dips mimicking fingers typing on keys and carriage shifting)
  this._animateHead([
    { transform: 'translate(0px, 0px) rotate(0deg)' },
    // Keystroke 1 & 2
    { transform: 'translate(-4px, 6px) rotate(-3deg)', offset: 0.15 },
    { transform: 'translate(-2px, 8.5px) rotate(-2deg)', offset: 0.28 },
    { transform: 'translate(0px, 5px) rotate(0deg)', offset: 0.4 },
    // Keystroke 3 & 4 (stepping across carriage)
    { transform: 'translate(3px, 8.5px) rotate(2deg)', offset: 0.55 },
    { transform: 'translate(5px, 6px) rotate(3deg)', offset: 0.7 },
    { transform: 'translate(6px, 9px) rotate(2deg)', offset: 0.85 },
    // Carriage return settling
    { transform: 'translate(0px, 4px) rotate(0deg)' },
  ], 1400);

  // Synchronized eye stepping across the line
  await this._wait(350);
  if (token !== this._transitionToken) return;
  if (this._look) this._look.x = 2;

  await this._wait(400);
  if (token !== this._transitionToken) return;
  if (this._look) this._look.x = 14;

  await this._wait(450);
  if (token !== this._transitionToken) return;
  if (this._look) this._look.x = 0;

  await this._wait(250);
  if (token !== this._transitionToken) return;
  await finishHead(this, token);
}

export const playInputPatient = playInputCadence;

// -------------------------------------------------------------
// 4. MESSAGE SENT & ACKNOWLEDGED VARIANTS
// -------------------------------------------------------------

// Variant A: Classic Crisp Double Nod
export function playSend() {
  this.noteActivity();
  return this.play?.('send');
}

// Variant B: Reassuring Affirmation Nod (Smooth affirmative forward dip + warm antenna confirmation pulse)
export async function playSendAffirm() {
  this.noteActivity();
  this.setAntennaFlash?.(true);
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 20 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(6px)', offset: 0.35 },
    { transform: 'translateY(-2px)', offset: 0.7 },
    { transform: 'translateY(0px)' },
  ], 680);
  await this._wait(700);
  await finishHead(this, token);
}

// Variant C: Shield Lock Dip (Decisive forward dip & reassuring solid lock)
export async function playSendSecure() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 70, pause: 20 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(6px) scale(1.04, 0.96)', offset: 0.4 },
    { transform: 'translateY(6px) scale(1.04, 0.96)', offset: 0.75 },
    { transform: 'translateY(0px) scale(1)' },
  ], 850);
  await this._wait(880);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 5. THINKING & STATUTORY INFERENCE VARIANTS
// -------------------------------------------------------------

// Variant A: Wrap Eye Scan
export function playThinking() {
  this._speaking = false;
  return this.startWaiting?.({ variant: 'wrap' });
}

// Variant B: Pondering Upward Gaze & Orbit (Thoughtful deliberation)
export async function playThinkingPonder() {
  this._speaking = false;
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translate(0px, 0px) rotate(0deg)' },
    { transform: 'translate(4px, -6px) rotate(6deg)', offset: 0.35 },
    { transform: 'translate(-4px, -8px) rotate(-5deg)', offset: 0.7 },
    { transform: 'translate(0px, 0px) rotate(0deg)' },
  ], 1600);
  this.startWaiting?.({ variant: 'wrap' });
  await this._wait(1620);
  if (token !== this._transitionToken) return;
  finishHead(this, token);
}

// Variant C: Antenna Metronome Pulse (Steady reassuring clockwork)
export async function playThinkingPulse() {
  this._speaking = false;
  this.noteActivity();
  this.setAntennaFlash?.(true);
  if (!(await this._prepareExpression({ normalizePose: true, duration: 100, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'scale(1)' },
    { transform: 'scale(1.03)', offset: 0.3 },
    { transform: 'scale(0.98)', offset: 0.65 },
    { transform: 'scale(1)' },
  ], 1400);
  await this._wait(1420);
  if (token !== this._transitionToken) return;
  finishHead(this, token);
}

// -------------------------------------------------------------
// 6. SPEAKING & SPOKEN CADENCE VARIANTS
// -------------------------------------------------------------

// Variant A: Classic Natural Cadence Bob
export async function playSpeak() {
  this.noteActivity();
  this._speaking = true;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 20 }))) return;
  const token = this._transitionToken;
  this._releaseExpressionLock?.();
  while (this._speaking && token === this._transitionToken) {
    this._animateHead([
      { transform: 'translateY(0px) scale(1, 1)' },
      { transform: 'translateY(3px) scale(1.02, 0.98)', offset: 0.45 },
      { transform: 'translateY(0px) scale(1, 1)' },
    ], 520);
    await this._wait(520);
  }
  if (token === this._transitionToken && this._headMotion) {
    this._headMotion.style.transform = '';
  }
}

// Variant B: Expressive Articulation with Subtle Sway
export async function playSpeakExpressive() {
  this.noteActivity();
  this._speaking = true;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 20 }))) return;
  const token = this._transitionToken;
  this._releaseExpressionLock?.();
  while (this._speaking && token === this._transitionToken) {
    this._animateHead([
      { transform: 'translateY(0px) rotate(0deg)' },
      { transform: 'translateY(3px) rotate(-3deg)', offset: 0.3 },
      { transform: 'translateY(-2px) rotate(3deg)', offset: 0.7 },
      { transform: 'translateY(0px) rotate(0deg)' },
    ], 680);
    await this._wait(680);
  }
  if (token === this._transitionToken && this._headMotion) {
    this._headMotion.style.transform = '';
  }
}

// Variant C: Slow Reassuring Speech (Calm, grounding delivery)
export async function playSpeakReassure() {
  this.noteActivity();
  this._speaking = true;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 30 }))) return;
  const token = this._transitionToken;
  this._releaseExpressionLock?.();
  while (this._speaking && token === this._transitionToken) {
    this._animateHead([
      { transform: 'translateY(0px) scale(1)' },
      { transform: 'translateY(2px) scale(1.01, 0.99)', offset: 0.5 },
      { transform: 'translateY(0px) scale(1)' },
    ], 780);
    await this._wait(780);
  }
  if (token === this._transitionToken && this._headMotion) {
    this._headMotion.style.transform = '';
  }
}

// -------------------------------------------------------------
// 7. CALMING & TRAUMA GROUNDING VARIANTS
// -------------------------------------------------------------

// Variant A: Somatic Deep Breath Inhale/Exhale Pulse
export async function playCalm() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 160, pause: 80 }))) return;
  const token = this._transitionToken;
  this.setState?.('sleepy', { duration: 420, keepGazeLock: true });
  this._animateHead([
    { transform: 'scale(1)' },
    { transform: 'scale(1.04, 0.96)', offset: 0.4 },
    { transform: 'scale(0.97, 1.02)', offset: 0.75 },
    { transform: 'scale(1)' },
  ], 2000);
  await this._wait(2050);
  if (token !== this._transitionToken) return;
  await this._returnToIdle?.(400);
  await finishHead(this, token);
}

// Variant B: Centering Grounding Rest (Soft head bow, peaceful pause)
export async function playCalmGround() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 180, pause: 80 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(6px) scale(1.02, 0.98)', offset: 0.4 },
    { transform: 'translateY(6px) scale(1.02, 0.98)', offset: 0.75 },
    { transform: 'translateY(0px) scale(1)' },
  ], 2200);
  await this._wait(2250);
  if (token !== this._transitionToken) return;
  await this._returnToIdle?.(420);
  await finishHead(this, token);
}

// Variant C: Gentle Cradling Rocking (Side-to-side soothing comfort)
export async function playCalmWarmth() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 150, pause: 60 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-6deg)', offset: 0.3 },
    { transform: 'rotate(6deg)', offset: 0.7 },
    { transform: 'rotate(0deg)' },
  ], 2400);
  await this._wait(2450);
  if (token !== this._transitionToken) return;
  await this._returnToIdle?.(360);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 8. STATUTORY & CASE REVIEW VARIANTS
// -------------------------------------------------------------

// Variant A: Classic Inspect
export function playInspect() {
  this.noteActivity();
  return this.play?.('inspect');
}

// Variant B: Inquisitive Head Cock & Scan (14° angle review)
export async function playInspectCurious() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg) translateY(0px)' },
    { transform: 'rotate(14deg) translateY(-3px)', offset: 0.35 },
    { transform: 'rotate(14deg) translateY(2px)', offset: 0.75 },
    { transform: 'rotate(0deg) translateY(0px)' },
  ], 1350);
  await this._wait(1380);
  await finishHead(this, token);
}

// Variant C: Analytical Verification (Cross-referencing legal check)
export async function playInspectVerify() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translate(0px, 0px) rotate(0deg)' },
    { transform: 'translate(-5px, 3px) rotate(-5deg)', offset: 0.25 },
    { transform: 'translate(5px, -3px) rotate(5deg)', offset: 0.6 },
    { transform: 'translate(0px, 4px) rotate(0deg)', offset: 0.85 },
    { transform: 'translate(0px, 0px) rotate(0deg)' },
  ], 1400);
  await this._wait(1430);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 9. TASK SUCCESS & MILESTONE VARIANTS
// -------------------------------------------------------------

// Variant A: Standard Success
export function playSuccess() {
  this.noteActivity();
  return this.play?.('success');
}

// Variant B: Double Celebratory Hop & Antenna Burst
export async function playSuccessCheer() {
  this.noteActivity();
  this.setAntennaFlash?.(true);
  if (!(await this._prepareExpression({ normalizePose: true, duration: 70, pause: 20 }))) return;
  const token = this._transitionToken;
  this.setState?.('happy', { duration: 300, keepGazeLock: true });
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(-14px) scale(0.95, 1.06)', offset: 0.3 },
    { transform: 'translateY(2px) scale(1.04, 0.96)', offset: 0.55 },
    { transform: 'translateY(-8px) scale(0.97, 1.03)', offset: 0.8 },
    { transform: 'translateY(0px) scale(1)' },
  ], 950);
  await this._wait(980);
  await this._returnToIdle?.(340);
  await finishHead(this, token);
}

// Variant C: Dignified Empowering Bow of Respect
export async function playSuccessPeace() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 110, pause: 50 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(6px) scale(1.03, 0.97)', offset: 0.45 },
    { transform: 'translateY(0px) scale(1)' },
  ], 1200);
  await this._wait(1240);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 10. NON-CRITICAL ISSUE & GENTLE RETRY VARIANTS
// -------------------------------------------------------------

// Variant A: Standard Failure
export function playFailure() {
  this.noteActivity();
  return this.play?.('failure');
}

// Variant B: Encouraging Resilience Nod ("We will do this together")
export async function playRetryEncourage() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg)' },
    { transform: 'translateY(4px) rotate(-6deg)', offset: 0.3 },
    { transform: 'translateY(-8px) rotate(4deg)', offset: 0.65 },
    { transform: 'translateY(0px) rotate(0deg)' },
  ], 1100);
  await this._wait(1130);
  await finishHead(this, token);
}

// Variant C: Puzzled Charm Tilt (Softens technical glitch)
export async function playRetryPuzzled() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-13deg)', offset: 0.35 },
    { transform: 'rotate(4deg)', offset: 0.7 },
    { transform: 'rotate(0deg)' },
  ], 1000);
  await this._wait(1030);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 11. POLICY BOUNDARY & PROTECTION REFUSAL VARIANTS
// -------------------------------------------------------------

// Variant A: Respectful Horizontal Head Shake
export async function playDecline() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-10deg)', offset: 0.18 },
    { transform: 'rotate(10deg)', offset: 0.42 },
    { transform: 'rotate(-7deg)', offset: 0.64 },
    { transform: 'rotate(5deg)', offset: 0.82 },
    { transform: 'rotate(0deg)' },
  ], 720);
  await this._wait(740);
  await finishHead(this, token);
}

// Variant B: Protective Shield Stand (Head pulls tall, firm DPDP boundary)
export async function playProtectBlock() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(-6px) scale(1.03)', offset: 0.4 },
    { transform: 'translateY(-6px) scale(1.03)', offset: 0.8 },
    { transform: 'translateY(0px) scale(1)' },
  ], 900);
  await this._wait(930);
  await finishHead(this, token);
}

// Variant C: Empathetic Soft Refusal (Apologetic slight dip with soft shake)
export async function playDeclineGentle() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg)' },
    { transform: 'translateY(3px) rotate(-6deg)', offset: 0.3 },
    { transform: 'translateY(3px) rotate(6deg)', offset: 0.65 },
    { transform: 'translateY(0px) rotate(0deg)' },
  ], 850);
  await this._wait(880);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// 12. CONCERN & INTIMIDATION ALERT VARIANTS (C2/C3)
// -------------------------------------------------------------

// Variant A: Standard Concern Warning
export function playConcern() {
  this._speaking = false;
  return this.play?.('warning');
}

// Variant B: Vigilant Perceptive Focus (Rapid head lift, wide watchful presence)
export async function playConcernAlert() {
  this._speaking = false;
  this.noteActivity();
  this.setAntennaFlash?.(true);
  if (!(await this._prepareExpression({ normalizePose: true, duration: 70, pause: 20 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-8px)', offset: 0.3 },
    { transform: 'translateY(-3px)', offset: 0.8 },
    { transform: 'translateY(0px)' },
  ], 900);
  await this._wait(920);
  if (token !== this._transitionToken) return;
  return this.play?.('warning');
}

// Variant C: Protective Guardian Anchor (Steadfast posture, reassurance of safety team)
export async function playConcernProtective() {
  this._speaking = false;
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 100, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(4px) scale(1.02, 0.98)', offset: 0.5 },
    { transform: 'translateY(0px) scale(1)' },
  ], 1200);
  await this._wait(1220);
  if (token !== this._transitionToken) return;
  return this.play?.('warning');
}

// -------------------------------------------------------------
// 13. EMERGENCY CRISIS VARIANTS (C0/A0 IMMEDIATE DANGER)
// -------------------------------------------------------------

// Variant A: Standard Emergency Flash
export async function playCrisis() {
  this._speaking = false;
  this.setAntennaFlash?.(true);
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 100, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(3px)', offset: 0.5 },
    { transform: 'translateY(0px)' },
  ], 700);
  await this._wait(720);
  if (token !== this._transitionToken) return;
  return this.play?.('warning');
}

// Variant B: Urgent Protective Scan (Double scan with pulsing emergency alert)
export async function playCrisisUrgency() {
  this._speaking = false;
  this.setAntennaFlash?.(true);
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 60, pause: 20 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateX(0px) rotate(0deg)' },
    { transform: 'translateX(-5px) rotate(-4deg)', offset: 0.25 },
    { transform: 'translateX(5px) rotate(4deg)', offset: 0.5 },
    { transform: 'translateX(-3px) rotate(-2deg)', offset: 0.75 },
    { transform: 'translateX(0px) rotate(0deg)' },
  ], 750);
  await this._wait(780);
  if (token !== this._transitionToken) return;
  return this.play?.('warning');
}

// Variant C: Emergency Beacon Pulse (Steadfast calm anchor during panic)
export async function playCrisisBeacon() {
  this._speaking = false;
  this.setAntennaFlash?.(true);
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 30 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)', offset: 0.35 },
    { transform: 'scale(0.98)', offset: 0.7 },
    { transform: 'scale(1)' },
  ], 900);
  await this._wait(920);
  if (token !== this._transitionToken) return;
  return this.play?.('warning');
}

// -------------------------------------------------------------
// 14. REST & SLEEP VARIANTS
// -------------------------------------------------------------

export function playSleep() {
  return this.play?.('sleep');
}

export async function playSleepCurl() {
  if (this._sleeping) return;
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 140 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg) translateY(0px)' },
    { transform: 'rotate(10deg) translateY(5px)' },
  ], 850);
  await this._wait(880);
  if (token !== this._transitionToken) return;
  return this.play?.('sleep');
}

export async function playDrowsyNod() {
  if (this._sleeping) return;
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 120 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(6px)', offset: 0.35 },
    { transform: 'translateY(2px)', offset: 0.6 },
    { transform: 'translateY(8px)', offset: 0.9 },
  ], 1200);
  await this._wait(1220);
  if (token !== this._transitionToken) return;
  return this.play?.('sleep');
}

// -------------------------------------------------------------
// 15. AMBIENT & PLAYFUL VARIANTS
// -------------------------------------------------------------

export async function playPeek() {
  this.noteActivity();
  this._inputWanted = false;
  this._sleeping = false;
  if (!(await this._prepareExpression({ normalizePose: true, duration: 120, pause: 80 }))) return;
  this._expressionLock = false;
  this._look.x = 0;
  this._look.y = 0;
  this._wander.x = 0;
  this._wander.y = 0;
  this._boredRoutine = {
    index: 0,
    nextAt: performance.now(),
    steps: [
      { x: -22, y: -6, hold: 700, lookSpeed: 2.6 },
      { x: 22, y: -8, hold: 700, lookSpeed: 2.6 },
      { x: 8, y: 8, hold: 420, lookSpeed: 2 },
      { x: 0, y: 0, hold: 240, lookSpeed: 1.8 },
    ],
  };
}

export async function playGlanceUp() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 90, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) rotate(0deg)' },
    { transform: 'translateY(-8px) rotate(-4deg)', offset: 0.4 },
    { transform: 'translateY(0px) rotate(0deg)' },
  ], 800);
  await this._wait(820);
  await finishHead(this, token);
}

export async function playAmbientStretch() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 110, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'scale(1, 1)' },
    { transform: 'scale(0.96, 1.08) translateY(-6px)', offset: 0.45 },
    { transform: 'scale(1, 1) translateY(0px)' },
  ], 1100);
  await this._wait(1120);
  await finishHead(this, token);
}

export async function playHop() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateY(0px) scale(1, 1)' },
    { transform: 'translateY(6px) scale(1.06, 0.92)', offset: 0.22 },
    { transform: 'translateY(-14px) scale(0.94, 1.08)', offset: 0.48 },
    { transform: 'translateY(3px) scale(1.03, 0.96)', offset: 0.78 },
    { transform: 'translateY(0px) scale(1, 1)' },
  ], 720);
  await this._wait(740);
  await finishHead(this, token);
}

export async function playTilt() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-12deg)', offset: 0.3 },
    { transform: 'rotate(-12deg)', offset: 0.68 },
    { transform: 'rotate(0deg)' },
  ], 1100);
  await this._wait(1120);
  await finishHead(this, token);
}

export async function playWiggle() {
  this.noteActivity();
  if (!(await this._prepareExpression({ normalizePose: true, duration: 80, pause: 40 }))) return;
  const token = this._transitionToken;
  this._animateHead([
    { transform: 'translateX(0px) rotate(0deg)' },
    { transform: 'translateX(-6px) rotate(-6deg)', offset: 0.2 },
    { transform: 'translateX(6px) rotate(6deg)', offset: 0.4 },
    { transform: 'translateX(-4px) rotate(-4deg)', offset: 0.6 },
    { transform: 'translateX(3px) rotate(3deg)', offset: 0.8 },
    { transform: 'translateX(0px) rotate(0deg)' },
  ], 680);
  await this._wait(700);
  await finishHead(this, token);
}

// -------------------------------------------------------------
// MASTER EXTRA_ACTIONS REGISTRY
// -------------------------------------------------------------
export const EXTRA_ACTIONS = {
  // Presence
  present: playPresent,
  greet_wave: playGreetWave,
  arrive_gentle: playArriveGentle,
  greet: playPresent,

  // Listen
  listen: playListen,
  listen_attentive: playListenAttentive,
  listen_soothe: playListenSoothe,

  // Input
  input_curious: playInputCurious,
  input_cadence: playInputCadence,
  input_patient: playInputCadence,

  // Send
  send_affirm: playSendAffirm,
  send_secure: playSendSecure,
  nod: function() { return this.play('send'); },

  // Thinking
  thinking: playThinking,
  thinking_ponder: playThinkingPonder,
  thinking_pulse: playThinkingPulse,

  // Speak
  speak: playSpeak,
  speak_expressive: playSpeakExpressive,
  speak_reassure: playSpeakReassure,

  // Calm
  calm: playCalm,
  calm_ground: playCalmGround,
  calm_warmth: playCalmWarmth,

  // Inspect
  inspect_curious: playInspectCurious,
  inspect_verify: playInspectVerify,
  tilt: playTilt,

  // Success
  success_cheer: playSuccessCheer,
  success_peace: playSuccessPeace,

  // Failure
  retry_encourage: playRetryEncourage,
  retry_puzzled: playRetryPuzzled,

  // Decline
  decline: playDecline,
  protect_block: playProtectBlock,
  decline_gentle: playDeclineGentle,
  shake: playDecline,

  // Concern
  concern: playConcern,
  concern_alert: playConcernAlert,
  concern_protective: playConcernProtective,

  // Crisis
  crisis: playCrisis,
  crisis_urgency: playCrisisUrgency,
  crisis_beacon: playCrisisBeacon,

  // Sleep
  sleep_curl: playSleepCurl,
  drowsy_nod: playDrowsyNod,

  // Ambient / Playful
  peek: playPeek,
  glance_up: playGlanceUp,
  ambient_stretch: playAmbientStretch,
  hop: playHop,
  wiggle: playWiggle,
};

// -------------------------------------------------------------
// TASK CATEGORIES & VARIANTS DEFINITION
// -------------------------------------------------------------
export const TASK_CATEGORIES = {
  presence: {
    id: 'presence',
    name: 'Session Arrival & Presence',
    description: 'When survivor opens the companion or returns to the page.',
    variants: [
      { action: 'present', label: 'Warm Lift', when: 'Courteous head lift and slight tilt acknowledging survivor.' },
      { action: 'greet_wave', label: 'Courteous Welcome', when: 'Courteous 8° tilt, antenna double-pulse, and gentle forward affirmation.' },
      { action: 'arrive_gentle', label: 'Gentle Awakening', when: 'Slow uncurl from resting state with soft breathing expansion.' },
    ],
  },
  listen: {
    id: 'listen',
    name: 'Active Listening & Dictation',
    description: 'When survivor taps mic or dictates traumatic events.',
    variants: [
      { action: 'listen', label: 'Attentive Tilt', when: 'Classic -9° head tilt focusing eyes directly on survivor.' },
      { action: 'listen_attentive', label: 'Micro-Nod Focus', when: 'Rhythmic affirming micro-dips reassuring words are registered.' },
      { action: 'listen_soothe', label: 'Compassionate Sway', when: 'Gentle slow sway validating emotional testimony without interruption.' },
    ],
  },
  input: {
    id: 'input',
    name: 'Typing & Composition Tracking',
    description: 'When survivor is drafting or typing a message in the input field.',
    variants: [
      { action: 'input', label: 'Keystroke Slit Focus', when: 'Downward vertical slit eyes locked on input bar tracking keystrokes.' },
      { action: 'input_curious', label: 'Inquisitive Reading Follower', when: '8°-10° curious head-cock, antenna pulse, and left-to-right gaze sweep reading text as it arrives.' },
      { action: 'input_cadence', label: 'Typewriter Stenographer Rhythm', when: 'Active staccato keystroke micro-dips, typewriter carriage stepping, and antenna transcription pulses mimicking rapid note-taking.' },
    ],
  },
  send: {
    id: 'send',
    name: 'Message Dispatched & Acknowledged',
    description: 'When survivor hits send or submits sensitive inquiry.',
    variants: [
      { action: 'send', label: 'Crisp Double Nod', when: 'Affirmative nod confirming receipt of inquiry.' },
      { action: 'send_affirm', label: 'Affirmative Confirmation Nod', when: 'Smooth affirmative nod with warm antenna pulse confirming message received.' },
      { action: 'send_secure', label: 'Encrypted Lock Dip', when: 'Firm forward dip symbolizing DPDP encrypted security.' },
    ],
  },
  thinking: {
    id: 'thinking',
    name: 'Statutory Inference & Rights Lookup',
    description: 'When model processes Section 15A rights or legal database.',
    variants: [
      { action: 'thinking', label: 'Wrap Horizon Scan', when: 'Smooth horizontal eye wrap scanning statutory provisions.' },
      { action: 'thinking_ponder', label: 'Upward Deliberation', when: 'Thoughtful upward angle and gentle elliptical orbit.' },
      { action: 'thinking_pulse', label: 'Metronomic Pulse', when: 'Calming steady antenna pulse indicating active background search.' },
    ],
  },
  speak: {
    id: 'speak',
    name: 'Spoken Guidance & Cadence',
    description: 'When Haven streams synthesized speech or audio readout.',
    variants: [
      { action: 'speak', label: 'Cadence Bob', when: 'Natural rhythmic head bob synced to vocal cadence.' },
      { action: 'speak_expressive', label: 'Articulated Sway', when: 'Vertical articulation with subtle alternating head tilt.' },
      { action: 'speak_reassure', label: 'Soothing Paced Bob', when: 'Slower, grounding vocal bob ideal for trauma de-escalation.' },
    ],
  },
  calm: {
    id: 'calm',
    name: 'Calming & Somatic Grounding',
    description: 'When survivor feels overwhelmed or requests sensory grounding.',
    variants: [
      { action: 'calm', label: 'Somatic Deep Breath', when: '2.2-second inhale expansion and gentle release pacing breath.' },
      { action: 'calm_ground', label: 'Centering Bow', when: 'Peaceful downward bow and grounding stillness.' },
      { action: 'calm_warmth', label: 'Cradling Rock', when: 'Gentle side-to-side soothing rock providing emotional shelter.' },
    ],
  },
  inspect: {
    id: 'inspect',
    name: 'Legal Rights & Docket Review',
    description: 'When reviewing FIR timeline, TA/DA Rule 11, or court partition.',
    variants: [
      { action: 'inspect', label: 'Focused Inspection', when: 'Close forward focus analyzing legal text.' },
      { action: 'inspect_curious', label: 'Inquisitive 14° Cock', when: 'Curious head angle spotting critical nuances in court orders.' },
      { action: 'inspect_verify', label: 'Cross-Check Scan', when: 'Two-point verification scan confirming compensation disbursement.' },
    ],
  },
  success: {
    id: 'success',
    name: 'Milestone Accomplishment',
    description: 'Counselor booked, threat report filed, or check-in completed.',
    variants: [
      { action: 'success', label: 'Sparkle Nod', when: 'Happy crescent eyes and joyful antenna sparkle.' },
      { action: 'success_cheer', label: 'Double Hop', when: 'High-energy double hop celebrating survivor empowerment.' },
      { action: 'success_peace', label: 'Respectful Bow', when: 'Dignified bow of mutual respect and milestone completion.' },
    ],
  },
  failure: {
    id: 'failure',
    name: 'Non-Critical Issue & Gentle Retry',
    description: 'Upload error or connection retry — completely non-punitive.',
    variants: [
      { action: 'failure', label: 'Sympathetic Sigh', when: 'Soft sympathetic dip reassuring survivor did nothing wrong.' },
      { action: 'retry_encourage', label: 'Encouraging Up-Nod', when: 'Gentle shake followed by upbeat nod ("we will try again").' },
      { action: 'retry_puzzled', label: 'Puzzled Charm Tilt', when: 'Curious tilt softening technical glitch with warmth.' },
    ],
  },
  decline: {
    id: 'decline',
    name: 'Privacy Consent & Policy Boundary',
    description: 'Refusal to share data without consent or breach protection policy.',
    variants: [
      { action: 'decline', label: 'Polite Head Shake', when: 'Clear horizontal head shake upholding ethical consent.' },
      { action: 'protect_block', label: 'Shield Stance', when: 'Head pulls tall in staunch defense of survivor privacy.' },
      { action: 'decline_gentle', label: 'Apologetic Refusal', when: 'Soft apologetic dip explaining statutory restrictions.' },
    ],
  },
  concern: {
    id: 'concern',
    name: 'Rising Concern & Threat Alert (C2/C3)',
    description: 'When intimidation is reported or acute stress indicators rise.',
    variants: [
      { action: 'concern', label: 'Furrowed Alert', when: 'Caring, serious gaze validating survivor fears.' },
      { action: 'concern_alert', label: 'Vigilant Lift', when: 'Rapid head rise and wide eyes at threat report.' },
      { action: 'concern_protective', label: 'Protective Anchor', when: 'Grounded forward stance reassuring protection cell backup.' },
    ],
  },
  crisis: {
    id: 'crisis',
    name: 'Immediate Danger & Emergency (C0/A0)',
    description: 'SOS trigger, immediate physical danger, or 112 dispatch.',
    variants: [
      { action: 'crisis', label: 'Guardian SOS Alert', when: 'Rapid antenna flash with steadfast, calm guardian stance.' },
      { action: 'crisis_urgency', label: 'Vigilant Sweeping Alert', when: 'Urgent eye sweeps and emergency antenna beacon.' },
      { action: 'crisis_beacon', label: 'Calm Emergency Anchor', when: 'Rock-solid center anchor providing emotional safety during crisis.' },
    ],
  },
  sleep: {
    id: 'sleep',
    name: 'Rest & Gentle Slumber',
    description: 'Extended survivor inactivity or session departure.',
    variants: [
      { action: 'sleep', label: 'Eyelid Lower', when: 'Eyelids slowly lower into tranquil rest.' },
      { action: 'sleep_curl', label: 'Comfortable Slumber', when: 'Head tilts into cozy resting angle.' },
      { action: 'drowsy_nod', label: 'Drowsy Doze', when: 'Two soft sleepy nods settling into sleep.' },
    ],
  },
  ambient: {
    id: 'ambient',
    name: 'Subtle Ambient Life',
    description: 'Background living motion while survivor reads in quiet.',
    variants: [
      { action: 'peek', label: 'Side Glance', when: 'Gentle sideways look checking on user.' },
      { action: 'glance_up', label: 'Skyward Glance', when: 'Curious upward look and settling.' },
      { action: 'ambient_stretch', label: 'Micro Stretch', when: 'Soft vertical breath and stretch.' },
    ],
  },
};

// -------------------------------------------------------------
// INSTALLATION HOOK
// -------------------------------------------------------------
export function installAvatarMotions(avatar, options = {}) {
  const ctor = customElements.get('agent-robot-avatar');
  if (ctor && !ctor.prototype.__extraMotionsInstalled) {
    const originalPlay = ctor.prototype.play;
    ctor.prototype.play = function (name) {
      const action = String(name || '').trim().toLowerCase();
      this._speaking = false;
      if (action === 'idle' || action === 'wake') this._speaking = false;
      const extra = EXTRA_ACTIONS[action];
      if (extra) {
        this._resumeFrames?.();
        return extra.call(this);
      }
      return originalPlay.call(this, name);
    };

    // Smart random variant player
    ctor.prototype.playRandom = function (categoryId) {
      const cat = TASK_CATEGORIES[categoryId];
      if (!cat || !cat.variants || !cat.variants.length) {
        return this.play(categoryId);
      }
      if (!this._lastVariantMap) this._lastVariantMap = {};
      const last = this._lastVariantMap[categoryId];
      const pool = cat.variants.filter(v => v.action !== last);
      const chosen = pool.length ? pool[Math.floor(Math.random() * pool.length)] : cat.variants[0];
      this._lastVariantMap[categoryId] = chosen.action;
      return {
        action: chosen.action,
        variantInfo: chosen,
        category: cat,
        promise: this.play(chosen.action),
      };
    };

    ctor.prototype.__extraMotionsInstalled = true;
  }

  avatar.setAntennaFlash?.(true);
  avatar.setPointerFollow?.(true);

  let liveIdle = options.liveIdle === true;
  let nextAmbientAt = performance.now() + 5000;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scheduleAmbient() {
    nextAmbientAt = performance.now() + 6000 + Math.random() * 5000;
  }

  function tickAmbient() {
    window.setTimeout(tickAmbient, 900);
    if (!liveIdle || reduced) return;
    if (performance.now() < nextAmbientAt) return;
    if (avatar._sleeping || avatar._speaking || avatar._inputWanted) {
      nextAmbientAt = performance.now() + 3000;
      return;
    }
    const ambientActions = ['peek', 'glance_up', 'ambient_stretch', 'tilt'];
    const pick = ambientActions[Math.floor(Math.random() * ambientActions.length)];
    scheduleAmbient();
    avatar.play(pick);
  }

  if (!reduced) tickAmbient();

  return {
    setLiveIdle(value) {
      liveIdle = Boolean(value);
      scheduleAmbient();
    },
    TASK_CATEGORIES,
    EXTRA_ACTIONS,
  };
}
