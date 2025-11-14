
import { TestBed } from '@angular/core/testing';  //configurar el entorno de pruebas
import { EjemploService } from './ejemplo.service'; //servicios o componentes que quieran probar


// grupo de pruebas
describe('EjemploService', () => {
  let service: EjemploService;


  //configurar entorno de pruebas y inyectar lo que se necesita
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });


  it('Debería sumar 2 números correctamente', ()=>{
    const resultado = service.suma(2,5);
    expect(resultado).toBe(7);
  })
});



