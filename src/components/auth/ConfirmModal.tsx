import Button from './Button';

type ModalProps = {
  title: string;
  content: string;
  button: {
    text: string;
    onClick: () => void;
  };
};

const ConfirmModal = ({ title, content, button }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="w-full max-w-[400px] rounded-2xl bg-etc-white px-8 py-5 text-center">
        <div className="py-5">
          <h2 className="mb-4 text-title-lb text-grayscale-900">{title}</h2>
          <p className="text-label-lm text-grayscale-900">{content}</p>
        </div>
        <Button
          category="modal"
          label={button.text}
          handleClick={button.onClick}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
