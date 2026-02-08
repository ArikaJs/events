
import { Dispatcher } from './Dispatcher';
import { Listener } from './Contracts/Listener';
import { EventException } from './Exceptions/EventException';

export class ListenerResolver {
    // This would typically interface with the service container
    // For now we do a simple instantiation
    async resolve(listener: any): Promise<Listener> {
        if (typeof listener === 'function') {
            try {
                // @ts-ignore - Assuming no-arg constructor or DI handles it
                return new listener();
            } catch (e: any) {
                throw new EventException(`Resolver failed to instantiate listener: ${e.message}`);
            }
        }
        return listener;
    }
}
