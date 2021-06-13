export function mensajeExito(app, mensaje) {
    app.$swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Orden de pago generada correctamente',
        text: 'Orden de pago número '+mensaje,
        confirmButtonAriaLabel: 'Aceptar',
        showConfirmButton: true,

    })
}
export function mensajeError(app, mensaje) {
    app.$swal.fire({
        position: 'center',
        icon: 'info',
        title: mensaje,
        confirmButtonText: 'aceptar',
        showConfirmButton: false,

        timer: 5000
    })
}
export function mensajeErrUsuario(app, mensaje) {
    app.$swal.fire({
        position: 'center',
        icon: 'error',
        title: mensaje,
        confirmButtonText: 'aceptar',
        showConfirmButton: false,

        timer: 5000
    })
}
