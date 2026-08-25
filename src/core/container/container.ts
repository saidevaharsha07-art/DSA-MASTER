/**
 * Lightweight Type-Safe IoC Container
 * Resolves singleton and factory services without tight coupling or manual construction.
 */

type ServiceFactory<T = unknown> = () => T;

export class Container {
  private static singletons: Map<string, unknown> = new Map();
  private static factories: Map<string, ServiceFactory> = new Map();

  public static registerSingleton<T>(key: string, instance: T): void {
    this.singletons.set(key, instance);
  }

  public static registerFactory<T>(key: string, factory: ServiceFactory<T>): void {
    this.factories.set(key, factory);
  }

  public static resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }

    if (this.factories.has(key)) {
      const instance = this.factories.get(key)!() as T;
      return instance;
    }

    throw new Error(`[Container] Service '${key}' not registered in IoC container.`);
  }

  public static has(key: string): boolean {
    return this.singletons.has(key) || this.factories.has(key);
  }

  public static reset(): void {
    this.singletons.clear();
    this.factories.clear();
  }
}
