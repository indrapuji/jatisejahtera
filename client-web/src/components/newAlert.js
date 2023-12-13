import Swal from 'sweetalert2'

const newAlert = ({status, message}) => {
  return Swal.fire({
    icon: `${status}`,
    title: `${message}`,
    showConfirmButton: false,
    timer: 2000
  })
}

export default newAlert
