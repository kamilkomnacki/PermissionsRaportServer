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
                        displayName: object.displayName,
                        firstName: object.firstName,
                        lastName: object.lastName,
                        nickname: object.nickname,
                        nicknameType: object.nicknameType,
                        number: object.number,
                        normalizedNumber: object.normalizedNumber,
                        numberType: object.numberType,
                        email: object.email,
                        emailLabel: object.emailLabel,
                        emailType: object.emailType,
                        website: object.website,
                        eventStartDate: object.eventStartDate,
                        eventLabel: object.eventLabel,
                        eventType: object.eventType,
                        note: object.note,
                        address: object.address,
                        addressType: object.addressType

                    }, {merge: true});
            }));
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
            console.log(JSON.stringify(req.body));
            await Promise.all(req.body.messages.map((object) => {
                return db.collection(req.params.collection_id)
                    .doc(req.params.collection_id)
                    .collection("MESSAGES")
                    .doc(object.id.toString())
                    .set({
                        id: object.id,
                        threadId: object.threadId,
                        addressNumber: object.addressNumber,
                        person: object.person,
                        date: object.date,
                        dateSend: object.dateSend,
                        protocol: object.protocol,
                        read: object.read,
                        status: object.status,
                        type: object.type,
                        subject: object.subject,
                        body: object.body
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
                    value: req.body.value,
                    isCharge: req.body.isCharge,
                    batteryTechnology: req.body.batteryTechnology,
                    temperature: req.body.temperature,
                    voltage: req.body.voltage,
                    hasBattery: req.body.hasBattery
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/BLUETOOTH', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("BLUETOOTH")
                .doc("BLUETOOTH")
                .set({
                    macAddress: req.body.macAddress
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/CONFIG', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("CONFIG")
                .doc("CONFIG")
                .set({
                    ringerMode: req.body.ringerMode
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/DEVICE', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("DEVICE")
                .doc("DEVICE")
                .set({
                    IMEI: req.body.IMEI,
                    SDK: req.body.SDK,
                    manufacturer: req.body.manufacturer,
                    osVersion: req.body.osVersion,
                    model: req.body.model,
                    phoneNumber: req.body.phoneNumber,
                    product: req.body.product,
                    device: req.body.device,
                    fingerprint: req.body.fingerprint,
                    isRooted: req.body.isRooted,
                    deviceType: req.body.deviceType,
                    phoneType: req.body.phoneType,
                    orientationType: req.body.orientationType
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/LOCATION', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("LOCATION")
                .doc("LOCATION")
                .set({
                    lat: req.body.lat,
                    lon: req.body.lon
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/MEMORY', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("MEMORY")
                .doc("MEMORY")
                .set({
                    totalRAM: req.body.totalRAM,
                    availableInternal: req.body.availableInternal,
                    availableExternal: req.body.availableExternal,
                    totalInternal: req.body.totalInternal,
                    totalExternal: req.body.totalExternal
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/NETWORK', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("NETWORK")
                .doc("NETWORK")
                .set({
                    isNetworkAvailable: req.body.isNetworkAvailable,
                    isWifiEnabled: req.body.isWifiEnabled,
                    ipv4Address: req.body.ipv4Address,
                    ipv6Address: req.body.ipv6Address,
                    wifiSSID: req.body.wifiSSID,
                    wifiLinkSpeed: req.body.wifiLinkSpeed,
                    wifiBSSID: req.body.wifiBSSID,
                    wifiMAC: req.body.wifiMAC,
                    networkType: req.body.networkType
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/NFC', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("NFC")
                .doc("NFC")
                .set({
                    isNFCPresent: req.body.isNFCPresent,
                    isNFCEnable: req.body.isNFCEnable
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/SIM', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("SIM")
                .doc("SIM")
                .set({
                    simSerialNumber: req.body.simSerialNumber,
                    country: req.body.country,
                    carrier: req.body.carrier,
                    isSimNetworkLocked: req.body.isSimNetworkLocked,
                    isMultiSim: req.body.isMultiSim,
                    numberOfActiveSim: req.body.numberOfActiveSim
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

app.post('/api/add/collection/:collection_id/permission/ID', (req, res) => {
    (async () => {
        try {
            console.log(JSON.stringify(req.body));
            db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("ID")
                .doc("ID")
                .set({
                    IMEI: req.body.IMEI,
                    SDK: req.body.SDK,
                    manufacturer: req.body.manufacturer,
                    osVersion: req.body.osVersion,
                    phoneNumber: req.body.phoneNumber,
                    product: req.body.product,
                    device: req.body.device,
                    fingerprint: req.body.fingerprint,
                    isRooted: req.body.isRooted,
                    deviceType: req.body.deviceType,
                    phoneType: req.body.phoneType,
                    orientationType: req.body.orientationType
                }, {merge: true});
            return res.status(200).send("{\"response\": \"OK\"}");
        } catch (error) {
            console.log(error);
            return res.status(500).send("{" + error + "}");
        }
    })();
});

//get
app.get('/api/get/:collection_id/permission/CONFIG', (req, res) => {
    (async () => {
        try {
            var txt_data = "";
            await db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("CONFIG")
                .doc("CONFIG")
                .get()
                .then(snap => {
                    console.log(snap.data());
                    txt_data = txt_data + JSON.stringify(snap.data()) + ",";
                    // txt_data = txt_data + " " + doc.id;
                });
            txt_data = txt_data.substring(0, txt_data.length - 1);
            console.log(txt_data);
            return res.status(200).send("{\"config\":[" + txt_data + "]}");
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
        }
    })()
});

app.get('/api/get/:collection_id/permission/DEVICE', (req, res) => {
    (async () => {
        try {
            var txt_data = "";
            await db.collection(req.params.collection_id)
                .doc(req.params.collection_id)
                .collection("DEVICE")
                .doc("DEVICE")
                .get()
                .then(snap => {
                    console.log(snap.data());
                    txt_data = txt_data + JSON.stringify(snap.data()) + ",";
                    // txt_data = txt_data + " " + doc.id;
                });
            txt_data = txt_data.substring(0, txt_data.length - 1);
            console.log(txt_data);
            return res.status(200).send("{\"config\":[" + txt_data + "]}");
        } catch (error) {
            console.log(error);
            return res.status(500).send('ERROR' + error);
        }
    })()
});

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
                            row.push(doc.data().displayName);
                            row.push(doc.data().firstName);
                            row.push(doc.data().lastName);
                            row.push(doc.data().normalizedNumber);
                            row.push(doc.data().address);
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

function getDocumentForMessages(permission_id, req, res) {
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
                            row.push(doc.data().addressNumber);
                            row.push(doc.data().body);
                            row.push(doc.data().date);
                            row.push(doc.data().read);
                            row.push(doc.data().threadId);
                            row.push(doc.data().type);
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
                            row.push(doc.data().isCharge.toString());
                            row.push(doc.data().batteryTechnology);
                            row.push(doc.data().temperature.toString());
                            row.push(doc.data().voltage.toString());
                            row.push(doc.data().hasBattery.toString());
                            html_content.push(row);
                            console.log("BATTERY STATE: " + html_content);
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

function getDocumentForBluetooth(permission_id, req, res) {
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
                            row.push(doc.data().macAddress);
                            html_content.push(row);
                            console.log("BLUETOOTH: " + doc.data().macAddress);
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForBluetooth: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForBatteryState: " + e);
            }
        })();
    })
}

function getDocumentForConfig(permission_id, req, res) {
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
                            row.push(doc.data().ringerMode);
                            html_content.push(row);
                            console.log("CONFIG: " + doc.data().ringerMode);
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForBluetooth: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForBatteryState: " + e);
            }
        })();
    })
}

function getDocumentForDevice(permission_id, req, res) {
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
                            row.push(doc.data().IMEI);
                            row.push(doc.data().SDK.toString());
                            row.push(doc.data().manufacturer);
                            row.push(doc.data().model);
                            row.push(doc.data().osVersion);
                            row.push(doc.data().phoneNumber);
                            row.push(doc.data().product);
                            row.push(doc.data().device);
                            row.push(doc.data().fingerprint);
                            row.push(doc.data().isRooted);
                            row.push(doc.data().deviceType);
                            row.push(doc.data().phoneType);
                            row.push(doc.data().orientationType);
                            html_content.push(row);
                            console.log("DEVICE: " + doc.data().ringerMode);
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForDevice: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForDevice: " + e);
            }
        })();
    })
}

function getDocumentForLocation(permission_id, req, res) {
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
                            row.push(doc.data().email);
                            html_content.push(row);
                            console.log("Location latitude: " + doc.data().lat);
                            console.log("Location longitude: " + doc.data().lon);
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForLocation: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForLocation: " + e);
            }
        })();
    })
}

function getDocumentForMemory(permission_id, req, res) {
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
                            row.push(doc.data().totalRAM);
                            row.push(doc.data().availableInternal);
                            row.push(doc.data().availableExternal);
                            row.push(doc.data().totalInternal);
                            row.push(doc.data().totalExternal);
                            html_content.push(row);
                            console.log("Memory: " + doc.data());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForLocation: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForLocation: " + e);
            }
        })();
    })
}

