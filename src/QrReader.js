import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const api = axios.create({
  baseURL: "https://onesignal.com/api/v1/",
  timeout: 1000,
  headers: {
    Authorization: "Basic NjU4MGU2YjEtYzNmZS00OTRmLTg3OTEtYWEyNzU3ZTRiZjhl",
    "Content-Type": "application/json"
  },
});

export default class QrCode extends Component {
    constructor(props) {
    super(props);
        this.state = { qr: "c12202e4-9189-479a-b1bb-25bb22251802", test: "1234" };
    }

    handleScan = (data) => {
        if (data) {
            this.setState({
            qr: data,
            });
        }
    }

    handleError = (err) => {
    console.error(err);
    }

    handleValidate = () => {
        /**
             * Appel vers One Signal pour stocker le numéro de test en tant que qu'id externe
             */
        api
            .put("/players/" + this.state.qr, {
            app_id: "f7d2cc16-39b0-415c-b53b-76eef4acccbb",
            external_user_id: this.state.test,
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });


            /**
             * Appel vers One Signal pour envoyer une notification
             */
            
            api
              .post("notifications", {
                app_id: "f7d2cc16-39b0-415c-b53b-76eef4acccbb",
                headings: {
                  en: "Your COVID-19 test",
                  fr: "Votre test COVID-19",
                },
                contents: {
                  en: "You have the test n°" + this.state.test,
                  fr: "Enregistrement du test n°" + this.state.test,
                },
                include_external_user_ids: [this.state.test],
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
    }

    render() {
    return (
        <div className="qrForm">
        <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
        />
        <section className="input">
        <input
            type="password"
            name="qr"
            placeholder="Scannez un QR Code"
            value={this.state.qr}
            readOnly={true}
        />
        <input
            type="num"
            name="test_id"
            placeholder="Numéro du test"
            value={this.state.test ? this.state.test : ""}
            onChange={(e) => {
            this.setState({
                test: e.target.value,
            });
            }}
        />
        <button className="btn" name="" onClick={this.handleValidate} disabled={!(this.state.test && this.state.qr)}>
            Valider
        </button>
        </section>
        </div>
    );
    }
}
