import Notification from "./notification"

export default {
    info: (content, duration, onClose) =>
        Notification.show({ type: 'info', content, duration, onClose })
    ,
    success: (content, duration, onClose) => {
        Notification.show({ type: 'success', content, duration, onClose })
    },
    fail: (content, duration, onClose) =>
        Notification.show({ type: 'fail', content, duration, onClose })
    ,
    loading: (content, duration, onClose) =>
        Notification.show({ type: 'loading', content, duration, onClose })
    ,
    offline: (content, duration, onClose) =>
        Notification.show({ type: 'offline', content, duration, onClose })
    ,
    hide: () =>
        Notification.destroy()
}

