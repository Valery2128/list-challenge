import { Injectable } from '@angular/core';

export const FEATURE_FLAGS = {
  MOSTRAR_ESTADISTICAS: 'show_stats_tab',
} as const;

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  private _configuracion: Record<string, boolean | string> = {
    [FEATURE_FLAGS.MOSTRAR_ESTADISTICAS]: true,
  };

  constructor() {}

  public async inicializar(): Promise<void> {
    console.log('[RemoteConfig] Online');
  }

  public obtenerFlag(clave: string): boolean {
    return (this._configuracion[clave] ?? false) as boolean;
  }

  public obtenerParametro(clave: string): string {
    return (this._configuracion[clave] ?? '') as string;
  }

  public simularValor(clave: string, valor: boolean | string): void {
    this._configuracion[clave] = valor;
  }
}
