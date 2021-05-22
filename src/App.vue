<template>
  <div>
      <h1>Libreria La Paz</h1>
        <form @submit.prevent="estatusEditar ? updateLibro() : addLibro()">
            <p>
              Nombre del libro <input type="text" v-model="name">
              Autor: <input type="text" v-model="autor">
              <button type="submit" class="agregar"><b>{{ estatusEditar ? "Editar": "Agregar" }}</b></button>
              <button v-if="estatusEditar" @click="estatusEditar= false, name='', autor='' " class="agregar"><b>Cancelar</b></button>
            </p>
        </form> 
  
        <img src="https://acegif.com/wp-content/uploads/loading-29.gif" v-if="cargando">


        <ul>
          <li v-for="libro in Libros" :key="libro.id">
                 {{libro.name}} de {{libro.autor}}   
                  <button @click="deleteLibro(libro)" class="editar"><img  src="./borrar.png" class="image" alt="Borrar"/></button>
                  <button @click="selectLibro(libro)" class="editar"><img  src="./editar.png" class="image" alt="Editar"/></button>
          </li>
        </ul>
    </div>
</template>

<script>
import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      id: "",
      name: "",
      autor:"",
      cargando: false,
      estatusEditar: false
    }
  },
  created() {
    this.listarLibros();
  },
  methods: {
    async listarLibros(){

          this.cargando = true;
          const data = await db.collection("Libros").get();
          this.Libros = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
          this.cargando = false;
          console.log(this.Libros);

    },
    async addLibro() {
        await db.collection('Libros').add(
          {
            name:  this.name,
            autor: this.autor
          }
        )
        this.name = "";
        this.autor = "";
        this.listarLibros();
    },
    async deleteLibro(libro){

      if(confirm(`Estas seguro que desaeas eliminar ${libro.name} del autor ${libro.autor}`)){
        await db.collection('Libros').doc(libro.id).delete();
        this.listarLibros();
      }

    },
    selectLibro(libro){
      this.estatusEditar = true;
      this.id = libro.id;
      this.name = libro.name;
      this.autor =libro.autor;
    },
    async updateLibro(){
      await db.collection('Libros').doc(this.id).set(
        {
          name: this.name,
          autor: this.autor
        }
      )

      this.estatusEditar = false;
      this.id = "";
      this.name = "";
      this.autor = "";
      this.listarLibros();
      
    }
  },  
}
</script>
<style>
h1{
  color:rgb(234, 190, 63);
  font-size: 45px;
  text-align: center;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lobster/v23/neILzCirqoswsqX9zo-mM5Ez.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  color: white;
  font-size: 40px;
  margin-top: 60px;
}

body{
  background: radial-gradient(rgb(153, 5, 5),black);
}
.editar{
  background: white;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 40px;
  float:right;
}
input{
  text-align: center;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  background: #e9bdbd;
}
form{
  text-align: center;
}
.agregar{
  background: white;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 27px;
  text-align: center;
}
.image{
  float: right;
  width: 30px;
  height: 30px;
}
ul{
  list-style-image: url("./estrella.gif");
}
</style>