<template>
  <div id="login">
    <form v-on:submit.prevent="logear">
    <label>Entidad:</label>
    <input type="text" value="Tiendas Roxxi" readonly style="background: gray; color: white; text-align: center">
    <label>Usuario:</label>
    <input v-model="userForm.nombreUsuario" type="text">
    <label>Contrasena:</label>
    <input v-model="userForm.usuarioPass" type="password">
    <input type="submit" value="Ingresar">
    </form>
  </div>
</template>
<script>
import axios from "axios";
import {mensajeErrUsuario} from "@/util/seetalert_mensajes";

export default {
  name: 'Login',
  data() {
    return {
      userForm: {
        nombreUsuario: '',
        usuarioPass: '',
        idEntidad: '1'
      }
    }
  },
  methods: {
    logear() {
      axios.post('http://localhost:8091/login',this.userForm)
          .then(res => {
            console.log(res);
            if (res.statusText == "error") {
              mensajeErrUsuario(this, "Usuario o Contraseña incorrecto");
            }else{
              this.$router.push('consulta-pago');
            }
          });

    }

  }
}
</script>
<style>

#login {
  width: 20%;
  border: 1px solid blue;
  text-align: center;
  margin: 20px auto 20px;


}

#login input[type="text"],
#login input[type="email"],
#login input[type="password"] {
  display: block;
  width: 95%;
  margin-left: 2px;
  margin-top: 2px;
  margin-bottom: 5px;
}

#login input[type="submit"] {
  margin-top: 2px;
  margin-bottom: 5px;
}



</style>
