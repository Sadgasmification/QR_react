import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://onesignal.com/api/v1/",
  timeout: 1000,
  headers: {
    Authorization: "Basic NjU4MGU2YjEtYzNmZS00OTRmLTg3OTEtYWEyNzU3ZTRiZjhl",
    "Content-Type": "application/json",
  },
});

export default class TestUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { result: "", test: "1234" };
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        qr: data,
      });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  handleValidate = () => {
    /**
     * Appel vers One Signal pour envoyer une notification, pour annoncer le résultat
     */
    api
      .post("notifications", {
        app_id: "f7d2cc16-39b0-415c-b53b-76eef4acccbb",
        headings: {
          en: "Test result",
          fr: "Résultat du test n°" + this.state.test,
        },
        contents: {
            en: "Your test is " + this.state.result,
            fr: "Votre test au COVID-19 est " + this.state.result,
        },
        include_external_user_ids: [this.state.test],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="qrForm">
        <section className="input">
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
          <select
            name="result"
            placeholder="Résultat du test"
            value={this.state.result}
            onChange={(e) => {
              this.setState({
                result: e.target.value,
              });
            }}
          >
            <option value="" disabled={true}>Résultat du test</option>
            <option value="positif">Positif</option>
            <option value="négatif">Négatif</option>
          </select>
          <button
            className="btn"
            name=""
            onClick={this.handleValidate}
            disabled={!(this.state.test && this.state.result)}
          >
            Valider
          </button>
        </section>
      </div>
    );
  }
}
