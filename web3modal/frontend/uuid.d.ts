declare module 'uuid' {
    export function v1(options?: any, buffer?: any, offset?: any): string;
    export function v3(name: string, namespace: string): string;
    export function v4(options?: any, buffer?: any, offset?: any): string;
    export function v5(name: string, namespace: string): string;
  }
  