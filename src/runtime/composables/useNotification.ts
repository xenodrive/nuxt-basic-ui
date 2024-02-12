import { reactive, useState } from '#imports';

type BuiNotification = {
  id: number;
  message: string;
  shown: boolean;
  type: string;
  timerId: any;
  closeable: boolean;
  close: () => void;
};

let id = 0;

type Options = {
  type?: 'error' | 'warning' | 'info' | 'message';
  duration?: number;
  closeable?: boolean;
};

export default function () {
  const notifications = useState<BuiNotification[]>(() => []);

  function error(e: string, opts: Options = {}) {
    console.error(e);
    return message(e, { ...opts, type: 'error' });
  }

  function warning(e: string, opts: Options = {}) {
    console.warn(e);
    return message(e, { ...opts, type: 'warning' });
  }

  function info(e: string, opts: Options = {}) {
    console.info(e);
    return message(e, { ...opts, type: 'info' });
  }

  function message(e: string, opts: Options = {}) {
    const item: BuiNotification = reactive({
      id: id++,
      message: e,
      shown: true,
      type: opts.type ?? 'message',
      timerId: setTimeout(() => item.close(), opts.duration ?? 3000),
      closeable: opts.closeable ?? false,
      close: () => {
        item.shown = false;
        clearTimeout(item.timerId);
      },
    });

    notifications.value.push(item);
  }

  return {
    notifications,

    error,
    warning,
    info,
    message,
  };
}
