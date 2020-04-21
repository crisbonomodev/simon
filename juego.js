//constantes para obtener los elementos HTML
      const celeste = document.getElementById('celeste')
      const rojo = document.getElementById('rojo')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ULTIMO_NIVEL = 10;
      class Juego { //esta clase va a tener la logica de nuestro juego
        constructor() {
            //vamos a poner un setTimeout para que no arranque ni bien el usuario pulsa el boton
                this.inicializar();
                this.generarSecuencia();
                setTimeout(this.siguienteNivel,500);
        }
        //inicio del juego
        inicializar() {
            //ocultamos el boton empezar agregando la clase de CSS hide a las que tiene con classlist.add().
            // Todos los elementos que aparezcan en HTML los podemos 
            //manejar desde JS
            this.toggleBtnEmpezar();
          
          //indicamos el nivel inicial

          this.nivel = 1;
          //vamos a indicar el this de la funcion elegir color
          this.elegirColor = this.elegirColor.bind(this);
          this.siguienteNivel = this.siguienteNivel.bind(this);
          this.colores = { //vamos a guardar los colores que inicializamos arriba para tenerlos a mano
              celeste,
              rojo,
              naranja,
              verde
          }
        }

        toggleBtnEmpezar() {
            if(btnEmpezar.classList.contains('hide')) {
                btnEmpezar.classList.remove('hide');
            } else {
                btnEmpezar.classList.add('hide');
            }
        }
        generarSecuencia(){
            //vamos a generar la secuencia de colores que se iran encendiendo
            //Math.random *4 nos dara un valor entre 0 y 3, que Math.floor va a redondear para abajo, dejandonos con un entero(0,1,2,3)
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
            
        }

        siguienteNivel(){
            //agregamos un subnivel, para que cada vez que el usuario pasa de nivel, empiece en 0
            this.subnivel = 0;
            //cada vez que se llegue a un nuevo nivel, se va a iluminar la secuencia
            this.iluminarSecuencia();
            //tomamos el input del jugador
            this.agregarEventosClick();

            
        }
        //vamos a realizar un metodo que asigne cada numero entre 0 y 3 a un color
        transformarNumeroAColor(numero) {
            switch (numero) {
                case 0:
                return 'celeste';    
                case 1:
                return 'rojo';
                case 2:
                return 'naranja';    
                case 3:
                return 'verde';    
                }
        }

        transformarColorANumero(nombreColor) {
            switch (nombreColor) {
                case 'celeste':
                return 0;    
                case 'rojo':
                return 1;
                case 'naranja':
                return 2;    
                case 'verde':
                return 3;    
                }
        }

        //metodo para eliminar cada div segun la secuencia aleatoria generada
        iluminarSecuencia(){
            for (let i = 0; i < this.nivel; i++) {
                //vamos a guardar el o los colores en la variable color transformando con la funcion segun el nivel
                let color = this.transformarNumeroAColor(this.secuencia[i]);
                //vamos a llamar a la funcion iluminarColor cada un cierto tiempo, segun el nivel, para que no se ilumine todo rapido y de golpe
                setTimeout(()=>this.iluminarColor(color),1000*i);
                
                
            }
        }
        //funcion para agregar la clase CSS light al color indicado
        iluminarColor(color) {
                       this.colores[color].classList.add('light');
            setTimeout(() => this.apagarColor(color),500);
        }
        //funcion para quitar la clase CSS light al color indicado
        apagarColor(color) {
            this.colores[color].classList.remove('light');
        }

        agregarEventosClick(){
            //agregamos los listeners para capturar los clicks del usuario
            //con el bind, indicamos a la funcion que siempre responda al this de elegirColor,para evitar problemas
            this.colores.celeste.addEventListener('click',this.elegirColor)
            this.colores.verde.addEventListener('click',this.elegirColor)
            this.colores.rojo.addEventListener('click',this.elegirColor)
            this.colores.naranja.addEventListener('click',this.elegirColor)
        };
        eliminarEventosClick(){
            //agregamos los listeners para capturar los clicks del usuario
            //con el bind, indicamos a la funcion que siempre responda al this de elegirColor,para evitar problemas
            this.colores.celeste.removeEventListener('click',this.elegirColor)
            this.colores.verde.removeEventListener('click',this.elegirColor)
            this.colores.rojo.removeEventListener('click',this.elegirColor)
            this.colores.naranja.removeEventListener('click',this.elegirColor)
        };
        //el metodo elegirColor recibe la data del evento click del usuario
        elegirColor(ev){
            console.log(ev);
            //capturamos el color que presiona el usuario
            const nombreColor = ev.target.dataset.color;
            //convertimos a numero el color que selecciona el usuario
            const numeroColor = this.transformarColorANumero(nombreColor);
            //iluminamos el color que apreto el usuario
            this.iluminarColor(nombreColor);
            //comprobacion de lo que presiona el usuario, si elige bien, se incrementa el subnivel
            if (numeroColor === this.secuencia[this.subnivel]) {
                this.subnivel++;
                //comprobamos si el subnivel es igual al nivel en que esta el usuario, si es asi, incrementamos el nivel
            if (this.subnivel === this.nivel) {
                this.nivel++;
                //eliminamos los eventos click que ya ocurrieron
                this.eliminarEventosClick();
                if (this.nivel === (ULTIMO_NIVEL +1)) {
                    this.ganarJuego();

                } else {
                    setTimeout(this.siguienteNivel,1500);
                }
            } 
                } else {
                 //PIERDE
                this.perderJuego();
            }
            
        } 
        ganarJuego(){
            swal('Ganaste!','Felicitaciones!','success')
            .then(this.inicializar());
        }  
        perderJuego(){
            swal('Perdiste!','Intenta de nuevo!','error')
            .then(()=> {
                this.eliminarEventosClick();
                this.inicializar();
            });
        }
      }    
    
      function empezarJuego() {
        //vamos a inicializar una nueva clase Juego
        var juego = new Juego();
      }

