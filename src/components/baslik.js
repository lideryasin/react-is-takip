import React, { Component } from 'react';
import './baslik.css';

class Baslik extends Component {
    render() {
        return (
            <div className="all">
                <div className="hepsi">
                    <div className="">
                        <div className="row">

                            <div className="col-sm">
                                Tarih
                                </div>

                            <div className="col-sm">
                                Çözüm arayan Şirket
                  </div>
                            <div className="col-sm">
                                İlgili Kişi
                 </div>
                            <div className="col-sm">
                                Hangi Çözüm
                </div>
                            <div className="col-sm">
                                Yönlendirdiğim firma
                </div>

                            <div className="col-sm">
                                Yönlendirdiğim kişi
                </div>
                            <div className="col-sm">
                                Yönlendirdiğim Tarih
                </div>
                            <div className="col-sm">
                                Durum Bilgisi
                </div>
                            <div className="col-sm">
                                Proje Tutarı
                            </div>
                            <div className="col-sm">
                                Proje Para Birimi
                            </div>
                            <div className="col-sm">
                                Açıklama
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Baslik;
