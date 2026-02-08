
import { EventManager } from './EventManager';
import { Listener } from './Contracts/Listener';
import { EventException } from './Exceptions/EventException';

export class Event {
    private static instance: EventManager = new EventManager();

    public static dispatch(event: any): Promise<void> {
        return this.instance.dispatch(event);
    }

    public static listen(event: any, listener: any) {
        return this.instance.listen(event, listener);
    }

    public static forget(event: any) {
        return this.instance.forget(event);
    }

    public static fake() {
        return this.instance.fake();
    }

    // Facade helper to set a custom manager
    public static setManager(manager: EventManager) {
        this.instance = manager;
    }
}

export { EventManager, Listener, EventException };
