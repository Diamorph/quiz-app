import {environment} from '../../environments/environment';

export class UrlHelper {
  static createUrl(url: string): string {
    return environment.apiUrl + url;
  }
}
