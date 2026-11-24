/** Small logging facade used by the formatter's fallback path. */
export class MessageLogging {
    private static instance = new MessageLogging();

    static getInstance(): MessageLogging {
        return MessageLogging.instance;
    }

    log(message: string): void {
        console.info(message);
    }
}
