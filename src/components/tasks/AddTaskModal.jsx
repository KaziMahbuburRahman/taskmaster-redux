import React from "react";
import Modal from "../ui/Modal";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Add Task">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea
        corporis asperiores earum aspernatur necessitatibus voluptas expedita
        illo veniam, ducimus fugit similique quidem perspiciatis sint cum
        voluptatum, beatae ab modi.
      </p>
    </Modal>
  );
};

export default AddTaskModal;
