import React from 'react';
import { Modal } from 'react-native';
import SocialWebview from './SocialWebview';

type Props = {
  source: { uri: string };
  visible: boolean;
  closeModal(): void;
};

const SocialWebviewModal: React.FC<Props> = ({
  visible,
  source,
  closeModal,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      style={{ flex: 1 }}
    >
      <SocialWebview source={source} closeModal={closeModal} />
    </Modal>
  );
};

export default SocialWebviewModal;
