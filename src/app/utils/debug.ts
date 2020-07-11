import debug from 'debug';

enum Colors {
  RED = 1,
  GREEN,
  YELLOW,
  BLUE,
  PURPLE,
  CYAN,
  WHITE,
  LIGHT_GRAY
}

interface DebugConfig {
  [namespace: string]: {
    color: Colors;
    enabled?: boolean;
  }
}

interface DebugHandler {
  [key: string]: (
    ...msg: string[] // Unlimited messages for parameters
  ) => {
    namespace: string;
    enabled: boolean;
    useColors: boolean;
    color: number;
    destroy: Function;
    extend: Function;
    inspectOpts: Object;
  };
}

/**
 * Configuration of the debug logs
 */
const debugConfigs: DebugConfig = {
  log: { color: Colors.BLUE, enabled: true },
  success: { color: Colors.GREEN, enabled: true },
  warn: { color: Colors.YELLOW, enabled: true },
  error: { color: Colors.RED, enabled: true },
  http: { color: Colors.PURPLE, enabled: true },
  mail: { color: Colors.CYAN, enabled: true },
};

class Debug {
  constructor(public configs: DebugConfig) {
    this.configs = configs;
  }

  generateConfig(): DebugHandler {
    let debugObj: DebugHandler = {};
    let namespaces: string[] = Object.keys(this.configs);
    namespaces.map(ns => {
      let d = debug(ns); // Get the debug function
      d.enabled = process.env.NODE_ENV !== 'production'; // Display debug messages only in dev mode
      d.color = debugConfigs[ns].color; // Set the colors of the messages displayed
      Object.assign(debugObj, { [ns]: d }); // Set the debug object
    });
    return debugObj;
  }
}

let debugClass = new Debug(debugConfigs);
export default debugClass.generateConfig();
