<template>
  <div id="OrdenPago">
  <form v-on:submit.prevent="getOrdenPago">
    <label>Nombre</label><br>
    <input v-model="condominoForm.nombrePagador" type="text" value="Richar Daniel Meza"><br>
    <label>Documento</label><br>
    <input v-model="condominoForm.documentoNum" type="text" value="3265844"/><br>
    <label>Numero casa</label><br>
    <input v-model="condominoForm.numeroCasaDep" type="text" value="12"/><br>
    <label>Valor a pagar</label><br>
    <input v-model="condominoForm.valoraPagar" type="text" value="100000"/><br>
    <label>id servicio</label><br>
    <input v-model="condominoForm.servicios_idservicios" type="text" value="1"/><br>
    <h1>{{condominoForm.servicios_idservicios}}</h1>
    <input type="submit" value="Enviar">
  </form>
  </div>
</template>
<script>
import axios from 'axios'
import {mensajeError, mensajeExito} from "@/util/seetalert_mensajes";
export default {
  name: 'OrdenPago',

  mounted() {
    this.getCondomino();
  },
  data(){
    return {
      condomino: [],
      condominoForm: {
        nombrePagador : '',
        documentoNum : '',
        numeroCasaDep : '',
        valoraPagar : '',
        servicios_idservicios : ''
      }

    }
  },
  methods:{
    getCondomino(){
      axios.get('http://localhost:8091/condominio/1')
          .then(res =>{
            if (res.status == 200){
              this.condomino = res.data;
            }
          });
    },
    getOrdenPago(){
      axios.post('http://localhost:8091/condomino',this.condominoForm)
          .then(res =>{
            if (res.statusText=="error"){
              mensajeError(this, "No se ha encontrado nigun cliente con los datos proporcionados");

            }else{
              mensajeExito(this, res.data);
              this.limpiarCampos();
            }
          });
    },
    limpiarCampos(){
      this.condominoForm.nombrePagador = '';
      this.condominoForm.documentoNum = '';
      this.condominoForm.numeroCasaDep = '';
      this.condominoForm.valoraPagar = '';
      this.condominoForm.servicios_idservicios = '';
    }
  }
}

</script>
