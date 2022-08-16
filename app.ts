// loading environment variables from a .env file.
import dotENV from 'dotenv';
const envResult = dotENV.config();
if (envResult.error) {
    new Error("Can't loading data from .env file");
}

// Importing modules.
import express, { Application, NextFunction, Request, Response } from "express";
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'node:path';

// creating an application from express.
const app: Application = express();

// Server middlewares.
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(hpp());
app.use(compression({ level: 9, memLevel: 9, threshold: 100 * 10 }));

// Static folder.
app.use(express.static(path.join(__dirname, 'static')));

// Main route.
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).sendFile(path.join(__dirname, 'static', 'index.html'));
});

// starting the server.
const serverPort: number | string = process.env.SERVER_PORT || 3000;
app.listen(serverPort);
