import { UtcToIstPipe } from './utc-to-ist.pipe';

describe('UtcToIstPipe', () => {
  it('create an instance', () => {
    const pipe = new UtcToIstPipe();
    expect(pipe).toBeTruthy();
  });
});
