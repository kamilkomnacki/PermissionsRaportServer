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
            await Promise.all(req.body.map((object) => {
                    return db.collection(req.params.collection_id)
                        .doc(req.params.collection_id)
                        .collection("CONTACTS")
                        .doc(object.id.toString())
                        .set({
                            id: object.id,
                            name: object.name,
                            email: object.email,
                            phone_number: object.phone_number
                        }, { merge: true});
                }));
                return res.status(200).send('OK');
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
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
                        phone_number: object.phone_number
                    }, { merge: true});
            }));
            return res.status(200).send('OK');
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
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


/*
        "<!DOCTYPE html>
            <html>
	            <head>
		            <meta charset='UTF-8'>
			        <title>JSON To HTML using codebeautify.org</title>
		        </head>
		        <body>
			        <table border=1>
				        <thead>
					        <tr>
						        <th>id</th>
						        <th>name</th>
						        <th>email</th>
						        <th>phone_number</th>
					        </tr>
				        </thead>
                        <tbody>
                            <tr>
                                <td>45</td>
    						    <td>Stack</td>
    						    <td>stack@overflow.com</td>
    						    <td>+48 111 222 333</td>
    					    </tr>
                        </tbody>
			        </table>
		        </body>
	        </html>"

 */
function contactsToHTML() {

}

app.get('/api/send_email/user/:collection_id', (req, res) => {
    const mainPUGFunction = pug.compileFile("./main.pug");
    const permissionHeaderPUGFunction = pug.compileFile("./permission_header.pug");
    const contentPUGFunction = pug.compileFile("./contacts.pug");
    var html_page = "";/*mainPUGFunction();*/
    var html_page_contents = "";
    (async () => {
        try {
            await db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .listCollections()
                .then(snap_col1 => {
                    snap_col1.forEach(col1 => {
                        html_page_contents += " " + col1.id.toString();
                        console.log(col1.id.toString());
                        col1.listDocuments()
                            .then(snap_doc1 => {
                                snap_doc1.forEach(doc1 => {
                                    html_page_contents += " " + doc1.id.toString();
                                    console.log(doc1.id.toString());
                                });
                            })
                            .catch(error => {
                                return res.status(500).send("ERROR1: " + error);
                            })
                            .then(status => {
                                html_page += html_page_contents;
                                console.log("all content: " + html_page)
                                return res.status(200).read(html_page);
                            })
                    });
                })
                .catch(error => {
                    return res.status(500).send(error);
                })

                        /*html_page_contents += permissionHeaderPUGFunction(doc.id);
                        for(const key in doc.data()) {
                            const value = doc[key].toString;
                            html_page_contents += contentPUGFunction({
                                permission_name: value
                            })
                        }*/

                    // })
                // });


            // const mailOptions = {
            //
            //     from: `wapn.szkola@gmail.com`,
            //     to: req.params.collection_id,
            //     subject: 'Test mail',
            //     html: html_page
            // };
            // return transporter.sendMail(mailOptions, (error, data) => {
            //     if (error) {
            //         return res.send(error.toString());
            //     }
            //     var data = JSON.stringify(data)
            //     return res.send(`Sent! ${data} ${html_page}`);
            // });
        } catch  (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
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