function getDocumentForNetwork(permission_id, req, res) {
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
                            row.push(doc.data().isNetworkAvailable);
                            row.push(doc.data().isWifiEnabled);
                            row.push(doc.data().ipv4Address);
                            row.push(doc.data().ipv6Address);
                            row.push(doc.data().wifiSSID);
                            row.push(doc.data().wifiLinkSpeed);
                            row.push(doc.data().wifiBSSID);
                            row.push(doc.data().wifiMAC);
                            row.push(doc.data().networkType);
                            html_content.push(row);
                            console.log("Memory: " + doc.data());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForNetwork: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForNetwork: " + e);
            }
        })();
    })
}

function getDocumentForNFC(permission_id, req, res) {
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
                            row.push(doc.data().isNFCPresent);
                            row.push(doc.data().isNFCEnable);
                            html_content.push(row);
                            console.log("NFC: " + doc.data());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForNFC: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForNFC: " + e);
            }
        })();
    })
}

function getDocumentForSIM(permission_id, req, res) {
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
                            row.push(doc.data().simSerialNumber);
                            row.push(doc.data().country);
                            row.push(doc.data().carrier);
                            row.push(doc.data().isSimNetworkLocked);
                            row.push(doc.data().isMultiSim);
                            row.push(doc.data().numberOfActiveSim);
                            html_content.push(row);
                            console.log("NFC: " + doc.data());
                        });
                        resolve(html_content);
                    })
                    .catch(error => {
                        reject("Error getDocumentForSIM: " + error);
                    })
            } catch (e) {
                reject("Error getDocumentForSIM: " + e);
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

let PERMISSION_IDS = [
    "CONNECTED_EMAILS",
    "BATTERY_STATE",
    "BLUETOOTH",
    "CONFIG",
    "DEVICE",
    "LOCATION",
    "MEMORY",
    "NETWORK",
    "NFC",
    "SIM",
    "CONTACTS",
    "MESSAGES",
    "STORAGE"];

app.get('/api/send_email/user/:collection_id', (req, res) => {
    const mainPUGFunction = pug.compileFile("./main.pug");
    const permissionHeaderPUGFunction = pug.compileFile("./permission_header.pug");
    const connectedEmailsPUG = pug.compileFile("./PugContents/connected_emails.pug");
    const batteryStatePUG = pug.compileFile("./PugContents/battery_state.pug");
    const bluetoothPUG = pug.compileFile("./PugContents/bluetooth.pug");
    const devicePUG = pug.compileFile("./PugContents/device.pug");
    const locationPUG = pug.compileFile("./PugContents/location.pug");
    const memoryPUG = pug.compileFile("./PugContents/memory.pug");
    const networkPUG = pug.compileFile("./PugContents/network.pug");
    const nfcPUG = pug.compileFile("./PugContents/nfc.pug");
    const simPUG = pug.compileFile("./PugContents/sim.pug");
    const contactsPUG = pug.compileFile("./PugContents/contacts.pug");
    const messagesPUG = pug.compileFile("./PugContents/messages.pug");

    var html_page = "";
    var html_page_contents = "";


    (async () => {
        try {
            await Promise.all([
                getDocumentForConnectedEmails(PERMISSION_IDS[0], req, res),
                getDocumentForBatteryState(PERMISSION_IDS[1], req, res),
                getDocumentForBluetooth(PERMISSION_IDS[2], req, res),
                getDocumentForConfig(PERMISSION_IDS[3], req, res),
                getDocumentForDevice(PERMISSION_IDS[4], req, res),
                getDocumentForLocation(PERMISSION_IDS[5], req, res),
                getDocumentForMemory(PERMISSION_IDS[6], req, res),
                getDocumentForNetwork(PERMISSION_IDS[7], req, res),
                getDocumentForNFC(PERMISSION_IDS[8], req, res),
                getDocumentForSIM(PERMISSION_IDS[9], req, res),
                getDocumentForContacts(PERMISSION_IDS[10], req, res),
                getDocumentForMessages(PERMISSION_IDS[11], req, res)])
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
                        headers: ["Naładowanie", "Podłączony do ładowania", "Rodzaj baterii", "Temperatura", "Napięcie [mV]", "Czy bateria obecna?"],
                        charge: getCol(answer[1], 0),
                        isCharge: getCol(answer[1], 1),
                        batteryTechnology: getCol(answer[1], 2),
                        temperature: getCol(answer[1], 3),
                        voltage: getCol(answer[1], 4),
                        hasBattery: getCol(answer[1], 5)
                    });

                    //BLUETOOTH:
                    html += permissionHeaderPUGFunction({permission_name: "Bluetooth"});
                    console.log("ANSWER2: " + answer[2]);
                    html += bluetoothPUG({
                        headers: ["MAC Adres"],
                        macAddress: getCol(answer[2], 0)
                    });

                    //DEVICE CONFIG:
                    html += permissionHeaderPUGFunction({permission_name: "Konfiguracja urządzenia"});
                    console.log("ANSWER3: " + answer[3]);
                    console.log("ANSWER4: " + answer[4]);
                    html += devicePUG({
                        headers: ["IMEI", "Wersja SDK", "Producent telefonu", "Model telefonu", "Wersja systemu", "Numer telefonu", "Produkt", "Urządzenie", "Odcisk palca", "Czy urządzenie jest zrootowane?", "Typ urządzenia", "Typ telefonu", "Orientacja", "Tryb dzwonienia"],
                        IMEI: getCol(answer[4], 0),
                        SDK: getCol(answer[4], 1),
                        manufacturer: getCol(answer[4], 2),
                        model: getCol(answer[4], 3),
                        osVersion: getCol(answer[4], 4),
                        phondeNumber: getCol(answer[4], 5),
                        product: getCol(answer[4], 6),
                        device: getCol(answer[4], 7),
                        fingerprint: getCol(answer[4], 8),
                        isRooted: getCol(answer[4], 9),
                        deviceType: getCol(answer[4], 10),
                        phoneType: getCol(answer[4], 11),
                        orientationType: getCol(answer[4], 12),
                        ringerMode: getCol(answer[3], 0)
                    });

                    //DEVICE CONFIG:
                    html += permissionHeaderPUGFunction({permission_name: "Localizacja"});
                    console.log("ANSWER5: " + answer[5]);
                    html += locationPUG({
                        headers: ["Szerokość geograficzna", "Dlugosc geograficzna"],
                        lat: getCol(answer[5], 0),
                        lon: getCol(answer[5], 1),

                    });

                    //MEMORY:
                    html += permissionHeaderPUGFunction({permission_name: "Pamięć"});
                    console.log("ANSWER6: " + answer[6]);
                    html += memoryPUG({
                        headers: ["Pamięć RAM", "Dostępna pamięć wewnętrzna", "Dostępna pamięć zewnętrzna", "Całkowita pamięć wewnętrzna", "Całkowita pamięć zewnętrzna"],
                        totalRAM: getCol(answer[6], 0),
                        availableInternal: getCol(answer[6], 1),
                        availableExternal: getCol(answer[6], 2),
                        totalInternal: getCol(answer[6], 3),
                        totalExternal: getCol(answer[6], 4),

                    });

                    //NETWORK:
                    html += permissionHeaderPUGFunction({permission_name: "Sieć"});
                    console.log("ANSWER7: " + answer[7]);
                    html += networkPUG({
                        headers: ["Czy sieć dostępna?", "Czy WiFi dostępne?", "Adres IPv4", "Adres IPv6", "WiFi SSID", "WiFi Link Speed", "WiFi BSSID", "WiFi MAC Adres", "Typ sieci"],
                        isNetworkAvailable: getCol(answer[7], 0),
                        isWifiEnabled: getCol(answer[7], 1),
                        ipv4Address: getCol(answer[7], 2),
                        ipv6Address: getCol(answer[7], 3),
                        wifiSSID: getCol(answer[7], 4),
                        wifiLinkSpeed: getCol(answer[7], 5),
                        wifiBSSID: getCol(answer[7], 6),
                        wifiMAC: getCol(answer[7], 7),
                        networkType: getCol(answer[7], 8)
                    });

                    //NFC:
                    html += permissionHeaderPUGFunction({permission_name: "NFC"});
                    console.log("ANSWER8: " + answer[8]);
                    html += nfcPUG({
                        headers: ["Czy NFC jest obecne na urządzeniu?", "Czy NFC włączone?"],
                        isNFCPresent: getCol(answer[8], 0),
                        isNFCEnable: getCol(answer[8], 1)
                    });

                    //SIM:
                    html += permissionHeaderPUGFunction({permission_name: "SIM"});
                    console.log("ANSWER9: " + answer[9]);
                    html += simPUG({
                        headers: ["Numer seryjny SIM?", "Kraj", "?Carrier?", "Czy sieć w SIM dostępna?", "Czy wiele SIM?", "Ilość włączonych SIM"],
                        simSerialNumber: getCol(answer[9], 0),
                        country: getCol(answer[9], 1),
                        carrier: getCol(answer[9], 2),
                        isSimNetworkLocked: getCol(answer[9], 3),
                        isMultiSim: getCol(answer[9], 4),
                        numberOfActiveSim: getCol(answer[9], 5)
                    });

                    //CONTACTS:
                    html += permissionHeaderPUGFunction({permission_name: "Kontakty"});
                    console.log("ANSWER10: " + answer[10]);
                    html += contactsPUG({
                        headers: ["Wyświetlana nazwa", "Imie", "Nazwisko", "Numer telefonu", "Adres", "Email"],
                        displayName: getCol(answer[10], 0),
                        firstName: getCol(answer[10], 1),
                        lastName: getCol(answer[10], 2),
                        normalizedNumber: getCol(answer[10], 3),
                        address: getCol(answer[10], 4),
                        email: getCol(answer[10], 5),
                    });

                    //MESSAGES:
                    html += permissionHeaderPUGFunction({permission_name: "Wiadomości"});
                    console.log("ANSWER11: " + answer[11]);
                    html += messagesPUG({
                        headers: ["Nadawca", "Treść", "Data otrzymania", "Czy odczytano", "Id konwersacji", "Typ"],
                        addressNumber: getCol(answer[11], 0),
                        body: getCol(answer[11], 1),
                        date: getCol(answer[11], 2),
                        read: getCol(answer[11], 3),
                        threadId: getCol(answer[11], 4),
                        type: getCol(answer[11], 5),
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

app.get('/api/delete_all_data/user/:collection_id', (req, res) => {
    let deleteDoc = db.collection(req.params.collection_id).doc(req.params.collection_id).delete();
    // [END delete_document]

    return deleteDoc.then(resp => {
        console.log('Delete: ', res);
        return res.status(200).send("{\"response\": \"OK\"}");
    });
                // .then(function () {
                //     console.log("Document successfully deleted!");
                //     return res.status(200).send("{\"response\": \"OK\"}");
                // }).catch(function (error) {
                //     console.error("Error removing document: ", error);
                //     return res.status(500).send("{\"response\": \"" + error + "\"}");
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