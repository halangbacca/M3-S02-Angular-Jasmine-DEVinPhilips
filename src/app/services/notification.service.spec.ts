import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NOTIFICATIONS_MOCK } from '../utils/notifications-mock';

describe('NotificationService', () => {
  let httpTestingController: HttpTestingController;
  let notificationService: NotificationService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('getNotificationsApi - deve retornar uma lista de notificações', () => {
    notificationService.getNotifications().subscribe((data) => {
      expect(data).toEqual(NOTIFICATIONS_MOCK);
    });
  });

  it('getNotificationsApi - deve executar o método com sucesso', () => {
    notificationService.getNotificationsApi().subscribe();

    const resultado = httpTestingController.expectOne(
      `${notificationService.BASE_URL}`
    );

    expect(resultado.request.method).toEqual('GET');
  });

  it('addNotificationApi - deve adicionar um objeto com sucesso', () => {
    const parametro = 'valor 1';

    notificationService.addNotificationApi(parametro).subscribe();

    const resultado = httpTestingController.expectOne(
      `${notificationService.BASE_URL}`
    );

    expect(resultado.request.method).toEqual('POST');
    expect(resultado.request.body).toEqual(parametro);
  });

  it('editNotificationApi - deve atualizar os dados com sucesso', () => {
    const parametro = { id: 1, valor: 'Aula teste de Angular', ativo: true };

    notificationService.editNotificationApi(parametro).subscribe();

    const resultado = httpTestingController.expectOne(
      `${notificationService.BASE_URL}/${parametro.id}`
    );

    expect(resultado.request.method).toEqual('PUT');
    expect(resultado.request.body).toEqual(parametro);
  });

  it('removeNotification - deve remover os dados com sucesso', () => {
    const parametro = { id: 1, valor: 'Aula teste de Angular', ativo: true };

    notificationService.removeNotification(parametro.id).subscribe();

    const resultado = httpTestingController.expectOne(
      `${notificationService.BASE_URL}/${parametro.id}`
    );

    expect(resultado.request.method).toEqual('DELETE');
    expect(resultado.request.body).toBeNull();
  });
});
