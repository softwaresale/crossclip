import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export interface IContentClassifier {
  type(): string;
  classifyContent(content: string): boolean;
}

export const CONTENT_CLASSIFIERS = new InjectionToken<IContentClassifier[]>('content_classifiers');

@Injectable({
  providedIn: 'root'
})
export class ContentClassificationService {

  private readonly classifiers: Set<IContentClassifier>;

  constructor(@Inject(CONTENT_CLASSIFIERS) @Optional() initialClassifiers: IContentClassifier[]) {
    this.classifiers = new Set<IContentClassifier>();
    if (initialClassifiers) {
      initialClassifiers.forEach(classifier => this.classifiers.add(classifier));
    }
  }

  registerClassifier(classifier: IContentClassifier) {
    this.classifiers.add(classifier);
  }

  getType(content: string): string {
    for (const classifier of this.classifiers.values()) {
      if (classifier.classifyContent(content)) {
        return classifier.type();
      }
    }

    return 'text/plain';
  }
}
