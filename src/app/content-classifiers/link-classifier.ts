import { IContentClassifier } from './content-classification.service';

export class LinkClassifier implements IContentClassifier {
  classifyContent(content: string): boolean {
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlPattern.test(content);
  }

  type(): string {
    return 'text/uri-list';
  }
}
