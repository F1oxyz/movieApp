import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-funciones',
  imports: [],
  templateUrl: './funciones.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Funciones {
  mensaje = "";
  usuarios = ['Migue', 'Karol', 'Malagón'];
  usuarios_resp = this.usuarios;
  estado = "";
  mayor = 0;
  menor = 0;
  precio = 0;
  descuento = 0;
  precio_total = 0;

  saludo = "";
  resultadoSuma = 0;
  precioFinal = 0;

    // ejemplos de parametros obligatorios
  areaRectangulo = 0;
  saludoIdioma = "";

  saludar() {
    this.mensaje = "Hola mundo!";
  }

  eliminarUsuarios() {
    this.usuarios = [];
  }

  mostrarUsuarios() {
    console.log(this.usuarios);
  }

  recuperarUsuarios() {
    this.usuarios = this.usuarios_resp;

  }

  verificarEstado(calificacion: number) {
    (calificacion >= 6) ? this.estado = "Aprobado" : this.estado = "Reprobado";
  }

  verificarNumeros(num1: number, num2: number) {
    if(num1 > num2) {
      this.mayor = num1;
      this.menor = num2;
    } else{
      this.mayor = num2;
      this.menor = num1;
    }
  }

  calcularPrecio(precio: number, descuento:number){
    this.precio = precio;
    this.descuento = descuento;
    this.precio_total = precio - (precio * descuento / 100);
  }

  enviarSaludo(nombre?: string){
    // console.log(nombre ?? "Hola");
    (nombre) ? this.saludo = `Hola, ${nombre}` : this.saludo = "Hola!";

  }

  sumaOpcional(num1: number, num2?: number){
    if(num2){
      this.resultadoSuma = num1 + num2;
      return; // evita que se ejecute el codigo siguiente
    } else {
      this.resultadoSuma = num1;
    }
  }

  calcularOpcional(precio: number, descuento?: number){
    if(descuento){
      this.precioFinal = precio - (precio * descuento / 100);
      return; // evita que se ejecute el codigo siguiente
    } else {
      this.precioFinal = precio;
    }
  }

  // NUEVAS FUNCIONES POR DEFECTO

  // EJ1: Calcular area de un rectangulo con altura por defecto 5
  calcularArea(base: number, altura: number = 5) {
    this.areaRectangulo = base * altura;
  }

  // EJ2: Saludar en diferentes idiomas, español por defecto
  saludarEnIdioma(nombre: string, idioma: string = 'español') {
    switch(idioma.toLowerCase()) {
      case 'español':
        this.saludoIdioma = `¡Hola ${nombre}!`;
        break;
      case 'ingles':
        this.saludoIdioma = `Hello ${nombre}!`;
        break;
      case 'frances':
        this.saludoIdioma = `Bonjour ${nombre}!`;
        break;
      default:
        this.saludoIdioma = `¡Hola ${nombre}!`;
    }
  }
}
