const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: true}));
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var json2html = require('node-json2html');
var pug = require('pug');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://permissionraport.firebaseio.com"
});

const db = admin.firestore();

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});

app.post('/api/add/collection/:collection_id/permission/CONTACTS', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            await Promise.all(req.body.contacts.map((object) => {
                return db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection("CONTACTS")
                    .doc(object.id.toString())
                    .set({
                        id: object.id,
                        name: object.name,
                        email: object.email,
                        phoneNumber: object.phoneNumber
                    }, {merge: true});
            }));
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/CONNECTED_EMAILS', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            await Promise.all(req.body.emails.map((object) => {
                return db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection("CONNECTED_EMAILS")
                    .doc(object.email.toString())
                    .set({
                        email: object.email
                    }, {merge: true});
            }));
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/BATTERY_STATE', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
                db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection("BATTERY_STATE")
                    .doc("BATTERY_STATE")
                    .set({
                        value: req.body.value
                    }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/MESSAGES', (req, res) => {
    (async () => {
        try {
            await Promise.all(req.body.map((object) => {
                return db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection("MESSAGES")
                    .doc(object.id.toString())
                    .set({
                        id: object.id,
                        name: object.name,
                        message: object.message,
                        phoneNumber: object.phoneNumber
                    }, {merge: true});
            }));
            return res.status(200).send(JSON.stringify("{OK}"));
        } catch (error) {
            console.log(error);
            return res.status(500).send(JSON.stringify("{" + error + "}"));
        }
    })();
});

//get
app.get('/api/get/:collection_id/permission/CONTACTS', (req, res) => {
    (async () => {
        try {
            var txt_data = "";
            await db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("CONTACTS")
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        console.log(doc.data());

                        txt_data = txt_data + JSON.stringify(doc.data()) + ",";
                        // txt_data = txt_data + " " + doc.id;
                    })
                });
            txt_data = txt_data.substring(0, txt_data.length - 1);
            console.log(txt_data);
            return res.status(200).send("{\"contacts\":[" + txt_data + "]}");
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
        }
    })()
});


app.get('/api/get/:collection_id/permission/MESSAGES', (req, res) => {
    (async () => {
        try {
            var txt_data = "";
            await db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("MESSAGES")
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        console.log(doc.data());
                        txt_data = txt_data + " " + JSON.stringify(doc.data());
                        // txt_data = txt_data + " " + doc.id;
                    })
                });
            return res.status(200).send("OK [" + req.params.collection_id + "]: ---> " + txt_data);
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
        }
    })()
});

app.get('/api/get/user/:collection_id/permission/:permission_id', (req, res) => {
    (async () => {
        try {
            var txt_data = "";
            await db.collection(req.params.collection_id)
                .doc(req.params.permission_id)
                .get()
                .then(snap => {
                    console.log(snap.data());
                    txt_data = txt_data + " " + JSON.stringify(snap.data());
                    txt_data = txt_data + " " + snap.id;
                });
            return res.status(200).send("OK [" + req.params.collection_id + "]: ---> " + txt_data);
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
        }
    })()
});

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'wapn.szkola@gmail.com',
        pass: 'c510mazowsze'
    }
});

