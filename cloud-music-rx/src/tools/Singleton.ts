
export class Singleton {

  private static _instance: Singleton | null = null;

  public static instance<T extends Singleton>(...args: any[]): T {
    if (this._instance === null) {
      try {
        this._instance = new this(...args);
      } catch (err) {
        console.warn('[Singleton#instance] error: ', err);
      }
    }

    return this._instance as T;
  }

  // eslint-disable-next-line
  constructor(...args: any[]) { }

  public static free() {
    this._instance = null;
  }

}
