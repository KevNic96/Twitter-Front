import * as yup from 'yup';

// Punto 6)

export const validationSchema = yup.object().shape({
    name: yup.string().required('Nombre requerido'),
    username: yup.string().required('Usuario requerido'),
    email: yup.string().email('Email inválido').required('Email requerido'),
    password: yup.string().required('Contraseña requerida').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Las contraseñas deben coincidir').required('Confirmar contraseña requerida')
})