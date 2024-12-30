declare global {
  interface Window {
    ZAFClient: {
      init: () => {
        context(): Promise<any>;
        get(paths: string | string[]): Promise<any>;
        has(name: string, handler: (data: any) => void): Promise<boolean>;
        invoke(name: string, ...args: any[]): Promise<any>;
        metadata(): Promise<any>;
        off(name: string, handler: (data: any) => void): Promise<void>;
        on(name: string, handler: (data: any) => void, context?: any): Promise<void>;
        request(options: any): Promise<any>;
        set(key: string, value: any): Promise<void>;
        set(obj: Record<string, any>): Promise<void>;
        trigger(name: string, data: any): Promise<void>;
      };
      [key: string]: any;
    };
  }
}

export type ZafClient = ReturnType<typeof window.ZAFClient.init>;
