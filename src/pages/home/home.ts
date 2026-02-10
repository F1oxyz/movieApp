import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Contacto { //usualmente se ponene en archivo aparte 
  nombre: string;
  telefono: string;
  email: string;
  redesSociales: string[];
  telefonoOculto: boolean;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

  contacto_oculto = true;
  rol = "user";
  showContent = true;
  
  // Nuevas propiedades para @switch
  planActual: 'basico' | 'pro' | 'premium' | 'enterprise' | '' = '';
  estadoPedido: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado' | '' = '';
  
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  contactos: Contacto[] = [
    {nombre: 'Juan Pérez', telefono: '123-456-7890', email: 'juan.perez@outlook.com', redesSociales: ['instagram', 'x'], telefonoOculto: true},
    {nombre: 'María Gómez', telefono: '987-654-3210', email: 'maria.gomez@gmail.com', redesSociales: ['github', 'linkedin'], telefonoOculto: true},
    {nombre: 'Carlos López', telefono: '555-123-4567', email: 'carlos.lopez@gmail.com', redesSociales: ['github', 'youtube'], telefonoOculto: true},
  ]

  private coloresRedesSociales: { [key: string]: string } = {
    'facebook': 'bg-white',
    'instagram': 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    'x': 'bg-black',
    'linkedin': 'bg-white',
    'youtube': 'bg-white',
  };

  verSpoiler(){
    this.showContent = !this.showContent;
  }

  serAdmin(){
    this.rol = "Admin";
  }

  verNumero(contacto: Contacto){
    contacto.telefonoOculto = !contacto.telefonoOculto;
  }

  // Nuevos métodos para @switch
  cambiarPlan(plan: 'basico' | 'pro' | 'premium' | 'enterprise'){
    this.planActual = plan;
  }

  cambiarEstadoPedido(estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado'){
    this.estadoPedido = estado;
  }

  // Método para obtener el color de fondo según la red social
  obtenerColorRedSocial(redSocial: string): string {
    return this.coloresRedesSociales[redSocial.toLowerCase()] || 'bg-gray-500';
  }
}