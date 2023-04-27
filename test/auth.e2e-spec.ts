import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(60000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handle Sign Up', () => {
    const email = "1234@gmai.com";
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password: "123"})
      .expect(201)
      .then(res => {
        const {id, email} = res.body;

        expect(id).toBeDefined();
        expect(email).toEqual(email);
      })
  });
});
