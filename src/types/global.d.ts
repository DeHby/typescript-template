declare global {
  namespace NodeJS {
    interface ProcessEnv {
      a: string;
    }

    interface Process {
      pkg?: {
        defaultEntrypoint?: string;
        entrypoint?: string;
      };
    }
  }
}
export {};
