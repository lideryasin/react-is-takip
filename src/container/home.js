import React, { Component } from 'react';
import firebase from 'firebase';
import trim from 'trim';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withAlert } from 'react-alert';
import List from './list';
import './home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Home extends Component {
  constructor() {
    super();

    this.state = {
      present: '',
      tarih: moment(),
      cozumArayanSirket: '',
      ilgiliKisi: '',
      hangiCozum: 'QlikView',
      yonlendirdigimFirma: 'Vmind',
      yonlendirdigimKisi: '',
      yonlendirdigimTarih: moment(),
      projeTutari: '',
      aciklama: '',
      durumBilgisi: 'Proje Başladı',
      projeParaBirimi: 'TL',
      modalIsOpen: false,


      ilkToplam: '',
      ikinciToplam: ''
    }
  }


  componentWillMount() {

    /*  const refilk = firebase.database().ref('denmee').child('tarihler');
      refilk.child("01,02,2018").on("value", function (snapshot) {
        console.log("ilk ki bu kadar bu kadar " + snapshot.numChildren());
  
  
        refilk.child("03,02,2018").on("value", function (snapshot2) {
          console.log("ikinci bu kadar bu kadar " + snapshot2.numChildren());
  
          console.log("toplam " + snapshot.numChildren() + snapshot2.numChildren())
        })
  
      })
  
      /*const refikinci = firebase.database().ref('denmee').child('tarihler');
      refikinci.child("02,02,2018").on("value", function (snapshot) {
        console.log("ikinci bu kadar bu kadar " + snapshot.numChildren());
  
        this.setState({ ikinciToplam: "1"+snapshot.numChildren() })
      })
  
      console.log("toplam" + this.state.ilkToplam + " ikinci " + this.state.ikinciToplam)*/

  }

  tarihOnChange = (data) => {
    this.setState({ tarih: data })
  }

  cozumArayanSirketOnChange = (e) => {
    this.setState({ cozumArayanSirket: e.target.value })
  }

  ilgiliKisiOnChange = (e) => {
    this.setState({ ilgiliKisi: e.target.value })
  }

  hangiCozumOnChange = (e) => {
    this.setState({ hangiCozum: e.target.value })
  }

  yonlendirdigimFirmaOnChange = (e) => {
    this.setState({ yonlendirdigimFirma: e.target.value })
  }

  yonlendirdigimKisiOnChange = (e) => {
    this.setState({ yonlendirdigimKisi: e.target.value })
  }

  yonlendirdigimTarihOnChange = (data) => {
    this.setState({ yonlendirdigimTarih: data })
  }

  projeTutariOnChange = (e) => {
    this.setState({ projeTutari: e.target.value })
  }

  aciklamaOnChange = (e) => {
    this.setState({ aciklama: e.target.value })
  }

  durumBilgisiOnChange = (e) => {
    this.setState({ durumBilgisi: e.target.value })
  }

  projeParaBirimiOnChange = (e) => {
    this.setState({ projeParaBirimi: e.target.value })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  uyari = () => {
    return this.props.alert.error(

      <div>
        <label>Formdan Çıkmak İstedinize Emin Misiniz ?  </label>
        <div >
          <button className="btn btnler evet" onClick={this.closeModal}>EVET</button>
        </div>
      </div>
    )
  }


  kaydet = () => {

    const dbRef = firebase.database().ref('isTakip');
    const timestamp = Date.now();
    const gelecekTarih = this.state.tarih
    const gelecekYonTarih = this.state.yonlendirdigimTarih
    dbRef.push({
      present: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp)),
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      cozumArayanSirket: trim(this.state.cozumArayanSirket),
      ilgiliKisi: trim(this.state.ilgiliKisi),
      hangiCozum: trim(this.state.hangiCozum),
      yonlendirdigimFirma: trim(this.state.yonlendirdigimFirma),
      yonlendirdigimKisi: trim(this.state.yonlendirdigimKisi),
      yonlendirdigimTarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekYonTarih)),
      projeTutari: trim(this.state.projeTutari),
      aciklama: trim(this.state.aciklama),
      durumBilgisi: trim(this.state.durumBilgisi),
      projeParaBirimi: trim(this.state.projeParaBirimi)
    })
  }

  render() {
    return (
      <div>
    
        <div className="ama">
          <List />
          <div>
            <div className="faba"><Button variant="fab" color="primary" aria-label="add" onClick={this.openModal} >
              <AddIcon />
            </Button></div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.uyari}
              style={customStyles}
              contentLabel="Example Modal"
            >


              <div className="baslık"> İş Takip Formu </div>

              <div className="ana_div">
                <div className="div">

                  <label className="yazi">Tarih</label>
                  <DatePicker
                    className="form-control text"
                    selected={this.state.tarih}
                    onChange={this.tarihOnChange}
                    dateFormat="DD/MM/YYYY"
                  />

                  <label className="yazi">Çözüm arayan Şirket</label>
                  <input type="text"
                    onChange={this.cozumArayanSirketOnChange}
                    ref="cozumArayanSirket"
                    className="form-control text"
                  />

                  <label className="yazi">İlgili Kişi</label>
                  <input type="text"
                    onChange={this.ilgiliKisiOnChange}
                    ref="ilgiliKisi"
                    className="form-control text"
                  />

                  <label className="yazi">Hangi Çözüm</label>
                  <select className="form-control text" value={this.state.hangiCozum} onChange={this.hangiCozumOnChange}>
                    <option value="QlikView">QlikView</option>
                    <option value="Digital Signage">Digital Signage</option>
                    <option value="RPA">RPA</option>
                    <option value="Yapay Zekalı İş Zekalı">Yapay Zekalı İş Zekalı</option>
                    <option value="Payfull Ve Manim">Payfull Ve Manim</option>
                    <option value="Payfull">Payfull</option>
                    <option value="Manim">Manim</option>
                    <option value="Risk Intelligence System">Risk Intelligence System</option>
                  </select>

                  <label className="yazi">Durum Bilgisi</label>
                  <select className="form-control text" value={this.state.durumBilgisi} onChange={this.durumBilgisiOnChange}>
                    <option value="Proje Başladı" >Proje başladı</option>
                    <option value="Anlaşma Yapıldı" >Anlaşma yapıldı</option>
                    <option value="Olmadı" >Olmadı</option>
                    <option value="Yönlendirme Yapıldı" >Yönlendirme Yapıldı</option>
                  </select>

                  <label className="yazi">Açıklama</label>
                  <textarea type="text"
                    onChange={this.aciklamaOnChange}
                    ref="aciklama"
                    className="form-control aciklama"
                  />

                  <button
                    className="btn"
                    onClick={() => {
                      this.kaydet();
                      this.closeModal()
                    }}
                  >
                    Kaydet
                  </button>
                  <button
                    className="btn btn2"
                    onClick={() => {
                      this.closeModal()
                    }}
                  >
                    Vazgeç
                  </button>

                </div>

                <div className="div">

                  <label className="yazi">Yönlendirdiğim firma</label>
                  <select className="form-control text" value={this.state.yonlendirdigimFirma} onChange={this.yonlendirdigimFirmaOnChange} >
                    <option value="Vmind">Vmind</option>
                    <option value="DQ Türkiye">DQ Türkiye</option>
                    <option value="Armodesk">Armodesk</option>
                    <option value="Tiorana">Tiorana</option>
                    <option value="Invenoa">Invenoa</option>
                    <option value="Gaoteknoloji">Gaoteknoloji</option>
                  </select>

                  <label className="yazi">Yönlendirdiğim kişi</label>
                  <input type="text"
                    onChange={this.yonlendirdigimKisiOnChange}
                    ref="yonlendirdigimKisi"
                    className="form-control text "
                  />

                  <label className="yazi">Yönlendirdiğim Tarih</label>
                  <DatePicker
                    className="form-control text"
                    selected={this.state.yonlendirdigimTarih}
                    onChange={this.yonlendirdigimTarihOnChange}
                    dateFormat="DD/MM/YYYY"
                  />

                  <label className="yazi">Proje Tutarı</label>
                  <input type="text"
                    onChange={this.projeTutariOnChange}
                    ref="projeTutari"
                    className="form-control text"
                  />

                  <label className="yazi">Proje Para Birimi</label>
                  <select className="form-control text" value={this.state.projeParaBirimi} onChange={this.projeParaBirimiOnChange}>
                    <option value="Proje Başladı" >TL</option>
                    <option value="Anlaşma Yapıldı" >USD</option>
                  </select>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert(Home);
