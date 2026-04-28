import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _almacen: Storage | null = null;

  constructor(private storage: Storage) {}

  public async inicializar(): Promise<void> {
    if (this._almacen) return;
    this._almacen = await this.storage.create();
  }

  public async guardar(clave: string, valor: any): Promise<void> {
    await this._almacen?.set(clave, valor);
  }

  public async obtener<T>(clave: string, valorPorDefecto: T): Promise<T> {
    const datos = await this._almacen?.get(clave);
    return datos ?? valorPorDefecto;
  }

  public async eliminar(clave: string): Promise<void> {
    await this._almacen?.remove(clave);
  }
}
