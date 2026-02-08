
import { Dispatcher } from './Dispatcher';
import { ListenerResolver } from './ListenerResolver';
import { EventException } from './Exceptions/EventException';

export class EventManager {
    private listeners: Map<any, any[]> = new Map();
    private dispatcher: Dispatcher;
    private resolver: ListenerResolver;

    constructor(resolver?: ListenerResolver) {
        this.resolver = resolver || new ListenerResolver();
        this.dispatcher = new Dispatcher((ln) => this.resolver.resolve(ln));
    }

    public listen(event: any, listener: any) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)?.push(listener);
        return this;
    }

    public forget(event: any) {
        this.listeners.delete(event);
        return this;
    }

    public async dispatch(event: any): Promise<void> {
        let listeners: any[] = [];

        // Find listeners for this event instance
        // If event is an object, try to match its constructor
        let eventKey = event.constructor;
        if (this.listeners.has(eventKey)) {
            listeners = this.listeners.get(eventKey)!;
        }

        // Also check if we dispatched a class directly (rare but possible in some patterns)
        if (typeof event === 'function' && this.listeners.has(event)) {
            listeners = listeners.concat(this.listeners.get(event)!);
        }

        // TODO: Wildcard listeners

        if (listeners.length > 0) {
            await this.dispatcher.dispatch(event, listeners);
        }
    }

    // Testing helpers
    public fake() {
        // Implement fake logic for testing
    }

    public assertDispatched(event: any) {
        // Implement assertion
    }
}
