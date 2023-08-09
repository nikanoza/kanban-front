import { useState } from "react";

type ModalsInfoType = {
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

type key = keyof ModalsInfoType;

const useModals = () => {
  const [modalsInfo, setModalsInfo] = useState<ModalsInfoType>(initialState);

  const updateModals = (property: key) => {
    const data = { ...modalsInfo };
    data[property] = !data[property];
    setModalsInfo(data);
  };

  return { modalsInfo, updateModals };
};

export default useModals;
