import {IGrade} from './grade.model';

export class UserCreator {
  static createUser(name: string): IUser {
    return {
      id: `${name}_${new Date().getTime()}`,
      name,
      gradeList: []
    };
  }
}

export interface IUser {
  id: string;
  name: string;
  gradeList: IGrade[];
}
