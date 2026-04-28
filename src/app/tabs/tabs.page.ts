import { Component, OnInit } from '@angular/core';
import { RemoteConfigService, FEATURE_FLAGS } from '../services/remote-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  public mostrarEstadisticas = false;

  constructor(private remoteConfig: RemoteConfigService) {}

  ngOnInit(): void {
    this.mostrarEstadisticas = this.remoteConfig.obtenerFlag(FEATURE_FLAGS.MOSTRAR_ESTADISTICAS);
  }
}
