import React from "react";
import Modal from "@/app/components/Modal";
import Image from "next/image";
interface IImageModal {
  src: string | any;
  isOpenModal: boolean;
  onClose: () => void;
}
const ImageModal: React.FC<IImageModal> = ({ src, isOpenModal, onClose }) => {
  console.log({ src });
  return (
    <Modal isOpen={isOpenModal} onClose={onClose}>
      <div className="h-40 w-40">
        <Image src={src} alt="image" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
