import Component from './Component';
import { TipDialogPoolOpenProps } from '.';
import { createRoot } from 'react-dom/client';

export class TipDialogPool {
  open(props: TipDialogPoolOpenProps) {
    let container: any = createRoot(document.createElement('div'));
    container.render(
      <Component
        {...props}
        removeDomFn={() => {
          setTimeout(() => {
            container.unmount();
            container = null;
          }, 300);
        }}
      />,
    );
  }
}
