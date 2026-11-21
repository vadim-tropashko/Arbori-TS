/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class Profile {
    public static dumpHeap(filePath: string, live: boolean) {
        const server: MBeanServer = ManagementFactory.getPlatformMBeanServer();
        const mxBean: HotSpotDiagnosticMXBean = <any>(ManagementFactory.newPlatformMXBeanProxy<any>(server, "com.sun.management:type=HotSpotDiagnostic", "com.sun.management.HotSpotDiagnosticMXBean"));
        mxBean.dumpHeap(filePath, live);
    }

    public static profile$int$int(duration: number, granularity: number) {
        Profile.profile$int$int$int(duration, granularity, 5);
    }

    static isRunning: boolean = false;

    public static profile$int$int$int(duration: number, granularity: number, stackDepth: number) {
        if (Profile.isRunning){
            console.info("********fired more than once********");
            return;
        }
        Profile.isRunning = true;
        const threadName: string = Thread.currentThread().getName();
        console.info("threadName=" + threadName);
        new Profile.Profile$0(duration, stackDepth, granularity).start();
    }

    public static profile(duration?: any, granularity?: any, stackDepth?: any) {
        if (((typeof duration === 'number') || duration === null) && ((typeof granularity === 'number') || granularity === null) && ((typeof stackDepth === 'number') || stackDepth === null)) {
            return <any>Profile.profile$int$int$int(duration, granularity, stackDepth);
        } else if (((typeof duration === 'number') || duration === null) && ((typeof granularity === 'number') || granularity === null) && stackDepth === undefined) {
            return <any>Profile.profile$int$int(duration, granularity);
        } else throw new Error('invalid overload');
    }
}
Profile["__class"] = "oracle.arbori.util.Profile";


export namespace Profile {

    export class Profile$0 {
        public run() {
            const threadName1: string = Thread.currentThread().getName();
            const start: number = /* currentTimeMillis */Date.now();
            while((/* currentTimeMillis */Date.now() < start + this.duration)) {try {
                const bean: ThreadMXBean = ManagementFactory.getThreadMXBean();
                const infos: ThreadInfo[] = bean.dumpAllThreads(true, true);
                let divide: boolean = false;
                let divide2: boolean = false;
                for(let index = 0; index < infos.length; index++) {
                    let info = infos[index];
                    {
                        if (threadName1 === info.getThreadName())continue;
                        if (divide)console.info("----------------");
                        divide = false;
                        const elems: StackTraceElement[] = info.getStackTrace();
                        let i: number = 0;
                        for(let index1 = 0; index1 < elems.length; index1++) {
                            let elem = elems[index1];
                            {
                                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "org") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.dbtools.raptor.plsql.BackgroundParser") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.ide.model.FacadeBufferReference$PollingThread") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.ide.util.WeakDataReference$Cleaner") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.ide.status.StatusExecutor") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.ide.log.QueuedLoggingHandler"))break;
                                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "java") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "sun") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.net.ns") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.jdbc") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.dbtools.raptor.backgroundTask") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.javatools.db.execute.QueryWrapper") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(elem.toString(), "oracle.javatools.db.execute.ConnectionWrapper"))continue;
                                if (i < this.stackDepth){
                                    console.info(elem.toString());
                                    divide = true;
                                    divide2 = true;
                                    i++;
                                }
                            }
                        }
                    }
                }
                if (divide2)console.info("=================" + (/* currentTimeMillis */Date.now() - start));
                Thread.sleep(this.granularity);
            } catch(e) {
            }};
            Profile.isRunning = false;
        }

        constructor(private duration: any, private stackDepth: any, private granularity: any) {
        }
    }

}



