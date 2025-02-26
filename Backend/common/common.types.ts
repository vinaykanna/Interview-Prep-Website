export interface TopicType {
  id: number;
  name: string;
  parentId?: number;
}

export interface QuestionType {
  id: number;
  name: string;
  answer: string;
  topicId: number;
}

export interface SearchResultType {
  topics: TopicType[];
  questions: QuestionType[];
}
