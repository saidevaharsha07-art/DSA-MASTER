import { IRunner } from './IRunner';
import { Judge0Runner } from './Judge0Runner';

class RunnerFactory {
  private activeRunner: IRunner;

  constructor() {
    this.activeRunner = new Judge0Runner();
  }

  public getRunner(): IRunner {
    return this.activeRunner;
  }

  public setRunner(runner: IRunner) {
    this.activeRunner = runner;
  }
}

export const runnerFactory = new RunnerFactory();
