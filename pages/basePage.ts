import { PageHolder } from './../pages/pageHolder';

export abstract class BasePage extends PageHolder {
 
  public abstract pagePath: string;

  async goto(path?: string): Promise<void> {
    await this.page.goto(path ?? this.pagePath);
  }
}