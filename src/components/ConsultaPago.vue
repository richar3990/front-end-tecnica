<template>
  <div id="consultaPago">
    <input v-focus v-model="inputNconsulta" id="inputBusqueda" type="text" placeholder="Ingrese N orden de pago o N clientepara realizar consulta"><br>
    <input type="radio" id="uno" value="1" v-model="picked" v-on:change="cambiar">
    <label for="uno">N Orden de pago</label>
    <input type="radio" id="Dos" value="2" v-model="picked" v-on:change="cambiar">
    <label for="Dos">N Cliente</label>
    <div v-if="picked==2">
      <select v-model="selected">
        <option value="1">001 - Consumo</option>
        <option value="2">002 - Credito</option>
        <option value="3">003 - Servicio</option>
      </select>
    </div>
    <button v-on:click="consultar" :disabled="isActive">Buscar</button><br>
    <div id="datosDeuda">
      <table>
        <tr>
          <th>PARÁMETROS</th>
          <th>DESCRIPCIÓN</th>
        </tr>
        <tr>
          <td>CodError</td>
          <td v-if="datosDeudas.codError">{{ datosDeudas.codError }}</td>
          <td v-else>000</td>
        </tr>
        <tr>
          <td>Descripcion</td>
          <td v-if="datosDeudas.descripcion">{{ datosDeudas.descripcion }}</td>
          <td v-else>PROCESO CONFORME</td>
        </tr>
        <tr>
          <td>Codigo Busqueda</td>
          <td>{{inputNconsulta}}</td>
        </tr>
        <tr>
          <td>Codigo Servicio</td>
          <td v-if="datosDeudas.IDSERVICIOS">{{datosDeudas.IDSERVICIOS}}</td>
          <td v-else>001</td>
        </tr>
        <tr>
          <td>Importe Adeudado</td>
          <td v-if="datosDeudas.IMPORTEADEUDADO">{{datosDeudas.IMPORTEADEUDADO}}</td>
          <td v-else>0.00</td>
        </tr>
        <tr>
          <td>Importe Minimo</td>
          <td>0.00</td>
        </tr>
        <tr>
          <td>Importe Comision</td>
          <td>0.00</td>
        </tr>
        <tr>
          <td>Nombre del Cliente</td>
          <td v-if="datosDeudas.IDCONDOMINO">{{datosDeudas.IDCONDOMINO}}</td>
          <td v-else>0.00</td>
        </tr>
      </table>
    </div>
    <div>
      <button v-if="botonActivo==false" v-on:click="habilitarPago">Pagar</button> <button v-on:click="getCuotas">Detalles Cuotas</button>
    </div>

    <div id="detallesCuotas" v-if="isActiveDeuda==true">
      <table>
        <tr>
          <th>Numero de cuota</th>
          <th>Detalle</th>
          <th>Fecha de Vencimiento</th>
          <th>Importe Cuota</th>
          <th>Importe Comision</th>
        </tr>
        <tr v-for="detalle in detallesCuotas" :key="detalle.NUMEROCUOTA">
          <td>{{detalle.NUMEROCUOTA}}</td>
          <td>{{detalle.DETALLECUOTA}}</td>
          <td>{{detalle.FECHAVENCIMIENTO}}</td>
          <td>{{detalle.IMPORTECUOTA}}</td>
          <td>{{detalle.IMPORTECOMISION}}</td>
        </tr>
      </table>

          </div>
    <div v-if="formPago==true" id="pago">
      <form v-on:submit.prevent="procesarPago">
        <label>Nombre</label><br>
        <input v-model="pagoForm.NOMBREFACTURA" ref="foco" type="text" ><br>
        <label>Nit</label><br>
        <input v-model="pagoForm.NITFACTURA" type="text"><br>
        <label>Monto Total</label><br>
          <input v-model="pagoForm.MONTOTOTAL" type="text"><br>


        <input type="submit" value="Procesar Pago">

      </form>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
import {mensajeErrUsuario} from "@/util/seetalert_mensajes";
// import {mensajeError, mensajeExito} from "@/util/seetalert_mensajes";
export default {
  name: 'ConsultaPago',
  components: {
  },
  data(){
    return {
      picked:"1",
      selected: '1',
      botonActivo: false,
      inputNconsulta: '',
      idDeuda: [],
      isActiveDeuda:false,
      datosDeudas: [],
      detallesCuotas: {},
      isActive: false,
      formPago: false,
      montoOrdenpago: '',
      pagoForm:{
        IDUSUARIOS: '1',
        IDORDENES_PAGO:'',
        MONTOTOTAL: '',
        FECHAPAGO: '',
        NOMBREFACTURA: '',
        NITFACTURA: '',
        IDDEUDA: '',
        IDSERVICIO: ''
      }

    }


  },
  directives: {
    focus: {
      inserted: function (el){
        el.focus()
      }
    }
  },
  methods:{
    consultar(){
      var eleccion = this.picked;
      this.isActiveDeuda = false;
      this.formPago = false;
      if (eleccion ==1){
        this.botonPagoar = false;
        this.getOrdenPago();
      }else{
        this.getPorIdCliente();
      }

    },
    getOrdenPago(){
      this.datosDeudas = [];
      this.detallesCuotas = [];
      axios.get('http://localhost:8091/orden-pago/'+this.inputNconsulta)

          .then(res =>{
            if (!res.statusText == "error"){

              this.datosDeudas= res.data;
            }else{

              this.datosDeudas=res.data;
              this.pagoForm.MONTOTOTAL = res.statusText;
              this.pagoForm.IDORDENES_PAGO = this.inputNconsulta;
              this.pagoForm.IDDEUDA = this.datosDeudas.IDDEUDA_CONDOMINO;
              this.pagoForm.IDSERVICIO = this.datosDeudas.IDSERVICIOS;
            }

          });

    },
    getPorIdCliente(){
      this.datosDeudas = [];
      this.detallesCuotas = [];
      axios.get('http://localhost:8091/consulta-condomino/'+this.inputNconsulta+'/'+this.selected)

          .then(res =>{
            if (!res.statusText == "error"){

              this.datosDeudas= res.data;
            }else{

              this.datosDeudas=res.data;
            }

          });

    },
    getCuotas(){

       this.idDeuda = this.datosDeudas.IDDEUDA_CONDOMINO;

      axios.get('http://localhost:8091/consulta-cuotas/'+this.idDeuda)
          .then(resp=>{
            var error = resp.statusText;
              if (error == 'errores'){
              }else{
                this.isActiveDeuda=true;
                this.detallesCuotas = resp.data;
              }

            });

    },
    cambiar(){
      this.datosDeudas = [];
      this.isActiveDeuda= false;
      this.inputNconsulta='';
      this.pagoForm.MONTOTOTAL='';
      this.formPago = false;
      if(this.botonActivo==true){
        this.botonActivo=false;
      }else{
        this.botonActivo=true;
      }

    },
    habilitarPago(){
      if (this.datosDeudas.codError)
      this.formPago=true;

    },
    procesarPago(){
      axios.post('http://localhost:8091/pago-servicio',this.pagoForm)
          .then(res => {
            if (res.statusText == "error") {
              mensajeErrUsuario(this, "Usuario o Contraseña incorrecto");
            }else{
              this.$router.push('consulta-pago');
            }
          });

    },
    foco(){
      this.$refs.foco.focus()
    }
  }
}
</script>
<style>
#consultaPago{
  width: 50%;
  height: 600px;
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

