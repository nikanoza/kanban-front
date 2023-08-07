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