function getDocumentForContacts(permission_id, req, res) {
    return new Promise((resolve, reject) => {
        var html_content = [];
        (async () => {
            try {
                await db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection(permission_id)
                    .get()
                    .then(snap_col1 => {
                        snap_col1.forEach(doc => {
                            var row = [];
                            row.push(doc.data().id);
                            row.push(doc.data().name);
                            row.push(doc.data().phoneNumber);
                            row.push(doc.data().email);
                            html_content.push(row);
                            console.log(doc.id.toString());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error 11: " + error);
                    })
            } catch (e) {
                reject("Error 22: " + e);
            }
        })();
    })
}

function getDocumentForConnectedEmails(permission_id, req, res) {
    return new Promise((resolve, reject) => {
        var html_content = [];
        (async () => {
            try {
                await db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection(permission_id)
                    .get()
                    .then(snap_col1 => {
                        snap_col1.forEach(doc => {
                            var row = [];
                            row.push(doc.id.toString());
                            html_content.push(row);
                            console.log(doc.id.toString());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForConnectedEmails: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForConnectedEmails: " + e);
            }
        })();
    })
}

function getDocumentForBatteryState(permission_id, req, res) {
    return new Promise((resolve, reject) => {
        var html_content = [];
        (async () => {
            try {
                await db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection(permission_id)
                    .get()
                    .then(snap_col1 => {
                        snap_col1.forEach(doc => {
                            var row = [];
                            row.push(doc.data().value.toString());
                            row.push("Tak");
                            html_content.push(row);
                            console.log(doc.data().value.toString());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForBatteryState: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForBatteryState: " + e);
            }
        })();
    })
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

let PERMISSION_IDS = ["CONNECTED_EMAILS", "BATTERY_STATE", "CONTACTS", "MESSAGES", "STORAGE"];

app.get('/api/send_email/user/:collection_id', (req, res) => {
    const mainPUGFunction = pug.compileFile("./main.pug");
    const permissionHeaderPUGFunction = pug.compileFile("./permission_header.pug");
    const connectedEmailsPUG = pug.compileFile("./PugContents/connected_emails.pug");
    const batteryStatePUG = pug.compileFile("./PugContents/battery_state.pug");
    const contactsPUG = pug.compileFile("./PugContents/contacts.pug");

    var html_page = "";
    var html_page_contents = "";


    (async () => {
        try {
            await Promise.all([
                getDocumentForConnectedEmails(PERMISSION_IDS[0], req, res),
                getDocumentForBatteryState(PERMISSION_IDS[1], req, res),
                getDocumentForContacts(PERMISSION_IDS[2], req, res)])
                .then(answer => {
                    var html = mainPUGFunction();

                    //CONNECTED_EMAILS:
                    html += permissionHeaderPUGFunction({permission_name: "Podłączone konta email"});
                    console.log("ANSWER0: " + answer[0]);
                    html += connectedEmailsPUG({
                        headers: ["Nazwa"],
                        ids: getCol(answer[0], 0)
                    });

                    //BATTERY_STATE:
                    html += permissionHeaderPUGFunction({permission_name: "Stan baterii"});
                    console.log("ANSWER1: " + answer[1]);
                    html += batteryStatePUG({
                        headers: ["Naładowanie", "Podłączony do ładowania"],
                        charge: getCol(answer[1], 0),
                        isCharge: getCol(answer[1], 1)
                    });

                    //CONTACTS:
                    html += permissionHeaderPUGFunction({permission_name: "Kontakty"});
                    console.log("ANSWER2: " + answer[2]);
                    html += contactsPUG({
                        headers: ["ID", "Nazwa", "Numer telefonu", "Email"],
                        ids: getCol(answer[2], 0),
                        names: getCol(answer[2], 1),
                        phone_numbers: getCol(answer[2], 2),
                        emails: getCol(answer[2], 3)
                    });

                    // html += permissionHeaderPUGFunction({permission_name: "Wiadomości"});
                    // html += contentPUGFunction();

                    // html += permissionHeaderPUGFunction({permission_name: "Pamięć"});
                    // html += contentPUGFunction();

                    const mailOptions = {
                        from: `wapn.szkola@gmail.com`,
                        to: req.params.collection_id,
                        subject: 'Test mail',
                        html: html
                    };
                    return transporter.sendMail(mailOptions, (error, data) => {
                        if (error) {
                            return res.status(500).send("{\"response\": \"" + error + "\"}");
                        }
                        return res.status(200).send("{\"response\": \"OK\"}");
                    });
                })
                .catch(error => {
                    return res.status(500).send('ERROR1' + error);
                })
        } catch (e) {
            return res.status(500).send('ERROR2' + e);
        }
    })();
});

exports.app = functions.https.onRequest(app);

/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// const gmail.email="myusername@gmail.com" gmail.password="secretpassword"
const gmailEmail = 'wapn.szkola@.gmail.com'/*functions.config().gmail.email;*/
const gmailPassword = '65urszula'/*functions.config().gmail.password;*/
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Cloud Storage for Firebase quickstart';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
// exports.sendWelcomeEmail2 = functions.https.onRequest((req, resp) => {
//     const email = 'wapn.szkola@gmail.com'; // The email of the user.
//     const displayName = "Kamil"; // The display name of the user.
//     // [END eventAttributes]
//     sendWelcomeEmail(email, displayName);
// })
//
// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// // [END onCreateTrigger]
//     // [START eventAttributes]
//     const email = user.email; // The email of the user.
//     const displayName = user.displayName; // The display name of the user.
//     // [END eventAttributes]
//
//     return sendWelcomeEmail(email, displayName);
// });

//google account credentials used to send email


/*exports.sendEmail = functions.firestore
    .document('orders/{orderId}')
    .onCreate((snap, context) => {
        const mailOptions = {
            from: `Kamil`,
            to: 'wapn.szkola@gmail.com',//snap.data().email,
            subject: 'Test mail',
            html: `<h1>Order Confirmation</h1>
                                <p>
                                   <b>Email: </b>${snap.data().email}<br>
                                </p>`
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });*/

// exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
//     const mailOptions = {
//         from: `wapn.szkola@gmail.com`,
//         to: req.url.substring(req.url.indexOf("/") + 1),
//         subject: 'Test mail',
//         html: `<h1>Kontakty:</h1>
//                             <p>
//                                <b>1: </b>${req.body.name}<br>
//                                <b>2: </b>${req.body.email}<br>
//                                <b>3: </b>${req.body.mailer}<br>
//                                <b>Email: </b>${req.query.mail}<br>
//                                <b>Email: </b>${req.query.email}<br>
//                                <b>Email: </b>${req.query.url}<br>
//                                <b>Email: </b>${req.body.url}<br>
//                                <b>Email: </b>${req.app}<br>
//                                <b>Email: </b>${req.url}<br>
//                                <b>Pozdro</b>
//                             </p>`
//     };
//     return transporter.sendMail(mailOptions, (error, data) => {
//         if (error) {
//             return res.send(error.toString());
//         }
//         var data = JSON.stringify(data)
//         return res.send(`Sent! ${data}`);
//     });
// });