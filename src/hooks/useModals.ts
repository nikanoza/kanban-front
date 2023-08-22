import { useState } from "react";

export type ModalsInfoType = {
  Task: boolean;
  NewTask: boolean;
  EditTask: boolean;
  DeleteTask: boolean;
  NewBoard: boolean;
  EditBoard: boolean;
  DeleteBoard: boolean;
};

const initialState: ModalsInfoType = {
  Task: false,
  NewTask: false,
  EditTask: false,
  DeleteTask: false,
  NewBoard: false,
  EditBoard: false,
  DeleteBoard: false,
};

export type key = keyof ModalsInfoType;

const useModals = () => {
  const [modalsInfo, setModalsInfo] = useState<ModalsInfoType>(initialState);

  const updateModals = (property: key) => {
    const data = { ...modalsInfo };
    data[property] = !data[property];
    setModalsInfo(data);
  };

  const openEditTask = () => {
    setModalsInfo((state) => {
      return { ...state, Task: false, EditTask: true };
    });
  };

  const openDeleteTask = () => {
    setModalsInfo((state) => {
      return { ...state, Task: false, DeleteTask: true };
    });
  };

  return { modalsInfo, updateModals, openEditTask, openDeleteTask };
};

export default useModals;
