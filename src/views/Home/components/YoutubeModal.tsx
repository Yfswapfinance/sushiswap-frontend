import React from 'react'
import ReactPlayer from 'react-player'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

interface IProps {
  popUp: boolean
  toggleModal: Function
}

const YoutubeModal: React.FC<IProps> = ({ popUp, toggleModal }) => {
  return (
    <Modal
      open={popUp}
      showCloseIcon={false}
      closeOnOverlayClick
      onClose={() => toggleModal()}
      styles={{
        modal: {
          maxWidth: '70vw',
          width: '100%',
          padding: 'unset',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.5)',
        },
        closeButton: {
          position: 'absolute',
          top:0,
          background: 'white',
        },
      }}
      center
    >
      <ReactPlayer
        url="https://youtu.be/NheGX8Ksc-c"
        width="100%"
        height="60vh"
      />
    </Modal>
  )
}

export default YoutubeModal
