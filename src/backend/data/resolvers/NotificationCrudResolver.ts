/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
// tslint:disable max-line-length
import { Arg, Args, Ctx, FieldResolver, ID, Info, Mutation, Query, Resolver, Root } from 'type-graphql';

import { addEagerFlags } from '../../utils/add-eager-flags';
import * as auth from '../../utils/auth/auth-checkers';
import { getFindOptions } from '../../utils/get-find-options';
import { EntityId, EntityIdScalar } from '../EntityId';
import { NotificationCreateInput } from '../inputs/NotificationCreateInput';
import { NotificationEditInput } from '../inputs/NotificationEditInput';
import { IRequestContext } from '../IRequestContext';
import { Notification } from '../models/Notification';

// <keep-imports>
import * as bluebird from 'bluebird';
import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { flatten } from 'lodash';
import { NotificationSound } from '../enums/NotificationSound';
import { Channel } from '../models/Channel';

// </keep-imports>

@Resolver(Notification)
export class NotificationCrudResolver {
  @Query((returns) => Notification)
  public async notification(@Arg('id', () => EntityIdScalar) id: number, @Info() info, @Ctx() ctx: IRequestContext) {
    return addEagerFlags(await ctx.em.findOneOrFail(Notification, id, getFindOptions(Notification, info)));
  }

  @Query((returns) => [Notification])
  public async notifications(@Info() info, @Ctx() ctx: IRequestContext) {
    return addEagerFlags(await ctx.em.find(Notification, getFindOptions(Notification, info)));
  }

  @Mutation((returns) => Notification)
  public async createNotification(@Arg('input') input: NotificationCreateInput, @Ctx() ctx: IRequestContext): Promise<Notification> {
    const model = new Notification();
    await model.update(input, ctx);

    await ctx.em.save(ctx.modelsToSave);

    // <keep-create-code>
    const expo = new Expo();
    const messages: Array<ExpoPushMessage> = [];
    const channels: Array<Channel> = flatten(await bluebird.map(await model.notificationChannels, (ch) => ch.channel));
    for (const channel of channels) {
      const tokens = await Promise.all((await channel.subscriptions).map((subscription) => subscription.token));
      for (const token of tokens.map((t) => t.content)) {
        if (!Expo.isExpoPushToken(token)) {
          continue;
        }
        messages.push({
          to: token,
          badge: model.badge ? model.badge : undefined,
          body: model.body ? model.body : undefined,
          data: model.data ? JSON.parse(model.data) : undefined,
          sound: model.sound === NotificationSound.none ? undefined : model.sound,
          title: model.title ? model.title : undefined,
          priority: model.priority,
          channelId: model.channelId ? model.channelId : undefined,
        } as any);
      }
    }
    const tickets: Array<ExpoPushTicket> = [];
    console.log(JSON.stringify(messages));
    for (const chunk of expo.chunkPushNotifications(messages)) {
      try {
        tickets.push(...await expo.sendPushNotificationsAsync(chunk));
      } catch (e) {
        console.log(e);
      }
    }
    console.log('sent', messages.length, 'messages');
    // </keep-create-code>

    return model;
  }

  @Mutation((returns) => Notification)
  public async updateNotification(@Arg('input') input: NotificationEditInput, @Ctx() ctx: IRequestContext) {
    const model = await ctx.em.findOneOrFail(Notification, input.id);
    await model.update(input, ctx);

    // <keep-update-code>
    // </keep-update-code>

    await ctx.em.save(ctx.modelsToSave);

    return model;
  }

  @Mutation((returns) => Boolean)
  public async deleteNotifications(@Arg('ids', () => [ID]) ids: Array<EntityId>, @Ctx() ctx: IRequestContext): Promise<boolean> {
    const entities = await ctx.em.findByIds(Notification, ids);
    await auth.assertCanDelete(entities, ctx);
    await ctx.em.remove(entities);

    return true;
  }

  // <keep-methods>
  // </keep-methods>
}
