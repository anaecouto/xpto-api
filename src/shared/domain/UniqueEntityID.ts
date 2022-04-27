import { ObjectId } from 'bson';
import AppError from '../core/errors/AppError';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<ObjectId> {
  private constructor(id?: string | ObjectId) {
    super(new ObjectId(id));
  }

  static isValid(id: string | ObjectId) {
    return ObjectId.isValid(id);
  }

  static create(id?: string | ObjectId): UniqueEntityID {
    if (id && !this.isValid(id)) {
      throw new AppError('id is invalid', { status: 400 });
    }

    return new UniqueEntityID(id);
  }

  equals(id: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toString() === this.toString();
  }
}
