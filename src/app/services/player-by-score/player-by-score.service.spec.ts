import { TestBed } from '@angular/core/testing';

import { PlayerByScoreService } from './player-by-score.service';

describe('PlayerByScoreService', () => {
  let service: PlayerByScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerByScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
