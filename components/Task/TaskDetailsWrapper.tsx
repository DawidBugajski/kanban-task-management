import { useTaskContent } from '@/hooks/useTaskContent';
import Modal from '../shared/Modal';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';

export default function TaskDetailsWrapper() {
  const { taskEdit, taskAdd, taskDelete, taskDetails } = useTaskContent();

  return (
    <Modal>
      {taskDetails && <TaskDetailsContent />}
      {taskEdit && <EditTask />}
      {taskDelete && <DeleteTask />}
      {taskAdd && <div>ADD TASK</div>}
    </Modal>
  );
}
