import { CloudflareTurnstileState } from '../types/restaurant';

type Listener = (state: CloudflareTurnstileState) => void;

class CloudflareTurnstileManager {
  private state: CloudflareTurnstileState = {
    status: 'idle',
    token: null,
    challengeScore: 0.98,
    botScore: 0.02,
    challengeType: 'managed',
    cfRayId: '8a9f2430bca9-DEL',
    verifiedAt: undefined,
  };

  private listeners: Set<Listener> = new Set();

  constructor() {
    // Automatically perform lightweight background handshake verification
    setTimeout(() => {
      this.runBackgroundChallenge(false);
    }, 400);
  }

  public getState(): CloudflareTurnstileState {
    return { ...this.state };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const currentState = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(currentState);
      } catch (err) {
        console.error('Turnstile listener error:', err);
      }
    });
  }

  public async runBackgroundChallenge(forceInteractive = false): Promise<CloudflareTurnstileState> {
    if (this.state.status === 'verifying') return this.getState();

    this.state = {
      ...this.state,
      status: 'verifying',
    };
    this.notify();

    await new Promise((res) => setTimeout(res, 500));

    if (forceInteractive) {
      this.state = {
        ...this.state,
        status: 'interactive',
        token: null,
        challengeScore: 0.45,
        botScore: 0.55,
      };
      this.notify();
      return this.getState();
    }

    // Success background token
    const token = `cf-tnst-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
    this.state = {
      status: 'verified',
      token,
      challengeScore: 0.99,
      botScore: 0.01,
      challengeType: 'managed',
      cfRayId: `8a9f${Math.random().toString(16).substring(2, 8)}-DEL`,
      verifiedAt: new Date().toLocaleTimeString(),
    };
    this.notify();
    return this.getState();
  }

  public async completeInteractiveChallenge(): Promise<CloudflareTurnstileState> {
    this.state = {
      ...this.state,
      status: 'verifying',
    };
    this.notify();

    await new Promise((res) => setTimeout(res, 600));

    const token = `cf-tnst-human-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
    this.state = {
      status: 'verified',
      token,
      challengeScore: 1.0,
      botScore: 0.0,
      challengeType: 'interactive',
      cfRayId: `8a9f${Math.random().toString(16).substring(2, 8)}-DEL`,
      verifiedAt: new Date().toLocaleTimeString(),
    };
    this.notify();
    return this.getState();
  }

  public verifyToken(token: string | null): boolean {
    if (!token) return false;
    return token.startsWith('cf-tnst-');
  }
}

export const cloudflareTurnstile = new CloudflareTurnstileManager();
