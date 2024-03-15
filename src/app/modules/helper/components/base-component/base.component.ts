import { PermissionAppEnum } from 'src/app/consts/permission-app.const';
import { PermissionEnum } from 'src/app/consts/permission.const';
import { SessionService } from 'src/app/modules/service/session.service';

export abstract class BaseComponent {
  constructor(protected readonly sessionService: SessionService) {}

  hasPermission(app: PermissionAppEnum, feature: string, perms: PermissionEnum[]) {
    return this.sessionService.permissions.find(
      (permission) =>
        permission.app.toLowerCase() === app.toLowerCase() &&
        permission.feature === feature &&
        permission.permissions.some((perm) => perms.includes(perm)),
    );
  }
}
