export const modalAction = (show, data) => {
    return {
        type: 'MODAL',
        show: show,
        component: data,
    }
}