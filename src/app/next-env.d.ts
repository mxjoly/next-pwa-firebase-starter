/// <reference types="next" />
/// <reference types="next/types/global" />

// To use process.env
declare global {
  // Target the module containing the `ProcessEnv` interface
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
  namespace NodeJS {
    // Merge the existing `ProcessEnv` definition with ours
    // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
    interface ProcessEnv {
      NODE_ENV?: "development" | "production";
      PORT?: number;
    }
  }
}