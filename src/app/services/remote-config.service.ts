import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  
  /* Valores locales para que la app no rompa si Firebase falla */
  private configuracion: Record<string, any> = {
    'show_stats_tab': true,
    'task_limit': 50
  };

  constructor() {}

  /* Simula la carga de datos remotos desde Firebase */
  public async inicializar(): Promise<void> {
    try {
      // Log para verificar que el servicio arranca en consola
      console.log('[RemoteConfig] Sincronizando con Firebase...');
      
      /* En un entorno real aquí haríamos:
         await this.remoteConfig.fetchAndActivate();
      */
    } catch (e) {
      console.warn('Usando configuración local por error en la red');
    }
  }

  public obtenerBooleano(clave: string): boolean {
    return !!(this.configuracion[clave]);
  }

  public obtenerTexto(clave: string): string {
    return String(this.configuracion[clave] || '');
  }

  public obtenerNumero(clave: string): number {
    return Number(this.configuracion[clave] || 0);
  }
}
