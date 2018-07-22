import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Baslik from '../components/baslik';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './list.css';

function searchingFor(term) {
  String.prototype.turkishToLower = function () {
    var string = this;
    var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) { return letters[letter]; })
    return string.toLowerCase();
  }
  return function (x) {
    return x.cozumArayanSirket.turkishToLower().includes(term.turkishToLower()) || !term + x.ilgiliKisi.turkishToLower().includes(term.turkishToLower()) || !term + x.hangiCozum.turkishToLower().includes(term.turkishToLower()) || !term + x.yonlendirdigimFirma.turkishToLower().includes(term.turkishToLower()) || !term + x.yonlendirdigimKisi.turkishToLower().includes(term.turkishToLower()) || !term + x.yonlendirdigimTarih.turkishToLower().includes(term.turkishToLower()) || !term + x.durumBilgisi.turkishToLower().includes(term.turkishToLower()) || !term + x.projeTutari.turkishToLower().includes(term.turkishToLower()) || !term + x.aciklama.turkishToLower().includes(term.turkishToLower()) || !term + x.tarih.turkishToLower().includes(term.turkishToLower()) || !term;
  }
}

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      isTakip: [],
    }

    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(event) {
    this.setState({ term: event.target.value })
  }

  searchHandler(event) {
    this.setState({ term: event.target.value })
  }

  componentDidMount() {
    let app = firebase.database().ref('isTakip');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }
  componentWillUnmount() {
    firebase.database().ref('isTakip').off('value');
  }

  getData(values) {
    let isTakipVal = values;
    let isTakip = _(isTakipVal)
      .keys()
      .map(isTakipKey => {
        let cloned = _.clone(isTakipVal[isTakipKey]);
        cloned.key = isTakipKey;
        return cloned;
      })
      .value();
    isTakip = isTakip.reverse().sort((a, b) => Intl.Collator("tr").compare(b.isTakip, a.isTakip));
    this.setState({
      isTakip: isTakip.reverse()
    });
  }

  detaySayfasi = (isTakipler) => {
    // this.props.history.push(`/detay/${isTakipler.key}`, { isTakipler });
  }


  render() {
    const { term, isTakip } = this.state;

    return (
      <div>
        <div className="searchdiv">
          <input type="text" className="form-control mr-sm-2 search" placeholder="Ara..." aria-label="Search" onChange={this.searchHandler} />
        </div>
        <div className="baslik-home">
          <Baslik />
        </div>

        {
          isTakip.filter(searchingFor(term)).map((isTakipler) =>
            <Link to={{
              pathname: `/detay/${isTakipler.key}`,
              state: { isTakipler }
            }} key={isTakipler.key} >
              <div key={isTakipler.key}>
                <div className="all-home">
                  <div className="hepsi-home">
                    <div className="" >
                      <div className="row">
                        <div className="col-sm">
                          {isTakipler.tarih}
                        </div>
                        <div className="col-sm">
                          {isTakipler.cozumArayanSirket}
                        </div>
                        <div className="col-sm">
                          {isTakipler.ilgiliKisi}
                        </div>
                        <div className="col-sm">
                          {isTakipler.hangiCozum}
                        </div>
                        <div className="col-sm">
                          {isTakipler.yonlendirdigimFirma}
                        </div>
                        <div className="col-sm">
                          {isTakipler.yonlendirdigimKisi}
                        </div>
                        <div className="col-sm">
                          {isTakipler.yonlendirdigimTarih}
                        </div>
                        <div className="col-sm">
                          {isTakipler.durumBilgisi}
                        </div>
                        <div className="col-sm">
                          {isTakipler.projeTutari}
                        </div>
                        <div className="col-sm">
                          {isTakipler.projeParaBirimi}
                        </div>
                        <div className="col-sm">
                          {isTakipler.aciklama}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        }
      </div>
    )
  }
}

export default withRouter(List);
