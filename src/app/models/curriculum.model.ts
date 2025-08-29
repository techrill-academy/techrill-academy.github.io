export interface CurriculumItem {
  id?: number;
  module: string;
  topic: string;
  subTopic: string;
  video?: string | null;
  description?: string;
  moduleDescription?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  moduleId: string;
  name: string;
  subtopics: CurriculumItem[];
}

// New root structure interface for the JSON data
export interface CurriculumData {
  modules: Module[];
}