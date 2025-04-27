import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { id: string; children: React.ReactNode; };

const PORTAL_ERROR_MSG ='В разметке нет контейнера портала. Добавьте контейнер портала с правильным атрибутом id.';

const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MSG);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

type containerOptions = { id: string; mountNode?: HTMLElement };

const createContainer = (options : containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;
  
  const portalContainer = document.createElement('div');

  portalContainer.setAttribute('id', id);
  mountNode.appendChild(portalContainer);
};

export { createContainer, PORTAL_ERROR_MSG };
export default Portal;