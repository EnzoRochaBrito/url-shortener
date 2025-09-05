import Fastify from "fastify";
import { Type } from '@sinclair/typebox';
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { DBFactory } from "./db/db.factory";
import { Shortener } from "./shortener";
import nodeCron from "node-cron";
import cors from '@fastify/cors'

const Url = Type.Object({
    url: Type.String({format: 'uri'})
})

const Code = Type.Object({
    code: Type.String()
})

let shortener: Shortener;

DBFactory.build('postgre')
    .then((db) => {
        shortener = new Shortener(db)
    })

nodeCron.createTask('*/10 * * * *', () => {
    shortener.deleteExpiredUrls()
    console.log('deleting expired urls - ', Date.now())
})

const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>()

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST']
})

fastify.post(
    '/short', 
    {
        schema: {
            body: Url
        },
    },
    async (request, reply) => {
        const url = request.body.url;
        const randomCode = await shortener.saveUrl(url);
        reply.status(201).send({code: randomCode});
    }
)

fastify.get(
    '/:code',
    {
        schema: {
            params: Code
        }
    },
    async (request, reply) => {
        const urlCode = request.params.code;
        const url = await shortener.searchByCode(urlCode);
        reply.redirect(url, 302)
    }
)

fastify.listen({
    port: 9999,
    host: '0.0.0.0'
})