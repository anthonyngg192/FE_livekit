import { SessionService } from 'src/app/modules/service/session.service';

export abstract class BaseComponent {
  constructor(protected readonly sessionService: SessionService) {}
}
