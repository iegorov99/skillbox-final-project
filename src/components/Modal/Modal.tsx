import { useEffect, useState, useCallback, useRef } from 'react';
import Portal, { createContainer } from './Portal';
import type { MouseEventHandler } from 'react';
import Icon from '../../Icon/Icon';
import { motion } from 'framer-motion';
import { Button } from '../Button';

const MODAL_CONTAINER_ID = 'modal-container-id';
type TProps = {
  className: string;
  onClose?: () => void;
  children: React.ReactNode;
  isButton?: boolean;
  type?: string;
};

const Modal = ({ className, children, isButton, onClose, type }: TProps) => {
  const [isMounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose])

  const handleClose: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      onClose?.();
    }, [onClose]);

  return (
    isMounted
      ? (
        <Portal id={MODAL_CONTAINER_ID}>

          <motion.div
            key="modal"
            className={className + " modal" + `${type ? ` modal--${type}` : ""}`}
            ref={rootRef} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}>
            <div className="modal__content">
              {isButton && <Button
                type="button"
                className="modal__close"
                onClick={handleClose}
                aria-label="Кнопка закрыть модальное окно">
                <Icon id="close-icon-large" className="modal__close-icon" />
              </Button>}
              {children}
            </div>
          </motion.div>
        </Portal>
      )
      : null
  );
};

export default Modal;