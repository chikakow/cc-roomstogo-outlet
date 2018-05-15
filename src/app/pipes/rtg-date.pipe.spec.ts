import { YearPipe } from './rtg-date.pipe';

describe('YearPipe', () => {
  it('create an instance', () => {
    const pipe = new YearPipe('');
    expect(pipe).toBeTruthy();
  });
});
