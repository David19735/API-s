
//``


 


    const botonAnterior=document.querySelector('.btnAnterior');
    const botonSiguiente=document.querySelector('.btnSiguiente');
    let pagina=1;
    botonSiguiente.addEventListener('click',()=>{

        

        if(pagina<1000){
            pagina+=1;
            cargarPeliculas();
        }else{
            return;
        }
        
    
    });

    botonAnterior.addEventListener('click',()=>{
        if(pagina>1){
            pagina-=1;
            cargarPeliculas();
        }
        else{
            return
        }
    })

const cargarPeliculas =async() => {

   try{

    const respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&languaje=es-MX&page=${pagina}`);
    console.log(respuesta);

    if(respuesta.status===200){

        //Respuesta de la API
        const datos=await respuesta.json();
        
        let peliculas='';

        datos.results.forEach((pelicula)=> {

            console.log(pelicula);

            peliculas+=`
            <div class="pelicula">

                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h1>${pelicula.title}</h1>  

            </div>

            
            
            `;
            
        });

        document.getElementById('contenedor').innerHTML=peliculas;


        //Condicionales que estarán presentes si no existen las películas o existe un error
    }else if(respuesta.status===401){
        console.log("La llave es incorrecta");
    }
    else if(respuesta.status===404){
        console.log("La película que buscas no existe");

    }else{
        console.log("Hubo un error desconocido");
    }


   } 
   
   catch(e){
    alert(e);
   }

}

cargarPeliculas();