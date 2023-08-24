import { useTaskContent } from '@/hooks/useTaskContent';
import Modal from './shared/Modal';
import { EditTask } from './Task/EditTask';
import { DeleteTask } from './Task/DeleteTask';
import { TaskDetailsContent } from './Task/TaskDetailsContent';
import AddTask from './Task/AddTask';
import EditBoard from './board/EditBoard';
import DeleteBoard from './board/DeleteBoard';
import AddBoard from './board/AddBoard';

export default function ModalWrapper() {
  const {
    taskEdit,
    taskAdd,
    taskDelete,
    taskDetails,
    boardEdit,
    boardDelete,
    boardAdd,
  } = useTaskContent();

  return (
    <Modal>
      {taskDetails && <TaskDetailsContent />}
      {taskEdit && <EditTask />}
      {taskDelete && <DeleteTask />}
      {taskAdd && <AddTask />}
      {boardEdit && <EditBoard />}
      {boardDelete && <DeleteBoard />}
      {boardAdd && <AddBoard />}
    </Modal>
  );
}
