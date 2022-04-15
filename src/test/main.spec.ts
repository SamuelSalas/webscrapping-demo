import { Server } from '../server';
import { App } from '../app';
import supertest from 'supertest';
import httpStatus from 'http-status';

let app: App;
let server: Server;
 
beforeAll(async () => {
  app = new App();
  await app.start();
  server = (app.httpServer as unknown) as Server;
 });
 
afterAll(async () => {
  await app.stop();
});

describe('Hello World', () => {
  it('t should return hello world message', async () => {
    await supertest(server)
      .get('/')
      .expect(httpStatus.OK)
      .then(response => {
        expect(response.text).toEqual('Hello world!');
      })
    }
  );
});

describe('Search', () => {
  it('Should return search items', async () => {
    await supertest(server)
      .get('/search')
      .query({ name: 'jordan'})
      .expect(httpStatus.OK)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.arrayContaining([{
            name: expect.any(String),
            subTitle: expect.any(String),
            link: expect.any(String),
            isPrime: expect.any(Boolean),
            price: expect.any(String),
          }]));
      })
    }, 30000
  );

  it('Should fail when sending two name queries', async () => {
    await supertest(server)
      .get('/search')
      .query({ name: ["jordan", "nintendo"]})
      .expect(httpStatus.BAD_REQUEST)
      .then(response => {
        expect(response.text).toEqual("Only one item name");
      })
    }
  );

  it('Should fail when sending no queries', async () => {
    await supertest(server)
      .get('/search')
      .expect(httpStatus.BAD_REQUEST)
      .then(response => {
        expect(response.text).toEqual("Item Name is missing");
      })
    }
  );
});