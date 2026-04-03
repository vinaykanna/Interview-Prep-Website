export interface TopicType {
  id: number;
  name: string;
  slug: string;
}

export interface QuestionType {
  id: number;
  name: string;
  slug: string;
  topic: string;
}

export interface SearchResultType {
  topics: TopicType[];
  questions: QuestionType[];
}
