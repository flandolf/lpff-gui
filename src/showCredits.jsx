import { Button, Modal } from 'antd';
import { useState } from 'react';
const showCredits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal title="Credits" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Chessboard library: <a href='https://github.com/Clariity/react-chessboard'>react-chessboard</a></p>
        <p>UI library: <a href='https://ant.design/'>antd</a></p>
        <p>Chess library: <a href='https://github.com/jhlywa/chess.js'>chess.js</a></p>
      </Modal>
    </div>
  );
};
export default showCredits;