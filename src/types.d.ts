export interface ThemeProps {
  dark: boolean;
}

export interface BoardType {
  title: string;
  columns: ColumnType[];
  id: string;
}

export interface ColumnType {
  title: string;
  tasks: TaskType[];
  id: string;
}

export interface TaskType {
  title: string;
  description: string;
  subtasks: SubtaskType[];
  id: string;
}

export interface SubtaskType {
  title: string;
  active: boolean;
  id: string;
}

export interface NewBoardType {
  title: string;
  columns: string[];
}

export interface NewTaskType {
  title: string;
  description: string;
  subtasks: string[];
}
