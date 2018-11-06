import { IAuthorizationChecker } from '../../utils/auth/IAuthorizationChecker';
import { UserRole } from '../enums/UserRole';
import { IRequestContext } from '../IRequestContext';
import { Channel } from '../models/Channel';

export class ChannelAuth implements IAuthorizationChecker {
  public constructor(private channel: Channel) {
  }

  public async canRead(ctx: IRequestContext, field?: string) {
    return true;
  }

  public async canManage(ctx: IRequestContext) {
    return true;
    // const { auth } = ctx;
    // if (!auth) {
    //   return false;
    // }
    //
    // if (auth.user.role === UserRole.ADMIN) {
    //   return true;
    // }
    //
    // return false;
  }

  public async canPersist(ctx: IRequestContext) {
    return true;
  }

  public async canUpdate(ctx: IRequestContext) {
    return this.canManage(ctx);
  }

  public async canDelete(ctx: IRequestContext) {
    return this.canManage(ctx);
  }
}
