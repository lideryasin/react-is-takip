import React, { Component } from 'react';
import firebase from 'firebase';
import trim from 'trim';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import './detay.css';


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

class Detay extends Component {


  constructor() {
    super();

    this.state = {
      tarih: moment(),
      cozumArayanSirket: '',
      ilgiliKisi: '',
      hangiCozum: '',
      yonlendirdigimFirma: '',
      yonlendirdigimKisi: '',
      yonlendirdigimTarih: moment(),
      projeTutari: '',
      aciklama: '',
      durumBilgisi: '',
      projeParaBirimi: '',
      modalIsOpen: false,
    }
  }

  componentWillMount() {

    const item = this.props.history.location.state.isTakipler

    this.setState({ tarih: moment(item.tarih, '"DD-MM-YYYY"') })
    this.setState({ cozumArayanSirket: item.cozumArayanSirket })
    this.setState({ ilgiliKisi: item.ilgiliKisi })
    this.setState({ hangiCozum: item.hangiCozum })
    this.setState({ yonlendirdigimFirma: item.yonlendirdigimFirma })
    this.setState({ yonlendirdigimKisi: item.yonlendirdigimKisi })
    this.setState({ yonlendirdigimTarih: moment(item.yonlendirdigimTarih, '"DD-MM-YYYY"') })
    this.setState({ projeTutari: item.projeTutari })
    this.setState({ aciklama: item.aciklama })
    this.setState({ durumBilgisi: item.durumBilgisi })
    this.setState({ projeParaBirimi: item.projeParaBirimi })

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

  delete = (key) => {
    firebase.database().ref('isTakip').child(key).remove();
    this.props.history.push('/');
  }

  edit = (key) => {
    const dbRef = firebase.database().ref('isTakip').child(key);
    const gelecekTarih = this.state.tarih
    const gelecekYonTarih = this.state.yonlendirdigimTarih
    dbRef.update({
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
    const item = this.props.history.location.state.isTakipler
    const tarihg = this.state.tarih
    const yonTarih = this.state.yonlendirdigimTarih
    const tarihCevir = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(tarihg);
    const yonTarihCevir = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yonTarih);

    return (
        <div>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td> <Link to="/"><button className="btn btn-outline-secondary btnler-detay"><i className="material-icons gr">keyboard_backspaces</i>  Geri</button> </Link> </td>
                        <td className="btn-detay"><button onClick={this.openModal} className="btn btn-outline-info btnler-detay2">Düzenle <i className="material-icons">edit</i></button><button type="button" onClick={() => this.delete(item.key)} class="btn btn-outline-danger btnler-detay">Sil <i className="material-icons">delete_forever</i></button></td>
                    </tr>
                    <tr>
                        <td className="basliklar">Tarih</td>
                        <td>{tarihCevir}</td>
                    </tr>
                    <tr>
                        <td className="basliklar">Çözüm arayan Şirket</td>
                        <td>{this.state.cozumArayanSirket}</td>
                    </tr>
                    <tr>
                        <td className="basliklar">İlgili Kişi</td>
                        <td>{this.state.ilgiliKisi}</td>
                    </tr>
                    <tr>
                        <td className="basliklar"> Hangi Çözüm</td>
                        <td>{this.state.hangiCozum}</td>
                    </tr>
                    <tr>
                        <td className="basliklar">Yönlendirdiğim firma</td>
                        <td>{this.state.yonlendirdigimFirma}</td>
                    </tr>
                    <tr>
                        <td className="basliklar"> Yönlendirdiğim kişi</td>
                        <td>{this.state.yonlendirdigimKisi}</td>
                    </tr>
                    <tr>
                        <td className="basliklar">Yönlendirdiğim Tarih</td>
                        <td>{yonTarihCevir}</td>
                    </tr>
                    <tr>
                        <td className="basliklar">Durum Bilgisi</td>
                        <td>{this.state.durumBilgisi}</td>
                    </tr>  <tr>
                        <td className="basliklar"> Proje Tutarı</td>
                        <td>{this.state.projeTutari}</td>
                    </tr>
                    <tr>
                        <td className="basliklar"> Proje Para Birimi</td>
                        <td>{this.state.projeParaBirimi}</td>
                    </tr>
                    <tr>
                        <td className="basliklar"> Açıklama</td>
                        <td className="detay-aciklama">{this.state.aciklama}</td>
                    </tr>
                </tbody>
            </table>

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
                            defaultValue={this.state.cozumArayanSirket}
                            className="form-control text"
                        />

                        <label className="yazi">İlgili Kişi</label>
                        <input type="text"
                            onChange={this.ilgiliKisiOnChange}
                            defaultValue={this.state.ilgiliKisi}
                            className="form-control text"
                        />

                        <label className="yazi">Hangi Çözüm</label>
                        <select className="form-control text" defaultValue={this.state.hangiCozum} onChange={this.hangiCozumOnChange}>
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
                        <select className="form-control text" defaultValue={this.state.durumBilgisi} onChange={this.durumBilgisiOnChange}>
                            <option value="Proje Başladı" >Proje başladı</option>
                            <option value="Anlaşma Yapıldı" >Anlaşma yapıldı</option>
                            <option value="Olmadı" >Olmadı</option>
                            <option value="Yönlendirme Yapıldı" >Yönlendirme Yapıldı</option>
                        </select>

                        <label className="yazi">Açıklama</label>
                        <textarea type="text"
                            onChange={this.aciklamaOnChange}
                            defaultValue={this.state.aciklama}
                            className="form-control aciklama"
                        />

                        <button
                            className="btn"
                            onClick={() => {
                                this.edit(item.key);
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
                        <select className="form-control text" defaultValue={this.state.yonlendirdigimFirma} onChange={this.yonlendirdigimFirmaOnChange} >
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
                            defaultValue={this.state.yonlendirdigimKisi}
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
                            defaultValue={this.state.projeTutari}
                            className="form-control text"
                        />

                        <label className="yazi">Proje Para Birimi</label>
                        <select className="form-control text" defaultValue={this.state.projeParaBirimi} onChange={this.projeParaBirimiOnChange}>
                            <option value="TL" >TL</option>
                            <option value="USD" >USD</option>
                        </select>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
}

export default withAlert(Detay);
