/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
// tslint:disable max-line-length no-duplicate-imports
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotificationChannel } from './NotificationChannel';
import { TokenChannelSubscription } from './TokenChannelSubscription';

import * as auth from '../../utils/auth/auth-checkers';
import { IAuthorizable } from '../../utils/auth/IAuthorizable';
import { getInputOperationType } from '../../utils/get-input-operation-type';
import { ChannelAuth } from '../auth/ChannelAuth';
import { EntityId, EntityIdScalar } from '../EntityId';
import { ChannelCreateInput } from '../inputs/ChannelCreateInput';
import { ChannelEditInput } from '../inputs/ChannelEditInput';
import { ChannelNestedInput } from '../inputs/ChannelNestedInput';
import { IRequestContext } from '../IRequestContext';
import {  } from './update-operations/channel-update-operations';

// <keep-imports>
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class Channel implements IAuthorizable {
  @Field((type) => EntityIdScalar)
  @PrimaryGeneratedColumn()
  public id: EntityId;

  public authorizationChecker = new ChannelAuth(this);

  @Field(() => String)
  @Column({
    // <custom-column-args>
    unique: true,
    // </custom-column-args>
  })
  public name: string;

  @OneToMany((type) => TokenChannelSubscription, (tokenChannelSubscription) => tokenChannelSubscription.channel)
  @Field((returns) => [TokenChannelSubscription])
  public subscriptions: Promise<Array<TokenChannelSubscription>>;

  @OneToMany((type) => NotificationChannel, (notificationChannel) => notificationChannel.channel)
  @Field((returns) => [NotificationChannel])
  public notificationChannels: Promise<Array<NotificationChannel>>;

  public async update(input: ChannelCreateInput | ChannelEditInput | ChannelNestedInput, context: IRequestContext) {
    const data = input;
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    context.modelsToSave.push(this);

    // <keep-update-code>
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}
