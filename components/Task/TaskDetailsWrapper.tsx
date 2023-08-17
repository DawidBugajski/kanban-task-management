import { useTaskContent } from '@/hooks/useTaskContent';
import Modal from '../shared/Modal';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';
import AddTask from './AddTask';

export default function TaskDetailsWrapper() {
  const { taskEdit, taskAdd, taskDelete, taskDetails } = useTaskContent();

  return (
    <Modal>
      {taskDetails && <TaskDetailsContent />}
      {taskEdit && <EditTask />}
      {taskDelete && <DeleteTask />}
      {taskAdd && <AddTask />}
    </Modal>
  );
}
