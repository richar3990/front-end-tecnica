<template>
  <div id="consultaPago">
    <input v-model="inputNconsulta" id="inputBusqueda" type="text" placeholder="Ingrese N orden de pago o N clientepara realizar consulta"><br>
    <input type="radio" id="uno" value="1" v-model="picked">
    <label for="uno">N Orden de pago</label>
    <input type="radio" id="Dos" value="2" v-model="picked">
    <label for="Dos">N Cliente</label>
    <div v-if="picked==2">
      <select v-model="selected">
        <option value="1">001 - Consumo</option>
        <option value="2">002 - Credito</option>
        <option value="3">003 - Servicio</option>
      </select>
    </div>
    <button v-on:click="consultar">Buscar</button><br>
    <div id="datosDeuda" v-if="datosDeuda===[]">
      <h1>Hola</h1>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
// import {mensajeError, mensajeExito} from "@/util/seetalert_mensajes";
export default {
  name: 'ConsultaPago',
  components: {
  },
  data(){
    return {
      picked:"1",
      selected: '1',
      inputNconsulta: '',
      datosDeuda: []
    }


  },
  methods:{
    consultar(){
      var eleccion = this.picked;
      console.log(eleccion);
      this.getOrdenPago();
    },
    datosdeDeuda(){

    },
    getOrdenPago(){
      axios.get('http://localhost:8091/orden-pago/'+this.inputNconsulta)
          .then(res =>{
            // if (res.status == 200){
            //   this.condomino = res.data;
            // }
            // console.log(this.condomino);
            console.log(res);
          });
    }
  }
}
</script>
<style>
#consultaPago{
  width: 50%;
  height: 150px;
  border: 1px solid blue;
  text-align: center;
  margin: 20px auto 20px;
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

</style>

