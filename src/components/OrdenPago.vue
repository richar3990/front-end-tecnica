<template>
  <div id="OrdenPago">
    <h1>Generar nueva orden de pago</h1>
  <form v-on:submit.prevent="getOrdenPago">
    <label>Nombre</label><br>
    <input v-model="condominoForm.nombrePagador" type="text" value="Richar Daniel Meza" required><br>
    <label>Documento</label><br>
    <input v-model="condominoForm.documentoNum" type="text" value="3265844" required/><br>
    <label>Numero casa</label><br>
    <input v-model="condominoForm.numeroCasaDep" type="text" value="12" required/><br>
    <label>Valor a pagar</label><br>
    <input v-model="condominoForm.valoraPagar" type="text" value="100000" required/><br>
    <label>id servicio</label><br>
    <select v-model="condominoForm.servicios_idservicios">
      <option value="1">001 - Gastos comunes</option>
      <option value="2">002 -  Reservas Aeas sociales</option>
      <option value="3">003 - Consumos</option>
    </select><br>
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
        servicios_idservicios : '1'
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
<style>
#OrdenPago{
  width: 50%;
  height: 350px;
  border: 1px solid blue;
  text-align: center;
  margin: 20px auto 20px;
}
input[type="submit"]{
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid green;
  width: 85px;
  height: 36px;
  padding: 3px;
  cursor: pointer;
}

#inputBusqueda{
  border: 1px solid;
  margin-right: 5px;
  /*padding: 0 46px 0 8px;*/
  width: 350px;
  height: 32px;
  /*display: block;*/

  font-weight: 300;
  margin-top: 5px;
  border-radius: 4px;


}
button{

  border-radius: 6px;
  border: 1px solid green;
  width: 85px;

  height: 36px;
  padding: 3px;
  background-color: #70b231;
  color: white;
  cursor: pointer;
}
button:disabled{
  border-radius: 6px;
  border: 1px solid green;
  width: 85px;

  height: 36px;
  padding: 3px;
  background-color: gray;
  color: white;

}
table{
  margin: 20px auto 20px;

}

</style>
