import { useTaskContent } from '@/hooks/useTaskContent';
import Modal from '../shared/Modal';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';
import AddTask from './AddTask';
import EditBoard from '../board/EditBoard';
import DeleteBoard from '../board/DeleteBoard';

export default function TaskDetailsWrapper() {
  const { taskEdit, taskAdd, taskDelete, taskDetails, boardEdit, boardDelete } =
    useTaskContent();

  return (
    <Modal>
      {taskDetails && <TaskDetailsContent />}
      {taskEdit && <EditTask />}
      {taskDelete && <DeleteTask />}
      {taskAdd && <AddTask />}
      {boardEdit && <EditBoard />}
      {boardDelete && <DeleteBoard />}
    </Modal>
  );
}
