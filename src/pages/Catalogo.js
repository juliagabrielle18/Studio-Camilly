import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Catalogo.css';

const imagens = [
  { src: '/img/unha1.jpg', titulo: 'Fibra de vidro', desc: 'O alongamento de fibra de vidro é um filamento que se utiliza de fibra de vidro para ser moldado de acordo com a unha natural.' },
  { src: '/img/unha2.jpg', titulo: 'Esmaltação em gel', desc: 'Técnica de emaltação que favorece uma maior durabilidade do esmalte (cerca de aproximadamente 20 dias).' },
  { src: '/img/unha3.jpg', titulo: 'Banho em gel', desc: 'Cobertura que blinda as unhas, com ele cria-se uma estrutura rijida por cima das unhas naturais.' },
  { src: '/img/unha4.jpg', titulo: 'Blindagem', desc: 'É uma técnica de proteção que envolve a aplicação de camdas de gel sobre sua unha fortalecendo-as .' },
];

export default function Catalogo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div className="catalogo-container">
      <h1 className="titulo">Nosso Catálogo</h1>
      <Slider {...settings} className="carousel">
        {imagens.map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="card">
              <img src={item.src} alt={item.titulo} />
              <h2>{item.titulo}</h2>
              <p>{item.desc}</p>
              <Link to="/agendamento" className="botao-agendar">Agendar</Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
