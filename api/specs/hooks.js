import request from "supertest";
import faker from "faker";

import config from "../util/config";
// TODO : Make a main hook here

// import { User } from "../src/models";

// let userOjb = {
//     username: faker.name.findName(),
//     email: faker.internet.email(),
//     password: "1234567890",
// };

// let globalUser;
// let config;
// if (!global.env) {
//     try {
//         config = require("../src/config.js");
//         global.env = config;
//     } catch (err) {
//         throw err;
//     }
// }

// exports.mochaHooks = {
//     beforeAll() {
//         return new Promise((resolve) => {
//             global.onMocha = true;
//             let app;
//             if (!global.acf) {
//                 let main = require("../src/index");
//                 main.run().then((appp) => {
//                     app = appp;
//                     User.create(userOjb)
//                         .then(async (newUser) => {
//                             newUser.verified = 1;
//                             await newUser.save();
//                             globalUser = newUser;
//                             request(app)
//                                 .post("/api/v1/users/sign_in")
//                                 .set("Content-type", "application/json")
//                                 .set("Accept", "application/json")
//                                 .send(JSON.stringify(userOjb))
//                                 .then((res) => {
//                                     globalUser.token = res.body.token;
//                                     global.user = globalUser;
//                                     resolve();
//                                 })
//                                 .catch((err) => {
//                                     resolve();
//                                 });
//                         })
//                         .catch((err) => {
//                             resolve();
//                         });
//                 });
//             } else {
//                 app = require("../src/server");
//                 resolve();
//             }
//         });
//     },
//     async afterAll() {
//         await globalUser.destroy();
//     },
// };
