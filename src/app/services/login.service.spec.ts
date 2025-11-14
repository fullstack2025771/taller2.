import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
//configurar el cliente Http
import { provideHttpClient } from "@angular/common/http";
//herramientas para simular las solicitudes http
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";


// la configuracion especial del entorno de pruebas
describe("pruebas de el servicio de login", () => {
    // definir nuestros Mock: simulacion relacionado con peticiones a un Api
    // configuracion inicial del entorno de pruebas

    let httpMock: HttpTestingController;
    let service: LoginService;

    const credencialMock = {
        email: 'pepita@gmail.com',
        password: '123'
    };

    const tokenMock = '36788264789yxhhghjch'

    beforeEach(() => {
        // configurar el entorno de pruebas
        TestBed.configureTestingModule({

            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    });

    //simular la peticion POST para iniciar sesion
    it("Caso 1: Simular la peticion POST para iniciar sesion", () => {
        const apiUrl = 'http://localhost:9000/iniciarSesion'
        const responseMock = { "mensaje": "Inicio de sesion exitoso" }

        service.login(credencialMock.email, credencialMock.password).subscribe(
            (res) => {
                expect(res).toEqual(responseMock);
            }
        )
        // simulacion a peticion a un back
        const req = httpMock.expectOne(apiUrl)  //la simulacion se espera que sea igual a la url dada.
        expect(req.request.method).toBe('POST')
        req.flush(responseMock)

        });
        it("Caso 2: Obtener token", () => {
            localStorage.setItem('token', tokenMock);
            expect(service.getToken()).toBe(tokenMock); // s
            // 
        });
   


        it("Caso 3: Verificar si esta loggeado o no", () => {
                localStorage.setItem('token', tokenMock);
                expect(service.isLoggedIn()).toBeTrue();  // se debe reforzar si es verdadero
        });



        it("Caso 4: Verificar si se cierra sesion", () => {
                        localStorage.setItem('token', tokenMock);
                        service.logout(); // primero cierro sesion
                        expect(localStorage.getItem('token')).toBeNull(); //validar si el cierre fue exitoso

                    
            });
        
    
});